const Model = require('./Model')

class Performance extends Model {
  static get tableName() {
    return 'performances'
  }

  static get jsonSchema(){
    return {
      type: 'object',
      required: ['userId', 'songId', 'stagePresence', 'vocalPerformance', 'numOfDrinks', 'audienceReaction'],
      properties: {
        userId: { type: ['integer', 'string']},
        songId: { type: ['integer', 'string']},
        stagePresence: { type: ['integer', 'string']},
        vocalPerformance: { type: ['integer', 'string']},
        numOfDrinks: { type: ['integer', 'string']},
        audienceReaction: { type: ['integer', 'string']},
        venue: { type: 'string'},
        notes: { type: 'string'},
        videoFile: { type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const { User, Song } = require('./index.js')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'performances.userId',
          to: 'users.id'
        }
      },
      song: {
        relation: Model.BelongsToOneRelation,
        modelClass: Song,
        join: {
          from: 'performances.songId',
          to: 'songs.id'
        }
      }
    }
  }
} 

module.exports = Performance