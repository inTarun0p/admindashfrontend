import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to /Overview by default
  redirect('/Overview');

  // This won't be rendered since we're redirecting
  return null;
}
