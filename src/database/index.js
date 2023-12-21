import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'
import configDatabase from '../config/database'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)

    try {
      this.connection.authenticate()
      console.log('PostgreSQL connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the PostgreSQL database:', error)
    }

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  async mongo() {
    try {
      this.mongoConnection = await mongoose.connect(
        'mongodb://localhost:27017/codeburger',
      )
      console.log('MongoDB connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the MongoDB database:', error)
    }
  }
}

export default new Database()
