import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

export interface Product {
    id: string,
    name: string,
    description: string,
    images: string[],
    default_price: {
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
}

const initialValue = {
    cart: [],
    addToCart: () => {}
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




    return (
        <CartContext.Provider value={{cart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider