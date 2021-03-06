import PerformanceSerializer from './PerformanceSerializer.js'

class SongSerializer {
  static getDetails(song) {
    let allowedAttributes = [
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

    for (let attribute of allowedAttributes) {
      serializedSong[attribute] = song[attribute]
    }
   
    return serializedSong
  }

  static async getSongStats(song) {

    let serializedSong = this.getDetails(song)

    let performances = await song.$relatedQuery("performances")

    let serializedPerformances = [] 
    let serializedPerformance
    let scores = []
    if (performances.length > 0) {
      for (let performance of performances) {
        serializedPerformance = await PerformanceSerializer.getPerformanceDetails(performance)
        serializedPerformances.push(serializedPerformance)
        scores.push(parseFloat(serializedPerformance.performanceScore))
      }
    }
    let length = scores.length
    let total = scores.reduce((a,b) => a + b, 0)
    let overAllScore = (total / length).toFixed(1)
    
    if(!isFinite(overAllScore)) {
      overAllScore = 0
    }

    serializedSong.performances = await serializedPerformances
    serializedSong.overallSongScore = await overAllScore

    return serializedSong
  }
}

export default SongSerializer