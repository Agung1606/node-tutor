const http = require('http')

const server = http.createServer((req, res) => {
  // console.log(req.method, req.url, req.headers);
  const url = req.url
  // home page
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>home page</h1>')
    res.end()
  }
  // about page
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>about page</h1>')
    res.end()
  }
  // 404
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h1>page not found</h1>')
    res.end()
  }
})

server.listen(5000)

/*
res.end = This method signals to the server that all of the response headers and body have been sent;
          that server should consider this message complete. The method, res.end() MUST be called on each response.

if **data** is specified, it is similar in effect to calling response.write(data, encoding) followed by response.end(callback)

if **callback** is specified, it will be called when the response stream is finished
*/ 

/*
      HTTP METHODS
  
  GET    = Read Data
  POST   = Insert Data
  PUT    = Update Data
  DELETE = Delete Data

  Example;

  GET       www.store.com/api/orders         get all orders
  POST      www.store.com/api/orders         place an order (send data)
  GET       www.store.com/api/orders/:id     get single order (path params)
  PUT       www.store.com/api/orders/:id     update specific order (params + send data)
  DELETE    www.store.com/api/orders/:id     delete order (path params)
*/