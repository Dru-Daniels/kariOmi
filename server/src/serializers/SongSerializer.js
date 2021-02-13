import PerformanceSerializer from './PerformanceSerializer.js'

class SongSerializer {
  static async getDetails(song) {
    const allowedAttributes = [
      'id', 
      'songTitle', 
      'karaokeVideoId', 
      'lyricVideoId', 
      'lyrics', 
      "practiceNotes", 
      "performanceReady", 
      "artistId", 
      "userId"
    ]

    let serializedSong = {}

    for (const attribute of allowedAttributes) {
      serializedSong[attribute] = song[attribute]
    }

    // serializedSong.performances = await song.$relatedQuery('performances')
    // serializedSong.performances = await Promise.all(serializedSong.performances.map(performance => {
    //   return PerformanceSerializer.getDetails(performance)
    // }))

    return serializedSong
  }
}

export default SongSerializer