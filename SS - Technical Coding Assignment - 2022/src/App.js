
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Mainpage from './Components/Mainpage';
function App() {
  useEffect(() => {
    console.log = () => { }
  },[])
  return (
    <div className="App">
      <Mainpage />
    </div>
  );
}

export default App;
