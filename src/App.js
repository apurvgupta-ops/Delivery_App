import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './Common/Header'
import { CreateItem, MainContainer } from './Components'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className='w-screen h-auto flex flex-col'>
        <Header />
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/createItem' element={<CreateItem />} />
        </Routes>
      </div>
    </AnimatePresence>
  )
}

export default App