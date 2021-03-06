/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require('bcrypt')
const unique = require('objection-unique')
const Model = require('./Model')

const saltRounds = 10

const uniqueFunc = unique({
  fields: ['email'],
  identifiers: ['id'],
})

class User extends uniqueFunc(Model) {
  static get tableName() {
    return 'users'
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds)
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword)
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],

      properties: {
        email: { type: 'string' },
        cryptedPassword: { type: 'string' },
      },
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json)

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword
    }

    return serializedJson
  }

  static get relationMappings() {
    const { Song, Performance, Artist } = require('./index.js')

    return {
      songs: {
        relation: Model.HasManyRelation,
        modelClass: Song,
        join: {
          from: 'users.id',
          to: 'songs.userId'
        }
      },
      performances: {
        relation: Model.HasManyRelation,
        modelClass: Performance,
        join: {
          from: 'users.id',
          to: 'performances.userId'
        }
      },
      artists: {
        relation: Model.ManyToManyRelation,
        modelClass: Artist,
        join: {
          from: 'users.id',
          through: {
            from: 'songs.userId',
            to: 'songs.artistId'
          },
          to: 'artists.id'
        }
      },
    }
  }

}

module.exports = User