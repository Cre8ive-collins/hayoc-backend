const pool = require('../config/dbconfig')
const express = require('express');
const route = express.Router();

function patients(){
    route.get('/', (req, res) => {
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message : 'Internal server error',
                    error : err.message
                })
            }else{
                con.query(`SELECT * FROM hayok_patient`, (err, result) => {
                    if(err){
                        res.status(500).json({
                            message : 'Internal server error',
                            error : err.message
                        })
                    }else{
                        res.status(200).json({
                            message: "Success",
                            result
                        })
                    }
                })
            }
        })
    })
    // add patientencounter to DB
    route.post('/patientencounter', (req, res) => {
        const data = req.body
        pool.getConnection((err, con) => {
            const sql = `INSERT INTO hayok_patientencounter SET ?`
            if(err){
                res.status(500).json({
                    message : 'Internal server error',
                    error : err.message
                })
            }else{
                con.query(sql, data, (err, result) => {
                    con.release()
                    if(err){
                        res.status(500).json({
                            message : 'Internal server error',
                            error : err.message
                        })
                    }else{
                        res.status(200).json({
                            message: "Patient Encounter Updated"
                        })
                    }
                })
            }
        })
    })
    route.get('/one', (req, res) => {
        const param = req.query.id
        pool.getConnection((err, con) => {
            if(err){
                res.status(500).json({
                    message : 'Internal server error',
                    error : err.message
                })
            }else{
                con.query(`SELECT * FROM hayok_patient WHERE id = ${param}`, (err, result) => {
                    if(err){
                        res.status(500).json({
                            message : 'Internal server error',
                            error : err.message
                        })
                    }else{
                        if(result.length < 0.5){
                            res.status(404).json({
                                message : 'No Patient Found',
                            })
                        }else{

                            res.status(200).json({
                                message: "Success",
                                result
                            })
                        }
                    }
                })
            }
        })
    })
 
    route.post('/', (req, res) => {
        const data = req.body
        pool.getConnection((err, con) => {
            const sql = `INSERT INTO hayok_patient SET ?`
            if(err){
                res.status(500).json({
                    message : 'Internal server error',
                    error : err.message
                })
            }else{
                con.query(sql, data, (err, result) => {
                    con.release()
                    if(err){
                        res.status(500).json({
                            message : 'Internal server error',
                            error : err.message
                        })
                    }else{
                        res.status(200).json({
                            message: "Patient Added successfully"
                        })
                    }
                })
            }
        })
    })
     return route
 } 
 
 module.exports = patients()