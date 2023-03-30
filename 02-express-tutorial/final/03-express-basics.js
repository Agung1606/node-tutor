const express = require('express') // import express js
const app = express() // instantiate express js after we import it

const port = 5000;
const hostName = 'localhost';

app.get('/', (req, res) => {
    console.log('user hit resource');
    res.status(200).send('<h1>Hello, Agung</h1>')
})

app.get('/about', (req, res) => {
    res.status(200).send('<p style="font-size: 2rem; color: blue;">agung is a good boy</p>')
})

app.all('*', (req, res) => {
    res.status(404).send('<p style="font-size: 2rem; color: red;">Page Not Found :( </p>')
})

app.listen(port, hostName, '', () => {
    console.log(`server running on port ${port}`);
})

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
