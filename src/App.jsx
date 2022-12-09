import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabase";
import Home from "./page/Home";
import Links from "./page/Links";

// import queryString  from "query-string";

async function initSupabase(setLoading, setUser) {
  const _getUser = await supabase.auth.getUser()
  if (_getUser.error) setUser(null)
  else setUser(_getUser.data.user)
  setLoading(false)
}


function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);
  const [watchTriggerRefreshUser, setTriggerRefreshUser] = useState(0);
  const triggerRefreshUser = () => setTriggerRefreshUser(watchTriggerRefreshUser + 1);

  useEffect(() => {
    initSupabase(setLoading, setUser)
  }, [watchTriggerRefreshUser])
  

  return (
    <div className="text-white">

      {loading && (
        <div className="bg-dark">
          <div className="
            container mx-auto h-screen
            flex justify-center items-center">
            <div className="app-progress"></div>
          </div>
        </div>
      )}

      {!loading && (user
        ? <Links user={user} refreshUser={triggerRefreshUser}/>
        : <Home user={user} refreshUser={triggerRefreshUser}/>
      )}

    </div>
    
    
  );
}

export default App;
