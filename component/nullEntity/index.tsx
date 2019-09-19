import * as React from "react";
import './style.scss'
export default function NullEntity(props:any){
   const {title,desc,render}=props
    return (
        <div className="null-entity">
            <img src="/assets/imgs/null.png"></img>
            <p>{title}</p>
            <p>{desc}</p>
            {render(null)}
        </div>
    )
}