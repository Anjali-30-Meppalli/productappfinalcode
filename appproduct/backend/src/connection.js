import mongoose from 'mongoose'; // Use import syntax

// Connect to MongoDB
mongoose.connect("mongodb+srv://anjalimeppalli0230:anjalimeppalli@cluster0.gmlpn.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log(err);
    });
