import React, { useState } from 'react'


// export interface ReposProps {
//     avatar_url: string
//     name: string
//     watchers: string,
//     owner: string,
   
//   }

export interface ReposProps {
    repos: any[]
}

const Repos = (repos: Partial<ReposProps>) => { // Partial<ReposProps>) => {

    const bool = true;

const [starredRepos, setStarredRepos] = useState<ReposProps | undefined>(undefined)


const getUserRepos = () => {
    fetch ("http://localhost:3006/user/profile/api", {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": `${bool}`
        },
    }).then((res) => {
        // For some reason this is not getting called after the fetch to get the user profile.
        if(res.status ===200) return res.json()
        throw new Error('Authentication has been failed')

    }).then((data) => {
        setStarredRepos(data.repos)
    }).catch((err) => {
          console.log(err)
      })
}



  return (
    <div className='repos-page'>
    <button onClick={getUserRepos}>Get Repos</button>

    {starredRepos && <div className='repos-container'>
            {((starredRepos as unknown) as []).map((repos: any) => {
                return <div className='repos-card'>
                    <div className="owner">
                        <img src={repos.owner.avatar_url} alt="" />
                        <h3>Author: {repos.owner.login}</h3>
                    </div>
                    <p>Name: {repos.name}</p>
                    <h5>Views: {repos.watchers}</h5>
                </div>
            })}
        </div>}
</div>
  )
}

export default Repos;

