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
  Button,
} from "@nextui-org/react"
import {Image} from "@nextui-org/react"

interface UserData {
  id: number
  name: string
  username: string
  email: string
}

interface ContainerProps {
  data: UserData[]
}

export default function Home({data}: ContainerProps) {
  return (
    <div className=' w-full flex flex-grow flex-wrap '>
      <div className='flex w-full flex-col items-center  pt-4'>
        <Tabs aria-label='Options'>
          <Tab
            key='ipads'
            title='iPads'
            className='w-full flex flex-wrap justify-center '
          >
            {data.map((user) => (
              <Card
                key={user.id}
                className='w-full lg:w-2/5 2xl:w-1/4 mx-10 lg:mx-4 mt-2 mb-4  py-2'
              >
                <CardHeader className='flex gap-3 justify-start mx-12'>
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
                {/* <Divider /> */}
                <CardBody className=''>
                  <p>{user.id}</p>
                </CardBody>
                {/* <Divider /> */}
                <CardFooter className='flex justify-center'>
                  <Link href={`/ipads/${user.id}`}>
                    <Button color='default' className=''>
                      Details
                    </Button>
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
