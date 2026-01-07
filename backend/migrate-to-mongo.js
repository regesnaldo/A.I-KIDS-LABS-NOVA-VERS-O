
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Models
const User = require('./models/User');
const Module = require('./models/Module');

// Connect to DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Import Data
const importData = async () => {
  try {
    // Read JSON files
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8'));
    const modules = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'modules.json'), 'utf-8'));

    // Clear existing data
    await User.deleteMany();
    await Module.deleteMany();

    console.log('Existing data cleared...');

    // Import Users
    // Note: We need to handle password hashing if it's not already hashed in JSON
    // Assuming JSON has hashed passwords or we re-hash. 
    // Since our JSON auth logic used bcrypt, the passwords in JSON are likely already hashed.
    await User.insertMany(users);
    console.log(`${users.length} Users imported...`);

    // Import Modules
    await Module.insertMany(modules);
    console.log(`${modules.length} Modules imported...`);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
}

connectDB().then(() => {
    importData();
});
