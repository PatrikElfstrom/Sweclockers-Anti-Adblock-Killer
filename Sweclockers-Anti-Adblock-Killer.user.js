// ==UserScript==
// @name        Sweclockers Anti-Adblock Killer
// @namespace   storm
// @include     *://*.sweclockers.com/*
// @run-at      document-start
// @version     2.0.0
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

document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".col-content");
  const side = document.querySelector(".col-side");
  const outerSide = document.querySelector(".col-outer-side");

  const outerSideWidth = outerSide.style.clientWidth;

  // Fix column margins
  content.style.marginRight -= outerSideWidth;
  content.style.maxWidth = 'inherit';
  side.style.marginLeft -= outerSideWidth;
  side.style.marginRight = 0;

  // Remove all ad areas
  document.querySelectorAll(".ad, .col-outer-side")?.forEach(element => element.remove());
});
