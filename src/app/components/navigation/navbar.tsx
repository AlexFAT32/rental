'use client'

import {Container} from "@/app/components/container";
import {Logo} from "@/app/components/navigation/logo";
import {Search} from "@/app/components/navigation/search";
import {UserMenu} from "@/app/components/navigation/user-menu";
import {SafeUser} from "@/app/types";
import {Categories} from "@/app/components/navigation/categories";

interface NavbarProps {
  currentUser?: SafeUser | null
}
export const Navbar = ({currentUser}: NavbarProps) => {
  console.log("currentUser", currentUser)
  return (
    <div className={"fixed, w-full bg-white z-10 shadow-sm"}>
      <div className="
        py-4
        border-b-[1px]
      ">
        <Container>
          <div className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0">
            <Logo  />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  )
}
