// import React, { useState, useEffect } from 'react'
// import Carousel from "react-elastic-carousel"

// import SongTile from './SongTile'

// const ArtistList = (props) => {
  
//   const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 550, itemsToShow: 2, itemsToScroll: 2 },
//     { width: 768, itemsToShow: 3 },
//     { width: 1200, itemsToShow: 4 }
//   ]
  
//   const [artist, setArtist] = useState({
//     id: '',
//     artistName: '',
//     songs: []
//   })

//   const artistId = props.artist.id

//   const getArtist = async () => {
//     try{
//       const response = await fetch(`/api/v1/artists/${artistId}`)
//       if(!response.ok) {
//         const errorMessage = `${response.status} ${response.statusText}`
//         const error = new Error(errorMessage);
//         throw(error)
//       }
//       const body = await response.json()
//       setArtist(body.artist)
//     } catch(error) {
//       console.error(`Error in fetch: ${error.message}`)
//     }
//   }

//   useEffect(() => {
//     getArtist()
//   }, [])

//   const songTiles = artist.songs.map((song) => {
//     return (
//       <SongTile
//         key={song.id}
//         song={song}
//         artistImg={artist.imgUrl}
//       />
//     )
//   })
//   return(
//     <div className="carousel-container">
//       <h2 className="artist-title">{artist.artistName}</h2>
//       <div>
//         <Carousel breakPoints={breakPoints}>
//           {songTiles}
//         </Carousel>
//       </div>
//     </div>
//   )
// }

// export default ArtistList