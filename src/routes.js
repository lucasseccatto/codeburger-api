import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import UserController from './app/controllers/UserController'
import CategoryController from './app/controllers/CategoryController'
import OderController from './app/controllers/OderController'

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to my API' })
})

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)

routes.post('/orders', OderController.store)
routes.put('/orders/:id', OderController.update)
routes.get('/orders', OderController.index)

export default routes
