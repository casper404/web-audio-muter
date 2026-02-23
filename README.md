# Podcast Auto Muter 🎧

A minimal Chrome extension that declines sudden increases in volume 
by analyzing audio loudness in real time.

## How it works
The extension connects to the audio stream of an HTML5 `<video>` element
and measures signal energy (RMS).  
When the sound becomes significantly louder than the baseline,
the volume is smoothly reduced.

No speech recognition.  
No ML.  
Just signal analysis.

## Installation
1. Open chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension/` folder

## Usage
1. Open a podcast or video.
2. Click anywhere on the page once (required by browser).
3. Listen — ads should be muted automatically when it is too loud.

## Limitations
- Does not work on DRM-protected content
- Uses loudness heuristics (may misfire occasionally)
- Chrome-only (Manifest V3)

## Why
Podcast ads are often much louder than the main content. 
This tool experiments with automatic volume control.
using Web Audio API.

## License
MIT
