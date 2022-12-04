import React from 'react'
import { account } from '../../appwrite/appwrite';

function Logout({refreshUser}) {
  return (
    <div className="fixed bottom-0 right-0 p-4">
      <button className="text-dark-300 hover:text-dark-100" 
      onClick={
        (e) => {
          e.preventDefault();
          account.deleteSessions()
            .then(() => refreshUser())
        }
      }>Logout</button>
    </div>
  )
}

export default Logout
