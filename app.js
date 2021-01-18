const express=require('express');
const app=express();
const path=require('path');
const router = require('./routes/routes');
require('dotenv/config')
const PORT=process.env.PORT || 8080;
const cors=require('cors');
const routes=require('./routes/routes');

//Middleware
app.use(cors());
app.use(express.static(path.join(__dirname,'views')));
app.set('view engine','ejs');

//ROUTES
app.use('/',routes);

app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`));

