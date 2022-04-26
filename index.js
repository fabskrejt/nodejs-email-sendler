
const app = require('express')()
const cors = require('cors')

app.use(cors())
app.use(require('express').json())

const host = 'localhost'
const port = 3010

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
})
const nodemailer = require('nodemailer')

const smtp_login =  process.env.SMTP_LOGIN
const smtp_password =  process.env.SMTP_PASSWORD

let transporter = nodemailer.createTransport({
service: 'gmail',
  auth: {
    user: smtp_login,
    pass: smtp_password,
  },
})


app.post('/sendmsg',async (req, res) => {
  const {name, email, comment} = req.body

    transporter.sendMail({
        from: 'Portfolio',
        to: 'mailfordevelopsva@gmail.com',
        subject: 'Message from Portfolio',
        text: 'This message was sent from Node js server.',
        html:
         ` Name: ${name}, <br/> Email: ${email}, <br/> Comment: ${comment}  `,
      })
      
        res.status(200).type('text/plain')
        res.send('Message send')
      })
      
