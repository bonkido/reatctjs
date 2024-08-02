import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs'

const Navbar = () => {
  // thời gian tự chạy
  const [time , setTime] = useState(dayjs().format('HH:mm:ss'))
  useEffect(()=>{
    const timer = setInterval(() => {
      setTime(dayjs().format('HH:mm:ss'))
    }, 1000);
    return () => clearInterval(timer)
  })
  // end thời gian tự chạy
  const [tabCount, setTabCount] = useState(1);

  useEffect(() => {
    const updateTabCount = () => {
      const tabs = JSON.parse(localStorage.getItem('tabs')) || [];
      setTabCount(tabs.length);
    };

    const handleTabChange = () => {
      const tabs = JSON.parse(localStorage.getItem('tabs')) || [];
      tabs.push('new tab');
      localStorage.setItem('tabs', JSON.stringify(tabs));
      updateTabCount();
    };

    const handleTabClose = () => {
      const tabs = JSON.parse(localStorage.getItem('tabs')) || [];
      tabs.pop();
      localStorage.setItem('tabs', JSON.stringify(tabs));
      updateTabCount();
    };

    window.addEventListener('storage', updateTabCount);
    window.addEventListener('beforeunload', handleTabClose);
    handleTabChange();

    return () => {
      window.removeEventListener('storage', updateTabCount);
      window.removeEventListener('beforeunload', handleTabClose);
      handleTabClose();
    };
  }, []);

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <span>
        <b>{tabCount}</b>
        <FontAwesomeIcon icon={faEye} />
      </span>
      <span><b>Thời gian </b>: {time}</span>
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
