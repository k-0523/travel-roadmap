import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import TopPage from "./pages/Top";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import ProfilePage from "./pages/profile/Profile";
import UpdateProfile from "./pages/profile/UpdateProfile";
import CreateContentDetailPage from "./pages/content_detail/create/Content";
import ViewContentDetailPage from "./pages/content_detail/view/Content";
import EditContentDetailPage from "./pages/content_detail/edit/Content";
import ContentPage from "./pages/content/Content";
import SearchedContentPage from "./pages/content/SearchedContent";
import CommentPage from "./pages/comment/Comment";
import ViewHistoryPage from "./pages/view_history/ViewHistory";
import { useAuth } from "./hooks/AuthContext";
import Confirmation from "./pages/auth/Confirmation";
import ConfirmationEmail from "./pages/auth/ConfirmationEmail";
import UpdatePassword from "./pages/profile/UpdatePassword";
import ProfileInfo from "./pages/profile/ProfileInfo";
import UpdateUserName from "./pages/profile/UpdateUserName";
import UpdateEmail from "./pages/profile/UpdateEmail";
import PasswordRemind from "./pages/auth/PasswordRemind";
import PasswordConfirm from "./pages/auth/PasswordConfirm";

const Router: React.VFC = () => {
  const { isAuth } = useAuth();
  // 未ログイン時のみ遷移可能
  const PubilcRoute = () => {
    return !isAuth ? <Outlet /> : <Navigate to="/content/list" />;
  };
  // ログイン時のみ遷移可能
  const PrivateRoute = () => {
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PubilcRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/confirmation/:uuid" element={<Confirmation />} />
          <Route path="/confirmation/email/:uuid" element={<ConfirmationEmail />} />
          <Route path="reminder" element={<PasswordRemind />} />
          <Route path="/confirmation/password/:uuId" element={<PasswordConfirm />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/content-detail/create" element={<CreateContentDetailPage />} />
          <Route path="/content-detail/view" element={<ViewContentDetailPage />} />
          <Route path="/content-detail/edit" element={<EditContentDetailPage />} />
          <Route path="/content/list" element={<ContentPage />} />
          <Route path="/content/search" element={<SearchedContentPage />} />
          <Route path="/comment/list" element={<CommentPage />} />
          <Route path="/view-history/list" element={<ViewHistoryPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/profile/info" element={<ProfileInfo />} />
          <Route path="/profile/update/password" element={<UpdatePassword />} />
          <Route path="/profile/update/username" element={<UpdateUserName />} />
          <Route path="/profile/update/email" element={<UpdateEmail />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
