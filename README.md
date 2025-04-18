# inject_stream_poc

## Installation

- Download the whole folder `inject_stream_poc`
- Place it in your **plugins** folder (where the `config.yml` is). If its not there create it
- Reload plugins from stash (Settings > Plugins -> Reload Plugins)

## Usage

Open any scene and it will try to inject an hls stream into the player

## Issues
- CORS blocks requests. Must be disabled https://medium.com/@beligh.hamdi/run-chrome-browser-without-cors-872747142c61
   - As an alternative, CORS could be bypassaed with proxy, but it would be great to be able to avoid routing traffic through our server
 
- Setting stream via player.scr() method is far from ideal.
  - If someone knows a way how to add tracks properly - please let me know.  
  I tried https://videojs.com/guides/video-tracks/#add-a-video-track-to-the-player but it does not work.
