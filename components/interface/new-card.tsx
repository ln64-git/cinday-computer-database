import { Button, Card, CardHeader } from '@nextui-org/react'
import React from 'react'
import { PlusIcon } from './icons'

export default function NewCard() {
  return (
    <Card
      className="justify-center w-full "
    >
      <CardHeader className="flex justify-start items-center gap-3">
        <div className='w-full  flex justify-center items-center'>
          <div className="min-h-[55px] flex flex-row  items-center w-2/3">
            <Button fullWidth variant='light' color="default"><PlusIcon /></Button>
          </div>
        </div>
      </CardHeader>
      <div className='pb-4 bt-6 px-8 flex justify-center'>
        New Note
      </div>
    </Card>
  )
}
