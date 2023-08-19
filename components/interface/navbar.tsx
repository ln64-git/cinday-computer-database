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
import { useContext } from 'react'
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import RepairContext from '@/lib/util/context/interface/repair-context'
import SearchContext from '@/lib/util/context/interface/search-context'

export const Navbar = () => {
  const repairContext = useContext(RepairContext)
  const searchContext = useContext(SearchContext)

  const { searchText, setSearchText } = searchContext
  const { repairFlag, setRepairFlag } = repairContext

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
              {/* <RadioGroup>
                <DropdownItem>
                  <Radio value="name">Name</Radio>
                </DropdownItem>
                <DropdownItem>
                  <Radio value="date-modified">Date Modified</Radio>
                </DropdownItem>
              </RadioGroup> */}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      }
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
            setRepairFlag(!repairFlag)
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
