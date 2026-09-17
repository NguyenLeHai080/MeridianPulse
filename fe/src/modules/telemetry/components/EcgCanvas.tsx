import React, { useRef, useEffect } from 'react';

interface EcgCanvasProps {
  bpm: number;
  isCritical?: boolean;
  leadName?: string;
}

export const EcgCanvas: React.FC<EcgCanvasProps> = ({
  bpm = 75,
  isCritical = false,
  leadName = 'Lead II (DII) - 25mm/s 10mm/mV',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    // Buffer of voltage points across width
    const points: number[] = new Array(width).fill(height / 2);
    let cursor = 0;
    let phase = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 280;
    };

    window.addEventListener('resize', handleResize);

    const speed = 2.5; // Sweep speed
    const sweepAhead = 25; // Clear zone ahead of sweep bar

    // Physiological P-Q-R-S-T ECG Waveform Generator function
    const getEcgVoltage = (p: number): number => {
      const normalizedPhase = p % 1; // [0, 1]

      // Baseline center
      const baseline = height * 0.55;

      // P wave: 0.10 -> 0.20
      if (normalizedPhase >= 0.10 && normalizedPhase < 0.20) {
        const t = (normalizedPhase - 0.15) / 0.05;
        return baseline - Math.exp(-t * t * 4) * 14;
      }
      // PR segment: flat
      // Q wave: 0.32 -> 0.35 (small negative dip)
      if (normalizedPhase >= 0.32 && normalizedPhase < 0.35) {
        return baseline + 10;
      }
      // R peak: 0.35 -> 0.40 (tall positive spike)
      if (normalizedPhase >= 0.35 && normalizedPhase < 0.40) {
        const peakHeight = isCritical ? 90 : 75;
        const t = (normalizedPhase - 0.375) / 0.025;
        return baseline - Math.exp(-t * t * 6) * peakHeight;
      }
      // S wave: 0.40 -> 0.44 (sharp negative dip)
      if (normalizedPhase >= 0.40 && normalizedPhase < 0.44) {
        return baseline + 24;
      }
      // ST segment: flat
      // T wave: 0.55 -> 0.70 (dome positive wave)
      if (normalizedPhase >= 0.55 && normalizedPhase < 0.70) {
        const t = (normalizedPhase - 0.625) / 0.075;
        return baseline - Math.exp(-t * t * 4) * 22;
      }

      // Small natural micro-jitter
      const jitter = (Math.random() - 0.5) * 1.5;
      return baseline + jitter;
    };

    const render = () => {
      // 1. Draw Medical Grid lines (phosphor grid style)
      ctx.fillStyle = '#06131c';
      ctx.fillRect(0, 0, width, height);

      // Minor grid: 10px
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#0e2b38';
      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 15) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Major grid: 75px
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#164257';
      ctx.beginPath();
      for (let x = 0; x < width; x += 75) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 75) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Advance waveform calculation based on BPM
      // Frequency: BPM / 60 beats per second
      const beatsPerSecond = bpm / 60;
      const phaseDelta = (beatsPerSecond * speed) / 120;

      for (let s = 0; s < speed; s++) {
        phase += phaseDelta;
        points[cursor] = getEcgVoltage(phase);
        cursor = (cursor + 1) % width;
      }

      // 3. Render ECG Path
      ctx.lineWidth = 2.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowBlur = 8;

      if (isCritical) {
        ctx.strokeStyle = '#f43f5e'; // Bright Rose Red
        ctx.shadowColor = 'rgba(244, 63, 94, 0.8)';
      } else {
        ctx.strokeStyle = '#22d3ee'; // Bright Cyan
        ctx.shadowColor = 'rgba(34, 211, 238, 0.7)';
      }

      // Segment before sweep gap
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < width; i++) {
        // Leave a blank gap in front of sweep cursor
        const distFromCursor = (i - cursor + width) % width;
        if (distFromCursor < sweepAhead) {
          started = false;
          continue;
        }

        if (!started) {
          ctx.moveTo(i, points[i]);
          started = true;
        } else {
          ctx.lineTo(i, points[i]);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // 4. Draw Leading Sweep Bar Cursor
      ctx.fillStyle = isCritical ? 'rgba(244, 63, 94, 0.9)' : 'rgba(34, 211, 238, 0.9)';
      ctx.beginPath();
      ctx.arc(cursor, points[cursor] || height / 2, 4, 0, Math.PI * 2);
      ctx.fill();

      // Sweep gradient trail
      const sweepGrad = ctx.createLinearGradient(cursor - 20, 0, cursor, 0);
      sweepGrad.addColorStop(0, 'rgba(6, 19, 28, 0)');
      sweepGrad.addColorStop(1, isCritical ? 'rgba(244, 63, 94, 0.25)' : 'rgba(34, 211, 238, 0.25)');
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(Math.max(0, cursor - 20), 0, 20, height);

      // Lead Info overlay
      ctx.fillStyle = '#64748b';
      ctx.font = '11px monospace';
      ctx.fillText(leadName, 12, 22);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [bpm, isCritical, leadName]);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-inner bg-dark-950">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
