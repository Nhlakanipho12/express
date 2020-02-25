const express = require('express');
const Pool  = require("pg").Pool;
require("dotenv").config();
const path = require('path');
const app = express();
let pool = new Pool();
pool.connect();

const body_parser = require('body-parser');
app.use(express.json());
app.use(body_parser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('./views', path.join(__dirname, './views'))

const createTable = async  (tableName) =>{
  
    const res = await pool.query(`DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, visitor_name varchar(100), assistant varchar(100), visitor_age int, date_of_visit text,time_of_visit time,comments text);`);
    console.log(`${tableName} table created`);
    return res;
  }
  
  createTable('visitors');
  app.get('/new_visit', (req, res) => res.status(200).sendFile(__dirname+'/index.html'));
  app.post('/add', (req, res) => { 
  addNewVisitor(req.body.visitor_name,req.body.assistant,req.body.age,req.body.date,req.body.time,req.body.comments);

  if(!req.body)
  throw new Error('Fields cannot be empty')

res.render("app", {
 visitor_name : req.body.visitor_name
})

});

const addNewVisitor = async  (full_name,assistant,age,date_of_visit,time_of_visit,comments) =>{

   tableName = `visitors`;
   const query_str = `INSERT INTO ${tableName} (visitor_name, assistant, visitor_age, date_of_visit , time_of_visit, comments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
   query_var = [full_name, assistant, age, date_of_visit, time_of_visit, comments];
  

   try {
      const res = await pool.query(query_str, query_var);
      console.log('Visitor has been added to database.');
      return res.rows;
   }  catch (error) {
      console.log("ERROR",error);
   }
 }


 const port = 9000;
  const server = app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
 });
 
module.exports = server;