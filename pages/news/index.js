import React from 'react';
import  Header from '../../Components/Header';
import Footer from  '../../Components/Footer';
import Head from 'next/head';
import axios from 'axios';
import New from '../../Components/New';

function NewsPage({ data }) {

  let [everyNews,setEveryNews] = React.useState([])

  React.useEffect(() => {
    let htmlDummy = document.createElement("html");
    htmlDummy.innerHTML = data;

    htmlDummy.querySelectorAll('#ulListing li').forEach(newInside => {
      if(!newInside.classList.contains('gap')){
        setEveryNews(old => {
          return[
            ...old,
            <New key={newInside.getAttribute('postid')} data={newInside} />
          ]
        })
      }
    })
  },[])

  return (
    <>
        <main className='container news-holder'>
          <div className='news'>
            {everyNews}
          </div>
        </main>
    </>
  )
}

export default NewsPage

export async function getServerSideProps(){
  const resp = await axios.get('https://www.yallakora.com/NewsListing');
  let html = await resp.data
  return{
      props:{
        data:html
      }
  }
}
