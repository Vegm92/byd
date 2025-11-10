import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import Header from "./components/Header";

// Lazy load page components
const Index = React.lazy(() => import("./pages/Index"));
const VehicleDetail = React.lazy(() => import("./pages/VehicleDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Presentation = React.lazy(() => import("./pages/Presentation"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const preventGestures = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventGestures, { passive: false });
    document.addEventListener('touchmove', preventGestures, { passive: false });
    document.addEventListener('touchend', preventGestures, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventGestures);
      document.removeEventListener('touchmove', preventGestures);
      document.removeEventListener('touchend', preventGestures);
    };
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ViewModeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
           <Header />
           <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-lg">Loading...</div></div>}>
             <Routes>
               <Route path="/" element={<Index />} />
               <Route path="/vehicle/:id" element={<VehicleDetail />} />
               <Route path="/presentation" element={<Presentation />} />
               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
               <Route path="*" element={<NotFound />} />
             </Routes>
           </Suspense>
         </BrowserRouter>
       </ViewModeProvider>
     </TooltipProvider>
   </QueryClientProvider>
  );
};

export default App;
