
const Model = require('./Model')

class Artist extends Model {
  static get tableName () {
    return 'artists'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['artistName', 'userId'],
      properties: {
        name: { type: 'string' },
        userId: { type: ['string', 'integer'] },
        imgUrl: { type: 'string' },
        description: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const { User, Song } = require('./index.js')

    return {
      songs: {
        relation: Model.HasManyRelation,
        modelClass: Song,
        join: {
          from: "artists.id",
          to: "songs.artistId"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'artists.userId',
          to: 'users.id'
        } 
      }
    }
  } 

}

module.exports = Artist