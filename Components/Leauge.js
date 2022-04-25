import React from 'react'
import Card from './Card'
import NoMatch from './NoMatch'
import {BtnContext} from '../pages/index'


function Leauge(props) {
    
    let matches = []
    let indicator = React.useContext(BtnContext)
    const infos = props.data;

    if(Object.keys(props.data).length > 0){
        for(let card in infos){
            matches.push(<Card key={infos[card].id}  matchInfo={infos[card]} />)
        }
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