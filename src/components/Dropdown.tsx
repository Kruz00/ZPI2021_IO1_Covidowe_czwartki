import React, {useState} from 'react';
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

const Dropdown = ({title, items, callback}
                    : { title: string; items: string[]; callback: Function; }) => {
  return (
    <div>
      <div>{title}</div>
      <DropdownList onChange={value => callback(value)} data={items}/>
    </div>
  )
}
export default Dropdown