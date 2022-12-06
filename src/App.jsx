import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabase";
import Home from "./page/Home";
import Links from "./page/Links";


function App() {

  const [user, setUser] = useState(null);
  const [watchTriggerRefreshUser, setTriggerRefreshUser] = useState(0);
  const triggerRefreshUser = () => setTriggerRefreshUser(watchTriggerRefreshUser + 1);

  useEffect(() => {
    supabase.auth.getUser()
      .then(({data, error}) => {
        if(error) {
          setUser(null)
        } else {
          setUser(data.user)
        }
      })
  }, [watchTriggerRefreshUser])
  

  return (
    <div className="text-white">

      {user
        ? <Links user={user} refreshUser={triggerRefreshUser}/>
        : <Home user={user} refreshUser={triggerRefreshUser}/>
      }

    </div>
    
    
  );
}

export default App;
