// import '../styles/globals.css'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Head from 'next/head';
import '../styles/main.scss';



function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>ELVAR</title>
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
            <link rel="icon" href="/var.png" type="image/gif" sizes="16x16" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2196629982967702" crossOrigin="anonymous"></script>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}


export default MyApp


