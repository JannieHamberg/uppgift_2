import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';
import { BsCart2 } from 'react-icons/bs';
import { CgCloseO, CgMenuRight } from 'react-icons/cg';

export const NavBar: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 glass">
        <div className="flex justify-between items-center px-4 py-2">
            <img src="../../src/assets/chicchateau_final_logo.png" alt="logo" className="h-24" />
            <button onClick={(event) => {
              event.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }} className="text-3xl">
                {isMenuOpen ? <CgCloseO /> : <CgMenuRight />}
            </button>
        </div>
        <div ref={menuRef} className={`backdrop-blur-xl absolute right-0  mt-1 w-[90%] sm:w-[400px] transition-all duration-300 ${isMenuOpen ? 'h-screen' : 'max-h-0'} overflow-hidden glass`}>
          <div className="flex flex-col items-start  p-5 text-2xl  ">
            <Link to="/" className="py-2 hover:text-pink-500">Home</Link>
            <Link to="/webshop" className="py-2 hover:text-pink-500">Products</Link>
            <Link to="/contact" className="py-2 hover:text-pink-500">Contact</Link>
            <div className="pt-2 flex items-center justify-between w-full">
                <Link to="/shoppingcart" className="flex items-center gap-2 hover:text-pink-500">
                    <BsCart2 size={24} />
                    <span>{cart.length}</span>
                </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
