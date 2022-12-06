import React from 'react'
import { supabase } from '../../supabase/supabase';

function Logout({refreshUser}) {
  return (
    <div className="fixed bottom-0 right-0 p-4">
      <button className="text-dark-300 hover:text-dark-100" 
      onClick={
        (e) => {
          e.preventDefault();
          supabase.auth.signOut().then(() => refreshUser())
        }
      }>Logout</button>
    </div>
  )
}

export default Logout
