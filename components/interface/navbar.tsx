'use client'

import { AnimatePresence, motion } from 'framer-motion'
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
import { DownArrowIcon, Logo, SearchIcon } from './icons'
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar'
import { setSearchText, setSearchToggle } from '@/util/lib/redux-toolkit/reducers/interface/search-slice'
import { useDispatch, useSelector } from 'react-redux'

import { Input } from '@nextui-org/input'
import NextLink from 'next/link'
import { ThemeSwitch } from './theme-switch'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { setRepairFlag } from '@/util/lib/redux-toolkit/reducers/interface/repair-slice'
import { RootState } from '@/util/lib/redux-toolkit/store'
import { toggleFilterOption } from '@/util/lib/redux-toolkit/reducers/interface/filter-options-slice'
import { setSortOption } from '@/util/lib/redux-toolkit/reducers/interface/sort-options-slice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const path = usePathname()
  const repairStatus = useSelector((state: RootState) => state.repair.status)
  const searchToggle = useSelector((state: RootState) => state.search.status,)
  const searchText = useSelector((state: RootState) => state.search.text,)

  const filterOptions = useSelector((state: RootState) => state.filterOptions.array);
  const sortOptions = useSelector((state: RootState) => state.sortOptions.text);


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
      onChange={(e) => dispatch(setSearchText(e.target.value))}
      endContent={
        <Dropdown>
          <DropdownTrigger>
            <Button variant={'light'} isIconOnly>
              <DownArrowIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" closeOnSelect={false} color='primary'>
            <DropdownSection title="filter">
              <DropdownItem color='primary'>
                <Checkbox
                  defaultSelected={filterOptions.includes('name')}
                  onClick={() => dispatch(toggleFilterOption('name'))}
                >
                  filter by Name
                </Checkbox>
              </DropdownItem>
              <DropdownItem>
                <Checkbox
                  defaultSelected={filterOptions.includes('internal_model_id')}
                  onClick={() => dispatch(toggleFilterOption('internal_model_id'))}
                >
                  filter by Internal Model ID
                </Checkbox>
              </DropdownItem>
              <DropdownItem>
                <Checkbox
                  defaultSelected={filterOptions.includes('external_model_id')}
                  onClick={() => dispatch(toggleFilterOption('external_model_id'))}
                >
                  filter by External Model ID
                </Checkbox>
              </DropdownItem>
              <DropdownItem>
                <Checkbox
                  defaultSelected={filterOptions.includes('serial_number')}
                  onClick={() => dispatch(toggleFilterOption('serial_number'))}
                >
                  filter by Serial Number
                </Checkbox>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection title="sort" >
              <DropdownItem variant="light">
                <RadioGroup>
                  <Radio
                    data-selected={sortOptions === 'date-modified'}
                    onChange={() => dispatch(setSortOption('date-modified'))}
                    value="date-modified"
                  >
                    Date Modified
                  </Radio>
                  <Radio
                    data-selected={sortOptions === 'date-created'}
                    onChange={() => dispatch(setSortOption('date-created'))}
                    value="date-created"
                  >
                    Date Created
                  </Radio>
                  <Radio
                    data-selected={sortOptions === 'name'}
                    onChange={() => dispatch(setSortOption('name'))}
                    value="name"
                  >
                    Name
                  </Radio>
                </RadioGroup>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown >
      }
    />
  )

  useEffect(() => {
    const handleScreenSizeChange = () => {
      if (window.innerWidth < 720) {
        dispatch(setSearchToggle(false))
      } else {
        dispatch(setSearchToggle(true))
      }
    }
    handleScreenSizeChange()
    window.addEventListener('resize', handleScreenSizeChange)
    return () => {
      window.removeEventListener('resize', handleScreenSizeChange)
    }
  }, [dispatch])

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="py-6 shadow-lg">
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
          {searchToggle && path === '/' && (
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
      {path === '/' && (
        <button
          onClick={() => {
            dispatch(setSearchToggle(!searchToggle))
          }}
        >
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        </button>
      )}
      <NavbarContent className="flex justify-center items-center" justify="end">
        <ThemeSwitch />
        {path === '/' && (
          <button
            onClick={() => {
              dispatch(setRepairFlag(!repairStatus)) // Toggle the repairFlag state using Redux action
            }}
          >
            {repairStatus ? (
              <NavbarItem className="flex text-red-500">Repairs</NavbarItem>
            ) : (
              <NavbarItem className="flex text-inherit">Repairs</NavbarItem>
            )}
          </button>
        )}
        {path !== '/' && (
          <button
            onClick={() => {
              setRepairFlag(!repairStatus)
            }}
          >
            {repairStatus ? (
              <NavbarItem className="flex text-red-500">Repairs</NavbarItem>
            ) : (
              <NavbarItem className="flex text-inherit">Repairs</NavbarItem>
            )}
          </button>
        )}

      </NavbarContent>
    </NextUINavbar>
  )
}
