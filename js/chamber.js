(() => {
  const root = document.documentElement;

  const btn = document.getElementById("lights");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = () => { if (btn) btn.querySelector("span").textContent = isDark() ? "Metal panels" : "White panels"; };
  if (btn) {
    btn.addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("chamber-panels", next); } catch (e) {}
      label();
    });
  }
  label();

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const min = Number(document.body.dataset.glitchMin) || 4;
  const max = Math.max(min, Number(document.body.dataset.glitchMax) || 11);
  const POWER_ON_MS = 2600;
  const GLITCH_MS = 560;

  document.querySelectorAll(".pinned").forEach(el => {
    const stagger = (parseFloat(getComputedStyle(el).getPropertyValue("--i")) || 0) * 170;
    const schedule = delay => setTimeout(() => {
      el.style.setProperty("--tear-y", Math.round(5 + Math.random() * 70) + "%");
      el.style.setProperty("--tear-h", Math.round(6 + Math.random() * 14) + "%");
      el.classList.add("glitching");
      setTimeout(() => {
        el.classList.remove("glitching");
        schedule((min + Math.random() * (max - min)) * 1000);
      }, GLITCH_MS);
    }, delay);
    setTimeout(() => el.classList.remove("lightup"), POWER_ON_MS + stagger);
    schedule(POWER_ON_MS + stagger + 600 + Math.random() * 1500);
  });
})();
