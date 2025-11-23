// App.tsx
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { BoardPage } from "../pages/BoardPage";
import { EditProfilePage } from "../pages/EditProfilePage";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/:type" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/edit-profile/:id" element={<EditProfilePage />} />
      </Route>
    </Routes>
  );
}
