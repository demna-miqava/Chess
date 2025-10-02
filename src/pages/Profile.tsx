import { Outlet } from "react-router";

import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileTabs from "@/features/profile/components/ProfileTabs";

const Profile = () => {
  return (
    <div className="mx-auto max-w-8xl py-6 px-16 space-y-8">
      <ProfileHeader />
      <ProfileTabs />
      <main className="space-y-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;
