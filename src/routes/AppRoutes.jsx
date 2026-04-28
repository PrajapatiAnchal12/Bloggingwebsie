import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SinglePost from "../pages/SinglePost/SinglePost";
import AdminLogin from "../pages/Admin/AdminLogin";
import Dashboard from "../pages/Admin/Dashboard";
import AddPost from "../pages/Admin/AddPost";
import Categories from "../pages/Admin/Categories";
import ManagePosts from "../pages/Admin/ManagePosts";
import ManageSections from "../pages/Admin/ManageSections";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add-post" element={<AddPost />} />
        <Route path="/admin/edit-post/:id" element={<AddPost />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/sections" element={<ManageSections />} />
        <Route path="/admin/manage-posts" element={<ManagePosts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;