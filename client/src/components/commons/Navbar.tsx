"use client"

import * as React from "react"
import {
    Handshake,
    LogIn, PackageSearch, ShoppingBag,
    ShoppingCart, Tag,
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
import {Button} from "@/components/ui/button.tsx";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu-trigger-style.ts";

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Browse Items */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
              <Button variant="ghost" color="primary">
                  <div className="flex items-center justify-center gap-2">
                      <PackageSearch />
                      Browse
                  </div>
              </Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/browse/all" title="All Items">
                View all available items for sale or rent.
              </ListItem>
              <ListItem href="/browse/electronics" title="Electronics">
                Find the latest gadgets and electronics.
              </ListItem>
              <ListItem href="/browse/furniture" title="Furniture">
                Furnish your home with our wide selection.
              </ListItem>
              <ListItem href="/browse/clothing" title="Clothing">
                Discover new trends in fashion.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Rent Items */}
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Button variant="ghost" color="primary">
                    <a href="/rent" className="flex items-center justify-center gap-2">
                        <Handshake />
                        Rent Items
                    </a>
                </Button>
            </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Sell Items */}
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Button variant="ghost" color="primary">
                    <a href="/sell" className="flex items-center justify-center gap-2">
                        <Tag />
                        Sell Items
                    </a>
                </Button>
            </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Buy Items */}
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Button variant="ghost" color="primary">
                    <a href="/buy" className="flex items-center justify-center gap-2">
                        <ShoppingBag />
                        Buy Items
                    </a>
                </Button>
            </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Shopping Cart */}
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <a href="/cart" className="flex items-center gap-2">
                    <ShoppingCart />
                </a>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <div id="auth" className="flex items-center gap-5 ml-10">
            <div>
                <a href="/login" className="flex items-center cursor-pointer">
                    <Button variant="ghost" className="cursor-pointer">
                        <LogIn />
                        Login
                    </Button>
                </a>
            </div>

            <div>
                <a href="/signup" className="flex items-center">
                    <Button variant="ghost" className="bg-blue-400 text-gray-100 cursor-pointer">
                        <UserPlus />
                        Signup
                    </Button>
                </a>
            </div>
        </div>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
