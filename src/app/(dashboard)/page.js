import ProtectedRoutes from '@/app/ProtectedRoutes/ProtectedRoutes'
import Dashboard from "./Overview/page";

export default function Home() {
  return (
    <>
    <ProtectedRoutes>
    <Dashboard/>
    </ProtectedRoutes>
    </>
  );
} 
