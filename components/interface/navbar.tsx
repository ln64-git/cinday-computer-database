"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar"
import {Button} from "@nextui-org/button"
import {Kbd} from "@nextui-org/kbd"
import {Link} from "@nextui-org/link"
import {Input} from "@nextui-org/input"

import {link as linkStyles} from "@nextui-org/theme"

import {siteConfig} from "@/config/site"
import NextLink from "next/link"
import clsx from "clsx"
import {Logo, SearchIcon} from "./icons"
import {ThemeSwitch} from "./theme-switch"
import {useEffect, useState} from "react"
import Image from "next/image"
import logoDark from "../../public/logo.png"
import logoWhite from "../../public/logo-white.png"
import logoGray from "../../public/logo-gray.png"

export const Navbar = () => {
  const [repair, hasRepair] = useState(false)
  const [logo, setLogo] = useState(logoDark) // Initialize with default logo

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const updateLogo = (event: MediaQueryListEvent | MediaQueryList) => {
      const prefersDarkScheme = event.matches
      const newLogo = prefersDarkScheme ? logoGray : logoDark
      setLogo(newLogo)
    }

    updateLogo(mediaQuery) // Initialize logo based on initial color scheme
    mediaQuery.addEventListener("change", updateLogo) // Listen for changes

    return () => {
      mediaQuery.removeEventListener("change", updateLogo) // Clean up listener
    }
  }, [])

  const searchInput = (
    <Input
      aria-label='Search'
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className='hidden lg:inline-block' keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement='outside'
      placeholder='Search...'
      startContent={
        <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
      }
      type='search'
    />
  )

  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent className='basis-1/5 sm:basis-ful' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-1' href='/'>
            {/* <Logo /> */}
            <Image src={logo} width={25} height={25} alt='logo' />
            <p className='font-bold text-inherit'>CinDay</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className='hidden sm:flex basis-1/5 sm:basis-full'
        justify='center'
      >
        <NavbarItem className=' md:flex w-3/4'>{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className='basis-1' justify='end'>
        <ThemeSwitch />
        <button
          onClick={() => {
            hasRepair(!repair)
          }}
        >
          {repair && (
            <NavbarItem className='flex text-red-500'>Repairs</NavbarItem>
          )}
          {!repair && (
            <NavbarItem className='flex text-gray-300'>Repairs</NavbarItem>
          )}
        </button>
      </NavbarContent>
    </NextUINavbar>
  )
}
