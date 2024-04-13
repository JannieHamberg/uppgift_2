import { useCart } from "../Contexts/CartContext";

export const ShoppingCart = () => {
    const { cart, removeFromCart, updateQuantity, calculateTotal } = useCart();

/*     const handleSaveOrder = async (stripeSessionId: string) => {
        // This is where you prepare the order data to be sent to your backend
        const orderData = {
            items: cart.map(item => ({
                id: item.product.id,
                price_id: item.product.default_price.id,
                quantity: item.quantity
            })),
            stripeSessionId: stripeSessionId,
            // Include any other information you need for the order
        };

        try {
            const response = await fetch('http://localhost:3001/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

           
            const responseData = await response.json();
            console.log(responseData.message); 
        } catch (error) {
            console.error('There was a problem saving the order:', error);
        }
    }; */

    const handleCheckout = async () => {
        try {
            const products = cart.map((item) => ({
                product: item.product.default_price.id,
                quantity: item.quantity,
            }));

            const response = await fetch('http://localhost:3001/api/checkout/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ cart: products }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const sessionData = await response.json();
            console.log(sessionData);
            localStorage.setItem('session_id', sessionData.session_id);

            /* handleSaveOrder(sessionData.session_id); */

            window.location.href = sessionData.url;
        } catch (error) {
            console.error('There was a problem with the checkout operation:', error);
        }
    };
  
  
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
            <button onClick={handleCheckout} className="checkout-btn text-white w-full py-2 rounded-lg">Checkout</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
