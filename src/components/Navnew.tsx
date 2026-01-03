"use client"

import * as React from "react" // Import React
import { FileText, CreditCard, Info, User, UserPlus, Sparkles } from "lucide-react"
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
    icon: Sparkles,
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
    url  : "/auth",
    icon : UserPlus,
  }
]

export function Navnew() {
  return <Navbar items={items} defaultActive="VeerAyojan" />
}

export default Navnew; 
