import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const NavBar = () => {

    return (
        <div className="bg-gray-800 p-4">
           
            <div>
                <h3>Chic Chateau</h3>
                <Link to="/">Home</Link>
                <Link to="/">Products</Link>
                <Link to="/">Contact</Link>
                <BsCart2 />
            </div>
        </div>
    )
}