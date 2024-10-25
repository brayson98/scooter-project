class Scooter {
  // Scooter code here
  static nextSerial = 1;
  constructor(station ) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false
  }

  rent(newUser) {
    if (this.charge > 20 && this.isBroken === false) {
      this.user = newUser;
      this.station = null;
      console.log(`Scooter ${this.serial} has been rented to ${newUser.username}.`);
    } else if (this.charge <= 20) {
      throw new Error("scooter needs to charge.")
    } else if (this.isBroken === true) {
      throw new Error("scooter needs repair.")
    }
  }

  dock(station) {
    this.station = station
    this.user = null;
    console.log(`Scooter ${this.serial} has been docked at ${station}.`);
  }

  recharge() {
    if (this.charge === 100) {
      console.log(`Scooter ${this.serial} is already fully charged.`);
      return; 
    }
    const rechargeInterval = setInterval(() => {
      if (this.charge < 100) {
        this.charge += 10;
        if (this.charge > 100) {
          this.charge = 100;
        }
        console.log(`Scooter ${this.serial} charge: ${this.charge}`)
      }
      if (this.charge === 100) {
        clearInterval(rechargeInterval);
        console.log(`Scooter ${this.serial} is fully charged!`)
      }
    }, 1000)
  }

  requestRepair() {
    if (!this.isBroken) {
      console.log(`Scooter ${this.serial} is not broken; no repair needed.`);
      return; 
    }

    console.log(`Repair scheduled for scooter ${this.serial}.`);
    
    
    setTimeout(() => {
      this.isBroken = false; 
      console.log(`Repair completed for scooter ${this.serial}.`);
    }, 5000); 
  }
}

module.exports = Scooter;
