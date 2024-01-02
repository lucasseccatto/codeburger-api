import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:254dDed4baFfD6CE641B2FB-2BA*3e-g@viaduct.proxy.rlwy.net:25632/railway',
    )

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
        'mongodb://mongo:6ecC43ecHE6HfcCBEBGd3agcaBc4hCf1@monorail.proxy.rlwy.net:16477',
      )
      console.log('MongoDB connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the MongoDB database:', error)
    }
  }
}

export default new Database()
