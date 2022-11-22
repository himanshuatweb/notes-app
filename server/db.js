import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://Himanshu:Himanshu@cluster0.e55b26s.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
 
export {connectDB};