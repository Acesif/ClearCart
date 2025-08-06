import {
    LogIn,
    Package,
    PackageSearch,
    UserPlus,
} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {Button} from "@/components/ui/button";
import {navigationMenuTriggerStyle} from "@/lib/navigationMenuTriggerStyle.ts";
import {extractUserInformation, handleLogout} from "@/lib/token";
import {useEffect, useState} from "react";
import type {UserInformation} from "@/types/UserInformation";
import {Link} from "react-router-dom";
import ListItem from "@/components/commons/ListItem";
import Header from "@/components/commons/Header";

export function Navbar() {

    const [session, setSession] = useState<UserInformation | null>(null);

    useEffect(() => {
        const userInformation: UserInformation | null = extractUserInformation();
        setSession(userInformation);
    }, [setSession]);

    return (
        <div className="flex items-center">
            <Header />
            <NavigationMenu>
                <NavigationMenuList className="gap-5">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <Button variant="ghost" color="primary">
                                <div className="flex items-center justify-center gap-2">
                                    <PackageSearch />
                                    <Link to="/browse/all">
                                        Discover
                                    </Link>
                                </div>
                            </Button>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                <ListItem href="/browse/all" title="Browse All">
                                    Discover all the products available in the marketplace.
                                </ListItem>
                                <ListItem href="/browse/ELC" title="Electronics">
                                    Find the latest gadgets and electronics.
                                </ListItem>
                                <ListItem href="/browse/FNT" title="Furniture">
                                    Furnish your home with our wide selection.
                                </ListItem>
                                <ListItem href="/browse/HAP" title="Home Appliances">
                                    Upgrade your home with modern appliances.
                                </ListItem>
                                <ListItem href="/browse/SPG" title="Sporting Goods">
                                    Gear up with our sports equipment and accessories.
                                </ListItem>
                                <ListItem href="/browse/OTD" title="Outdoor">
                                    Explore outdoor gear and equipment for your next adventure.
                                </ListItem>
                                <ListItem href="/browse/TOY" title="Toys">
                                    Fun and educational toys for all ages.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Button variant="ghost" color="primary">
                                <Link to="/myproducts" className="flex items-center justify-center gap-2">
                                    <Package />
                                    My Products
                                </Link>
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {session == null ? (
                        <>
                            <div id="auth" className="flex items-center gap-5 ml-10">
                                <div>
                                    <Link to="/login" className="flex items-center cursor-pointer">
                                        <Button variant="ghost" className="cursor-pointer">
                                            <LogIn/>
                                            Login
                                        </Button>
                                    </Link>
                                </div>

                                <div>
                                    <Link to="/signup" className="flex items-center">
                                        <Button variant="ghost" className="bg-blue-400 text-gray-100 cursor-pointer">
                                            <UserPlus/>
                                            Signup
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-5">
                            <Button
                                variant="outline"
                                className="bg-amber-50 cursor-pointer"
                            >
                                <Link to="/me">
                                    My Account
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-red-400 cursor-pointer text-white hover:text-red-400"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

