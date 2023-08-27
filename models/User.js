const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

//Solo esto es lo que se va a registrar en la base de datos MongoDB
const userSchema = new Schema({
    userName: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    tokenConfirm: {
        type: String,
        default: null
    },
    cuentaConfirmada: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    try {
        const salt  = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); 
    } catch (error) {
        console.log(error);
        next();  
    }
    
})

//Pregunta si la contrase;a es igual a la contrase;a de la base de datos
//Solo retorna true o false
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}
    

module.exports = mongoose.model('User', userSchema);