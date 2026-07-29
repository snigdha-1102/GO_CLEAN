import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard";
import ScanQR from "@/pages/ScanQR";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import MyReports from "@/pages/MyReports";
import AdminLogin from "@/pages/AdminLogin";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomBar from "./components/BottomBar";

import NotFound from "./pages/NotFound";

// Existing
import BinQRGenerator from "./components/BinQRGenerator";
import ReportDumping from "./components/ReportDumping";

// New UI Pages
import Hero from "./components/Hero";
import RecyclingIdeas from "./components/RecyclingIdeas";
import About from "./components/About";
import CommunityFeed from "@/pages/CommunityFeed";
import AddStory from "@/pages/AddStory";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* NAVBAR on all pages */}
        <Navbar />

        {/* Add bottom padding so content isn't hidden behind BottomBar */}
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Hero />} />

            {/* RECYCLING */}
            <Route path="/recycling" element={<RecyclingIdeas />} />

         
            {/* REPORT FORM (QR redirect) */}
            <Route path="/report" element={<ReportDumping />} />

            {/* ABOUT */}
            <Route path="/about" element={<About />} />

            {/* QR GENERATOR */}
            <Route path="/generate-qr" element={<BinQRGenerator />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/scan" element={<ScanQR />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/feed" element={<CommunityFeed />} />
            <Route path="/add-story" element={<AddStory />} />
          </Routes>

          {/* FOOTER */}
          <Footer />
        </div>

        {/* MOBILE BOTTOM BAR */}
        <BottomBar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
