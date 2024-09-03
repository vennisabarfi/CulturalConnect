
import { useState, useEffect } from 'react';
import './NavigationBar.css'

export default function NavigationBar(){
  //set active tab 
  const [activeTab, setActiveTab] = useState('');
  
  
useEffect(function(){
  const currentPath = window.location.pathname;
  setActiveTab(currentPath);
})

const getActiveClass = function(path){
  if (activeTab === path){
    return 'active'
  }
  return '';
}

const handleTabClick = function(path){
  setActiveTab(path);
}

// toggle menu for mobile devices
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('show');
}


    return(
      <>
     <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>

    <nav className='nav-bar'>
      <div className='hamburger' onClick={toggleMenu}>☰</div>
      <ul id="nav-menu">
      <li>
        <a 
      href="/"  
      onClick={() => handleTabClick('/')}
      className={getActiveClass('/')}>
        Home</a></li>
      <li>
      <a 
      href="/events"  
      onClick={() => handleTabClick('/events')}
      className={getActiveClass('/events')}>
      Events</a></li>

      <li>
      <a 
      href="/media"  
      onClick={() => handleTabClick('/media')}
      className={getActiveClass('/media')}>
      Media</a></li>

      <li id="drop-down">
       <a 
      href="/resources"  
      onClick={() => handleTabClick('/resources')}
      className={getActiveClass('/resources')}>
        Resources</a>
        {/* drop-down */}
        <ul id='drop-down-items'>
        <li><a href="#">Product 1</a></li>
        <li><a href="#">Product 2</a></li>
        <li><a href="#">Product 3</a></li>
        </ul>
        
        </li>

  

      <li>
      <a 
      href="/contribute"  
      onClick={() => handleTabClick('/contribute')}
      className={getActiveClass('/contribute')}>
        Contribute</a></li>
      </ul>
    </nav>
 
  

      </>

    );
}