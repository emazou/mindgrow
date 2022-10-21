import React from 'react'
import '../../styles/Products.css'
export default function SearchBar(props) {
    return (
        <div className='search-box'>
            <input type="text" placeholder='Search here' id='searchbar' value={props.value} onChange={props.onChange} />
        </div>
    )
}
