"use client"

import * as React from "react" // Import React
import { FileText, CreditCard, Info, User, UserPlus } from "lucide-react"
import { Navbar } from "@/components/Animations/Navbar"

const items = [
  { 
    name : "VeerAyojan",
    url: "#",
    image: "/VeerAyojans-bgremoved.png",
  },
  {
    name: "Clubs",
    url: "#clubs",
    icon: FileText
  },
  {
    name: "Features",
    url: "#features",
    icon: CreditCard,
  },
  {
    name: "About",
    url: "#about",
    icon: Info,
  },
  {
    name: "Login",
    url  : "/auth",
    icon : User,
  },
  {
    name: "Get Started",
    url  : "",
    icon : UserPlus,
  }
]

export function Navnew() {
  return <Navbar items={items} defaultActive="VeerAyojan" />
}

export default Navnew; 
