import { EventStatusValues } from '@/common/constants/constants'
import { EventStatus, JoinEventStatus } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import { EventInterface } from '@/common/types/entities'
import { cn } from '@/common/utils/cn'
import { Badge, Box, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, Icon, Image } from '@/components/ui'
import Tooltip from '@/components/ui/@override/tooltip'
import { usePrefetch } from '@/redux/apis/event.api'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const EventCard: React.FC<{ data: EventInterface }> = ({ data }) => {
   const prefetchPage = usePrefetch('getEventDetails')

   return (
      <Card className='w-full overflow-clip transition-transform duration-200 ease-in-out'>
         <CardHeader className='group relative h-52 space-y-0 p-2'>
            <Image src={data?.banner} height={208} width='100%' className='aspect-[16/9] h-full max-w-full rounded-lg object-cover' />
         </CardHeader>
         <CardContent className='grid gap-y-2 px-3 py-2'>
            <Box className='flex items-center justify-between'>
               <Link className='line-clamp-1 font-medium underline-offset-2 hover:underline' to='#'>
                  {data?.name}
               </Link>
               {data?.status_join === JoinEventStatus.ALREADY && (
                  <Tooltip content='Đã tham gia'>
                     <Icon name='CheckCircle' className='text-success' />
                  </Tooltip>
               )}
            </Box>
            <CardDescription className='inline-flex items-center space-x-2'>
               <Icon name='Calendar' />
               <time>
                  {format(data?.start_time, 'dd/MM/yyyy')} - {format(data?.end_time, 'dd/MM/yyyy')}
               </time>
            </CardDescription>
            <CardDescription className='flex items-center space-x-2'>
               <Icon name='User' className='basis-4' />
               <span className='line-clamp-1'>{data?.user?.name}</span>
            </CardDescription>

            <Badge
               variant={data?.status === EventStatus.ACTIVE ? 'success' : data?.status === EventStatus.UPCOMING ? 'warning' : 'destructive'}
               className='w-fit'
            >
               {EventStatusValues.get(data.status)}
            </Badge>

            <CardDescription className='line-clamp-2 h-9'>{data?.description ?? 'Chưa có mô tả'}</CardDescription>
         </CardContent>
         <CardFooter className={cn('mt-2 items-stretch gap-x-2 px-3')}>
            <Button asChild size='sm' variant='default' className='w-full' onMouseEnter={() => prefetchPage(String(data?.id))}>
               <Link to={Paths.EVENTS_DETAILS.replace(':id', String(data?.id))}>Chi tiết</Link>
            </Button>
         </CardFooter>
      </Card>
   )
}

export default EventCard