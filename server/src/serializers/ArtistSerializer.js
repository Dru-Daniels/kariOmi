class ArtistSerializer {
  static getSummary(artist) {
    const allowedAttributes = ['id', 'artistName', 'imgUrl', 'description']
    const serializedArtist = {}

    for (const attribute of allowedAttributes) {
      serializedArtist[attribute] = artist[attribute]
    }

    return serializedArtist
  }

  static async getDetails(artist) {
    const serializedArtist = this.getSummary(artist)
    serializedArtist.songs = await artist.$relatedQuery("songs")
    return serializedArtist
  }
}

export default ArtistSerializer