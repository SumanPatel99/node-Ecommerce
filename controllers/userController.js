// userController.js
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

function getUsers() {
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(usersData);
}

function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

function getUserById(userId) {
  const users = getUsers();
  return users.find(user => user.id === userId);
}

//signup requestdata
// {
//     "username": "john_doe",
//     "email": "john@example.com",
//     "password": "password123"
//   }

// {
//     "username": "updated_username",
//     "email": "updated_email@example.com"
//   }


function createUser(userData) {
  const users = getUsers();
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    ...userData
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

function updateUser(userId, updatedUserData) {
  const users = getUsers();
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUserData };
    saveUsers(users);
    return true;
  }
  return false;
}

function deleteUser(userId) {
  const users = getUsers();
  const updatedUsers = users.filter(user => user.id !== userId);
  saveUsers(updatedUsers);
  return true;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
