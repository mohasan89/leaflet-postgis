import { Request,  NextFunction, Response } from "express";
import db from '../model/database'

export const getCountries = (req:Request, res:Response, next: NextFunction) => {
    db.query('SELECT json_build_object(\'id\', country_id, \'name\', country_name, \'iso\',iso_a3) as properties, st_asgeojson(geom)::json as geometry, \'Feature\' as type FROM countries;')
    .then(results => {
        res.json(results[0]); 
    })
    .catch(err=> {
        err.status = 500; 
        next(err)
    })
}

export const getCities = (req:Request, res:Response, next: NextFunction) => {
    db.query('SELECT json_build_object(\'id\', id, \'name\', city,  \'population\',population, \'capital\',capital, \'country\',country) as properties, st_asgeojson(geom)::json as geometry, \'Feature\' as type from cities')
    .then(results=> {
        res.json(results[0])
    })
    .catch(err=> {
        err.status = 500; 
        next(err)
    })
}

export const getUserData = (req:Request, res:Response, next: NextFunction) => {
    db.query('select * from user_data where DATE_PART(\'day\', now()-created_at)<1;')
    .then(results=> {
        res.json(results[0])
    })
    .catch(err=> {
        err.status = 500; 
        next(err)
    })
}

export const postUserData = (req:Request, res:Response, next: NextFunction) => {
    
    if(req.body.geometry.type === 'Point'){
        req.body.geometry.coordinates = [req.body.geometry.coordinates[1], req.body.geometry.coordinates[0]]
    }

    db.query(`insert into user_data (geom)values (st_geomfromgeojson('${JSON.stringify(req.body.geometry)}'));`)
    .then(results=> {
        res.json(results[0])
    })
    .catch(err=> {
        err.status = 500; 
        next(err)
    })
}



export const deleteUserData = (req:Request, res:Response, next: NextFunction) => {
    if(req.body.geometry.type === 'Point'){
        req.body.geometry.coordinates = [req.body.geometry.coordinates[1], req.body.geometry.coordinates[0]]
    }

    db.query(`delete from user_data where geom = st_geomfromgeojson('${JSON.stringify(req.body.geometry)}');`)
    .then(results=> {
        res.json(results[0])
    })
    .catch(err=> {
        err.status = 500; 
        next(err)
    })
}


export const putUserData = (req:Request, res:Response, next: NextFunction) => {
    if(req.body.geometry_update.type === 'Point'){
        req.body.geometry_update.coordinates = [req.body.geometry_update.coordinates[1], req.body.geometry_update.coordinates[0]]
        req.body.geometry.coordinates = [req.body.geometry.coordinates[1], req.body.geometry.coordinates[0]]

    }

    db.query(`update user_data set geom = st_geomfromgeojson('${JSON.stringify(req.body.geometry_update)}') where geom = st_geomfromgeojson('${JSON.stringify(req.body.geometry )}');`)
    .then(results=> {
        res.json(results[0])
    })
    .catch(err=> {
        err.status = 500; 
        next(err)
    })
}