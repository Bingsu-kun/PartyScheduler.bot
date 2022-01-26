import mongoose from 'mongoose';

export default () => {
  mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('DB Connected.');
  })
  .catch((error) => {
    console.log(error)
  });
}