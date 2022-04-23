import React from "react";
import Image from "next/image";

function New(props) {
  let newsTitle,newsDate,newsTime,newsImage
  newsTitle = props.data.querySelector('a .desc p').innerHTML;
  newsDate = props.data.querySelector('a .time span').innerHTML;
  newsTime  = props.data.querySelectorAll('a .time span')[1].innerHTML;
  newsImage = props.data.querySelector('a .imageCntnr img').getAttribute('data-src');
  return (
    <div className="new xsmall-regular">
      <div className='image-wrapper'>
        <Image priority src={newsImage} alt={newsTitle} width={320} height={300} quality={50} />
      </div>
      <div>{newsTitle}</div>
      <div className='realease-time testing'>
        <span>{newsTime}</span>
        <p>{newsDate}</p>
      </div>
    </div>
  );
}

export default New;
