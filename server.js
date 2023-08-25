import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/post.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/post', postRoutes);

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    console.log('listening on port 4000');
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
