// pages/index.tsx

import dynamic from 'next/dynamic';


import '../app/globals.css';
import Dashboard from '@/components/Dashboard';

const Login = dynamic(() => import('../components/Login'), { ssr: false });

export default function Home() {
  return (

      <div>
      </div>

  );
}
