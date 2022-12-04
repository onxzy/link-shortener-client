import { useEffect, useState } from "react";
import { account } from "./appwrite/appwrite";
import Home from "./page/Home";
import Links from "./page/Links";


function App() {

  const [user, setUser] = useState(null);
  const [watchTriggerRefreshUser, setTriggerRefreshUser] = useState(0);
  const triggerRefreshUser = () => setTriggerRefreshUser(watchTriggerRefreshUser + 1);

  useEffect(() => {
    account.get()
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => setUser(null));
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
