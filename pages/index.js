import React from 'react';
import Date from '../Components/Date';
import Leauge from '../Components/Leauge';
import axios from 'axios';
import * as cheerio from 'cheerio';

export const BtnContext = React.createContext()

function reducer(state,action) {
    switch (action.type) {
        case 'yestrday':
            return {
                ...state,
                today:false,
                yestrday:true,
                tommorw:false,
            }
        case 'today':
            return {
                ...state,
                today:true,
                yestrday:false,
                tommorw:false,
            }
        case 'tommorw':
            return {
                ...state,
                today:false,
                yestrday:false,
                tommorw:true,
            }
        default:
            return {...state}
    }
}

export default function ElVar({yesterday,today,tommorw  }){
    const [dayBtn , dispatch] = React.useReducer(reducer,{
        yestrday:false,
        today:true,
        tommorw:false,
    })
    
    return(
        <>
            <main>
                <Date indicator={dayBtn} modify={dispatch} />
                    <BtnContext.Provider value={{ btn:dayBtn}}>
                        <Leauge key={'yesterday'} id={'yestrday'} data={JSON.parse(yesterday)} />
                        <Leauge key={'today'} id={'today'} data={JSON.parse(today)} />
                        <Leauge key={'tommorw'} id={'tommorw'} data={JSON.parse(tommorw)} />
                    </BtnContext.Provider>
            </main>
        </>
    ) 
}

export async function getServerSideProps(){
    const days = await axios.get('https://goalarab.com');
    let resp = await days.data
    const $ = cheerio.load(resp)

    
    function getCards(day){
        let finalList = {};
        let counter = 0;
        const dayData = $(day).find('.albaflex').children();
         
        for(let match of dayData){
            finalList[`${counter}`] = {}
            finalList[`${counter}`].id = `${counter}-id`
            finalList[`${counter}`].teamA = $(match).find('.alba_sports_events_link .event_inner .team-first .team .alba_sports_events-team_title').html();
            finalList[`${counter}`].teamAPhoto = $(match).find('.alba_sports_events_link .event_inner .team-first .team .alba-team_logo img').attr('data-lazy-src');
            finalList[`${counter}`].teamB = $(match).find('.alba_sports_events_link .event_inner .team-second .team .alba_sports_events-team_title').html();
            finalList[`${counter}`].teamBPhoto = $(match).find('.alba_sports_events_link .event_inner .team-second .team .alba-team_logo img').attr('data-lazy-src');
            finalList[`${counter}`].time = $(match).find('.alba_sports_events_link .event_inner .match-data .matchResult .match-data .matchTime').html();
            finalList[`${counter}`].scoreA = $(match).find('.alba_sports_events_link .event_inner .match-data .matchResult .result').first().html();
            finalList[`${counter}`].scoreB = $(match).find('.alba_sports_events_link .event_inner .match-data .matchResult .result').last().html();
            finalList[`${counter}`].voice = $(match).find('.alba_sports_events_link .chanels-fix .events-info .mic').text();
            finalList[`${counter}`].tv = $(match).find('.alba_sports_events_link .chanels-fix .events-info .tv').text();
            finalList[`${counter}`].cup = $(match).find('.alba_sports_events_link .chanels-fix .events-info .cup').text();
            finalList[`${counter}`].refer = $(match).find('.alba_sports_events_link').attr('href');
            finalList[`${counter}`].startTime = $(match).find('.alba_sports_events_link .event_inner .event_title_wrapper .matchResult .match-data .Matchestatus .status .stay').attr('data-start');
            finalList[`${counter}`].endTime = $(match).find('.alba_sports_events_link .event_inner .event_title_wrapper .matchResult .match-data .Matchestatus .status .stay').attr('data-gameends');
            ++counter;
        }
        return JSON.stringify(finalList)
    }
    return{
        props:{
            matchesData:resp,
            yesterday:getCards($('.site-main .content #text-9 .alba-live-table .tabcontent')[0]),
            today:getCards($('.site-main .content #text-9 .alba-live-table .tabcontent')[1]),
            tommorw:getCards($('.site-main .content #text-9 .alba-live-table .tabcontent')[2]),
        }
    }
}

