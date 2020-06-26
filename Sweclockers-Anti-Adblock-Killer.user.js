// ==UserScript==
// @name        Sweclockers Anti-Adblock Killer
// @namespace   storm
// @include     *://*.sweclockers.com/*
// @run-at      document-start
// @version     1
// @grant       none
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

// Remove top ad banner
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#siteHeader .banner").remove();
});
