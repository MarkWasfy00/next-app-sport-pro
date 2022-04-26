import React from "react";
import Image from "next/image";

function New({data}) {
  
  return (
    <div className="new xsmall-regular">
      <div className='image-wrapper'>
        <Image priority src={data.newsImage} alt={data.newsTitle} width={320} height={300} quality={70} />
      </div>
      <div>{data.newsTitle}</div>
      <div className='realease-time testing'>
        <span>{data.newsTime}</span>
        <p>{data.newsDate}</p>
      </div>
    </div>
  );
}

export default New;
