(function () {
  var root = document.documentElement;
  var sunIcon = '<svg class="btn-icon" viewBox="0 0 16 16" aria-hidden="true">' +
                  '<path fill="currentColor" d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>' +
                '</svg>';
  var moonIcon = '<svg class="btn-icon" viewBox="0 0 16 16" aria-hidden="true">' +
                   '<path fill="currentColor" d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>' +
                 '</svg>';

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function syncButtons() {
    var next = current() === "dark" ? "light" : "dark";
    var label = "Switch to " + next + " theme";
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = next === "dark" ? moonIcon : sunIcon;
      buttons[i].setAttribute("aria-label", label);
      buttons[i].setAttribute("title", label);
    }
  }

  function syncThemeColor(theme) {
    var color = theme === "dark" ? "#242220" : "#eae4d8";
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) {
      metas[i].setAttribute("content", color);
    }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    syncThemeColor(theme);
    syncButtons();
  }

  function set(theme) {
    try { localStorage.setItem("theme", theme); } catch (e) {}
    apply(theme);
  }

  function hasSavedTheme() {
    try {
      var saved = localStorage.getItem("theme");
      return saved === "light" || saved === "dark";
    } catch (e) {
      return false;
    }
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-theme-toggle]")) {
      set(current() === "dark" ? "light" : "dark");
    }
  });

  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onSystemChange = function (e) {
      if (!hasSavedTheme()) {
        apply(e.matches ? "dark" : "light");
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener("change", onSystemChange);
    } else if (mq.addListener) {
      mq.addListener(onSystemChange);
    }
  }

  syncButtons();
})();
