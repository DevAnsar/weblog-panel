import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Provider } from "react-redux";

// application data store
import { store } from "./store";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import ListUsers from "./pages/users/Index";
import AddUsers from "./pages/users/Add";
import EditUsers from "./pages/users/Edit";
import Login from "./components/Auth/Login";
import ListCategories from "./pages/categories/Index";
import AddCategories from "./pages/categories/Add";
import EditCategories from "./pages/categories/Edit";
import ListTags from "./pages/tags/Index";
import AddTag from "./pages/tags/Add";
import EditTag from "./pages/tags/Edit";
import ListPosts from "./pages/posts/Index";
import AddPost from "./pages/posts/Add";
import EditPost from "./pages/posts/Edit";

/**
 * Create the main component
 *
 * @category core
 * @returns React component
 */
function App() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <div className={`flex min-h-screen w-full bg-slate-50`}>
        <Header />
        <Sidebar />
        <main
          className={`w-full px-5  mt-20 relative pt-10 ${
            location.pathname !== "/login" ? "lg:pr-60" : ""
          }`}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <ListUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users/add"
              element={
                <ProtectedRoute>
                  <AddUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users/edit/:id"
              element={
                <ProtectedRoute>
                  <EditUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <ListCategories />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories/add"
              element={
                <ProtectedRoute>
                  <AddCategories />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories/edit/:id"
              element={
                <ProtectedRoute>
                  <EditCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tags"
              element={
                <ProtectedRoute>
                  <ListTags />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tags/add"
              element={
                <ProtectedRoute>
                  <AddTag />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tags/edit/:id"
              element={
                <ProtectedRoute>
                  <EditTag />
                </ProtectedRoute>
              }
            />

            <Route
              path="/posts"
              element={
                <ProtectedRoute>
                  <ListPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/add"
              element={
                <ProtectedRoute>
                  <AddPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
            {/* 

          <Route
            path="/comments"
            element={
              <ProtectedRoute>
                <ListComments />
              </ProtectedRoute>
            }
          /> */}
          </Routes>
          <Footer />
        </main>
      </div>
    </Provider>
  );
}
export default App;
