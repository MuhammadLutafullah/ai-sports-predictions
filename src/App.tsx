import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import GameDetails from "./pages/GameDetails";
import Teams from "./pages/Teams";
import Performance from "./pages/Performance";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import NFL from "./pages/NFL";
import NBA from "./pages/NBA";
import NCAAF from "./pages/NCAAF";
import NCAAB from "./pages/NCAAB";
import WNBA from "./pages/WNBA";
import CustomDashboard from "./components/CustomDashboard";
import CustomDashboardPage from "./pages/CustomDashboardPage";
import NFLWeatherPage from "./pages/NFLWeatherPage";
import NBAWeatherPage from "./pages/NBAWeatherPage";
import NCAAFWeatherPage from "./pages/NCAAFWeatherPage";
import NCAABWeatherPage from "./pages/NCAABWeatherPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/performance"
            element={
              <ProtectedRoute>
                <Performance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/:id"
            element={
              <ProtectedRoute>
                <GameDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/nfl"
            element={
              <ProtectedRoute>
                <NFL />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/nba"
            element={
              <ProtectedRoute>
                <NBA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/ncaaf"
            element={
              <ProtectedRoute>
                <NCAAF />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/ncaab"
            element={
              <ProtectedRoute>
                <NCAAB />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/wnba"
            element={
              <ProtectedRoute>
                <WNBA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CustomDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nfl-weather"
            element={
              <ProtectedRoute>
                <NFLWeatherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nba-weather"
            element={
              <ProtectedRoute>
                <NBAWeatherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ncaaf-weather"
            element={
              <ProtectedRoute>
                <NCAAFWeatherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ncaab-weather"
            element={
              <ProtectedRoute>
                <NCAABWeatherPage />
              </ProtectedRoute>
            }
          />
          {/* Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
