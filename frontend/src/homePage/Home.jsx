import axios from 'axios';
import React,{useState, useEffect} from 'react';
import {Button, Flex} from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom';
import './home.css'




export default function Home(){

  const navigate = useNavigate();

  // routers for login and sign-up buttons
  const handleloginClick = function(){
    navigate('/login');
  }

  const handlesignupClick = function(){
    navigate('/sign-up');
  }

  return(
    <>
   
      
    <div className="home-section">
    <h2 className="home-logo">CultureConnect</h2>
    </div>
    <br/>

    <Flex align="center" justify="center" gap="3" direction="row">
    <Button  onClick={handleloginClick} variant="bold" className="home-button">Log In</Button>

    <Button onClick={handlesignupClick} variant="soft" className="home-button">Sign Up</Button>
    </Flex>

    

  
    {/* Add information for viewing stuff in a card below */}
  
 
    </> 
  )
}