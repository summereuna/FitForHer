import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
};
