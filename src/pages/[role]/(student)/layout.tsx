import { Box } from '@/components/ui'
import React, { Suspense } from 'react'

import { Outlet } from 'react-router-dom'
import LoadingProgressBar from '@/components/shared/loading-progress-bar'
import Header from './components/header'
import Footer from './components/footer'

const Layout: React.FunctionComponent = () => {
   return (
      <Box className='item-stretch flex min-h-screen flex-col' as='main'>
         <Header />
         <Box className='h-full flex-1'>
            <Suspense fallback={<LoadingProgressBar />}>
               <Outlet />
            </Suspense>
         </Box>
         <Footer />
      </Box>
   )
}

export default Layout
