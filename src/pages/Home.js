import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Cards from '../components/Cards';
import App from '../App';


function Home() {
    return (
      <div>
        <NavBar/>
        <Hero/>
        <Cards/>
      </div>
    );
  }

  export default Home;