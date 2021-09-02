import * as mongoose from 'mongoose';



async function setMongo(): Promise<any> {
  let mongodbURI = 'mongodb://localhost:27017/budget_db';

  const options = {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
  }
  // Connect to MongoDB using Mongoose
  await mongoose.connect(mongodbURI, options);
  console.log('Connected to MongoDB');
}

export default setMongo;