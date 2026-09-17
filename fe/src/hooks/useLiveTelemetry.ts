import { useEffect } from 'react';
import { useTelemetryStore } from '@/store/telemetry.store';

export const useLiveTelemetry = () => {
  const { patients, selectedPatientId, isStreaming, updatePatientVital, setSelectedPatient, toggleStreaming } =
    useTelemetryStore();

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Subtle real-time heart rate fluctuation simulation when streaming is active
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      // Pick a random patient to fluctuate vitals slightly (+- 1 or 2 bpm)
      const randomPatient = patients[Math.floor(Math.random() * patients.length)];
      if (randomPatient.id !== 'p-103') { // Keep bed 103 in critical warning
        const jitter = Math.floor(Math.random() * 3) - 1;
        const newBpm = Math.max(60, Math.min(100, randomPatient.vitals.bpm + jitter));
        updatePatientVital(randomPatient.id, {
          ...randomPatient.vitals,
          bpm: newBpm,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isStreaming, patients, updatePatientVital]);

  return {
    patients,
    selectedPatient,
    isStreaming,
    setSelectedPatient,
    toggleStreaming,
  };
};
