import './App.css';
import React from 'react';
import Users from "./components/users";
import AgeDemo from './components/ageDemo';


function App() {
  // console.log("hello from app.js");
  return (
    <div className="App">

        <Users/>
        <AgeDemo/>
    </div>
  );
}

export default App;


