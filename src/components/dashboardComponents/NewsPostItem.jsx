import React from 'react';



function NewsPostItem({ item }) {
    
//   return (
//     <div>NewsPostItem</div>
//  write as bellow to repeat news items  )

return (
    <div className="post-item clearfix">
      <img src={item.img} alt="" />
      <h4>
        <a href="#">{item.title}</a>
      </h4>
      <p>{item.subtitle}...</p>
      <h6>
      <a href="#"> Read More..{item.linktoSite} </a>
      </h6>
      
    </div>
  );
}

export default NewsPostItem