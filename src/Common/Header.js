import React from "react";
import Logo from '../img/logo.png'
import Profile from '../img/avatar.png'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { motion } from 'framer-motion'

import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="bg-gray-400 w-screen flex h-auto p-4 justify-between  ">
        <div className="cursor-pointer flex justify-center items-center font-bold gap-1 text-xl" onClick={() => navigate("/")}>
          <motion.img whileTap={{ scale: 0.6 }} src={Logo} alt="Logo" width={30} height={30} />City
        </div>
        <div>
          <ul className="flex justify-center items-center gap-3 cursor-pointer">
            <motion.li whileTap={{ scale: 0.9 }} className="cursor-pointer" >Home</motion.li>
            <motion.li whileTap={{ scale: 0.9 }} className="cursor-pointer">Menu</motion.li>
            <motion.li whileTap={{ scale: 0.9 }} className="cursor-pointer">AboutUs</motion.li>
            <motion.li whileTap={{ scale: 0.9 }} className="cursor-pointer">Services</motion.li>
            <BsFillCartCheckFill />
            <motion.img whileTap={{ scale: 0.6 }} src={Profile} alt="Profile" width={20} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
