const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const events = [
    {
        title: "Global Tech Summit 2026",
        description: "Join industry leaders to discuss the future of AI, Quantum Computing, and sustainable technology solutions.",
        date: new Date("2026-06-15T09:00:00Z")
    },
    {
        title: "Design & UX Workshop",
        description: "A hands-on workshop focused on modern UI/UX principles, glassmorphism, and emotional design in digital products.",
        date: new Date("2026-07-22T14:00:00Z")
    },
    {
        title: "MERN Stack Bootcamp",
        description: "Intensive 3-day bootcamp covering React, Node.js, Express, and MongoDB for building production-ready applications.",
        date: new Date("2026-08-10T10:00:00Z")
    }
];

const seedData = async () => {
    try {
        await Event.deleteMany();
        await Event.insertMany(events);
        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
