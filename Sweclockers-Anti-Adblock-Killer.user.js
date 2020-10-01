// ==UserScript==
// @name        Sweclockers Anti-Adblock Killer
// @namespace   storm
// @include     *://*.sweclockers.com/*
// @run-at      document-start
// @version     1.2.0
// @grant       none
// @downloadURL https://cdn.jsdelivr.net/gh/PatrikElfstrom/Sweclockers-Anti-Adblock-Killer@master/Sweclockers-Anti-Adblock-Killer.user.js
// ==/UserScript==

const htmlNodeObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      // Find the adblocker script and set it to false
      if (
        mutation.target.nodeName === "SCRIPT" &&
        mutation.target.innerHTML == "var adblock = true;"
      ) {
        mutation.target.innerHTML = "var adblock = false;";
        htmlNodeObserver.disconnect();
      }
    }
  });
});

const htmlNode = document.childNodes[1];

// Observe the <html> node
htmlNodeObserver.observe(htmlNode, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
});

// Remove ad banners and areas
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ad, #siteHeader .banner")?.forEach(e => e.remove());
});
