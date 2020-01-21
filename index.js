let mongoose=require("mongoose");
//connection
mongoose
.connect("mongodb://localhost/STOREDATA",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log(`Connected To DB`))  
.catch(error=>console.log(`something is wrong ${error.message}`))

let courseSchema=new mongoose.Schema({
    author:{type:String,required:true,min:4,max:25},
    price:{type:Number,required:true},
    course:[String],
    date:{type:Date,default:Date.now()},
    isPublished:{type:Boolean,required:true}
});

let courseModel=mongoose.model("courses",courseSchema);

 /* async function course()
{
    let authorCourse=new courseModel({
        author:"James",
        price:5000,
        course:["BACK END","JAVA"],
        isPublished:true
    });
    let data=await authorCourse.save();
     console.log(data);
}

course(); */

//display courses
async function DispalyCourses(){
    let data=await courseModel
    /* .find({"author":"mak"}) 
    .find({
        "price":{
        $lte:3000,$gte:1000
    }})*/
    /* .find({
        "price":{
        $in:[4000]
    }}) */
    .find()
    .or([{"author":"James"},{"price":5000}])
    .select("author price -_id")
    .sort("price")
    /* .countDocuments() */
  
    console.log(data);
}
DispalyCourses(); 