const express = require('express'); // Import express js
const app = express(); // instantiate express js
const path = require('path'); // import path module

const port = 5000;
const hostName = 'localhost';

// setup static and middleware
app.use(express.static('./public/homePages'))

/*
app.use() is for setting up the middleware

static file means that it is a file that server doesn't have change it. instead of our http example where
we have to create a path for every such resource.

the common name for that folder is public or static


static assets are just files that server doesn't have to change and an example of static file is image file, style file, and javascript file. 


Javascript makes our web app dynamic
*/

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
    /*
    Remember that path module is used to get/determine the path of a file
    and __dirname is the current directory

    path.resolve() for provide the absolute file path or we can use path.join(). in this case whatever we wanna use it acts the same.
    */
})

// For handle the resource that does not exist
app.all('*', (req, res) => {
    res.status(404).send('resource not found')
})

app.listen(port, hostName, '', () => {
    console.log(`server is listening on port ${port}.......` );
})


/*
Middleware adalah sebuah fungsi yang dapat mengakses request dan response.
Middleware merupakan penengah, kalau di dalam aplikasi middleware adalah sebuah
aturan yang harus dilewati oleh system terlebih dahulu untuk mausk atau keluar dari system.

Dengan Middleware kita dapat melakukan:
1. Mengubah object request dan response.
2. Mengakhiri request dan response.
3. Dapat mengeksekusi kode tertentu.
*/

























// const express = require('express')
// const path = require('path')

// const app = express()

// // setup static and middleware
// app.use(express.static('./public'))

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })

// app.all('*', (req, res) => {
//   res.status(404).send('resource not found')
// })

// app.listen(5000, () => {
//   console.log('server is listening on port 5000....')
// })
