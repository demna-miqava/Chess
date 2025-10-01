import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <div>
      <h1>App Layout</h1>
      <Outlet />
    </div>
  );
};
