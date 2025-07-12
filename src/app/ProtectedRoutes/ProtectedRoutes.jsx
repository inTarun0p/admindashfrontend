"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const publicPaths = ['/login', '/register'];

function ProtectedRoutes({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = localStorage.getItem('isLogin') === 'true';
        
        // If not authenticated and not on a public path, redirect to login
        if (!isAuthenticated && !publicPaths.includes(pathname)) {
          router.push('/login');
          return;
        }

        // If authenticated and on a public path, redirect to dashboard
        if (isAuthenticated && publicPaths.includes(pathname)) {
          router.push('/Overview');
          return;
        }

        // If we made it here, authentication is successful
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
        if (!publicPaths.includes(pathname)) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoutes;