import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import useAuthGuard from "../../hooks/useAuthGuard";

export default function MainLayout() {
  useAuthGuard()

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
