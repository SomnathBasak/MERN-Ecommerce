import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'


connectDB();

const app=express();
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({origin:'http://localhost:5173'}))

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

app.use('/uploads',express.static('./uploads'))


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    
    console.log(`Server is running at port:${PORT}`);
})