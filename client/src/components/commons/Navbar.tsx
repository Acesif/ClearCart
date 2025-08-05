import {
    Handshake,
    LogIn,
    PackageSearch,
    ShoppingBag,
    Tag,
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
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu-trigger-style";
import {extractUserInformation} from "@/lib/token";
import {useEffect, useState} from "react";
import type {UserInformation} from "@/types/UserInformation";
import {Link} from "react-router-dom";
import ListItem from "@/components/commons/ListItem";
import Header from "@/components/commons/Header";

export function Navbar() {

    const [session, setSession] = useState<UserInformation | null>(null);

    useEffect(() => {
        const userInformation: UserInformation | null = extractUserInformation();
        console.log(userInformation);
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
                                        Browse
                                    </Link>
                                </div>
                            </Button>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                <ListItem href="/browse/electronics" title="Electronics">
                                    Find the latest gadgets and electronics.
                                </ListItem>
                                <ListItem href="/browse/furniture" title="Furniture">
                                    Furnish your home with our wide selection.
                                </ListItem>
                                <ListItem href="/browse/home-appliances" title="Home Appliances">
                                    Upgrade your home with modern appliances.
                                </ListItem>
                                <ListItem href="/browse/sporting-goods" title="Sporting Goods">
                                    Gear up with our sports equipment and accessories.
                                </ListItem>
                                <ListItem href="/browse/outdoor" title="Outdoor">
                                    Explore outdoor gear and equipment for your next adventure.
                                </ListItem>
                                <ListItem href="/browse/toys" title="Toys">
                                    Fun and educational toys for all ages.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Button variant="ghost" color="primary">
                                <Link to="/rent" className="flex items-center justify-center gap-2">
                                    <Handshake />
                                    Rent Items
                                </Link>
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Button variant="ghost" color="primary">
                                <Link to="/sell" className="flex items-center justify-center gap-2">
                                    <Tag />
                                    Sell Items
                                </Link>
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Button variant="ghost" color="primary">
                                <Link to="/buy" className="flex items-center justify-center gap-2">
                                    <ShoppingBag />
                                    Buy Items
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
                        <div>
                            <Button
                                variant="outline"
                                className="bg-amber-50 cursor-pointer"
                            >
                                <Link to="/me">
                                    My Account
                                </Link>
                            </Button>
                        </div>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

