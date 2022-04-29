import React from 'react'
import Card from './Card'
import NoMatch from './NoMatch'
import {BtnContext} from '../pages/index'


function Leauge(props) {
    let indicator = React.useContext(BtnContext)
    let matches = []
    const infos = props.data;
    


    if(Object.keys(props.data).length > 1){
        for(let card in infos){
            matches.push(<Card key={infos[card].id}  matchInfo={infos[card]} />)
        }
    } else{
        matches.push(<NoMatch key={`no-match-${props.id}`} />)
    }
  return (
    <div className={`leauge-display container${indicator.btn[props.id] ? '' : ' disactive'}`}>
        {matches} 
    </div>
  )
}

export default Leauge