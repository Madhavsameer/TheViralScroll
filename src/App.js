import { Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Categories from './components/Categories';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">

      <Navbar/>
      

      
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/home' element={<Home/>} /> 
          <Route path='/about' element={<About/>} /> 
          <Route path='/categories' element={<Categories/>} /> 
          <Route path='/contact' element={<Contact/>} /> 
          
          


        </Routes>
        <Footer/>
     


     
 
    </div>
  );
}

export default App;
