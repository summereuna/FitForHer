import BraCategorySection from "@/components/Home/BraCategorySection";
import CategorySection from "@/components/Home/CategorySection";
import { Separator } from "@/components/ui/separator";
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

  return (
    <div className="flex flex-col space-y-10">
      <section className="bg-gray-300 h-80"></section>
      <Separator />
      <CategorySection data/>
      <Separator />
      <BraCategorySection />
      <Separator />
      <CategorySection data/>
    </div>
  );
}
