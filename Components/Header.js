import React from 'react'
import Link from 'next/link'




function Header() {
  let [theme,setTheme] = React.useState('dark');

  React.useEffect(() => {

    if(window.localStorage.theme && window.localStorage.theme !== theme){
      setTheme('light')
    }

    if(window.localStorage.theme === 'light'){
      document.documentElement.style.setProperty('--background', '#424549');
      document.documentElement.style.setProperty('--color', 'white');
      document.documentElement.style.setProperty('--card', '#282b30');
      document.documentElement.style.setProperty('--header', '#1e2124');
    }else{
      document.documentElement.style.setProperty('--background', '#1d1d1d');
      document.documentElement.style.setProperty('--color', 'whitesmoke');
      document.documentElement.style.setProperty('--card', '#343434');
      document.documentElement.style.setProperty('--header', '#282829');
    }
  },[theme])


  function changeTheme(){
    setTheme(oldTheme => {
      if(oldTheme === 'dark'){
        window.localStorage.setItem("theme","light")
        return 'light'
      }else if(oldTheme === 'light'){
        window.localStorage.setItem("theme","dark")
        return 'dark'
      }else{
        return
      }
    })
  }

  function getUserTheme(){
    window.localStorage.theme ? window.localStorage.theme: null
  }

  return (
    <header>
      <nav className='navbar container'>
        <Link passHref href='/'><div className='logo small-regular'></div></Link>
        <ul className='lists'>
            <li>
                <Link href='/'><a className='xsmall-regular'>الرئيسية</a></Link>
            </li>
            <li>
                <Link href='/news'><a  className='xsmall-regular'>الاخبار</a></Link>
            </li>
        </ul>
        <div className='theme'>
          <i className={`fas${theme === 'dark' ? ' fa-sun':' fa-moon'}`}>
            <input type='checkbox' onChange={changeTheme} />
          </i>
        </div>
      </nav>
    </header>
  )
}

export default Header