// ============================================================
// AIverse - PWA Layer
// Registers the service worker, wires up the "Install App"
// button, an online/offline status toast, and the splash screen.
// ============================================================

// --- Splash screen ---
// Shows briefly on load so the app doesn't flash straight into
// content; hides once the page has fully loaded, with a small
// minimum display time so it never feels like a flicker.
(function initSplashScreen(){
  const MIN_DISPLAY_MS = 900;
  const startedAt = Date.now();

  function hideSplash(){
    const splash = document.getElementById("splashScreen");
    if (!splash) return;
    const elapsed = Date.now() - startedAt;
    const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
    setTimeout(() => {
      splash.classList.add("fade-out");
      // Remove from the DOM after the fade transition finishes
      setTimeout(() => splash.remove(), 550);
    }, wait);
  }

  if (document.readyState === "complete") {
    hideSplash();
  } else {
    window.addEventListener("load", hideSplash);
  }
  // Safety net: never let the splash screen get stuck (e.g. slow font load)
  setTimeout(hideSplash, 4000);
})();

// --- Register the service worker ---
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}

// --- Install prompt handling ---
let deferredInstallPrompt = null;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the browser's default mini-infobar and save the event
  // so we can trigger it later from our own styled button.
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installBtn) {
    installBtn.classList.add("show");
    installBtn.innerHTML = '⬇ <span class="install-label-text">Install App</span>';
  }
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    // Hide the button regardless of the outcome — the browser won't
    // fire beforeinstallprompt again until conditions reset.
    installBtn.classList.remove("show");
    deferredInstallPrompt = null;
    if (choice && choice.outcome === "accepted") {
      showPwaToast("AIverse installed! Check your home screen.");
    }
  });
}

// Hide the install button if the app gets installed via another path
// (e.g. browser's own address-bar install icon)
window.addEventListener("appinstalled", () => {
  if (installBtn) installBtn.classList.remove("show");
  deferredInstallPrompt = null;
});

// --- Online / offline status toast ---
function showPwaToast(text, autoHideMs = 3500) {
  const toast = document.getElementById("pwaToast");
  const toastText = document.getElementById("pwaToastText");
  if (!toast || !toastText) return;
  toastText.textContent = text;
  toast.classList.add("show");
  if (autoHideMs) {
    clearTimeout(showPwaToast._t);
    showPwaToast._t = setTimeout(() => toast.classList.remove("show"), autoHideMs);
  }
}

window.addEventListener("offline", () => {
  showPwaToast("You're offline — showing cached content.", 4000);
});

window.addEventListener("online", () => {
  showPwaToast("Back online.", 2000);
});
