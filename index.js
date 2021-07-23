const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000 

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use((req, res ,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
    if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', '*')
      return res.status(200).json({})
    }
  })



app.get('/', (req, res) => {
  res.send('Hello World!')
})

const healthworker = require('./routes/healthworker')
app.use('/healthworker/patient' , healthworker)

const patient = require('./routes/patients')
app.use('/patient', patient)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

