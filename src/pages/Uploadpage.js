import React, {useState} from 'react';
import App from '../App';
import Upload from '../components/Upload';
import NavBar from '../components/NavBar';

function Uploadpage() {
    return (
      <div>
      <NavBar/>
        <Upload/>   
      </div>
    );
  }

  export default Uploadpage;