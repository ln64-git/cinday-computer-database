import { Button, Card } from '@nextui-org/react'
import React from 'react'
import { PlusIcon } from '../interface/icons'

export default function UserIcon() {
  return (
    <Card className="">
      <div className="w-full flex justify-center items-center">
        <div className="min-h-[55px] flex flex-row items-center w-2/3">
          <Button fullWidth variant="light" color="default">
            <PlusIcon />
          </Button>
        </div>
      </div>
    </Card>  )
}
