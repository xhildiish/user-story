import React, { useEffect, useState } from 'react'
import User, { UserProps } from './User';


const Profile = () => {
    const bool = true;

    // We know that the data coming back from the API is correct.
    // And we know that the data is being set into this state correctly.
    const [user, setUser] =  useState<UserProps | undefined>(undefined);

    useEffect ( () => {
        const getUserInfo = () => { 
            // fetch( "http://localhost:3006/user/profile/api", { // LINUX
             fetch( "http://127.0.0.1:3006/user/profile/api", { // WINDOWS
           // fetch("http://userstory-backend-node:3006/user/profile/api", { // DOCKER
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": `${bool}`
                },
            }).then((res) => {
                if(res.status ===200) return res.json()
                throw new Error ('Authentication has been failed')
            }).then((data) => {
                setUser(data)
            })            
            .catch((err) => {
                console.log(err)
            })
        }
        getUserInfo()
    }, []
    )



  return (
    <div>
      <User {...user} />
    </div>
  )
}

export default Profile;
