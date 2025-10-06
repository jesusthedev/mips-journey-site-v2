// src/components/confetti.js
// ultra-safe confetti: no libs, no eval, no regrets.
export function burst(el, opts = {}) {
  if (!el || typeof document === "undefined") return;
  const { count = 14, reverse = false } = opts;

  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const node = document.createElement("span");
    node.textContent = "🎉";
    node.style.position = "fixed";
    node.style.left = cx + "px";
    node.style.top = cy + "px";
    node.style.pointerEvents = "none";
    node.style.zIndex = "9999";
    node.style.fontSize = 14 + Math.floor(Math.random() * 10) + "px";

    const angle = (i / count) * Math.PI * 2;
    const dist = 60 + Math.random() * 80;
    const dx = Math.cos(angle) * dist;
    const dy = (reverse ? -1 : 1) * Math.sin(angle) * dist;
    const duration = 600 + Math.random() * 500;

    node.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${360 * (Math.random() > 0.5 ? 1 : -1)}deg)`, opacity: 0 }
      ],
      { duration, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
    );

    setTimeout(() => node.remove(), duration + 80);
    document.body.appendChild(node);
  }
}
