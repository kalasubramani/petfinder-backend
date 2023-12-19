//create a db thru node js
const pg=require('pg');

//connect to db -client
const client = new pg.Client('postgres://localhost/petshop_db');

//creates Express app
const express=require('express');
const app=express();

//set port for express
const port=3000;
app.listen(port,()=>{
  console.log(`Listening on port ${port}`);
});

//cors library
const cors=require('cors');
app.use(cors());
//configure express route
app.get('/api/pets',async (req,res,next)=>{
    try{
        const SQL=`SELECT * FROM pets;`
        const dbrespose=await client.query(SQL);
        //send back response
        res.send(dbrespose.rows);
    }catch(error){
      next(error);
    }
})

const init=async ()=>{
  await client.connect();
 
  // const SQL=`CREATE TABLE pets(
  //             id SERIAL PRIMARY KEY,
  //             name VARCHAR(20),
  //             is_favourite BOOLEAN
  // )`
  // console.log("table created");
  //seed data
   const SQL=`INSERT INTO Pets (name,is_favourite) VALUES ('jjjiii', true);`
  
  await client.query(SQL);
}

init();