import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../Context/AuthContext";

export default function Layout() {
  const { loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
