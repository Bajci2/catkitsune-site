import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Repeat } from "lucide-react";
import Home from "@/pages/Home";
import Swap from "@/pages/Swap";
import NotFound from "@/pages/not-found";

function Navigation() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-card border rounded-full shadow-lg p-2 flex gap-2">
        <Link href="/">
          <Button size="icon" variant="ghost" data-testid="nav-home" className="rounded-full">
            <HomeIcon className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/swap">
          <Button size="icon" variant="ghost" data-testid="nav-swap" className="rounded-full">
            <Repeat className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/swap" component={Swap} />
        <Route component={NotFound} />
      </Switch>
      <Navigation />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
