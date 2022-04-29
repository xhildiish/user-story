
import Repos from './Repos'

export interface UserProps {
  img: string
  name: string
  bio: string
  repos: any[]
}


const   User =  (user: Partial<UserProps>) =>

{
  function logout() {
    localStorage.removeItem("repos");
  
    var repofromLocalStorage = localStorage.getItem('repos');
    if (!repofromLocalStorage) {
      return (
        //window.location.replace("http://localhost:3006/api/logout")); // LINUX
        window.location.replace("http://127.0.0.1:3006/api/logout")); // WINDOWS
        //window.location.replace("http://userstory-backend-node:3006/api/logout")); // DOCKER
    }
  
  }

  return (
    <div className='user-page'>
    <div className="user-card">
      <img src={user.img} alt="" />
      <div className="user-info">
        <h3>Name: {user.name}</h3>
        <h3>Bio: {user.bio}</h3>
      </div>
      <button onClick={() =>logout()}>Log Out</button>

      {/* I used this to call and api and logout but then I called the function above */}
      {/* <a href="http://localhost:3006/api/logout"><button>Log Out</button></a> */} {/* LINUX */}
      {/* <a href="http://127.0..1:3006/api/logout"><button>Log Out</button></a>  */}{/* WINDOWS */}
        {/* <a href="http://userstory-backend-node:3006/api/logout"><button>Log Out</button></a> */} {/* DOCKER */}
    </div>
    <Repos repos={user.repos} />
  </div>
  )

}



export default User
