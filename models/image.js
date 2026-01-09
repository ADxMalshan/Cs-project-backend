import mongoose from "mongoose";

const imageSchema=new mongoose.Schema({
    petType:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    }
});
const image=mongoose.model("image",imageSchema);
export default image;