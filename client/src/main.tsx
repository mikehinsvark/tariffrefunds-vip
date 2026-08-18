import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const pendingRoute = new URLSearchParams(window.location.search).get("gh_route");
if (pendingRoute?.startsWith("/")) {
  window.history.replaceState(null, "", pendingRoute);
}

createRoot(document.getElementById("root")!).render(<App />);
