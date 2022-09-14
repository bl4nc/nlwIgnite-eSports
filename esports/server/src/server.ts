import express from 'express'

const app = express()

app.get('/', (req, res) => {
console.log('runs')
 })

app.listen(3333)

console.log('listening on http://localhost:3333')