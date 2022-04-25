// import '../styles/globals.css'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Head from 'next/head';
import '../styles/main.scss';
import Script from 'next/script';


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
      </Head>
      <Script src="https://www.google-analytics.com/analytics.js" />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}


export default MyApp


