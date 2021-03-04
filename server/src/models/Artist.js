
const Model = require('./Model')

class Artist extends Model {
  static get tableName () {
    return 'artists'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['artistName'],
      properties: {
        name: { type: 'string' },
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
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'artists.id',
          through: {
            from: 'songs.artistId',
            to: 'songs.userId'
          },
          to: 'users.id'
        } 
      }
    }
  } 

}

module.exports = Artist