const bcrypt = require('bcrypt');
const UserModel = require('../models/user_model');

const seedUser = async (req, res) => {
    const users = [
        {
            "firstName": "Mohammad",
            "lastName": "Aqib",
            "email": "mohdaqib918@gmail.com",
            "password": "secret",
            "isAdmin": true
        },
        {
            "firstName": "Aqib",
            "lastName": "Siddiqui",
            "email": "mohdaqib@gmail.com",
            "password": "secret"
        }
    ];

    try {
        const hashedUsers = await Promise.all(users.map(async user => {
            const hashedPassword = await bcrypt.hash(user.password, 16); 
            return {
                ...user,
                password: hashedPassword
            };
        }));

        const newUsers = await UserModel.create(hashedUsers);
        return res.status(201).json({ message: "Users seeded successfully", users: newUsers });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while seeding users", error });
    }
}

module.exports = seedUser;
