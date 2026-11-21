/* Light/dark theme: follows the OS preference until the user picks one, then remembers it.
   Loaded in <head> (before the stylesheets) so data-theme is set before first paint. */
window.App = window.App || {};

(function (App) {
  var STORAGE_KEY = "maha.theme";
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var listeners = [];

  // Kept here rather than in ui.icons because login.html doesn't load ui.js.
  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
  };

  function stored() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === "light" || v === "dark") return v;
    } catch (e) { /* storage unavailable */ }
    return null;
  }
  function system() { return media && media.matches ? "dark" : "light"; }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    listeners.forEach(function (fn) { fn(theme); });
  }

  App.theme = {
    get: function () { return root.getAttribute("data-theme"); },
    set: function (theme) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
      apply(theme);
    },
    toggle: function () { App.theme.set(App.theme.get() === "dark" ? "light" : "dark"); },

    /** Turns a button into the theme toggle: renders the icon and keeps its label in sync. */
    bindToggle: function (btn) {
      function update(theme) {
        var next = theme === "dark" ? "light" : "dark";
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (theme === "dark" ? ICONS.sun : ICONS.moon) + "</svg>";
        btn.setAttribute("aria-label", "Switch to " + next + " theme");
        btn.title = "Switch to " + next + " theme";
      }
      btn.addEventListener("click", App.theme.toggle);
      listeners.push(update);
      update(App.theme.get());
    }
  };

  apply(stored() || system());

  // Follow OS changes until the user has made an explicit choice.
  if (media) {
    var onSystemChange = function () { if (!stored()) apply(system()); };
    if (media.addEventListener) media.addEventListener("change", onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  // Keep other open tabs in sync (key is null when storage is cleared).
  window.addEventListener("storage", function (e) {
    if (e.key === STORAGE_KEY || e.key === null) apply(stored() || system());
  });
})(window.App);
