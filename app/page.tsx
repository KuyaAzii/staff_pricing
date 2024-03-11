import dynamic from 'next/dynamic';
import RequireAuth from '../components/RequireAuth';

const Login = dynamic(() => import('../components/Login'), { ssr: false });

const Home = () => {
  const isAuthenticated = false; // Change this to true for authenticated users

  return (
    <RequireAuth isAuthenticated={isAuthenticated} redirectTo="/login">
      <div>
        <Login />
      </div>
    </RequireAuth>
  );
};

export default Home;
