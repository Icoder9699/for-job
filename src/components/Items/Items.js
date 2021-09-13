import React from 'react'

export default function Items({items}) {
   return (
      <div>
          {
            items ? items.map((item, index) => (
               <div key={index} className="product">
                  <h3>{item.name}</h3>
                  <p>Last updated date: {item.lastUpdateTime}</p>
               </div>
            ))
            : <h2>nothing is here :(</h2>
         }
      </div>
   )
}
