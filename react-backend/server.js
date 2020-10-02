import express from 'express';
import path from 'path';
import data from './data';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import orderRoute from './routes/orderRoute';
import productRoute from './routes/productRoute';
import uploadRoute from './routes/uploadRoute';

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../react-frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../react-frontend/build/index.html`));
});

// No need for static apis, were gonna implement them from the database.
/*app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x.id === productId);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({msg: "Product Not Found."});
    }
});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});*/

app.listen(config.PORT, () => {
    console.log("Server started at http://localhost:5000");
});
