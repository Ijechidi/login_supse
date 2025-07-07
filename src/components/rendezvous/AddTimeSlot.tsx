import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AddTimeSlot() {
  return (
    <div> 
        <Button variant={'outline'} className=' text-primary-foreground hover:bg-background/90'>
            <PlusIcon className='w-4 h-4' />
        </Button>
    </div>
  )
}
