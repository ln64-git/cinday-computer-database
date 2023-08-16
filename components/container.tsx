"use client"
import React from "react"
import {
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react"

interface UserData {
  id: number
  name: string
  username: string
  email: string
}

interface ContainerProps {
  data: UserData[]
}

export default function Container({data}: ContainerProps) {
  return (
    <div className=' w-full flex flex-grow flex-wrap '>
      <div className='flex w-full flex-col items-center  pt-4'>
        <Tabs aria-label='Options'>
          <Tab key='ipads' title='iPads' className='w-3/4'>
            {data.map((user) => (
              <Card key={user.id} className='w-full mt-2 mb-4 py-2 px-8'>
                <CardHeader className='flex gap-3 '>
                  <Image
                    alt='nextui logo'
                    height={40}
                    radius='sm'
                    src='/ipad.png'
                    width={40}
                  />
                  <div className='flex flex-col'>
                    <p className='text-md'>{user.name}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className='px-8'>
                  <p>{user.id}</p>
                </CardBody>
                <Divider />
                <CardFooter className='flex justify-center'>
                  <Link
                    isExternal
                    showAnchorIcon
                    href='https://github.com/nextui-org/nextui'
                  >
                    {user.email}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </Tab>
          <Tab key='laptops' title='Laptops'></Tab>
        </Tabs>
      </div>
    </div>
  )
}
