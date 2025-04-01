import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";  // ✅ Correct import
import { Helmet } from "react-helmet-async";          // ✅ Correct import
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import Categories from "./components/Categories";
import SearchResults from "./components/SearchResults";
import AdminDashboard from "./components/AdminDashboard";
import AdminAuth from "./components/AdminAuth";
import AddBlog from "./components/AddBlog";
import ManageBlogs from "./components/ManageBlogs";
import ViewInsights from "./components/ViewInsights";
import AdminContacts from "./components/AdminContacts";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>The Viral Scroll</title>
          <meta
            name="description"
            content="Welcome to My Blog, where we share insightful articles on various topics."
          />
          <meta name="keywords" content="blog, articles, technology, lifestyle" />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="My Blog - Home" />
          <meta
            property="og:description"
            content="Welcome to My Blog, where we share insightful articles on various topics."
          />
          <meta property="og:image" content="path_to_image" />
          <meta property="og:url" content="https://theviralscroll.netlify.app" />
        </Helmet>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddBlog />} />
          <Route path="/admin/manage" element={<ManageBlogs />} />
          <Route path="/admin/insights" element={<ViewInsights />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
