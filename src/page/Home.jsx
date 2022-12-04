import React, { useState } from 'react'
import Login from '../components/Home/Login'
import Register from '../components/Home/Register'
import Title from '../components/Global/Title'

function Home({user, refreshUser}) {
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  function toggleForm(show) {
    setShowRegisterForm(show);
  }

  return (
    <div className="bg-dark">
      <div className="
        container mx-auto h-screen
        flex flex-col justify-center">

        <div className="w-full">
          <Title/>
        </div>
        <div className="basis-1/2 w-full p-4">
          {showRegisterForm
            ? <Register toggleForm={toggleForm} refreshUser={refreshUser}/>
            : <Login toggleForm={toggleForm} refreshUser={refreshUser}/>
          } 
        </div>
      </div>
    </div>
  )
}

export default Home
