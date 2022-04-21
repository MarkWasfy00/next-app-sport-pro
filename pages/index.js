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
                today:false,
                yestrday:true,
                tommorw:false,
            }
        case 'today':
            return {
                today:true,
                yestrday:false,
                tommorw:false,
            }
        case 'tommorw':
            return {
                today:false,
                yestrday:false,
                tommorw:true,
            }
        default:
            return {...state}
    }
}

let btns = {
    yestrday:false,
    today:true,
    tommorw:false,
}


export default function ElVar({ matchesData }){
    
    const [dayBtn , dispatch] = React.useReducer(reducer,btns)
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
            <Head>
            <meta charset="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>ELVAR</title>
            <meta charset="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta name="theme-color" content="#000" />
            <meta name="robots" content="index,follow" />
            <meta name="googlebot" content="index,follow" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="ar_AR" />
            <meta property="og:site_name" content="el-var" />
            <meta name="keywords" id="metaKeyword" content="" />
            <meta name="description" id="metaDesc" content="اخبار الكورة والرياضة المصرية والعالمية ومواعيد المباريات علي الفار"/>
            <link rel="canonical" href="https://el-var.live" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" integrity="sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw==" crossOrigin="anonymous" referrerpolicy="no-referrer"/>
            <link
            rel="icon"
            href="/var.png"
            type="image/gif"
            sizes="16x16"
            />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossOrigin="anonymous" referrerpolicy="no-referrer"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerpolicy="no-referrer"/>
            </Head>
            <Header/>
            <main>
                <Date indicator={dayBtn} modify={dispatch} />
                    <BtnContext.Provider value={{ btn:dayBtn , data:matchesData}}>
                        {myDays}
                    </BtnContext.Provider>
            </main>
            <Footer/>
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

