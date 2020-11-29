const axios = require('axios')
const cors = require ('cors')
const express = require('express')

const key = '2616f7cb'

let cidade = 'Guaxupe'
let estado = 'MG'

const app = express()

app.use(cors())
app.get('/', async (req, res)=>{
    try {   
        const { data } = await axios(`https://api.hgbrasil.com/weather?key=${key}&city_name=${cidade},${estado}`)
        //console.log(data)
        //list()
        res.send(data)
        //return res.json(data)

    } catch (error) {
        console.log(error)
    }
    //return res.json(data)
})

app.listen('8000')