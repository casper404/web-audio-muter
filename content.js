let started = false;

document.addEventListener("click", () => {
  if (started) return;
  started = true;

  // --- audio source ---
  const video = document.querySelector("video");
  if (!video) {
    console.log("No video element found");
    return;
  }

  // --- audio graph ---
  const ctx = new AudioContext();

  const source = ctx.createMediaElementSource(video);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;

  const gain = ctx.createGain();
  gain.gain.value = 1.0;

  source.connect(analyser);
  analyser.connect(gain);
  gain.connect(ctx.destination);

  // --- loudness analysis ---
  const buffer = new Float32Array(analyser.fftSize);

  function getRMS() {
    analyser.getFloatTimeDomainData(buffer);
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i] * buffer[i];
    }
    return Math.sqrt(sum / buffer.length);
  }

  // --- heuristic logic ---
  let base = null;

  const THRESHOLD = 2;
  const QUIET = 0.7;
  const NORMAL = 1.0;

  setInterval(() => {
    const rms = getRMS();

    if (base === null) {
      base = rms;
      return;
    }

    if (rms > base * THRESHOLD) {
      gain.gain.setTargetAtTime(QUIET, ctx.currentTime, 0.2);
    } else {
      gain.gain.setTargetAtTime(NORMAL, ctx.currentTime, 0.4);
    }
  }, 200);

  console.log("Audio ad reducer started");
});