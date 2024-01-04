import useQueryParams from '@/common/hooks/use-query-params'
import { FeedbackType } from '@/common/types/entities'
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
   Typography
} from '@/components/ui'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import * as qs from 'qs'
import React from 'react'
import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const Feedback: React.FC<{ data: FeedbackType }> = ({ data }) => {
   const params = useQueryParams()

   return (
      <Link to={{ search: qs.stringify({ ...params, feedback: data.id }) }}>
         <Card className='duration-200 ease-in-out hover:bg-accent/50'>
            <CardHeader className='pb-6 pt-4'>
               <Box className='flex flex-row items-center justify-between'>
                  <HoverCard>
                     <HoverCardTrigger asChild>
                        <Button variant='link' className='h-fit gap-x-2 p-0 text-foreground'>
                           {data?.user?.name} {!data?.read && <Box className='h-2 w-2 rounded-full bg-blue-500' />}
                        </Button>
                     </HoverCardTrigger>
                     <HoverCardContent className='w-64' align='start'>
                        <Box className='flex justify-between space-x-4'>
                           <Avatar>
                              <AvatarImage src={data?.user?.avatar} />
                              <AvatarFallback>VC</AvatarFallback>
                           </Avatar>
                           <Box>
                              <Typography className='text-sm font-semibold'>{data?.user?.name}</Typography>
                              <p className='text-sm'>{data?.user?.email}</p>
                              <Box className='flex items-center pt-2'>
                                 <CalendarIcon className='mr-2 h-4 w-4 opacity-70' /> <span className='text-xs text-muted-foreground'>Tham gia ngày </span>
                              </Box>
                           </Box>
                        </Box>
                     </HoverCardContent>
                  </HoverCard>
                  <Time>{formatDistanceToNow(new Date(data?.created_at), { locale: vi, addSuffix: true })}</Time>
               </Box>
               {/* <StarRating /> */}
            </CardHeader>
            <CardContent className='spacy-y-0 py-0'>
               <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime esse harum nostrum rerum suscipit quia debitis quas cupiditate! Esse neque
                  corrupti quas. Inventore excepturi deserunt id aperiam? Doloremque, totam facere.
               </Paragraph>{' '}
            </CardContent>
         </Card>
      </Link>
   )
}

const Time = tw.time`text-xs text-muted-foreground m-0 align-middle`
const Paragraph = tw.p`text-xs line-clamp-3 mb-6 text-muted-foreground`

export default Feedback
