import React from 'react'
 import { ReactComponent as GithubIcon } from "../svg/githubIcon.svg";

const Login = () => {
  return (
    <div className='login-page'>
    <div className="login-card">
        <div className="login-header">
            <h2>Welcome to GitHub Repository </h2>
            <p>Please Log In with your GitHub Credentials</p>
        </div>
        {/*<a href="http://localhost:3006/auth/github"><button>Login with GitHub <GithubIcon /></button></a> {/* LINUX */}
        <a href="http://127.0.0.1:3006/auth/github"><button>Login with GitHub <GithubIcon /></button></a> {/* WINDOWS */}
        {/*<a href="http://userstory-backend-node:3006/auth/github"><button>Login with GitHub <GithubIcon /></button></a>*/} {/* DOCKER */}
    </div>
</div>
  )
}

export default Login;
