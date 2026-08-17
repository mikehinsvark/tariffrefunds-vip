/** Design reminder — Operations Command Deck uses a stable dark theme for an internal agent workspace. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import FieldGuide from "./pages/FieldGuide";
import BrokerScript from "./pages/BrokerScript";
import Categories from "./pages/Categories";
import Qualifier from "./pages/Qualifier";
import Objections from "./pages/Objections";

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/field-guide" component={FieldGuide} /><Route path="/broker-script" component={BrokerScript} /><Route path="/categories" component={Categories} /><Route path="/qualifier" component={Qualifier} /><Route path="/objections" component={Objections} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
