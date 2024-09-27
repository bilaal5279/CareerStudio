import React from 'react';
import Finish from '../components/Finish';
import App from '../App';
import FinishProduct from '../components/FinishProduct';
import NavBar from '../components/NavBar';

function Finishedpage() {
    return (
      <div>
      <NavBar/>
        <Finish/> 
        <FinishProduct/>
      </div>
    );
  }

  export default Finishedpage;