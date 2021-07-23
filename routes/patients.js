const pool = require('../config/dbconfig')
const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken')

function patients(){

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