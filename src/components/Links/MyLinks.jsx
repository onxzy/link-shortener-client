import SingleLink from './MyLinks/SingleLink';

function MyLinks({user, links, triggerRefreshLinks}) {

  return (
    <div className="
      container mx-auto py-20
      text-white text-opacity-70">
      <div className="w-full mb-5 font-semibold">
        <div className="flex flex-row items-center">
          <div className="basis-3/12">Lien</div>
          <div className="basis-6/12">Destination</div>
          <div className="basis-1/12">Utilisations</div>
          <div className="basis-2/12 text-right">Supprimer</div>
        </div>
      </div>
      { 
        links.length === 0
          ? <p className="my-3 text-center text-dark-300">Aucun lien</p>
          : links.map((link) => (
            <div>
              <SingleLink key={link.$id} id={link.$id} short={link.short} dest={link.dest} triggerRefreshLinks={triggerRefreshLinks} />
              <hr className="my-3 border-dark-300" />
            </div>
          ))
        
      }
    </div>
  )
}

export default MyLinks
