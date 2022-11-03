import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import TopNavbar from './components/TopNavbar';


function App() {
  return (
    <div className="App">
      <TopNavbar/>
      <h1>Hello Nat</h1>
      
    </div>
  );
}

export default App;
