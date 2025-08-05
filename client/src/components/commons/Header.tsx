import { ShoppingCart } from "lucide-react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <Link to="/" className="absolute left-0 ml-20 ">
            <div className="flex items-center gap-5">
                <ShoppingCart />
                <h1 className="text-xl">
                    Clear
                    <span className="text-blue-400">
                        Cart
                    </span>
                </h1>
            </div>
        </Link>
    );
};
export default Header;
