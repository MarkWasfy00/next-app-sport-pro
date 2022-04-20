import React from 'react'

function Header() {
  return (
    <header>
      <nav className='navbar container'>
        <div className='logo small-regular'></div>
        <ul className='lists'>
            <li>
                <a href='#' className='xsmall-regular'>الرئيسية</a>
            </li>
            <li>
                <a href='#' className='xsmall-regular disabled'>الاخبار</a>
            </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header