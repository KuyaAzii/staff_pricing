import React from 'react';

const DashboardPage = () => {
  return (
    <div className="h-screen bg-cover bg-center" style={{backgroundImage: "url('/path/to/your/image.jpg')"}}>
      <div className="flex items-center justify-center h-full">
      <img
        src="/banner.jpg"
        alt="Banner"
        className="w-full h-full object-cover"
      />
      </div>
    </div>
  );
}

export default DashboardPage;
