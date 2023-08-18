'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar'
import { Kbd } from '@nextui-org/kbd'
import { Input } from '@nextui-org/input'
import NextLink from 'next/link'
import { Logo, SearchIcon } from './icons'
import { ThemeSwitch } from './theme-switch'
import { useContext } from 'react'
import SearchContext from '@/lib/util/context/search-context'
import RepairContext from '@/lib/util/context/repair-context'

export const Navbar = () => {
  const repairContext = useContext(RepairContext)
  const searchContext = useContext(SearchContext)

  const { searchText, setSearchText } = searchContext
  const { repairFlag, toggleRepairFlag } = repairContext

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  )

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="py-6">
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">CinDay</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="center"
      >
        <NavbarItem className=" md:flex w-3/5">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1" justify="end">
        <ThemeSwitch />
        <button
          onClick={() => {
            toggleRepairFlag()
          }}
        >
          {repairFlag && (
            <NavbarItem className="flex text-red-500">Repairs</NavbarItem>
          )}
          {!repairFlag && (
            <NavbarItem className="flex text-inherit">Repairs</NavbarItem>
          )}
        </button>
      </NavbarContent>
    </NextUINavbar>
  )
}
