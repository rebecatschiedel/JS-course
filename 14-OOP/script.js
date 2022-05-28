'use strict';

const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function, use prototype inheritance instead
  /*
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
  */
};

const PersonA = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function, use prototype inheritance instead

  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
};

// Calling the NEW  operator
// 1. New empty object {} is created
// 2. Funtion is called, this keyword is set to the {}
// 3. {} linked to prototype
// 4. function automatically return the object

const jonas = new Person('Jonas', 1991);
const jay = {
  firstName: 'Jay',
  birthYear: 1992,
};
console.log(jonas);
console.log(jay);

// jonas is an instance from Person
console.log(jonas instanceof Person);
console.log(jay instanceof Person);

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// prototype inheritance
console.log(jonas);
console.log(Person.prototype);
jonas.calcAge();

const matilda = new PersonA('Matilda', 1991); //this create a new function calcAge for each instance of the object
console.log(matilda);

// __proto__
console.log(jonas.__proto__); //the prototype of jonas
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person)); //.prototype is a property of linked objects, not the original prototype - step number 3 of the NEW constructor function

Person.prototype.species = 'Homo Sapiens';
console.log(jonas);
console.log(jonas.__proto__);
console.log(jonas.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

// Prototype chain
console.log(jonas.__proto__); // Person prototype
console.log(jonas.__proto__.__proto__); // Object prototype
console.log(jonas.__proto__.__proto__.__proto__); // top of the scope chain Object.prototype

const arr = [0, 1, 2, 2, 3, 4, 5, 5, 7]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

//Extending a prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.log(h1.__proto__);
console.log(h1.__proto__.__proto__);
console.log(h1.__proto__.__proto__.__proto__);
console.log(h1.__proto__.__proto__.__proto__.__proto__);
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__);
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__);
console.log(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
);

console.dir(x => x + 1);

// class expression
// const PersonCL = class {}

// const declaration
class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

const bia = new PersonCL('Bia', 1988);
console.log(bia);
bia.calcAge();

PersonCL.prototype.greet = function () {
  console.log(`hey ${this.firstName}`);
};

bia.greet();

/*
 Classes
1. Classes are not hoisted (we cannot use them before they are declared in the code)
2. Classes are first-class citizens (we can pass them to and return them from functions)
3. Classes are executed in strict mode
*/

// Getters and Setters
const account = {
  owner: 'jonas',
  movements: [220, 300, 150, 350],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); //getter
account.latest = 50; //setter
console.log(account.latest);

class PersonACL {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name; //to avoid variable conflict
    else console.log(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there ClassA');
  }
}

const ana = new PersonACL('Ana Silva', 1993);
console.log(ana.fullName);
console.log(ana._fullName);
console.log(ana.age);
console.log(ana);

const walter = new PersonACL('Walter', 1920);
console.log(walter.fullName);
console.log(walter._fullName);
console.log(walter.age);
console.log(walter);

//Static Methods
Person.hey = function () {
  //Person.prototype.hey would allow this function to be inherited by the person isntances
  console.log('Hey there!');
};

Person.hey();
//jonas.hey(); it is not in the prototype

PersonACL.hey();

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 1982;
console.log(steven);
steven.calcAge();
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
console.log(sarah);
sarah.init('Sarah', 1987);
console.log(sarah);
sarah.calcAge();
console.log(sarah.firstName);

// Inheritance

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// This will make the Student.prototype inherits the Person.prototype
Student.prototype = Object.create(Person.prototype);
console.dir(Student.prototype.constructor);
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

Student.prototype.introduce = function () {
  console.log(this.firstName, this.birthYear, this.course);
};

const mike = new Student('mike', 2000, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__.__proto__);
console.log(mike.__proto__);

// Ingeritance Class
class StudentCL extends PersonCL {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(this.firstName, this.birthYear, this.course);
  }

  calcAge() {
    console.log('I am too old');
  }
}

const martha = new StudentCL('Martha', 2009, 'Theater');
console.log(martha);
martha.calcAge();
martha.introduce();

// Inheritance with Object.create

const teo = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log('introduce', this.firstName, this.birthYear, this.course);
};

const jace = Object.create(StudentProto);
jace.init('jace', 2010, 'ballet');
jace.introduce();
jace.calcAge();
console.log(jace);

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log('Thanks for opening an acc');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.movements.push(250);
acc1.movements.push(-150);
console.log(acc1);

class AccountCL {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log('Thanks for opening an acc class with methods');
  }

  // public interface
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('loan approved');
    }
  }
}
const acc2 = new AccountCL('Rita', 'EUR', 2222);
acc2.deposit(150);
acc2.withdraw(100);
acc2.requestLoan(1000);
console.log(acc2);

// Encapsulation
class AccountCLE {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.locale = navigator.language;
    // protected property
    this._pin = pin;
    this._movements = [];

    console.log('Thanks for opening an acc class with encapsulation');
  }

  // public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  //Protected method
  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('loan approved 2');
      return this;
    }
  }
}
const acc3 = new AccountCLE('Leila', 'EUR', 3333);
acc3.deposit(10);
acc3.withdraw(200);
acc3.requestLoan(1400);
console.log(acc3.getMovements());
console.log(acc3);

//Chaining methods
acc3.deposit(130).deposit(550).withdraw(237).requestLoan(1326).withdraw(230);
console.log(acc3.getMovements());

//CODE CHALLENGES
//Coding Challenge 1

const Car = function (make, speed) {
  (this.make = make), (this.speed = speed);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

console.log(car1);
console.log(car2);
console.log('speed', car1.speed);
car1.accelerate();
car1.brake();
console.log('speed', car1.speed);
console.log('speed', car2.speed);
car2.accelerate();
car2.brake();
console.log('speed', car2.speed);

//Coding challenge 2

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }
}

const ford = new CarCl('Ford', 120);

console.log('speed CL', ford.speed);
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
console.log('speed', ford.speed);
ford.speedUS = 50;
console.log('speed', ford.speed);

//Coding challenge 3

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('tesla', 120, 23);

console.log('speed Inheritance', tesla.speed);
tesla.accelerate();
tesla.brake();
console.log(tesla.charge);
tesla.chargeBattery(90);
console.log(tesla.charge);
tesla.accelerate();
console.log(tesla.charge);
console.log('speed', tesla.speed);

//Coding challenge 4
class EVLC extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVLC('Rivian', 120, 23);
console.log('Encapsulation', rivian.speed);
rivian.accelerate().brake().chargeBattery(90).accelerate().accelerate();
console.log(rivian);
console.log('speed', rivian.speed);

console.log(rivian.speedUS);
