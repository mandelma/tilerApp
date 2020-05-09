const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
const selectAll = 'SELECT * FROM users'

/* const connection = mysql.createConnection({
  host: 'd87427.mysql.zonevs.eu',
  user: 'd87427sa338853',
  password: 'aSeeonSiisAb',
  database: 'd87427sd378719'
}) */

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiler'
})

connection.connect(err => {
  if(err) {
    console.log('Error: not connected to database')
    return err
  }
  else {
    console.log('Database is connected!')
  }
})

app.use(cors())
app.use(express.static('build'))
//app.use(express.static(path.join(__dirname, 'build')))

//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'build', 'index.html'))
//})

app.get('/', (req,res) => {
  res.send('Go to users to see users')
})

app.get('/users', (req, res) => {
  connection.query(selectAll, (err, result) => {
    if(err) {
      
      return res.send(err)
    }
    else {
     
      res.json(result)
    }
  })
})



app.get('/users/add', (req, res) => {
  const { name, age } = req.query
  const addUser = `INSERT INTO users (name, age) VALUES ('${name}', '${age}')`
  connection.query(addUser, (err, result) => {
    if(err) {
      console.log('Error: cant add a user to database', err)
      return res.err
    }
    else{
      console.log('User added succesfully!')
      return res.send(result)
    }
  })
})

app.get('/users/change', (req, res) => {
  const { id, name, age } = req.query
  const updateUser = `UPDATE users SET name = '${name}', age = '${age}' WHERE id = ${id}`
  connection.query(updateUser, (err, result) => {
    if(err) {
      console.log('Error: ', err)
      res.err
    }
    else {
      console.log('Database updated succesfully!')
      res.send(result)
    }
  })
})

app.get('/users/delUser', (req, res) => {
  const { name, age } = req.query
  console.log('name on: ', name)
  const deleteUser = `DELETE FROM users WHERE name = '${name}'`
  connection.query(deleteUser, (err, result) => {
    if(err) {
      console.log('Error: cant delete user from database', err)    
      res.send('cant delete')
    }
    else {
      console.log('User deleted!')
      res.send('User deleted!')
    }
    
  })
})

module.exports = app