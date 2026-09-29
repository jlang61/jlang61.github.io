import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./styles/index.css";
import { App } from "./App";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is pre-rendered (see scripts/prerender.mjs), so hydrate it;
// the dev server serves an empty root, so render from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
