import React from 'react'
import post1 from './post1.png'
import './post.css';
function post() {
  return (
    <div>
        <h3>Username</h3>
        {/*header- */}
        {/*image*/}

        <div class="instagram-post">
        <img src={post1} alt=""/>
        </div>

        <div class="post-details">
        <div class="user-info">
           
            <p class="username">username</p>
        </div>
        <p class="caption">Caption goes here...</p>
        <p class="likes">100 likes</p>
    </div>

        {/**user name+caaption/ */}
    <h4>Username : caption </h4>
    </div>
  )
}

export default post