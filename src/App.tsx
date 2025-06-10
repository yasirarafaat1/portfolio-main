import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/config";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

// Initialize auth state
const AuthInitializer = () => {
  useEffect(() => {
    // This helps initialize the auth state when the app loads
    supabase.auth.getSession();
  }, []);
  return null;
};

const AppContent = () => (
  <>
    <AuthInitializer />
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected Admin Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
