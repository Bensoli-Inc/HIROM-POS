require('dotenv').config();

const express = require('express');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.SECRET_KEY; 
const UserModel = require('../models/User')

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', '');
    if (!token) return res.status(401).json({message: 'Access denied. No token provided.'});

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({message: 'Invalid token.'});
    }
};

const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({message: 'Access denied. You do not have permision to perform this action.'});
    }
    next();
};

module.exports = {authMiddleware, roleMiddleware};