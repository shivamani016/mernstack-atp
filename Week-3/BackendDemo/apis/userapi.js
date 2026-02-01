import exp from 'express'

// mini express router
export const userApp = exp.Router()

let users = []

// GET all users
userApp.get('/users', (req, res) => {
  res.status(200).json({
    message: "All users",
    payload: users
  })
})

// POST user
userApp.post('/users', (req, res) => {
  users.push(req.body)
  res.status(201).json({
    message: "User created",
    payload: users
  })
})

// PUT user
userApp.put('/users', (req, res) => {
  let updatedUser = req.body

  let index = users.findIndex(u => u.id === updatedUser.id)
  if (index === -1) {
    return res.status(404).json({ message: "User not found" })
  }

  users[index] = updatedUser
  res.status(200).json({ message: "User updated", payload: users })
})

// GET user by ID
userApp.get('/users/:id', (req, res) => {
  let uid = Number(req.params.id)

  let user = users.find(u => u.id === uid)
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  res.status(200).json({ message: "User found", payload: user })
})

// DELETE user
userApp.delete('/users/:id', (req, res) => {
  let uid = Number(req.params.id)

  let index = users.findIndex(u => u.id === uid)
  if (index === -1) {
    return res.status(404).json({ message: "User not found" })
  }

  users.splice(index, 1)
  res.status(200).json({ message: "User deleted", payload: users })
})
