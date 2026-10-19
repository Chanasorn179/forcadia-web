"use client";

import { useEffect, useRef } from "react";
import { useArchiveStore } from "@/store/archiveStore";

type AudioGraph = {
  context: AudioContext;
  ambientGain: GainNode;
  musicGain: GainNode;
  sources: AudioScheduledSourceNode[];
};

function createAudioGraph(): AudioGraph {
  const context = new AudioContext();
  const ambientGain = context.createGain();
  const musicGain = context.createGain();
  ambientGain.gain.value = 0;
  musicGain.gain.value = 0;
  ambientGain.connect(context.destination);
  musicGain.connect(context.destination);

  const sources: AudioScheduledSourceNode[] = [];
  const buffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (0.22 + Math.sin(index / 18000) * 0.12);
  }
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 720;
  noise.buffer = buffer;
  noise.loop = true;
  noise.connect(filter).connect(ambientGain);
  noise.start();
  sources.push(noise);

  [73.42, 110, 146.83].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.value = index === 0 ? 0.18 : 0.055;
    oscillator.connect(gain).connect(musicGain);
    oscillator.start();
    sources.push(oscillator);
  });
  return { context, ambientGain, musicGain, sources };
}

export function useAudio() {
  const graphRef = useRef<AudioGraph | null>(null);
  const ambientSound = useArchiveStore((state) => state.ambientSound);
  const music = useArchiveStore((state) => state.music);
  const volume = useArchiveStore((state) => state.volume);

  useEffect(() => {
    if (!ambientSound && !music) return;
    graphRef.current ??= createAudioGraph();
    void graphRef.current.context.resume();
  }, [ambientSound, music]);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    const now = graph.context.currentTime;
    graph.ambientGain.gain.setTargetAtTime(ambientSound ? volume * 0.28 : 0, now, 0.35);
    graph.musicGain.gain.setTargetAtTime(music ? volume * 0.16 : 0, now, 0.5);
  }, [ambientSound, music, volume]);

  useEffect(() => () => {
    const graph = graphRef.current;
    if (!graph) return;
    graph.sources.forEach((source) => source.stop());
    void graph.context.close();
  }, []);
}
