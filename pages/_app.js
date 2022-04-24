// import '../styles/globals.css'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Head from 'next/head';
import Script from 'next/script'
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
            <link
            rel="icon"
            href="/var.png"
            type="image/gif"
            sizes="16x16"
            />
                        
            </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
