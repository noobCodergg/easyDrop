import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [active1, setActive1] = useState(true)
  const [active2, setActive2] = useState(false)

  const handleClickOrders = () => {
    setActive1(true)
    setActive2(false)
  }

  const handleClickProducts = () => {
    setActive1(false)
    setActive2(true)
  }

  return (
    <div className='flex items-center justify-center gap-8  p-6'>
      <Link
        to=''
        onClick={handleClickOrders}
        className={active1 ? 'underline' : ''}
      >
        Manage Orders
      </Link>
      <Link
        to='products'
        onClick={handleClickProducts}
        className={active2 ? 'underline' : ''}
      >
        Manage Products
      </Link>
    </div>
  )
}

export default Navbar
