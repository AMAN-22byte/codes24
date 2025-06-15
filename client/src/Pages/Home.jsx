import React from 'react'
import Table from '../components/Table'
import { Calendar } from '../components/ui/calendar'

const Home = () => {
  return (
    <>
    <div className='flex flex-col md:flex-row w-full h-screen'>
     <div className="w-full md:w-1/2">
        <Table  className="w-full h-full" />
      </div>
      <div className="w-full md:w-1/2">
        <Calendar className="w-full h-full"/>
      </div>
    </div>
    
    </>
    
  )
}

export default Home