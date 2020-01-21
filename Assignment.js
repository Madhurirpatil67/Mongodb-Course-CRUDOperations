let mongoose=require("mongoose");

//connection
mongoose
.connect("mongodb://localhost/STOREDATA",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log(`Connected To DB`))  
.catch(error=>console.log(`something is wrong ${error.message}`))

let courseSchema=new mongoose.Schema({
    tags:[String],
    date:{type:Date,default:Date.now()},
    name:{type:String,required:true,min:4,max:25},
    author:{type:String,required:true,min:4,max:25},
    isPublished:{type:Boolean,required:true},
    price:{type:Number,required:true}
});

let courseModel=mongoose.model("ITCourses",courseSchema);

async function ITcourse()
{
    let authorCourse=new courseModel([
        {
        "tags":["express","backend"],
        "name":"Express.js Course",
        "author":"Vipul",
        "isPublished":true,
        "price":10
       },
       {
        "tags":["node","backend"],
        "name":"Node.js Course",
        "author":"Vipul",
        "isPublished":true,
        "price":20
       },
       {
        "tags":["aspnet","backend"],
        "name":"ASP.NET MVC Course",
        "author":"Vipul",
        "isPublished":true,
        "price":15
       },
       {
        "tags":["react","frontend"],
        "name":"React Course",
        "author":"Vipul",
        "isPublished":false,
        "price":12
       },
       {
        "tags":["node","backend"],
        "name":"Node.js Course by Jack",
        "author":"Jack",
        "isPublished":false,
        "price":12
       },
       {
        "tags":["node","backend"],
        "name":"Node.js Course by Mary",
        "author":"Mary",
        "isPublished":true,
        "price":12
       },
       {
        "tags":["angular","frontend"],
        "name":"Angular Course",
        "author":"Vipul",
        "isPublished":true,
        "price":15
       }]
    );
    let data=await authorCourse.save();
     console.log(data);
}
//ITcourse(); 

//display BackEndcourses
async function DispalyBackEndCourses(){
    let data=await courseModel
    .find()
    .and([{"tags":"backend"} ,{"isPublished":true}]) 
    .select("name author -_id")
    .sort("name")
    console.log("----------Published BackEnd Courses--------------------");
    console.log(data); 
} 
DispalyBackEndCourses();  

//display AllPublishedCourses
async function DispalyAllPublishedCourses(){
    let data=await courseModel
    .find({"isPublished":true})
    .select("name author -_id")
    .sort("-price")
    console.log("----------All Published Courses by Their Descending Price--------------------")
    console.log(data); 
} 
DispalyAllPublishedCourses();  