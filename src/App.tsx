import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// Protected
const Home = lazy(() => import("./pages/Home"));
const Settings = lazy(() => import("./pages/Settings"));
const Play = lazy(() => import("./pages/CreateGame"));
// Profile
const Profile = lazy(() => import("./pages/Profile"));
const ProfileStats = lazy(() => import("./pages/ProfileStats"));
const ProfileOverview = lazy(() => import("./pages/ProfileOverview"));
const ProfileGames = lazy(() => import("./pages/ProfileGames"));
const ProfileFriends = lazy(() => import("./pages/ProfileFriends"));
// Public
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const IntroPage = lazy(() => import("./pages/IntroPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const CurrentGame = lazy(() => import("./pages/CurrentGame"));
// Components
import AuthGuard from "./components/AuthGuard";
import { AppLayout } from "./components/AppLayout";
import { FullScreenLoader } from "./components/FullScreenLoader";

function App() {
  return (
    <AuthGuard>
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />}>
              <Route index element={<ProfileOverview />} />
              <Route path="games" element={<ProfileGames />} />
              <Route path="stats" element={<ProfileStats />} />
              <Route path="friends" element={<ProfileFriends />} />
            </Route>
            <Route path="/play" element={<Play />} />
            <Route path="/game/:gameId" element={<CurrentGame />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/" element={<IntroPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    </AuthGuard>
  );
}

export default App;
