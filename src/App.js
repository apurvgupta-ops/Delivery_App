import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './Common/Header'
import { MainContainer } from './Components'

const App = () => {
  return (
    <div className='bg-red-300 h-screen flex justify-center items-center text-lg'>
      <Header />

      <Routes>
        <Route path='/' element={<MainContainer />} />
      </Routes>
    </div>
  )
}

export default App