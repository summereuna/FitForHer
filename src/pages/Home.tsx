import { useCategoryProducts } from "@/api/mainApi";
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

  const {
    data: topProductsData,
    isPending: isPendingTop,
    isSuccess: isSuccessTop,
  } = useCategoryProducts("tops");

  const {
    data: pantsProductsData,
    isPending: isPendingPants,
    isSuccess: isSuccessPants,
  } = useCategoryProducts("pants");

  return (
    <div className="flex flex-col space-y-10">
      <section className="bg-gray-300 h-80"></section>
      <Separator />
      {isSuccessTop && topProductsData && (
        <CategorySection
          data={topProductsData}
          isPending={isPendingTop}
          isMainPage={true}
        />
      )}

      <Separator />
      <BraCategorySection />
      <Separator />
      {isSuccessPants && pantsProductsData && (
        <CategorySection
          data={pantsProductsData}
          isPending={isPendingPants}
          isMainPage={true}
        />
      )}
    </div>
  );
}
