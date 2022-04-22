import React from "react";
import Image from "next/image";

function New(props) {
  let newsTitle,newsDate,newsTime,newsImage
  newsTitle = props.data.querySelector('a .desc p').innerHTML;
  newsDate = props.data.querySelector('a .time span').innerHTML;
  newsTime  = props.data.querySelectorAll('a .time span')[1].innerHTML;
  newsImage = props.data.querySelector('a .imageCntnr img').getAttribute('data-src');
  console.log(newsTitle,newsDate,newsTime,newsImage)
  return (
    <div className="new xsmall-regular">
      <Image priority src={newsImage} alt={newsTitle} width={320} height={300} />
      <div>{newsTitle}</div>
      <p>{newsDate}</p>
    </div>
  );
}

export default New;
