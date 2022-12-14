import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabase/supabase';
import LinkForm from "../components/Links/LinkForm";
import Logout from "../components/Global/Logout";
import Title from '../components/Global/Title'

import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyLinks from '../components/Links/MyLinks';

function Links({refreshUser, user}) {

  const [links, setLinks] = useState([]);
  const [watchTriggerRefreshLinks, setTriggerRefreshLinks] = useState(0);
  const triggerRefreshLinks = () => setTriggerRefreshLinks(watchTriggerRefreshLinks + 1);

  useEffect(() => {
    console.log(user)

    supabase
      .from('links')
      .select()
      .eq('user_id', user.id)
      .then(({data, error}) => {
        if (error) {
          console.log(error)
          setLinks([]);
        } else {
          setLinks(data);
        }
      })
  }, [user, watchTriggerRefreshLinks])

  const myLinksRef = useRef(null);


  return (
    <div className="bg-dark">
      <div className="
        container mx-auto h-screen
        flex flex-col justify-center">

        <div className="w-full">
          <Title/>
        </div>
        <div className="basis-1/2 w-full px-10">
          <LinkForm user={user} triggerRefreshLinks={triggerRefreshLinks}/>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-10 mb-4 text-center">
          <button className="text-dark-300 hover:text-dark-100 outline-none animate-bounce"
            onClick={(e) => {
              e.preventDefault()
              myLinksRef.current.scrollIntoView({behavior: "smooth"});
            }}>
            <FontAwesomeIcon icon={faSortDown} className="text-4xl"/>
          </button>
        </div>
      </div>

      <span ref={myLinksRef}></span>
      <MyLinks user={user} links={links} triggerRefreshLinks={triggerRefreshLinks}/>
      <Logout refreshUser={refreshUser}/>

    </div>

  )
}

export default Links
