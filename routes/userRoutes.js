import express from "express"
import User from "../model/user.js"

const router = express.Router()

// Initialize counters
let addCount = 0;
let updateCount = 0;

// Add the data 
router.post('/add', async (req, res) => {
    try {

        // Check if the entry exists
        const existingEntry = await User.find();

        if (existingEntry) {
            // Clear all existing data
            await User.deleteMany({}); // Empty filter to delete all documents
        }

        // Add new data to the table
        const newData = new User(req.body);
        addCount++; // Increment the add counter

        newData.addCount = addCount;
        await newData.save();


        // Respond with success message and the new entry
        res.status(201).json({ message: 'New entry created', data: newData });
    } catch (error) {
        // Error handling
        res.status(500).json({ message: 'Error adding data', error: error.message });
    }
});

// get the data 
router.get('/getUsers', async (req, res) => {
    try {

        const userData = await User.find();

        // Respond with success message and the new entry
        res.status(200).json(userData);
    } catch (error) {
        // Error handling
        res.status(500).json({ message: 'Error adding data', error: error.message });
    }
});

// update the data of user
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Update data in the table based on the provided ID
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        updateCount++; // Increment the update counter

        existingUser.updateCount = updateCount;

        // Update user data
        await User.findByIdAndUpdate(id, req.body);

        const UpdateUser = await existingUser.save();

        // Respond with success message and the updated entry
        res.status(200).json({ message: "Data updated successfully", UpdateUser });
    } catch (error) {
        // Error handling
        res.status(500).json({ message: 'Error updating data', error: error.message });
    }
});

//--- counter of add data and update data
router.get('/count', async (req, res) => {
    // Respond with the counts
    const userData = await User.find()
    const CountData = userData.map((item) => ({ addCount: item.addCount, updateCount: item.updateCount, totalCount: item.addCount + item.updateCount }))

    res.status(200).json(CountData);
});


export default router