// components/Login.tsx
"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const session = useSession()

useEffect(() => {
  if(session.status === 'authenticated'){
    router.push('/dashboard')
  }
}, [session])

  const handleLogin = async () => {
    console.log("TEST")
    setLoading(true);
    setError(null);

    try {
      const signInData = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });
      if (signInData?.error && signInData.status === 401) {
        throw new Error('Invalid Email or Password!');
      } router.push('/dashboard');
      setLoading(false);
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Unexpected error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login