import { useEffect,useReducer } from "react";
import axios from "axios";



function reducer(state,action) {
  switch (action.type){
      case 'liveLink':
          return {...state,liveLink:action.payload}
      default:
          return {...state}
  }
}


function DynamicBeinSport({ data }) {

  const [matchesData , dispatch] = useReducer(reducer,{liveLink:'https://canal.goalarab.com/tv/tv/bein1/'});


  useEffect(() => {
    let htmlDummy = document.createElement("html");
    htmlDummy.innerHTML = data;
    let content = htmlDummy.getElementsByTagName('body')[0].querySelector('.post-content iframe');
    if(content){
      let beinChannel = content.getAttribute('src')
      dispatch({type:'liveLink',payload:`${beinChannel}`})
    }
  },[])

  return (
    <>
      <main className='container'>
      <iframe src={matchesData.liveLink} scrolling="no" allow="autoplay" allowFullScreen={true} frameBorder="0" width={'100%'} height={'500'} ></iframe>
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

  return{
    props:{
      data:data.data,
    }
  }
}