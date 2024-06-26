//import post1 from './327422.jpg'
//import useravatar from './user-avatar.png'

import React,{ useState,useEffect } from 'react';
import {db } from "./firebase.js";
import Avatar from '@mui/material/Avatar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import './post.css';

function Posts({postId,user,username,caption,imageUrl}) {
  const[comments,setComments] =useState([]);
  const[comment,setComment]=useState('');
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  };

  return (
    <div className="post">
       
        <div className="post__header">
        <Avatar className="post__avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <h3>{username}</h3>
        </div>

        <img className="post__image"src={imageUrl}
         alt=""></img>
        
        <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
        <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
        
    </div>
  )
}

export default Posts