import React from 'react';
import axios from 'axios';
import New from '../../Components/New';
import * as cheerio from 'cheerio';

function NewsPage({ data }) {

  let [everyNews,setEveryNews] = React.useState([])

  let allNews = JSON.parse(data);
  let allNewsArray = []
  for(let news in allNews){
    allNewsArray.push(<New key={news} data={allNews[news]} />)
  }

  return (
    <>
        <main className='container news-holder'>
          <div className='news'>
            {allNewsArray}
          </div>
        </main>
    </>
  )
}

export default NewsPage

export async function getServerSideProps(){
  const resp = await axios.get('https://www.yallakora.com/NewsListing');
  let html = await resp.data
  const $ = cheerio.load(html)

  function getNews(){

    let finalList = {};
    let counter = 0;

    let filterList = $('#ulListing li').filter((i,elem) => {
      if($(elem).attr('postid')){
        return $(elem)
      }
    })
    
    
    for(let news of filterList){
      finalList[`${counter}`] = {}
      finalList[`${counter}`].id = $(news).attr('postid');
      finalList[`${counter}`].newsTitle = $(news).find('a .desc p').html();
      finalList[`${counter}`].newsDate = $(news).find('a .time').children().first().html();
      finalList[`${counter}`].newsTime = $(news).find('a .time').children().last().html();
      finalList[`${counter}`].newsImage = $(news).find('a .imageCntnr img').attr('data-src');
      ++counter
    }
    
    return JSON.stringify(finalList)
  }
  
  return{
      props:{
        data:getNews(),
        
      }
  }
}
