import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { userRole, isSessionLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSessionLoading && userRole === "seller") {
      navigate("/dashboard");
    }
  }, [isSessionLoading, userRole, navigate]);

  return <div>Home</div>;
}
