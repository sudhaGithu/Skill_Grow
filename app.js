const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const port = process.env.PORT

const setupInitialData = require('./Middlewares/staticData');
const roleRoutes = require('./Routes/roleRoute')
const adminRoutes = require('./Routes/adminRoutes')

const categoryRoutes = require('./routes/categoryRoutes');
const languageRoutes = require('./routes/languageRoutes');
const priceRoutes = require('./routes/priceRoutes');
const skillLevelRoutes = require('./routes/skillLevelRoutes');


//sudha controllers
// const adminRoutes = require('./routes/adminRoutes')
// const superAdminRoutes = require('./routes/superAdminRoutes')
//const rolesRoutes = require('./routes/roleRoute')



// Use CORS middleware with custom options
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/uploads', express.static('uploads')); 


app.use(express.json());



// Routes
app.use('/api/v1', adminRoutes);
app.use('/roles', roleRoutes);
// app.use('/country', countryRoutess);
// app.use('/superadmin', superAdminRoutes)
// app.use('/roles',rolesRoutes )

// API Routes
app.use('/api', categoryRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/skill-levels', skillLevelRoutes);

async function startServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB successfully');

        // Run the setup function
        await setupInitialData();
        
        // Start the server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error during startup:', err);
        process.exit(1); // Exit with failure
    }
}

// Start the server
startServer();