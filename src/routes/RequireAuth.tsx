import { Navigate, Outlet } from "react-router-dom";
import loadingGif from "../assets/loading.gif";
import { useAuthContext } from "../stores/AuthContext";
import { Center } from "../share/components";

export function RequireAuth() {
  const { user, loading } = useAuthContext();

  if (loading)
    return (
      <Center>
        <img className="w-[150px]" src={loadingGif} alt="" />
      </Center>
    );

  if (!user) return <Navigate replace to={"/login"} />;

  if (user.role !== "ADMIN") return <Navigate replace to={"/login"} />;

  return <Outlet />;
}
