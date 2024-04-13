const User = require("./models/user");

class Database {
  constructor() {
    this.users = [];
    this.initializeDummyUsers();
  }

  initializeDummyUsers() {
    const dummyUsers = [
      {
        id: 1,
        username: "Natu Ranjon",
        age: 30,
        hobbies: ["Reading", "Running"],
      },
      {
        id: 2,
        username: "Indra Mondal",
        age: 25,
        hobbies: ["Painting", "Cooking"],
      },
      {
        id: 3,
        username: "Dhananjay Mondal",
        age: 28,
        hobbies: ["Gardening", "Traveling"],
      },
    ];

    dummyUsers.forEach((user) => {
      const newUser = new User(user);
      this.users.push(newUser);
    });
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(userId) {
    return this.users.find((user) => user.id === userId);
  }

  createUser(userData) {
    const newUser = new User(userData);
    this.users.push(newUser);
    return newUser;
  }

  updateUser(userId, updatedData) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedData };
      return this.users[userIndex];
    }
    return null;
  }

  deleteUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}

module.exports = new Database();
