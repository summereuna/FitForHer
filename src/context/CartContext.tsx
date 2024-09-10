import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface Item {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  price: number;
  size: string;
  size_quantity: number;
}

interface CartContextProps {
  cartItems: Item[];
  addCartItem: (newItem: Item) => void;
  updateCartItem: (newItem: Item) => void;
  deleteCartItem: (productId: string, size: string) => void;
  clearCart: () => void;
  isInitializedLocalCart: boolean;
  // isCartOpen: boolean;
  // setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  // closeCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);

  // const closeCart = useCallback(() => {
  //   setIsCartOpen(false);
  // }, []);

  const [cartItems, setCartItems] = useState<Item[]>([]);

  //이미 카트에 포함된 상품인지 검증 (아이디 + 같은 사이즈 있는지 확인)
  const isExistItem = (newItem: Item) => {
    return cartItems.find(
      (item) => item.id === newItem.id && item.size === newItem.size
    );
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("CART");
  }, []);

  //아이디 + 사이즈 같은 상품 제거
  const deleteCartItem = (productId: string, size: string) => {
    const newCart = cartItems.filter(
      (item) => !(item.id === productId && item.size === size)
    );
    setCartItems(newCart);
    localStorage.setItem("CART", JSON.stringify(newCart));
  };

  //아이디 + 사이즈 같은 상품이면 수량 변경
  const updateCartItem = (newItem: Item) => {
    const updateItemQuantity = cartItems.map((item) =>
      item.id === newItem.id && item.size === newItem.size
        ? { ...item, size_quantity: newItem.size_quantity }
        : item
    );
    setCartItems(updateItemQuantity);
    localStorage.setItem("CART", JSON.stringify(updateItemQuantity));
  };

  //상품 추가
  const addCartItem = (newItem: Item) => {
    // 아이디, 사이즈 같은 상품 이미 있는지 검증
    if (isExistItem(newItem)) {
      //있으면 수량 업데이트
      const updateItemQuantity = cartItems.map((item) =>
        item.id === newItem.id && item.size === newItem.size
          ? {
              ...item,
              size_quantity: item.size_quantity + newItem.size_quantity,
            }
          : item
      );
      setCartItems(updateItemQuantity);
      localStorage.setItem("CART", JSON.stringify(updateItemQuantity));
    } else {
      //없으면 추가
      setCartItems((prevState) => {
        const updatedCartItems = [...prevState, newItem];
        localStorage.setItem("CART", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
    }
  };

  const [isInitializedLocalCart, setIsInitializedLocalCart] = useState(false);

  const initCart = useCallback(() => {
    const savedCart = localStorage.getItem("CART");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsInitializedLocalCart(true); // 초기화 완료
  }, []);

  useEffect(() => {
    //카트 로컬스토리지에서 가져와서 초기화
    initCart();
  }, [initCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        updateCartItem,
        deleteCartItem,
        clearCart,
        isInitializedLocalCart,
        // isCartOpen,
        // setIsCartOpen,
        // closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
