import React from 'react'
import {ToyPreview} from './ToyPreview.jsx'

export function ToyList({toys,removeToy,toggleFavourite}) {
    return (
        <div className="toy-list mt-2">
            {toys.map(toy=> <ToyPreview toy={toy} key={toy._id} removeToy={removeToy} 
            toggleFavourite={toggleFavourite} />)}
        </div>
    )
}
