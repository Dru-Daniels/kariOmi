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
    debugger

    const serializedPerformances = [] 
    if (performances != undefined) {
      for (const performance of performances) {
        const serializedPerformance = await PerformanceSerializer.getPerformanceDetails(performance)
        serializedPerformances.push(serializedPerformance)
      }
    }
    serializedSong.performances = serializedPerformances
    
    return serializedSong
  }
}

export default SongSerializer