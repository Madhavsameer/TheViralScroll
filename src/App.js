import { Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Categories from './components/Categories';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';

function App() {
  return (
    <div className="App">

      <Navbar/>
      

      
        <Routes>
        <Route path='/' element={<Home/>} /> 
          <Route path='/home' element={<Home/>} /> 
          <Route path='/about' element={<About/>} /> 
          <Route path='/categories' element={<Categories/>} /> 
          <Route path='/contact' element={<Contact/>} /> 
          <Route path='/blogs' element={<BlogList/>} />
          <Route path="/blog/:id" element={<BlogDetails />}  />
          
          


        </Routes>
        <Footer/>
     


     
 
    </div>
  );
}

export default App;
