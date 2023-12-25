import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/common/utils/cn'
import { Button } from '@/components/ui/@shadcn/button'
import { Calendar } from '@/components/ui/@shadcn/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '..'
import { useState } from 'react'

export const DatePicker = ({ className, onSelect }: { className: string; onSelect?: any }) => {
   const [date, setDate] = useState<Date>()

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant={'outline'} className={cn('w-[280px] justify-start text-left font-normal', className, !date && 'text-muted-foreground')}>
               <CalendarIcon className='mr-2 h-4 w-4' />
               {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-auto p-0'>
            <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
         </PopoverContent>
      </Popover>
   )
}
