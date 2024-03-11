import dynamic from 'next/dynamic';
import RequireAuth from '../components/RequireAuth';

const Login = dynamic(() => import('../components/Login'), { ssr: false });

const Home = () => {
  const isAuthenticated = false; 

  return (
    <RequireAuth isAuthenticated={isAuthenticated} redirectTo="/login">
      <div>
        <Login />
      </div>
    </RequireAuth>
  );
};

export default Home;
