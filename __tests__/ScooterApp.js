const { describe, expect, it } = require("@jest/globals");
const ScooterApp = require("../classes/ScooterApp.js");
const User = require("../classes/User.js")
const Scooter = require("../classes/Scooter.js")

describe("Scooter class", () => {
  let scooterApp;
  let user;

  beforeEach(() => {
    scooterApp = new ScooterApp();
    user = new User("testUser", "password123", 20);
  });


describe("ScooterApp.registerUser(username, password, age)", () => {
  it("registers a new user if old enough", () => {
    

    const registeredUser =   scooterApp.registerUser(user.username, user.password, user.age);
    expect(registeredUser.username).toBe(user.username);
    expect(registeredUser.password).toBe(user.password);
    expect(registeredUser.age).toBe(user.age);
    expect(scooterApp.registeredUsers[user.username]).toBe(registeredUser);
  });

  it("throws an error if too young or already registered", () => {
    scooterApp.registerUser(user.username, user.password, user.age);
    expect(() => scooterApp.registerUser("youngUser", "password", 16)).toThrow("User is too young");
    expect(() => scooterApp.registerUser(user.username, "password", 25)).toThrow("User is already registered");
  });
});

describe("ScooterApp.loginUser(username, password)", () => {
  it("logs in a registered user", () => {
    scooterApp.registerUser(user.username, user.password, user.age);
    scooterApp.loginUser(user.username, user.password);
    expect(scooterApp.registeredUsers[user.username].loggedIn).toBe(true);
  });

  it("throws an error if user not found or password incorrect", () => {
    scooterApp.registerUser(user.username, user.password, user.age);
    expect(() => scooterApp.loginUser("nonExistentUser", user.password)).toThrow("Username or password is incorrect");
    expect(() => scooterApp.loginUser(user.username, "wrongPassword")).toThrow("Username or password is incorrect");
  });
});

describe("ScooterApp.logoutUser(username)", () => {
  it("logs out a registered user", () => {
    scooterApp.registerUser(user.username, user.password, user.age);
    scooterApp.loginUser(user.username, user.password);
    scooterApp.logoutUser(user.username);
    expect(scooterApp.registeredUsers[user.username].loggedIn).toBe(false);
  });

  it("throws an error if user not found", () => {
    expect(() => scooterApp.logoutUser("nonExistentUser")).toThrow("Username or password is incorrect");
  });
});

describe("ScooterApp.createScooter(station)", () => {
  it("creates a new scooter and adds it to ScooterApp.stations", () => {
    const stationName = "Station A";
      const scooter = scooterApp.createScooter(stationName);
      expect(scooter).toBeInstanceOf(Scooter);
      expect(scooterApp.stations[stationName]).toContain(scooter);
  });

  it("throws an error if a station does not exist", () => {
    expect(() => scooterApp.createScooter("NonExistentStation")).toThrow("No such station error: The specified station does not exist.");
  });
});

describe("ScooterApp.dockScooter(scooter, station)", () => {
  it("docks a scooter at a station", () => {
    const stationName = "Station A";
      const scooter = scooterApp.createScooter(stationName);
      scooterApp.rentScooter(scooter, user);      
      scooterApp.dockScooter(scooter, stationName);
      expect(scooter.user).toBeNull(); 
      expect(scooterApp.stations[stationName]).toContain(scooter);
  });

  it("throws an error if a station does not exist", () => {
    const stationName = "Station A";
    const scooter = scooterApp.createScooter(stationName);
    expect(() => scooterApp.dockScooter(scooter, "NonExistentStation")).toThrow("No such station");
  });
  

  
});

describe("ScooterApp.rentScooter(scooter, user)", () => {
  it("rents a scooter out to a user", () => {
    const stationName = "Station A";
      const scooter = scooterApp.createScooter(stationName);
      scooterApp.rentScooter(scooter, user);
      expect(scooter.user).toBe(user); 
      expect(scooter.station).toBeNull();
  });

  it("throws an error if a scooter is already rented", () => {
    const stationName = "Station A";
      const scooter = scooterApp.createScooter(stationName);
      scooterApp.rentScooter(scooter, user); 
      expect(() => scooterApp.rentScooter(scooter, user)).toThrow("Scooter is already rented");
  });
});
});
