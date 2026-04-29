import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy loading page components
const Home = lazy(() => import("../pages/Home"));
const SinglePost = lazy(() => import("../pages/SinglePost/SinglePost"));
const AdminLogin = lazy(() => import("../pages/Admin/AdminLogin"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const AddPost = lazy(() => import("../pages/Admin/AddPost"));
const Categories = lazy(() => import("../pages/Admin/Categories"));
const ManagePosts = lazy(() => import("../pages/Admin/ManagePosts"));
const ManageSections = lazy(() => import("../pages/Admin/ManageSections"));

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1a1a1a', color: '#fff' }}>
    <h2>Loading Experience...</h2>
  </div>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;