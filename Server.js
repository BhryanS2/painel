const axios = require('axios')
const cors = require('cors')
const express = require('express')
const BodyParser = require('body-parser')

const key = '2616f7cb'

let cidade = 'Guaxupe'
let estado = 'MG'

const app = express()

app.use(BodyParser.urlencoded({ extend: false }))
app.use(BodyParser.json())

app.use(cors())

app.get('/', async (req, res) => {
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

app.get(`/View`, async (req, res) => {
    let cidade = req.body.cidade
    let estado = req.body.estado

    console.log(cidade, estado)

})

app.listen(8000, () => {
    console.log('rodando: http://localhost:8000/')
})