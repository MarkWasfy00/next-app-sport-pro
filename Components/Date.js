import React from 'react'

function Date(props) {
  return (
    <div className='date-arrow container xsmall-regular'>
        <div onClick={ () => props.modify({type:'tommorw'})} className={`day${props.indicator.tommorw ? ' active' : ''}`}>الغد</div>
        <div onClick={ () => props.modify({type:'today'})} className={`day${props.indicator.today ? ' active' : ''}`}>اليوم</div>
        <div onClick={ () => props.modify({type:'yestrday'})} className={`day${props.indicator.yestrday ? ' active' : ''}`}>الامس</div>
    </div>
  )
}

export default Date