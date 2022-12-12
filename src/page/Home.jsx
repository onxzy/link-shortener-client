import React, { useState } from 'react'
import Login from '../components/Home/Login'
import Register from '../components/Home/Register'
import Title from '../components/Global/Title'
import { supabase } from '../supabase/supabase'

function Home({user, refreshUser}) {
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  function toggleForm(show) {
    setShowRegisterForm(show);
  }

  async function signInWithGoogle() {

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      // options: {redirectTo: 'https://links.onxzy.dev/'}
    })
  
    console.log(data)
    console.log(error)
  }
  

  return (
    <div className="bg-dark">
      <div className="
        container mx-auto h-screen
        flex flex-col justify-center">

        <div className="w-full">
          <Title/>
        </div>

        <div className="basis-1/2 w-full px-10">

          <button 
            className="
              mt-8 w-full max-w-md mx-auto mb-8
              px-3 py-3 flex justify-center items-center
              bg-white text-dark
              rounded-md outline-none
              hover:opacity-80
              focus:outline-[#4285F4]"
            onClick={
              (e) => {
                e.preventDefault()
                signInWithGoogle()
              }
            }>
            <img src="google_logo.svg" className="mr-2 h-8"/> Sign in with Google
          </button>

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
