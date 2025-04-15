import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LoadingScreen from "../ui/LoadingScreen";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isLoginPage = router.pathname === "/admin/login";

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.push("/admin/login");
    } else if (isAuthenticated && isLoginPage) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, isLoginPage, router]);

  if ((!isAuthenticated && !isLoginPage) || (isAuthenticated && isLoginPage)) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
