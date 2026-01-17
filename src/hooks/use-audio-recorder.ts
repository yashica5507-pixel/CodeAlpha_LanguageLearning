"use client";

import { useState, useRef, useCallback } from 'react';

type RecordingState = "idle" | "recording" | "stopped" | "error";

export const useAudioRecorder = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    setRecordingState("idle");
    setAudioBlob(null);
    audioChunksRef.current = [];
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("Media Devices API not supported.");
      setRecordingState("error");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingState("recording");
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        audioChunksRef.current = [];
        setRecordingState("stopped");
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.onerror = () => {
        setRecordingState("error");
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setRecordingState("error");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, [recordingState]);

  const reset = useCallback(() => {
    setAudioBlob(null);
    setRecordingState('idle');
  }, []);

  return { recordingState, startRecording, stopRecording, audioBlob, reset };
};
