import React from 'react'
import Link from 'next/link'
function Header() {
  return (
    <header>
      <nav className='navbar container'>
        <Link passHref href='/'><div className='logo small-regular'></div></Link>
        <ul className='lists'>
            <li>
                <Link href='/'><a className='xsmall-regular'>الرئيسية</a></Link>
            </li>
            <li>
                <Link href='/news'><a  className='xsmall-regular disabled'>الاخبار</a></Link>
            </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header