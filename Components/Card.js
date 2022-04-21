import React from 'react'
import { addHours, intervalToDuration , isValid , isFuture, isPast ,isAfter} from 'date-fns';
import axios from 'axios';
import Image from 'next/image';



function Card(props) {
    let teamA,teamAPhoto,teamB,teamBPhoto,time,scoreA,scoreB,voice,tv,cup,refer
    teamA = props.data.querySelector('.alba_sports_events_link .event_inner .team-first .team .alba_sports_events-team_title').innerHTML;
    teamAPhoto = props.data.querySelector('.alba_sports_events_link .event_inner .team-first .team .alba-team_logo img').getAttribute("data-lazy-src");
    teamB = props.data.querySelector('.alba_sports_events_link .event_inner .team-second .team .alba_sports_events-team_title').innerHTML;
    teamBPhoto = props.data.querySelector('.alba_sports_events_link .event_inner .team-second .team .alba-team_logo img').getAttribute("data-lazy-src");
    time = props.data.querySelector('.alba_sports_events_link .event_inner .match-data .matchResult .match-data .matchTime').innerHTML;
    scoreA = props.data.querySelectorAll('.alba_sports_events_link .event_inner .match-data .matchResult .result')[0].innerHTML;
    scoreB = props.data.querySelectorAll('.alba_sports_events_link .event_inner .match-data .matchResult .result')[1].innerHTML;
    voice = props.data.querySelector('.alba_sports_events_link .chanels-fix .events-info .mic').childNodes[1].data;
    tv = props.data.querySelector('.alba_sports_events_link .chanels-fix .events-info .tv').childNodes[1].data;
    cup = props.data.querySelector('.alba_sports_events_link .chanels-fix .events-info .cup').childNodes[1].data;
    refer =  props.data.querySelector('.alba_sports_events_link').getAttribute('href');

    
    function reducer(state,action) {
        switch (action.type) {
            case 'realTime':
                return {...state,realTime:action.payload}
            case 'showScore':
                return {...state,showScore:action.payload}
            case 'liveLink':
                return {...state,liveLink:action.payload}
            default:
                return {...state}
        }
    }

    const [matchesData , dispatch] = React.useReducer(reducer,{
        realTime: '',
        showScore: false,
        liveLink:'',
    });
    

    React.useEffect(() => {

        axios.get(`https://crospass.herokuapp.com/${refer}`)
        .then(data => {
            let htmlDummy = document.createElement("html");
            htmlDummy.innerHTML = data.data;
            let content = htmlDummy.getElementsByTagName('body')[0].querySelector('.post-content iframe');
            if(content){
                let beinChannel = content.getAttribute('src')[content.getAttribute('src').length - 2]
                dispatch({type:'liveLink',payload:`https://canal.goalarab.com/tv/tv/bein${beinChannel}/`})
            }
        })
        // $(props.data).find('.alba_sports_events_link .event_inner .event_title_wrapper .matchResult .match-data .Matchestatus .status .stay').attr('data-gameends')
        let matchHrs = addHours(new Date(`${props.data.querySelector('.alba_sports_events_link .event_inner .event_title_wrapper .matchResult .match-data .Matchestatus .status .stay').getAttribute('data-start')}`),2);
        if(isValid(matchHrs)){
            if(isFuture(matchHrs)){
                setInterval(() => {
                    let duration = intervalToDuration({
                        start: new Date(),
                        end: matchHrs
                    });
                    
                    // days to hrs
                    if(duration.days >= 1){
                        let final = duration.days * 24
                        dispatch({type:'realTime', payload:`${duration.hours + final}:${duration.minutes}:${duration.seconds}`})
                        // return () => clearInterval(counter)

                    } else if(duration.days === 0 && duration.hours === 0 && duration.minutes < 30){
                        dispatch({type:'realTime',payload:'بعد قليل'});
                        // return () => clearInterval(counter)
                    } else {
                        dispatch({type:'realTime', payload:`${duration.hours}:${duration.minutes}:${duration.seconds}`})
                        // return () => clearInterval(counter)
                    }
                    // 
                    
                },1000);
                
            } else if (isFuture(addHours(new Date(`${props.data.querySelector('.alba_sports_events_link .event_inner .event_title_wrapper .matchResult .match-data .Matchestatus .status .stay').getAttribute('data-gameends')}`),2))) {
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
        
    },[])

    
    function matchLive(){
        let newWin = open('url','windowName','height=500,width=800');
        newWin.document.write(`
        <!DOCTYPE html>
        <html lang="en" style="margin: 0; padding: 0; background-color: #282829; overflow:hidden;">
        <head>
            <title>ELVAR BEIN SPORTS</title>
        </head>
        <body >
            <iframe src="" scrolling="no" allow="autoplay" allowfullscreen=true; frameborder="0" style=" display:block; width:100vw; height:100vh; border:none; margin:0; padding:0;"></iframe>
        </body>
        </html>
        `)
        newWin.document.querySelector('iframe').setAttribute('src',`${matchesData.liveLink}`)
    }

  return (
    <div className='card animate__animated animate__flipInX'>
        <div className='match-events'>
            <div className='left-team teams'>
                <div className='team-img'>
                    {/* <img src={teamBPhoto} alt={teamB}/> */}
                    <Image  src={teamBPhoto} alt={teamB} layout="fixed" width={50} height={50} />
                </div>
                <h1 className='team-name testing'>{teamB}</h1>
            </div>
            <div className='match-results'>
                <div className='score time small-regular'>{matchesData.showScore ? `${scoreB}-${scoreA}` : time}</div>
                <div className='status testing'>{matchesData.realTime}</div>
            </div>
            <div className='right-team teams'>
                <div className='team-img'>
                    {/* <img src={teamAPhoto} alt={teamA} /> */}
                    <Image  src={teamAPhoto} alt={teamA} layout="fixed" width={50} height={50} />
                </div>
                <h1 className='team-name testing'>{teamA}</h1>
            </div>
        </div>
        <div className='match-info testing'>
            <div className='leauge info'>
                <i className='fa-solid fa-trophy'></i>
                <div className='cup'>{cup}</div>
            </div>
            <div className='tv info'>
                <i className='fa-solid fa-tv'></i>
                <div className='cup'>{tv}</div>
            </div>
            <div className='mic info'>
                <i className='fa-solid fa-microphone'></i>
                <div className='voice'>{voice}</div>
            </div>
        </div>
        {matchesData.liveLink && <button onClick={matchLive} className='bein testing'>مشاهدة الان</button>}
    </div>
  )
}

export default Card