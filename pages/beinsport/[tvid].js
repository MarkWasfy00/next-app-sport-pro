import { useEffect,useReducer } from "react";
import axios from "axios";
import * as cheerio from 'cheerio';
import Head from "next/head";


function DynamicBeinSport({ link , teamA , teamB }) {
  
  return (
    <>
      <Head>
        <title>{`مشاهدة مباراة ${teamA} و ${teamB}`}</title>
        <meta property="og:title" content={`مشاهدة مباراة ${teamA} و ${teamB}`} />
      </Head>
      <main className='container'>
        <iframe src={link} scrolling="no" allow="autoplay" allowFullScreen={true} frameBorder="0" width={'100%'} height={'500'} ></iframe>
      </main>
    </>
  )
}



export default DynamicBeinSport

export async function getServerSideProps(context){
  const { query } = context;
  const tv = query.tvs;
  if( !query.tvs || tv === '/'){
    return { notFound: true }
  }
  const data = await axios.get(`${tv}`);
  const html = await data.data
  const $ = cheerio.load(html)
  let beinLink = $('.post-content iframe').attr('src')

  return{
    props:{
      link:`${beinLink}`,
      teamA: `${query.teama}`,
      teamB: `${query.teamb}`
    }
  }
}