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
      "userId",
      'trackId'
    ]

    let serializedSong = {}

    for (const attribute of allowedAttributes) {
      serializedSong[attribute] = song[attribute]
    }

    const performances = await song.$relatedQuery("performances")

    serializedSong.performances = await Promise.all(
      performances.map(performance => {
        return PerformanceSerializer.getPerformanceDetails(performance)
      })
    )
   
    return serializedSong
  }

  static async getSongStats(song) {
    const serializedSong = this.getDetails(song)

    const performances = await song.$relatedQuery("performances")
    
    serializedSong.performances = await Promise.all(
      performances.map(performance => {
        return PerformanceSerializer.getPerformanceDetails(performance)
      })
      )

    return serializedSong
  }
}

export default SongSerializer