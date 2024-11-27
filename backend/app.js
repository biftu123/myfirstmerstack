 const express = require('express');
const moongose =require("mongoose")
const workoutRoutes =require("./router/workoutrouter")
 require('dotenv').config();
  const app = express();
  const port = process.env.PORT || 3001; 
  app.listen(port, ()=>{
	console.log( "its run on "+port)
  } ) 
  moongose.connect(
	process.env.Mongourl,
	
  ).then(()=>{
	console.log("connected Db")
  })
  app.use(express.json());

// Use the workout routes
app.use('/api/workouts', workoutRoutes);