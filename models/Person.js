
const mongoose=require("mongoose")
const personSchema=new mongoose.Schema({
    name:{ type:String,
    required:true,trim:true,lowercase:true},
    age:Number,
    favoriteFoods: [String]
})
const Person=mongoose.model("person",personSchema)
module.exports= Person