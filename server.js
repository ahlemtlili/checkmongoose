const express = require("express");
const connectDB = require("./config/connectDb");
const Person = require("./models/Person");
connectDB();

const app = express();
app.use(express.json());
//Create Many Records with model.create()
const arrayOfPeople = async () => {
  try {
    Person.create([
      {
        name: "ahlem",
        age: 30,
        favoriteFoods: ["mlawi", "rozz"],
      },
      {
        name: "layla",
        age: 35,
        favoriteFoods: ["mlawi", "rozz"],
      },
      {
        name: "rahaf",
        age: 27,
        favoriteFoods: ["mlawi", "rozz"],
      },
      {
        name: "youssef",
        age: 27,
        favoriteFoods: ["roz", "pizza"],
      },
      {
        name: "nawress",
        age: 26,
        favoriteFoods: ["mechoui", "7out"],
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
//arrayOfPeople()
//Find all the people having a given name, using Model.find() -> [Person]
const findPerson = async (personName) => {
  try {
    const perfind = await Person.find({ name: personName });
    console.log("searchByName", perfind);
  } catch (error) {
    console.log(error);
  }
};
//findPerson("youssef")
//Find just one person which has a certain food in the person's favorites, using
const findOnePerson = (food) => {
  Person.findOne({ favoriteFoods: food }, function (err, per) {
    if (err) {
      console.log(err);
    }
    console.log(per);
  });
};
//findOnePerson(["roz", "pizza"])
//Find the (only!!) person having a given _id
const SearchById = (personId) => {
  Person.findById({ _id: personId }, (err, per) => {
    if (err) {
      console.log(err);
    }
    console.log(per);
  });
};
//SearchById('62c1b2d85faeaf3375c13ae5')
//Running Find, Edit, then Save
const findandedit = (Idp, food) => {
  Person.findById({ _id: Idp }, (err, per) => {
    if (err) {
      console.log(err);
    } else {
      per.favoriteFoods.push(food);
      per.save();
      console.log(per);
    }
  });
};
//findandedit('62c1d04a1476775a9a5d8a80',"metabga")
//Find a person by Name and set the person's age to 20
const findandupdate = (personName, ageup) => {
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageup } },
    { new: true },
    (err, per) => {
      if (err) {
        console.log(err);
      } else console.log(per);
    }
  );
};
//findandupdate('youssef',32)
//Delete one person by the person's _id
const findandelete = (Idp) => {
  Person.findByIdAndRemove({ _id: Idp }, (err, per) => {
    if (err) {
      console.log(err);
    } else {
      console.log(per);
    }
  });
};
//findandelete('62c1d04a1476775a9a5d8a7d')
//Delete Many Documents using model.remove
const removeMany = (personName) => {
  Person.remove({ name: personName }, (err, per) => {
    err ? console.log(err) : console.log(per);
  });
};
//removeMany("ahlem")
//Chain Search Query
var queryChain = (food )=>{
    Person.find({ favoriteFoods:food})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((error, per)=> {
        error?
    console.log(error):
    console.log(per)
    });
    };

queryChain(["mlawi", "rozz"])
const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
