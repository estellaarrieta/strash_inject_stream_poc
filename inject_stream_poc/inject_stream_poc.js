const TRACK_URL = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";
console.log("[VideoJS HLS Adder] Script started");

function addTrackToPlayer(player) {
  try {
    console.log("[VideoJS HLS Adder] Found player:", player);

    console.log("[VideoJS HLS Adder] Adding as new source");
    player.src({
      src: TRACK_URL,
      type: "application/x-mpegURL",
      withCredentials: false,
      crossorigin: "anonymous",
    });
    return true;
  } catch (e) {
    console.error("[VideoJS HLS Adder] Error:", e);
    return false;
  }
}

function waitForPlayer() {
  const videojsElement = document.querySelector("video-js");
  if (!videojsElement || !videojsElement.player) {
    console.log("[VideoJS HLS Adder] Player not found yet, waiting...");
    setTimeout(waitForPlayer, 1000);
    return;
  }

  const player = videojsElement.player;
  console.log("[VideoJS HLS Adder] Player found");

  if (addTrackToPlayer(player)) {
    console.log("[VideoJS HLS Adder] Successfully added track");
  }
}

// Start looking for player
console.log("[VideoJS HLS Adder] Starting player detection");
waitForPlayer();
