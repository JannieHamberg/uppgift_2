import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

export interface Product {
    id: string,
    name: string,
    description: string,
    images: string[],
    default_price: {
        id: string,
        unit_amount: number
    }

}

interface CartItem {
    product: Product,
    quantity: number
}


interface ICartContext {
    cart: CartItem[],
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    calculateTotal: () => string
    clearCart: () => void
}

const initialValue = {
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    calculateTotal: () => '',
    clearCart: () => {}
}

const CartContext = createContext<ICartContext>(initialValue);
export const useCart = () => useContext(CartContext);

const CartProvider = ({children}: PropsWithChildren) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const lsData = localStorage.getItem('cart');
        return lsData ? JSON.parse(lsData) : [];
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product) => {
        const clonedCart = [...cart];
        const found = clonedCart.find((item) => item.product.id === product.id);
        
        if (found) {
            found.quantity ++
            setCart(clonedCart)
        } else {
            setCart([...clonedCart, {product, quantity: 1}])
        }
    }

    const removeFromCart = (productId: string) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCart(cart.map(item => {
            if (item.product.id === productId) {
                return { ...item, quantity: Math.max(1, quantity) }; 
            }
            return item;
        }));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => {
          return acc + (item.quantity * (item.product.default_price.unit_amount / 100));
        }, 0).toFixed(2);
      };

      const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
      }
      




    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity, calculateTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider