
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import React from 'react';


function App() {

  return(
       <div className="App">

          <div className="container">

             <Navbar />

             <Main />

          </div>

       </div>
  )
}

export default App;