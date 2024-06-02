import './App.css';
import myimage from './pngegg.png'
import Post from './post'

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage"
        src= {myimage} alt=""
        
       /> 
      </div>
      
     <Post/>   
     
    </div>
  );
}

export default App;
