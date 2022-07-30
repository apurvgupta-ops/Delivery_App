import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './Common/Header'
import { CreateItem, MainContainer } from './Components'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className='w-screen h-auto flex flex-col bg-white'>
        <Header />
        <main className='mt-10 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateItem />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App