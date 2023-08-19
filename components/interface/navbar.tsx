'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar'
import { Input } from '@nextui-org/input'
import NextLink from 'next/link'
import { Logo, SearchIcon, DownArrowIcon } from './icons'
import { ThemeSwitch } from './theme-switch'
import { useContext, useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Radio,
  RadioGroup,
} from '@nextui-org/react'
import RepairContext from '@/lib/util/context/interface/repair-context'
import SearchContext from '@/lib/util/context/interface/search-context'
import { AnimatePresence, motion } from 'framer-motion'

export const Navbar = () => {
  const repairContext = useContext(RepairContext)
  const searchContext = useContext(SearchContext)

  const { searchText, setSearchText } = searchContext
  const { repairFlag, setRepairFlag } = repairContext

  const [viewSearch, setViewSearch] = useState(false)

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      endContent={
        <Dropdown>
          <DropdownTrigger>
            <Button variant={'light'} isIconOnly>
              <DownArrowIcon />
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Static Actions" closeOnSelect={false}>
            <DropdownSection title="filter">
              <DropdownItem>
                <Checkbox defaultSelected>filter by Name</Checkbox>
              </DropdownItem>
              <DropdownItem>
                <Checkbox defaultSelected>filter by Internal Model ID</Checkbox>
              </DropdownItem>
              <DropdownItem>
                <Checkbox defaultSelected>filter by External Model ID</Checkbox>
              </DropdownItem>
              <DropdownItem>
                <Checkbox defaultSelected>filter by Serial Number</Checkbox>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection title="sort">
              <DropdownItem variant="light">
                <RadioGroup>
                  <Radio value="date-modified">Date Modified</Radio>
                  <Radio value="date-created">Date Created</Radio>
                  <Radio value="name">Name</Radio>
                </RadioGroup>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      }
    />
  )

  const handleScreenSizeChange = () => {
    if (window.innerWidth < 720) {
      setViewSearch(false)
    } else {
      setViewSearch(true)
    }
  }

  useEffect(() => {
    handleScreenSizeChange()
    window.addEventListener('resize', handleScreenSizeChange)
    return () => {
      window.removeEventListener('resize', handleScreenSizeChange)
    }
  }, [])

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="py-6">
      <NavbarContent
        className="flex justify-center items-center mr-10 "
        justify="start"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">CinDay</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="flex  w-full" justify="center">
        {/* <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0 invisible" /> */}
        <AnimatePresence>
          {viewSearch && (
            <NavbarItem className="flex w-full justify-center ">
              <motion.div
                key="search-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="w-3/4"
              >
                {searchInput}
              </motion.div>
            </NavbarItem>
          )}
        </AnimatePresence>
      </NavbarContent>
      <button
        onClick={() => {
          setViewSearch(!viewSearch)
        }}
      >
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      </button>
      <NavbarContent className="flex justify-center items-center" justify="end">
        <ThemeSwitch />
        <button
          onClick={() => {
            setRepairFlag(!repairFlag)
          }}
        >
          {repairFlag ? (
            <NavbarItem className="flex text-red-500">Repairs</NavbarItem>
          ) : (
            <NavbarItem className="flex text-inherit">Repairs</NavbarItem>
          )}
        </button>
      </NavbarContent>
    </NextUINavbar>
  )
}
