// Prototypal Instantiation
// The prototypal instantiation pattern uses the prototype property on the constructor function to share methods across all instances of the function. This is the most common instantiation pattern in JavaScript and is used by many libraries, including jQuery and Underscore.

// function Animal (name, energy) {
//   let animal = Object.create(Animal.prototype)
//   animal.name = name
//   animal.energy = energy
//   return animal
// }
// Animal.prototype.eat = function (amount) {
//   console.log(`${this.name} is eating.`)
//   this.energy += amount
// }
// Animal.prototype.sleep = function (length) {
//   console.log(`${this.name} is sleeping.`)
//   this.energy += length
// }
// Animal.prototype.play = function (length) {
//   console.log(`${this.name} is playing.`)
//   this.energy -= length
// }
// const leo = Animal('Leo', 7)
// const snoop = Animal('Snoop', 10)
// leo.eat(10)
// snoop.play(5)

//class Instantiation
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}
const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

// 👏👏👏 Hopefully you just had a big “aha” moment. Again, prototype is just a property that every function in JavaScript has and, as we saw above, it allows us to share methods across all instances of a function. All our functionality is still the same, but now instead of having to manage a separate object for all the methods, we can just use another object that comes built into the Animal function itself, Animal.prototype.