

import Repos from './Repos'

export interface UserProps {
  img: string
  name: string
  bio: string
  repos: any[]
}

const User = (user: Partial<UserProps>) =>
  <div className='user-page'>
    <div className="user-card">
      <img src={user.img} alt="" />
      <div className="user-info">
        <h3>Name: {user.name}</h3>
        <p>Bio: {user.bio}</p>
      </div>
      <a href="http://localhost:3006/api/logout"><button>Log Out</button></a>
    </div>
    <Repos repos={user.repos} />
  </div>

export default User
