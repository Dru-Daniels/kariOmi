
const Model = require('./Model')

class Artist extends Model {
  static get tableName () {
    return 'artists'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        imgUrl: { type: 'string' },
        description: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    const Song = require('./Song.js')

    return {
      songs: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "artists.id",
          to: "songs.artistId"
        }
      }
    }
  }

}

module.exports = Artist