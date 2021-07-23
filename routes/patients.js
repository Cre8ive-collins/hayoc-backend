const pool = require('../config/dbconfig')
const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken')

function patients(){

    route.get('/diagnosis' , (req, res) => {
        const id = req.query.id
        console.log(id)
        pool.getConnection((err, con) => {
            if(err) {
                res.status(500).json({
                    message: "Internal Server Error",
                    err: err.message

                })
            }else{
                con.query(`SELECT * FROM hayok_patientencounter WHERE patientId = ${id}`, (err, result) => {
                    if(err) {
                        res.status(500).json({
                            message: "Internal Server Error",
                            err: err.message
                        })
                    }else{
                        res.status(200).json({
                            result : result
                        })
                    }
                })
            }
        })
    })

    route.post('/login', (req, res) => {
        const data = req.body
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message : 'Intrnal Server Error'
                })
            }else{
                // CHECK EMAIL 
                con.query(`SELECT * FROM hayok_patient WHERE email = '${data.email}'`, (err, response) => {
                    if(err){
                        console.log(err)
                        res.status(500).json({
                            message : 'Intrnal Server Error'
                        })
                    }else{
                        // CHECK PASSWORD 
                        if(response[0].password == data.password){
                            const token = jwt.sign({ id: response[0].id }, 'secret');
                            res.status(200).json({
                                token : token,
                                message: 'Login Successfull',
                                id : response[0].id
                            })
                        }else{
                            res.status(401).json({
                                message : "Incorrect Details"
                            })
                        }
                    }
                })
            }
        })
    })

     return route
 } 
 
 module.exports = patients()