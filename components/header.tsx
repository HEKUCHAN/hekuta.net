"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/libs/utils";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { RiBook3Line } from "react-icons/ri";
import { SiZenn, SiQiita } from "react-icons/si";

interface NavContentType {
  href: string;
  label: string;
  links?: {
    href: string;
    label: string;
    icon?: IconType;
  }[];
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header = () => {
  const [offset, setOffset] = React.useState();
  const navContent: NavContentType[] = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/works", label: "Works" },
    { href: "/contact", label: "Contact" },
    {
      href: "",
      label: "Blogs",
      links: [
        { href: "https://zenn.dev/hekuchandao", label: "Zenn", icon: SiZenn },
        { href: "https://qiita.com/hekuta", label: "Qiita", icon: SiQiita },
        {
          href: "https://docs.hekuta.net/",
          label: "VTA Python Books",
          icon: RiBook3Line,
        },
      ],
    },
  ];

  const navigationItems = navContent.map((nav) => {
    const menuItems = nav.links?.map((item) => (
      <ListItem key={item.href} title={item.label} href={item.href}>
        test
      </ListItem>
    ));

    if (menuItems) {
      return (
        <NavigationMenuItem key={nav.label}>
          <NavigationMenuTrigger>{nav.label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {menuItems}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={nav.label}>
        <Link href={nav.href} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {nav.label}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  });

  const navigation = (
    <NavigationMenu>
      <NavigationMenuList>{navigationItems}</NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="cotainer flex items-center h-14 max-w-[960px] m-auto">
        {navigation}
      </div>
    </header>
  );
};

export default Header;
