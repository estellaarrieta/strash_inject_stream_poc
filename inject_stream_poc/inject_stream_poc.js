const CUSTOM_STREAM = {
  label: "Custom Stream [devstreaming-cdn.apple.com]",
  mime_type: "application/vnd.apple.mpegurl",
  url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
};

console.log("[VideoJS Custom Source] Script started");

function addCustomSource(player) {
  try {
    // Method 1: Get current sources from the player's current state
    const getCurrentSources = () => {
      // Try to get from sourceSelector first
      if (player.sourceSelector && player.sourceSelector().sources) {
        return [...player.sourceSelector().sources];
      }

      // Fallback to getting from player's current source
      const currentSrc = player.currentSource();
      if (currentSrc && currentSrc.src) {
        return [
          {
            src: currentSrc.src,
            type: currentSrc.type,
            label: currentSrc.label,
            offset: false,
            duration: player.duration() || undefined,
          },
        ];
      }

      return [];
    };

    const currentSources = getCurrentSources();

    // Check if our custom source already exists
    const customSourceExists = currentSources.some((source) => source.src === CUSTOM_STREAM.url);

    if (customSourceExists) {
      console.log("[VideoJS Custom Source] Custom source already exists");
      return true;
    }

    // Add our custom source to the list
    const newSources = [
      ...currentSources,
      {
        src: CUSTOM_STREAM.url,
        type: CUSTOM_STREAM.mime_type,
        label: CUSTOM_STREAM.label,
        offset: false,
        duration: player.duration() || undefined,
      },
    ];

    if (player.sourceSelector) {
      console.log("[VideoJS Custom Source] Using sourceSelector to add source");
      player.sourceSelector().setSources(newSources);
    }

    console.log("[VideoJS Custom Source] Successfully added custom source");
    return true;
  } catch (e) {
    console.error("[VideoJS Custom Source] Error:", e);
    return false;
  }
}

function setupPlayer(videojsElement) {
  const checkPlayerReady = async () => {
    try {
      const player = videojsElement.player;

      if (!player) {
        console.log("[VideoJS Custom Source] Player not initialized yet");
        setTimeout(checkPlayerReady, 500);
        return;
      }

      // Wait for player to be ready
      if (player.readyState() === 0) {
        await new Promise((resolve) => player.ready(resolve));
      }

      // Check if sources are already loaded
      if (player.currentSource() || (player.sourceSelector && player.sourceSelector().sources_)) {
        addCustomSource(player);
      } else {
        // If no sources yet, wait a bit more
        setTimeout(() => {
          addCustomSource(player);
        }, 500);
      }
    } catch (e) {
      console.log("[VideoJS Custom Source] Error accessing player:", e);
      setTimeout(checkPlayerReady, 1000);
    }
  };

  checkPlayerReady();
}

// Use MutationObserver to detect when video-js element is added to the page
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      // Check if the node is the video-js element or contains it
      if (node.nodeType === Node.ELEMENT_NODE) {
        const videojsElement = node.matches("video-js") ? node : node.querySelector("video-js");
        if (videojsElement) {
          console.log("[VideoJS Custom Source] video-js element found");
          observer.disconnect();
          setupPlayer(videojsElement);
          return;
        }
      }
    }
  }
});

// Start observing the document for changes
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

console.log("[VideoJS Custom Source] Starting observer for video-js element");
