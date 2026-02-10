import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Vehicles from "./pages/masters/Vehicles";
import VehicleTypes from "./pages/masters/VehicleTypes";
import Units from "./pages/masters/Units";
import Ledger from "./pages/masters/Ledger";
import Parties from "./pages/masters/Parties";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/masters/vehicles" element={<Vehicles />} />
          <Route path="/masters/vehicle-types" element={<VehicleTypes />} />
          <Route path="/masters/units" element={<Units />} />
          <Route path="/masters/ledger" element={<Ledger />} />
          <Route path="/masters/parties" element={<Parties />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
