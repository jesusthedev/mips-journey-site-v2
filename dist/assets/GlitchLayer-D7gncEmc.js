import { r as reactExports, j as jsxRuntimeExports } from "./index-BAD190KC.js";
function GlitchLayer({ bigDelta = 0 }) {
  const rootRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const intensity = Math.min(1, Math.max(0, Math.abs(bigDelta) / 0.5));
    node.style.setProperty("--glitch-intensity", intensity.toString());
  }, [bigDelta]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, className: "glitch-wrap", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glitch-noise" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glitch-scanlines" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glitch-chroma" })
  ] });
}
export {
  GlitchLayer as default
};
//# sourceMappingURL=GlitchLayer-D7gncEmc.js.map
