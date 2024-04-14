import mongoose from "mongoose";

const connectDB=async()=>{
    try {
      const con= await mongoose.connect(process.env.DATABASE);
       console.log('Database Connection Successfull');
    } catch (error) {
        console.log('Databse Connection Failed',error);
    }
    
}
export default connectDB
