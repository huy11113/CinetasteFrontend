import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Browse from '../pages/Browse';
import RecipeDetail from '../pages/RecipeDetail';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import SceneToRecipe from '../pages/AIStudio';
import Community from '../pages/Community';
import SubmitRecipe from '../pages/SubmitRecipe';

export default function Router() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/scene-to-recipe" element={<SceneToRecipe />} />
            <Route path="/community" element={<Community />} />
            <Route path="/recipe/submit" element={<SubmitRecipe />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
