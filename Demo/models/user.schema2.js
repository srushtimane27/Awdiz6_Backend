import mongoose, { Schema } from "mongoose";

const userSchema2 = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
});

const UserSchema2 = mongoose.model("User", UserSchema2);

export default UserSchema2;