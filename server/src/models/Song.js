const Model = require('./Model')

class Song extends Model {
  static get tableName() {
    return 'songs'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['songTitle', 'performanceReady', 'artistId', 'userId'],
      properties: {
        songTitle: {type: 'string'},
        karaokeVideoId: {type: 'string'},
        lyricVideoId: {type: 'string'},
        lyrics: {type: 'string'},
        practiceNotes: {type: 'string'},
        performanceReady: {type: ['boolean', 'string']},
        artistId: {type: ['integer', 'string']},
        userId: {type: ['integer', 'string']},
        trackId: {type: ['integer', 'string']}
      }
    }
  }

  static get relationMappings() {
    const { Artist, User, Performance } = require('./index.js')

    return {
      artist: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: 'songs.artistsId',
          to: 'artists.id'
        } 
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'songs.userId',
          to: 'users.id'
        } 
      },
      performances: {
        relation: Model.HasManyRelation,
        modelClass: Performance,
        join: {
          from: 'songs.id',
          to: 'performances.songId'
        }
      }
    }
  }
  
}

module.exports = Song
