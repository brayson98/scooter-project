const Scooter = require("./Scooter.js");
const User = require("./User.js");

class ScooterApp {
  // ScooterApp code here
  constructor() {
    
    this.stations = {
        "Station A": [],
        "Station B": [],
        "Station C": []
    };

   
    this.registeredUsers = {};
}

registerUser(username, password, age) {
  if (this.registeredUsers[username]) {
    throw new Error("User is already registered")
  }
  if (age < 18) {
    throw new Error("User is too young")
  }

  const newUser = new User(username, password, age) 
  this.registeredUsers[username] = newUser;
  console.log(`User ${username} has been registered.`);
  return newUser;
}

loginUser(username, password) {
  const user = this.registeredUsers[username] 

  if (!user) {
    throw new Error("Username or password is incorrect")
  }

  try {
    user.login(password);
    console.log(`User ${username} has been logged in`)
  } catch (error) {
    throw new Error("Username or password is incorrect.");
}
}

logoutUser(username) {
  const user = this.registeredUsers[username] 
  if (!user) {
    throw new Error("Username or password is incorrect")
  } try {
    user.logout()
    console.log(`${username} has successfully logged out`)

  } catch (error) {
    throw new Error("No such user is logged in")
  }
}

createScooter(station) {
  if (!this.stations[station]) {
    throw new Error("No such station error: The specified station does not exist.");
}
  const scooter = new Scooter(station);
  this.stations[station].push(scooter);
  console.log("Created new scooter:", scooter);
  return scooter;
}
  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station")
    } 
    if (scooter.station === station) {
      throw new Error("Scooter already at station error: This scooter is already docked at this station.");
    }

    scooter.dock(station)
    this.stations[station].push(scooter);
    console.log(`The scooter ${scooter.serial} has been docked to station ${station}`)
    return scooter;
    }

  rentScooter(scooter, user) {
      if (scooter.user !== null) {
        throw new Error("Scooter is already rented")
      }
      scooter.rent(user)
      console.log(`Scooter is now rented by ${user.username}`)
    }

    print() {
      console.log("Registered Users:", this.registeredUsers); 
      console.log("Stations:", this.stations); 
  }
}


module.exports = ScooterApp;
