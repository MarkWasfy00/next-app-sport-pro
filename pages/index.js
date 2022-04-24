import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer'
import Date from '../Components/Date';
import Leauge from '../Components/Leauge';
import axios from 'axios';
import Head from 'next/head';

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

export default function ElVar({ matchesData }){
    const [dayBtn , dispatch] = React.useReducer(reducer,{
        yestrday:false,
        today:true,
        tommorw:false,
    })
    const [myDays , setMyDays] = React.useState([])
    

    React.useEffect(() => {
        let htmlDummy = document.createElement("html");
        htmlDummy.innerHTML = matchesData;
        let content = htmlDummy.getElementsByTagName('body')[0].querySelector('.site-main .content #text-9 .alba-live-table');
        
        content.querySelectorAll('.tabcontent').forEach(day => {
            setMyDays(old => {
                return [
                    ...old,
                    <Leauge key={day.id} data={day} id={day.id} />
                ]
            })
        });
    },[])


    return(
        <>
            <main>
                <Date indicator={dayBtn} modify={dispatch} />
                    <BtnContext.Provider value={{ btn:dayBtn , data:matchesData}}>
                        {myDays}
                    </BtnContext.Provider>
            </main>
        </>
    ) 
}

export async function getServerSideProps(){
    const days = await axios.get('https://goalarab.com');
    let resp = await days.data
    return{
        props:{
            matchesData:resp
        }
    }
}

