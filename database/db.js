const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Conectado a la base de datos");
}).catch((err) => {
    console.log(err);
});