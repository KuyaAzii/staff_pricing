"use client"
import { useRouter } from 'next/navigation'; // Use useRouter for client-side navigation
import { ReactNode, useEffect } from 'react';

interface RequireAuthProps {
  isAuthenticated: boolean;
  redirectTo: string;
  children: ReactNode; // Include the children prop
}

const RequireAuth: React.FC<RequireAuthProps> = ({ isAuthenticated, redirectTo, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo); // Use useRouter for navigation
    }
  }, [isAuthenticated, redirectTo]);

  return <>{isAuthenticated && children}</>;
};

export default RequireAuth;
