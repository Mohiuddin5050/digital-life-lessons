// import React from 'react';
// import { Outlet } from 'react-router';
// import Navbar from '../pages/Shared/Navbar/Navbar';
// import Footer from '../pages/Shared/Footer/Footer';

// const RootLayout = () => {
//   return (
//     <div className=''>
//       <Navbar/>
//       <Outlet/>
//       <Footer/>
//     </div>
//   );
// };

// export default RootLayout;

import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
