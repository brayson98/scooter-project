const { describe, expect, it } = require("@jest/globals");
const User = require("../classes/User.js");

describe("user.login(password)", () => {
  it("logs a user in if the password is correct", () => {
    // Arrange
    // Act
    // Assert
    const user = new User("testUser", "password123", 20);
    user.login(user.password);
    expect(user.loggedIn).toBe(true);
  });

  it("throws an error if the password is incorrect", () => {
    // Arrange
    // Act
    // Assert
    const user = new User("testUser", "password123", 20);
    expect(() => user.login("wrongPassword")).toThrow("incorrect password");
    expect(user.loggedIn).toBe(false)
  });
});

describe("user.logout()", () => {
  it("logs a user out", () => {
    // Arrange
    // Act
    // Assert
    const user = new User("testUser", "password123", 20)
    user.login(user.password);
    user.logout()
    expect(user.loggedIn).toBe(false);
  });
});
