import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useCart } from "../Contexts/CartContext";

export const Success = () => {
    const { clearCart } = useCart();
  
    useEffect(() => {
      clearCart();
    }, []);
  
    return (
      <div className="success-bg text-white p-24 mt-20">
        <div className="shopping-cart-container max-w-4xl mx-auto">
          <div className="glass p-4 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center my-10">Tack för ditt köp!</h1>
            <p className="text-xl text-center">Vårt bokningssystem är under uppbyggnad. Ring 072-0012-367 för bokning!</p>
            <div className="text-center mt-10 mb-4">
              <Link to="/contact" className="text-white text-l success-btn rounded-lg p-4 transition duration-300 ease-in-out">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  