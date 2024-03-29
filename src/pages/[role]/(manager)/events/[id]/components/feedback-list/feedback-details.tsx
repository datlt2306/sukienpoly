import useQueryParams from '@/common/hooks/use-query-params'
import { cn } from '@/common/utils/cn'
import { Avatar, AvatarFallback, AvatarImage, Box, Button, Icon, ScrollArea, Separator, Toggle, Typography } from '@/components/ui'
import StarRatingRadioGroup from '@/components/ui/@custom/star-rating'
import ConfirmDialog from '@/components/ui/@override/confirm-dialog'
import Tooltip from '@/components/ui/@override/tooltip'
import { useDeleteFeedbackMutation, useGetFeedbackDetailsQuery } from '@/redux/apis/feedback.api'
import { format } from 'date-fns'
import { Fragment, useState } from 'react'
import { toast } from 'sonner'

const FeedbackDetails: React.FunctionComponent = () => {
   const [deleteFeedback] = useDeleteFeedbackMutation()
   const [open, setOpen] = useState<boolean>(false)
   const [params, _setParam, removeParam] = useQueryParams('feedback')
   const { data } = useGetFeedbackDetailsQuery(params.feedback)

   const handleDeleteFeedback = () => {
      toast.promise(deleteFeedback(data?.id).unwrap, {
         loading: 'Đang xóa feedback này ...',
         success: () => {
            removeParam('feedback')
            return 'Feedback đã được xóa'
         },
         error: 'Xóa feedback thất bại'
      })
   }

   return (
      <>
         <Box className='flex w-full flex-col items-stretch divide-y divide-border sm:hidden md:hidden'>
            <Box className='flex w-full basis-[4rem] items-center justify-end gap-x-1 p-4'>
               <Tooltip content='Đánh dấu là đã đọc'>
                  <Toggle size='sm' disabled={!params.feedback}>
                     <Icon name='MailCheck' />
                  </Toggle>
               </Tooltip>
               <Tooltip content='Reply'>
                  <Toggle size='sm' disabled={!params.feedback}>
                     <Icon name='Reply' />
                  </Toggle>
               </Tooltip>
               <Tooltip content='Reply all'>
                  <Toggle size='sm' disabled={!params.feedback}>
                     <Icon name='ReplyAll' />
                  </Toggle>
               </Tooltip>
               <Separator orientation='vertical' />
               <Tooltip content='Xóa'>
                  <Button
                     size='icon'
                     variant='ghost'
                     disabled={!params.feedback}
                     className='aspect-square h-8 w-8'
                     onClick={() => {
                        setOpen(true)
                     }}
                  >
                     <Icon name='Trash2' className='text-destructive' />
                  </Button>
               </Tooltip>
            </Box>

            {data && (
               <Box className='flex w-full items-start justify-between p-4'>
                  <Box className='flex basis-1/2 space-x-4'>
                     <Avatar>
                        <AvatarImage src={data?.user?.avatar} />
                        <AvatarFallback>A</AvatarFallback>
                     </Avatar>
                     <Box className='space-y-2'>
                        <Typography variant='small' className='font-medium'>
                           {data?.user?.name}
                        </Typography>
                        <Typography variant='small' className='text-xs'>
                           {data?.user?.email}
                        </Typography>
                     </Box>
                  </Box>
                  <Typography className='text-xs capitalize' color='muted'>
                     {format(data?.created_at ?? new Date(), 'MMM, d, yyyy, h:mm:ss a')}
                  </Typography>
               </Box>
            )}

            <Box className={cn('flex flex-1 flex-col gap-y-4 p-3', { 'items-center justify-center': !data })}>
               {data ? (
                  <Fragment>
                     <StarRatingRadioGroup disabled defaultValue={String(data?.rating)} />
                     <ScrollArea className='h-[calc(50vh-4.75rem)]'>
                        <Box className='flex flex-col gap-y-6'>
                           <Box>
                              <Typography variant='small' className='font-bold'>
                                 Phản hồi
                              </Typography>
                              <Typography variant='small'>{data?.content}</Typography>
                           </Box>
                           <Box>
                              <Typography variant='small' className='font-bold'>
                                 Đề xuất
                              </Typography>
                              <Typography variant='small' color={data?.recommend ? 'default' : 'muted'} className={cn({ italic: !data?.recommend })}>
                                 {data?.recommend ?? 'Không có'}
                              </Typography>
                           </Box>
                        </Box>
                     </ScrollArea>
                  </Fragment>
               ) : (
                  <Typography variant='small' color='muted'>
                     Chưa có phản hôi nào.
                  </Typography>
               )}
            </Box>
         </Box>
         <ConfirmDialog
            open={open}
            onOpenStateChange={setOpen}
            title='Bạn chắc chắn muốn tiếp tục?'
            description='Hành động này không thể khôi phục. Feedback này sẽ bị xóa vĩnh viễn khỏi hệ thống.'
            onConfirm={handleDeleteFeedback}
         />
      </>
   )
}

export default FeedbackDetails
