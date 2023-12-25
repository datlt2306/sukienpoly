import { Box, Button, Icon } from '@/components/ui'
import React from 'react'
import ThemeSelect from '../../../../components/shared/theme-select'
import NavbarBreadscrumb from './breadcrumbs'
import Notification from './notification'
import UserActions from '../../../_components/user-actions'

type NavbarProps = {
   openState: boolean
   onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>
}

const NavHeader: React.FC<NavbarProps> = (props) => {
   return (
      <Box
         as='header'
         className='sticky top-0 z-50 flex h-16 w-full max-w-full items-center justify-between border-b bg-background/50 bg-opacity-50 px-6 py-2 backdrop-blur sm:px-3'
      >
         <Box className='flex items-center space-x-3'>
            <Box className='hidden pr-1 sm:block md:block md:border-r'>
               <Button variant='ghost' size='icon' onClick={() => props.onOpenStateChange(!props.openState)}>
                  <Icon name='Menu' />
               </Button>
            </Box>
            <Box className='sm:hidden'>
               <NavbarBreadscrumb />
            </Box>
         </Box>
         <Box className='flex items-center space-x-3'>
            <ThemeSelect />
            <Notification />
            <UserActions />
         </Box>
      </Box>
   )
}

export default NavHeader
