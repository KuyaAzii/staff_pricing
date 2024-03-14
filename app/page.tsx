import dynamic from 'next/dynamic';
const Login = dynamic(() => import('../components/Login'), { ssr: false });

const Home = () => {
  

  return (

    <div>
      <Login />
    </div>

  );
};

export default Home;
