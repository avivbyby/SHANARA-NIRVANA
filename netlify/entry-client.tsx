import { hydrateRoot } from "react-dom/client";
import "../app/globals.css";
import Home from "../app/page";

hydrateRoot(document.getElementById("root")!, <Home />);
