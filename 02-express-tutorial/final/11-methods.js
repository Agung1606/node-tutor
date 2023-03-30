const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json atau handle incoming json data
app.use(express.json())

app.get('/api/people', (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
})
 
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, data: [...people, name] })
})

app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please Provide Credentials')
})

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})

app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})




/*
The express.urlencoded() function is a built-in middleware function in Express.
It parses incoming requests with urlencoded payloads and is based on body-parser. Read the document for more details


Encode means to change something into a programming code.
For instance, changing a letter into the binary code for that
letter or changing an analog sound into a digital file.
*/




// GET all user 
// app.get('/api/people', (req, res) => {
//     res.status(200).json({success: true, data: people})
// })

// // GET user by id
// app.get('/api/people/:id', (req, res) => {
//     const { id } = req.params;

//     const foundPeople = people.find(person => person.id === Number(id))

//     if(!(foundPeople)) {
//         return res
//             .status(404)
//             .json({
//                 success: false,
//                 message: `person with id : ${id} not found`
//             })
//     }

//     return res.status(200).json({success: true, data: foundPeople})
// })

// // POST new user
// app.post('/api/people', (req, res) => {
//     const {id, name} = req.body;
//     if(id === '' && name === '') {
//         return res
//             .status(400)
//             .json({
//                 success: false,
//                 message: 'please provide id and name value'
//             })
//     } else if(id === '' && name) {
//         return res
//             .status(400)
//             .json({
//                 success: false,
//                 message: 'please provide id value'
//             })
//     } else if(id && name === '') {
//         return res
//             .status(400)
//             .json({
//                 success: false,
//                 message: 'please provide name value'
//             })
//     }

//     res.status(200).json({success: true, data: [...people, req.body]})
// })

// // PUT 
// app.put('/api/people/:id', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;

//     const person = people.find(person => person.id === Number(id))
//     if(!(person)) {
//         return res
//             .status(400)
//             .json({
//                 success: false,
//                 message: `person with id: ${id} not found`
//             })
//     }

//     const newPeople = people.map(person => {
//         if(person.id === Number(id)) {
//             person.name = name;
//         }
//         return person;
//     })

//     res.status(200).json({success: true, data: newPeople})
// })

// // DELETE
// app.delete('/api/people/:id', (req, res) => {
//     const { id } = req.params;

//     const person = people.find(person => person.id === Number(id))
//     if(!(person)) {
//         return res
//             .status(400)
//             .json({
//                 success: false,
//                 message: `person with id: ${id} not found`
//             })
//     }

//     const newPeople = people.filter(person => person.id !== Number(id))
//     res.status(200).json({success: true, data: newPeople})
// })


// app.post('/login', (req, res) => {
//     const { name } = req.body
//     if (name) {
//         return res.status(200).send(`Welcome ${name}`)
//     }

//   res.status(401).send('Please Provide Credentials')
// })