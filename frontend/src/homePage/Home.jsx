import axios from 'axios';
import React,{useState, useEffect} from 'react';
import {TabNav} from '@radix-ui/themes'
import { Link } from "react-router-dom";

export default function Home(){

    const [home, setHome] = useState(null);

    useEffect(function(){
        const fetchHomeData = async function(){
           try {
            const response = await axios.get('http://localhost:3000/home');
            setHome(response.data);
           } catch (error) {
            console.log(`Error fetching data: ${error}`)
           }
        };
        fetchHomeData(); //call async function
    }, []);

   
    return(
        <>

        

  
      <TabNav.Root>
  <TabNav.Link href="#" active>
    Account
  </TabNav.Link>
  <TabNav.Link asChild>
          <Link to="/login">Login</Link>
        </TabNav.Link>
  <TabNav.Link href="/signup">Sign Up</TabNav.Link>
  
  </TabNav.Root>


   <h1>{home}</h1>


  
      
        </>
    );
}