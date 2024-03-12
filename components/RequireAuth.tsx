"use client"
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface RequireAuthProps {
  isAuthenticated: boolean;
  redirectTo: string;
  children: ReactNode; 
}
const RequireAuth: React.FC<RequireAuthProps> = ({ isAuthenticated, redirectTo, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo); 
    }
  }, [isAuthenticated, redirectTo]);

  return <>{isAuthenticated && children}</>;
};

export default RequireAuth;
