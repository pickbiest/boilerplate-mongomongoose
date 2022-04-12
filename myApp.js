require('dotenv').config();

// connect database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// create database schema
const personSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    "name": "testdummy",
    "age": 55,
    "favoriteFoods": ["Fleisch", "Bier"]
  });
  person.save(function(error, result) {
    if (error) return done(error);
    done(null, result)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (error, people) {
    if (error) return done(error);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
    Person.find({"name": personName}, function (error, people) {
    if (error) return done(error);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
    Person.findOne({"favoriteFoods": food}, function (error, people) {
    if (error) return done(error);
    done(null, people);
  });
};

const findPersonById = (personId, done) => {
    Person.findOne({"_id": personId}, function (error, people) {
    if (error) return done(error);
    done(null, people);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, person) => {
    if (error) return done(error);

    person.favoriteFoods.push(foodToAdd);
    person.save((err, res) => {
          if (err) return done(err);
      done(null, res);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({"name": personName}, {"age": ageToSet}, { new: true }, (err, person) => {
    if (err) return done(err);
    return done(null, person)
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({"_id": personId}, (error, result) => {
    if(error) return done(error);
    done(null, result);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({"name": nameToRemove}, (err, res) => {
    if(err) return done(err);
    done(null, res);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({"favoriteFoods": foodToSearch}, 'name favoriteFoods').sort({"name": 1}).limit(2).select().exec((err, data) => done(err, data));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
