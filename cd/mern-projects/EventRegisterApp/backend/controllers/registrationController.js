const Registration = require('../models/Registration');

// @desc    Create a registration
// @route   POST /api/registrations
// @access  Public
const createRegistration = async (req, res) => {
    try {
        const { name, email, eventId } = req.body;
        const registration = await Registration.create({ name, email, eventId });
        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Public
const getRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({}).populate('eventId', 'title date');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRegistration,
    getRegistrations
};
