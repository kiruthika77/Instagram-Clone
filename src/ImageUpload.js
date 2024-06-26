import React ,{useState} from 'react';
import Button from '@mui/material/Button';
import { storage,db } from "./firebase.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/functions';
//import 'firebase/compat/timeStamp';
import './ImageUpload.css';
function ImageUpload({username}) {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
  
    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = () => {
      console.log("Caption:", caption); 
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection('posts').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
              });
  
              setProgress(0);
              setCaption("");
              setImage(null);
            })
            .catch((error) => {
              console.error(error);
              alert(error.message);
            });
  
        }
      );
    };
  
 
  return (
    <div className= "imageupload">
    
      <progress className="imageupload_progress" value={progress} max="100"/>
      <input type="text" 
        placeholder='Enter a caption' 
        onChange={(event) => setCaption(event.target.value)} 
        value={caption}/>
      <input type="file" onChange={handleChange}/>
      <Button className="imageupload__button" onClick ={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;