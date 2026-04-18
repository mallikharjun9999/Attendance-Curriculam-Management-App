import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import Dashboard from "@/pages/Dashboard";
import ActivityList from "@/pages/ActivityList";
import JoinedActivities from "@/pages/JoinedActivities";
import StudentsList from "@/pages/StudentsList";
import MarkAttendance from "@/pages/MarkAttendance";
import ClassAttendance from "@/pages/ClassAttendance";
import CreateActivity from "@/pages/CreateActivity";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const TeacherRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (user?.role !== 'teacher') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance/mark" element={<TeacherRoute><MarkAttendance /></TeacherRoute>} />
        <Route path="/attendance/class" element={<TeacherRoute><ClassAttendance /></TeacherRoute>} />
        <Route path="/activities" element={<ActivityList />} />
        <Route path="/activities/create" element={<TeacherRoute><CreateActivity /></TeacherRoute>} />
        <Route path="/activities/joined" element={<JoinedActivities />} />
        <Route path="/students" element={<TeacherRoute><StudentsList /></TeacherRoute>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
