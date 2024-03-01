import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        require: true
    }
})

const Token = mongoose.model('Token', tokenSchema)
export default Token;