// src/components/confetti.js
// Safe, dependency-free confetti. Accepts: element | React ref | event | CSS selector.
// Never throws; silently no-ops if it can't resolve a target.

function resolveEl(input) {
  if (!input || typeof document === "undefined") return null;

  // React ref
  if (typeof input === "object" && "current" in input) input = input.current;

  // DOM Event
  if (typeof Event !== "undefined" && input instanceof Event) {
    input = input.currentTarget || input.target;
  }

  // CSS selector string
  if (typeof input === "string") {
    const node = document.querySelector(input);
    if (node) return node;
  }

  // DOM element
  if (input && input.nodeType === 1 && typeof input.getBoundingClientRect === "function") {
    return input;
  }

  return null;
}

export function burst(target, opts = {}) {
  try {
    const el = resolveEl(target) || document.body; // fall back to body
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
  } catch (_) {
    // do nothing; confetti should never crash the app
  }
}
