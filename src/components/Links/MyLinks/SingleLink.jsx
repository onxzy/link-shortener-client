import React, { useState } from 'react'

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpin from '../../Global/LoadingSpin';
import { supabase } from '../../../supabase/supabase';

function SingleLink({id, short, dest, triggerRefreshLinks}) {

  const [loading, setLoading] = useState(false)

  function handleDelete() {
    setLoading(true)

    supabase.from('links').delete().eq('id', id)
      .then(({error}) => {
        if (error) {
          console.log(error)
        }
        triggerRefreshLinks()
        setLoading(false)
      })
  }

  return (
    <div className="w-full">
      <div className="flex flex-row items-center">
        <div className="basis-3/12 font-mono"><span className="text-dark-300">l.onxzy.dev/</span>{short}</div>
        <div className="basis-6/12 font-mono">{dest}</div>
        <div className="basis-1/12">-</div>
        <div className="basis-2/12 text-right">
          <button
            className="
              px-3 py-1 h-10 w-10 text-center inline-flex justify-center items-center
              border border-red rounded-md outline-none
              hover:bg-red-700
              focus:outline-red"
            onClick={handleDelete}>
            { loading ? <LoadingSpin/>  : <FontAwesomeIcon icon={faXmark}/>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleLink
