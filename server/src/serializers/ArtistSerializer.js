import SongSerializer from './SongSerializer.js'

class ArtistSerializer {
  static getSummary(artist) {
    let allowedAttributes = ['id', 'artistName', 'userId', 'imgUrl', 'description']
    let serializedArtist = {}

    for (let attribute of allowedAttributes) {
      serializedArtist[attribute] = artist[attribute]
    }

    return serializedArtist
  }

  static async getDetails(artist, userId) {
    let serializedArtist = this.getSummary(artist)
    serializedArtist.songs = await artist.$relatedQuery("songs").where("userId", userId).orderBy('songTitle')
    return serializedArtist
  }
}

export default ArtistSerializer