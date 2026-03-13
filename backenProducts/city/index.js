import {Router} from 'express'
import usersRoutes from './city.routes.js'

const router=Router()

router.use('/users',usersRoutes);

export default router