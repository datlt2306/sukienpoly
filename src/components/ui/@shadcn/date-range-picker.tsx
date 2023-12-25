'use client'

import { cn } from '@/common/utils/cn'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import * as React from 'react'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '..'
import { CalendarProps } from './calendar'

type DateRangePickerProps = {
   onSelect?: (value: DateRange | undefined) => void
   align?: React.ComponentProps<typeof PopoverContent>['align']
} & React.HTMLAttributes<HTMLDivElement>
export const DateRangePicker: React.FC<DateRangePickerProps> = ({ className, align = 'center', onSelect }) => {
   const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20)
   })

   const handleSelectDateRange: SelectRangeEventHandler = (from, to) => {
      setDate({ from, to } as DateRange)
      // onSelect({ from, to } as DateRange)
   }

   return (
      <div className={cn('grid gap-2', className)}>
         <Popover>
            <PopoverTrigger asChild>
               <Button id='date' variant={'outline'} className={cn('flex justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date?.from ? (
                     date.to ? (
                        <>
                           {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                        </>
                     ) : (
                        format(date.from, 'LLL dd, y')
                     )
                  ) : (
                     <span>Pick a date</span>
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align={align}>
               <Calendar initialFocus mode='range' defaultMonth={date?.from} selected={date} onSelect={handleSelectDateRange} numberOfMonths={2} />
            </PopoverContent>
         </Popover>
      </div>
   )
}
