const mongoose=require("mongoose");
const {Schema}=mongoose;


const listingSchema=new Schema({
    title :{
        type:String,
        required:true,
    },
    description : String,
    image : {
        filename :String,
        url : {
            type:String,
            set :(v)=>v===""?"https://unsplash.com/photos/a-room-with-a-tub-and-two-chairs-in-it-6lZND3WpiwA":v,
        }


        // type:String,
        // set :(v)=>v===""?"https://unsplash.com/photos/a-room-with-a-tub-and-two-chairs-in-it-6lZND3WpiwA":v,
    },
    price :Number,
    location :String,
    country :String,
});

const Listing = new mongoose.model("Listing",listingSchema);
module.exports=Listing;