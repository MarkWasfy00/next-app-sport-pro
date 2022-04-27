import React from 'react'
import { addHours, intervalToDuration , isValid , isFuture, isPast ,isAfter} from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';


function Card({matchInfo}) {
    


    function reducer(state,action) {
        switch (action.type) {
            case 'realTime':
                return {...state,realTime:action.payload}
            case 'showScore':
                return {...state,showScore:action.payload}
            case 'liveOrSoon':
                return {...state,liveOrSoon:action.payload}
            default:
                return {...state}
        }
    }


    const [matchesData , dispatch] = React.useReducer(reducer,{
        realTime: '',
        showScore: false,
    });
    

    React.useEffect(() => {
        
        
        let matchHrs = addHours(new Date(matchInfo.startTime),2);
        if(isValid(matchHrs)){
            if(isFuture(matchHrs)){
                let timer = setInterval(() => {
                    let duration = intervalToDuration({
                        start: new Date(),
                        end: matchHrs
                    });
                    // days to hrs
                    if(duration.days >= 1){
                        let final = duration.days * 24
                        dispatch({type:'realTime', payload:`${duration.hours + final}:${duration.minutes}:${duration.seconds}`})
                        // return () => clearInterval(timer)

                    } else if(duration.days === 0 && duration.hours === 0 && duration.minutes < 30){
                        dispatch({type:'realTime',payload:'بعد قليل'});
                        // return () => clearInterval(timer)
                    } else {
                        dispatch({type:'realTime', payload:`${duration.hours}:${duration.minutes}:${duration.seconds}`})
                        // return () => clearInterval(timer)
                    }
                    // 
                    
                },1000);
            } else if (isFuture(addHours(new Date(matchInfo.endTime),2))) {
                dispatch({type:'realTime',payload:'مباشـر'});
                dispatch({type:'showScore',payload:true});
    
            } else {
                dispatch({type:'realTime',payload:'إنتهــت'});
                dispatch({type:'showScore',payload:true});
            }
        }else{
            dispatch({type:'realTime',payload:'إنتهــت'});
            dispatch({type:'showScore',payload:true});
        }
        
        
    },[matchInfo.endTime, matchInfo.refer, matchInfo.startTime])


  return (
    <div className='card animate__animated animate__flipInX'>
        <div className='match-events'>
            <div className='left-team teams'>
                <div className='team-img'>
                    {/* <img src={teamBPhoto} alt={teamB}/> */}
                    <Image priority  src={matchInfo.teamBPhoto} alt={matchInfo.teamB} layout="fixed" width={50} height={50} />
                </div>
                <h1 className='team-name testing'>{matchInfo.teamB}</h1>
            </div>
            <div className='match-results'>
                <div className='score time small-regular'>{matchesData.showScore ? `${matchInfo.scoreB}-${matchInfo.scoreA}` : matchInfo.time}</div>
                <div className='status testing'>{matchesData.realTime}</div>
            </div>
            <div className='right-team teams'>
                <div className='team-img'>
                    {/* <img src={teamAPhoto} alt={teamA} /> */}
                    <Image priority src={matchInfo.teamAPhoto} alt={matchInfo.teamA} layout="fixed" width={50} height={50} />
                </div>
                <h1 className='team-name testing'>{matchInfo.teamA}</h1>
            </div>
        </div>
        <div className='match-info testing'>
            <div className='leauge info'>
                <i className='fa-solid fa-trophy'></i>
                <div className='cup'>{matchInfo.cup}</div>
            </div>
            <div className='tv info'>
                <i className='fa-solid fa-tv'></i>
                <div className='cup'>{matchInfo.tv}</div>
            </div>
            <div className='mic info'>
                <i className='fa-solid fa-microphone'></i>
                <div className='voice'>{matchInfo.voice}</div>
            </div>
        </div>
        {matchesData.realTime === 'مباشـر'  ? <Link href={{pathname:`/beinsport/${matchInfo.tv}`,query:{tvs:matchInfo.refer}}} passHref><button className='bein testing'>مشاهدة الان</button></Link>: ' ' }
    </div>
  )
}

export default Card