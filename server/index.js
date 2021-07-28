// const express = require("express");

require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";

//Microservices routes
import Auth from "./API/Auth"

//Database connection

import Connection from "../server/database/connection";

const zomato = express();

// application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false}));
zomato.use(helmet());
zomato.use(cors());

// zomato.

zomato.get("/", (req,res) => res.json({ message: "Setup success" }));

zomato.listen(4000, () => console.log("Server is running "));