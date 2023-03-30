const express = require('express')
const path = require('path')

const app = express()

// setup static and middleware
app.use(express.static('./public'))

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
//   adding to static assets
//   SSR
// })

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})

/*
Static Files adalah file yang dapat diunduh oleh client dari server,
contohnya adalah gambar, file CSS, dan file JavaScript. Static files umumnya
disimpan di dalam folder public.

Nah, untuk menyiapkan static files tersebut Express.js menggunakan fungsi yang
disebut express.static. Cara kerjanya dengan menuliskan skrip pada file index.js
untuk menampilkan file-file yang berada pada folder public.
*/
