const express = require('express')
const app = express()

//  req => middleware => res

// app.use('/api', logger); // we can add the path here, so that the logger will just invoke if the path start with /api

const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)
  next()
}

app.get('/', logger, (req, res) => {
  res.send('Home')
})
app.get('/about', logger, (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})


/*
Middleware adalah fungsi yang digunakan untuk mengakses permintaan object (req),
respons object (res), dan setiap siklus permintaan dan respon tersebut (next).

Pada Express.js, cara kerja Middleware adalah dengan mengeksekusi setiap skrip,
membuat perubahan terhadap permintaan dan respons object, mengakhiri siklus permintaan-respons,
lalu menyiapkan Middleware untuk siklus berikutnya.
*/
