import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';

export const NavBar = () => {
    const { cart } = useCart();
    return (
      <div className=" pr-10 navbar bg-white/30 backdrop-blur-md fixed top-0 left-0 w-full z-10 text-white">
        <div className="flex justify-between items-center w-full">
        <img src="../../src/assets/chicchateau_final_logo.png" alt="logo" className=" pl-7 h-32 w-auto object-contain"/>
          <div className="flex gap-4 text-2xl">
            <Link to="/">Home</Link>
            <Link to="/webshop">Products</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/shoppingcart" className='relative mt-1 font-bold'>
            <p className='absolute top-0 right-0 -mt-2 pl-1 pr-1 bg-white text-black rounded-full text-center text-sm'>{cart.length}</p>
                <BsCart2 />
                
            </Link>
            
          </div>
        </div>
      </div>
    );
  };
  
  