const express=require("express");
const app=express();
const path=require("path");
const methodeOverride=require("method-override");
let port=8080;
const ejsMate=require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodeOverride("_method"));
app.engine("ejs",ejsMate);

//database

const mongoose=require("mongoose");
const Listing=require("./models/listing");

const mongourl="mongodb+srv://ajaykannan1001200635:ajaykannan@cluster0.glzbor6.mongodb.net/booking";
async function main(){
    await mongoose.connect(mongourl);
}


main()
.then((res)=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
});



app.listen(port,()=>{
    console.log("listening to the port");
});

// app.get("/",async(req,res)=>{
    
// });


//index route
app.get("/listing",async(req,res)=>{
    const allList=await Listing.find({});
    res.render("/home/ajay/project/views/listings/index.ejs",{allList});
});

//new route
app.get("/listing/new",(req,res)=>{
    res.render("/home/ajay/project/views/listings/new.ejs");
});


//show route
app.get("/listing/:id",async(req,res)=>{
    const {id}=req.params;
    const data=await Listing.findById(id);
    res.render("/home/ajay/project/views/listings/show.ejs",{data});
});


app.post("/listing",async(req,res)=>{
    const listing=new Listing(req.body);
    await listing.save();
    res.redirect("/listing");
})


//edit route
app.get("/listing/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const data =await Listing.findById(id);
    res.render("/home/ajay/project/views/listings/edit.ejs",{data});
})

//update route
app.put("/listing/:id",async(req,res)=>{
    const{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.data});
    res.redirect(`/listing/${id}`);
})


// delete route
app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})



// app.get("/newListing",(req,res)=>{
//     let sampleListing=new Listing({
//         title: "My Hotel",
//         description :"By the beach",
//         price :1200,
//         location :"Pandicherry",
//         country :"India",
//     });
//     sampleListing.save()
//     .then(()=>{
//     console.log("teseting");
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//     res.send("seucessfully testing");
// });