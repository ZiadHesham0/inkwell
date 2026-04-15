import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/components/Footer";
import Navbar from "./layout/components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import PostsForm from "./features/posts/components/PostsForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element = {<HomePage/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/Posts/:id" element={<PostsForm/>} />
        <Route />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
