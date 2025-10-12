// 代码生成时间: 2025-10-13 02:46:29
 * A RESTful API interface implementation using Svelte and JS.
 *
 * Features:
 * - Code structure is clear and understandable.
 * - Includes proper error handling.
 * - Contains necessary comments and documentation.
 * - Follows JS best practices.
 * - Ensures code maintainability and extensibility.
 */

// Import necessary modules
const express = require('express');
const app = express();

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the port for the server to run on
const PORT = process.env.PORT || 3000;

// Sample data for demonstration purposes
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// GET /users - Retrieve all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// GET /users/:id - Retrieve a single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Update a user by ID
app.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users[userIndex].name = req.body.name;
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});