import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect root to dashboard page so the app opens at Dashboard by default
  redirect('/dashboard');
}
