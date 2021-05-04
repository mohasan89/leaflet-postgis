import {getCountries, getCities, getUserData, postUserData, deleteUserData, putUserData} from '../controllers/getData'
import express from 'express'

const route = express.Router()

route.get('/countries', getCountries)
route.get('/cities', getCities)
route.get('/userdata', getUserData)
route.post('/userdata', postUserData)
route.delete('/userdata', deleteUserData)
route.put('/userdata', putUserData)


export default route