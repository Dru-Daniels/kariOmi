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
   
    return serializedSong
  }

  static async getSongStats(song) {

    const serializedSong = this.getDetails(song)
    const performances = await song.$relatedQuery("performances")

    const serializedPerformances = [] 
    let scores = []
    if (performances.length > 0) {
      for (const performance of performances) {
        const serializedPerformance = await PerformanceSerializer.getPerformanceDetails(performance)
        serializedPerformances.push(serializedPerformance)
        scores.push(parseFloat(serializedPerformance.performanceScore))
      }
    }
    let length = scores.length
    let total = scores.reduce((a,b) => a + b, 0)
    let overAllScore = (total / length).toFixed(1)

    serializedSong.performances = serializedPerformances
    serializedSong.overallSongScore = overAllScore
    
    
    return serializedSong
  }
}

export default SongSerializer