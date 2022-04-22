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
        <Head>
        <title>ELNEWS</title>
            <meta charSet="UTF-8" />
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
            <link
            rel="icon"
            href="/var.png"
            type="image/gif"
            sizes="16x16"
            />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossOrigin="anonymous" referrerpolicy="no-referrer"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerpolicy="no-referrer"/>
        </Head>
        <Header />
        <main className='container news-holder'>
          <div className='news'>
            {everyNews}
          </div>
        </main>
        <Footer/>
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
