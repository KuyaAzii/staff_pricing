// pages/index.tsx

import dynamic from 'next/dynamic';

// Import the Tailwind CSS for styling
import '../app/globals.css';

// Dynamically import the Login component
const Login = dynamic(() => import('./components/Login'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Login />
      </div>
    </main>
  );
}
