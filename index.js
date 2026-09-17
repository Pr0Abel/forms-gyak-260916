const express = require('express')
const multer = require('multer')
const app = express()

const upload = multer()

app.use(express.urlencoded())
app.use(express.json())

//GET /hello-world
app.get('/hello-world', (req, res) => res.status(200).send('Hello World!'))

//POST /name
app.post('/name', (req, res) => {
  console.log("req.body", req.body)
  const {name} = req.body
  return res.status(201).json({todo: "TODO"})
})

//POST /avatar
app.post('/avatar', upload.single('file'), (req, res) => {
  //console.log("avatar file", req.file)
  //console.log("avatar abody", req.body)
  const avatar = {
    metadata: req.file,
    body: req.body
  }

  console.log("avatar", avatar)

  if (avatar.metadata.mimetype == 'text/plain') {
    const textContent = avatar.metadata.buffer.toString('utf-8')
    console.log("textContent", textContent)
  }
  
  return res.status(201).json({ok: true})
})

const port = 3000
app.listen(port, () => {
  console.log("Server is running on port:",port)
})