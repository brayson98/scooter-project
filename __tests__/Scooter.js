const { describe, expect, it } = require("@jest/globals");
const Scooter = require("../classes/Scooter.js");
const User = require("../classes/User.js")

describe("Scooter class", () => {
  let scooter;
  let user;

  beforeEach(() => {
    scooter = new Scooter("Station A");
    user = new User("testUser", "password123", 20);
  });

  describe("scooter.rent(user)", () => {
    it("checks a scooter out to a user", () => {
      scooter.charge = 80; 
      scooter.isBroken = false; 

      
      scooter.rent(user);

      
      expect(scooter.user).toBe(user);
      expect(scooter.station).toBeNull();
    });

    it("throws an error if battery is dead or scooter is broken", () => {
      scooter.charge = 0; 
      scooter.isBroken = false;
      
      expect(() => scooter.rent(user)).toThrow("scooter needs to charge.");
      
      scooter.charge = 80; 
      scooter.isBroken = true; 

     
      expect(() => scooter.rent(user)).toThrow("scooter needs repair.");
    });
  });

  describe("scooter.dock(station)", () => {
    it("returns a scooter to a station", () => {
      scooter.rent(user); 
      
      scooter.dock("Station A");
      
      expect(scooter.user).toBeNull(); 
      expect(scooter.station).toBe("Station A"); 
    });
  });

  describe("scooter.recharge()", () => {
    it("charges a scooter", (done) => {
      scooter.charge = 50; 
      jest.useFakeTimers(); 
      
      scooter.recharge();
      
      expect(scooter.charge).toBe(50); 
      jest.advanceTimersByTime(5000); 
      
      expect(scooter.charge).toBeGreaterThan(50); 
      expect(scooter.charge).toBe(100); 
      done();
    });
  });

  describe("scooter.requestRepair()", () => {
    it("repairs a scooter", (done) => {
      
      scooter.isBroken = true; 
      scooter.requestRepair();
      
      expect(scooter.isBroken).toBe(true); 
      jest.advanceTimersByTime(5000); 

      expect(scooter.isBroken).toBe(false); 
      done();
    });
  });
});