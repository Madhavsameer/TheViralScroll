import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import Categories from './components/Categories';
import SearchResults from './components/SearchResults';
import AdminDashboard from './components/AdminDashboard';
import AdminAuth from './components/AdminAuth';
import AddBlog from './components/AddBlog';
import ManageBlogs from './components/ManageBlogs';
import ViewInsights from './components/ViewInsights';

function App() {
  return (
    
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} /> 
          <Route path='/about' element={<About/>} /> 
          <Route path='/contact' element={<Contact/>} /> 
          <Route path='/categories' element={<Categories/>} /> 
          <Route path='/blogs' element={<BlogList/>} />
          <Route path="/blog/:slug" element={<BlogDetails />}  />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/admin/manage-blogs" element={<ManageBlogs />} />
<Route path="/admin/insights" element={<ViewInsights />} />

        </Routes>
        <Footer/>
      </div>
    
  );
}

export default App;
