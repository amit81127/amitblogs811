
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/lib/authStore';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Access Denied",
        description: "You must be logged in to access this page.",
        variant: "destructive",
      });
    }
  }, [isLoggedIn, toast]);

  if (!isLoggedIn) {
    // Redirect to login page and remember where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
