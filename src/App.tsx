import { Route, Routes } from "react-router";
// Protected
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Play from "./pages/CreateGame";
// Profile
import Profile from "./pages/Profile";
import ProfileStats from "./pages/ProfileStats";
import ProfileOverview from "./pages/ProfileOverview";
import ProfileGames from "./pages/ProfileGames";
import ProfileFriends from "./pages/ProfileFriends";
// Public
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import IntroPage from "./pages/IntroPage";
import ForgotPassword from "./pages/ForgotPassword";
// Components
import ProtectedRoute from "./components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";

function App() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<ProfileOverview />} />
          <Route path="games" element={<ProfileGames />} />
          <Route path="stats" element={<ProfileStats />} />
          <Route path="friends" element={<ProfileFriends />} />
        </Route>
        <Route path="/play" element={<Play />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
