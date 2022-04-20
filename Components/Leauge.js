import React from 'react'
import Card from './Card'
import NoMatch from './NoMatch'
import {BtnContext} from '../pages/index'


function Leauge(props) {
    
    let matches = []
    let indicator = React.useContext(BtnContext)


    if(props.data.querySelector('.albaflex').children.length > 1){
        props.data.querySelector('.albaflex').childNodes.forEach((item,index) => {
            matches.push(<Card key={index}  data={item} />)
        })
    } else{
        matches.push(<NoMatch />)
    }

  return (
    <div className={`leauge-display container${indicator.btn[props.id] ? '' : ' disactive'}`}>
        {matches}
    </div>
  )
}

export default Leauge