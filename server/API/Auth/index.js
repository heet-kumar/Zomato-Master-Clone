import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models

import {UserModel} from "../../database/user/index";

const Router = express.Router();

/*
Route       /signup
Des         Signup with email and password
Paramas     none
Access      Public
Method      POST
*/
Router.post("/signup", async (req,res)=> {
    try{
        const { email, password, fullname, phoneNumber } = req.body.credentials;

        // check whether email exist
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if ( checkUserByEmail || checkUserByPhone ) {
            return res.json({ error: "User already exists!" });
        }

        // hash password
        const bcryptSalt = await bcrypt.genSalt(8);

        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        // save to DB
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword,
        });

        //  above we have hash the password   // enccrypt the data but we cant decrypt

        // generate JWT auth token
        const token = jwt.sign({ user: { fullname, email }}, "ZomatoApp");


        // return
        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.json(500).json({ error : error.message });
    }
});


export default Router;