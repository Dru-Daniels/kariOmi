class ArtistSerializer {
  static getSummary(artist) {
    let allowedAttributes = ['id', 'artistName', 'userId', 'imgUrl', 'description']
    let serializedArtist = {}

    for (let attribute of allowedAttributes) {
      serializedArtist[attribute] = artist[attribute]
    }

    return serializedArtist
  }

  static async getDetails(artist) {
    let serializedArtist = this.getSummary(artist)
    serializedArtist.songs = await artist.$relatedQuery("songs")
    return serializedArtist
  }
}

export default ArtistSerializer