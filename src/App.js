import './App.css';
import './post.css';
import Post from './post';
import React, { useEffect, useState } from "react";
import myimage from './735145cfe0a4.png';
import { db ,auth} from './firebase.js';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { makeStyles } from '@mui/styles'; 
import ImageUpload from './ImageUpload.js';
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    //backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    padding: '16px 32px 24px', 
   // boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const[user,setUser]=useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  
  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        posts: doc.data()
      })));
    });
  }, []);


  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
     return authUser.user.updateProfile({
        displayName: username
      });
    })
    .catch((error) => alert(error.message));

  }

  const signIn = (event) =>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  };
  return (
    <div className="app">
      
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
       <form className="app__signup">
         <center>
            <img
             className="app__headerImage"
            src={myimage}
             alt=""
            />
       </center>
     <Input 
      type="text" 
      placeholder="username" 
      value={username} 
      onChange={(e) =>setUsername(e.target.value)}
      />

      <Input 
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)} 
      />

     <Input
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     />

     <Button type="submit" onClick={signUp}>Sign Up</Button>
  
   </form>
    
    </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
       <form className="app__signup">
         <center>
            <img
             className="app__headerImage"
            src={myimage}
             alt=""
            />
       </center>
      
      <Input 
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)} 
      />

     <Input
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     />

     <Button type="submit" onClick={signIn}>Sign In</Button>
  
   </form>
    
    </div>
      </Modal>
      <div className="app__header">
      <img
             className="app__headerImage"
            src={myimage}
             alt=""
            />
       {user ? (
        
        <Button onClick={() => auth.signOut()}>Logout</Button>
   ) : (
     <div className="app__loginContainer">
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>          
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
        
        </div>
   )
   }
      </div>

      <div className="app__posts">
      <div className="app__postsLeft">
          {posts.map(({ id, posts }) => (
            <Post
              postId={id}
              user={user}
              key={id}
              username={posts.username}
              caption={posts.caption}
              imageUrl={posts.imageUrl}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url='https://www.instagram.com/p/Cxee7AJt-PF/'
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
     
      </div>

          {user && user.displayName ? (
            <ImageUpload username={user.displayName} />
        ) : (
          <h3>Sorry. You need to log in to upload.</h3>
      )}
   
    </div>
  );
}

export default App;
