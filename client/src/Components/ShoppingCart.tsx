
import { useCart } from '../Contexts/CartContext';

export const ShoppingCart = () => {
    const { cart, removeFromCart, updateQuantity, calculateTotal } = useCart();
  
    return (
        <div className='shoppingCart-bg text-white pb-20'>
      <div className="shoppingCart container mx-auto my-46">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between glass p-4 shadow-md mb-3 rounded-lg">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
                <div className='p-7'>
                  <h2 className="text-lg font-bold">{item.product.name}</h2>
                  <p className="text-white text-xl">{item.product.description}</p>
                </div>
                <div className="flex items-center p-10">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                </div>
                <span className="text-lg font-bold p-10">{(item.product.default_price.unit_amount / 100).toFixed(2)} SEK</span>
                <button onClick={() => removeFromCart(item.product.id)} className="text-white">Remove</button>
              </div>
            ))}
          </div>
          <div className="col-span-1 glass p-6 shadow-md rounded-lg  flex flex-col">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="mt-auto">
            <p className="mb-4 font-bold text-lg">Total: {calculateTotal()} SEK</p>
            <button className="checkout-btn text-white w-full py-2 rounded-lg">Checkout</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
