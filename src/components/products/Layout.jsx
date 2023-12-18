import React from 'react'
import { Outlet } from 'react-router-dom'
import Begining from './Begining'


export default function Layout() {
  return (
    <div>
    <Begining/>
      <Outlet/>
    </div>
  )
}
