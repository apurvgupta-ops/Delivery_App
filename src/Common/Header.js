import React, { useState } from "react";
import Logo from '../img/logo.png'
import Profile from '../img/avatar.png'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { MdAdd, MdLogout } from 'react-icons/md'
import { motion } from 'framer-motion'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const Header = () => {
  const navigate = useNavigate()
  const [isMenu, setIsMenu] = useState(false)
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const [{ user }, dispatch] = useStateValue()
  console.log("11", user)

  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(auth, provider)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      })
      localStorage.setItem("user", JSON.stringify(providerData[0]))
    }
    else {
      setIsMenu(!isMenu)
    }
  }

  const Logout = () => {
    localStorage.clear()
  }
  return (
    <>
      <div className="flex bg-gray-400 w-screen h-auto p-4 justify-between  ">
        <div className="cursor-pointer flex justify-center items-center font-bold gap-1 text-xl" onClick={() => navigate("/")}>
          <motion.img whileTap={{ scale: 0.6 }} src={Logo} alt="Logo" width={30} height={30} />City
        </div>
        <div>
          <motion.ul className="flex justify-center items-center gap-4 cursor-pointer" initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }}>
            <motion.li whileTap={{ scale: 0.9 }} className="cursor-pointer" >Home</motion.li>
            <motion.li whileTap={{ scale: 0.9 }} className="cursor-pointer">Menu</motion.li>
            <motion.li whileTap={{ scale: 0.9 }} className="cursor-pointer">AboutUs</motion.li>
            <motion.li whileTap={{ scale: 0.9 }} className="cursor-pointer">Services</motion.li>
            <motion.div whileTap={{ scale: 0.6 }}>
              <BsFillCartCheckFill size={25} />
            </motion.div>
            <div onClick={login} className="relative">
              <motion.img whileTap={{ scale: 0.6 }} className="rounded-full" src={user ? user.photoURL : Profile} alt="Profile" width={30} />

              {
                isMenu && (
                  <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="bg-gray-200 w-40  absolute shadow-xl flex flex-col rounded-xl right-1">
                    {
                      user.email === "apurvgupta.124@gmail.com" && (
                        <p className="flex items-center gap-2 hover:bg-slate-300 rounded-lg px-3 py-2 transition-all duration-100 ease-in-out" onClick={() => navigate("/createItem")} >New Item <MdAdd size={20} /></p>
                      )
                    }
                    <p className="flex items-center gap-2 hover:bg-slate-300 rounded-lg px-3 py-2 transition-all duration-100 ease-in-out" onClick={Logout}>Logout <MdLogout /></p>
                  </motion.div>

                )
              }

            </div>
          </motion.ul>
        </div>
      </div>
    </>
  );
};

export default Header;
