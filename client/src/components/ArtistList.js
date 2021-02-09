import React, { useState, useEffect } from "react"

import SongTile from "./SongTile"

const ArtistList = (props) => {
  return(
    <div>
      <h1>Hello from the Artist List</h1>
      <SongTile />
    </div>
  )
}

export default ArtistList