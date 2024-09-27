import React from 'react'
import myLogo from '../assets/logo.png';
import {Routes,Route, Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isFinishedPage = location.pathname === '/completed';

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto '>
      <div className='w-full text-3xl font-bold text-[#1A2F4F] flex items-center'>
        <button className='flex-initial w-64'>
          <Link to='/'>
            <div className='flex items-center'>
              <img src={myLogo} className='h-14 w-auto mt-2 block px-2' width={55} height={55} />
              <div>CareerStudio</div>
            </div>
          </Link>
        </button>
      </div>
      {isHomePage && (
        <ul className='flex'>
          <li className='p-4'>
            <button className='inline-flex items-center px-6 py-2 font-semibold rounded-full shadow-md text-white bg-[#1A2F4F] hover:bg-[#1A2F4F]-700 hover:scale-105 transition duration-300 ease-in-out w-[100px]'>
              <Link to='/Login'>
                Sign in
              </Link>
            </button>
          </li>
        </ul>
      )}
      {isFinishedPage && (
        <ul className='flex'>
          <li className='p-4'>
            <button className='inline-flex items-center px-6 py-2 font-semibold rounded-full shadow-md text-white bg-[#1A2F4F] hover:bg-[#1A2F4F]-700 hover:scale-105 transition duration-300 ease-in-out w-[100px]'>
              <Link to='/upload'>
                Restart
              </Link>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};



  
  

export default NavBar;