const express = require('express')
var fs = require("fs");
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://w0708515:KvvngAcid253@jbdb.wr4nvvi.mongodb.net/?retryWrites=true&w=majority"
var js2xmlparser = require("js2xmlparser");
const { error } = require('console');



app.listen(3000, function () {
  console.log('listening on 3000')
})

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('jbdb')
    const collection = db.collection('cmps415mongodb')

    app.get('/', (req, res) => {
      res.setHeader('Content-Type', 'text/html');
        fs.readFile('./index.html', 'utf8', (err, contents) => {
          if(err) {
              console.log('Form file Read Error', err);
              res.write("<p>Form file Read Error");
          } else {
              console.log('Form loaded\n');
              res.write(contents + "<br>");
          }
          res.end();
        });
    })

    app.get("/ticket/list/", function(req, res){
      //establish the new connection with the mongodb
  
      async function run() {
          try {
              
          
              const query = {}; //this means that all tickets are selected
          
              //tickets is an array that holds all tickets that are of type JSON
              const tickets = await collection.find(query).toArray(); 
              //if array is 0 there's no tickets
              if (tickets.length === 0) {
                  res.status(404).send("Tickets do not exist!");
              } else {
                  console.log(js2xmlparser.parse("tickets", tickets));
                  //return the tickets
                  res.json(js2xmlparser.parse("tickets", tickets));
              }
          } catch (err) {
              console.log(err);
              res.status(500).send("Error!");
          }finally {
              // Ensures that the client will close when you finish/error
              await client.close();
          }
      }
      run().catch(console.dir);
  });

  app.get("/rest/ticket/:ticketId", function(req, res) {
    
    //search key is what we are looking for in the database JSON
    //it needs to match the field "ticketID" and to match the value of that field
    const searchKey = "ticketID: '" + req.params.ticketId + "'";
    console.log("Looking for: " + searchKey);

    async function run() {
        try {
            
      
            const query = { ticketID: req.params.ticketId };
      
            //find the ticket and store it in "ticket"
            const ticket = await collection.findOne(query);
            //checking if ticket exists
            if (ticket === null) { //it's null when it doesn't exist
                res.status(404).send("Ticket does not exist!");
            } else {
                console.log(js2xmlparser.parse("tickets", ticket));
                //return the ticket
                res.json(js2xmlparser.parse("tickets", ticket));
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Error!")
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
});


    app.post("/tickets", function(req, res) {
      
  
      async function run() {
          try {
              
  
              const ticketID = req.body.ticketID;
              const type = req.body.type;
              const subject = req.body.subject;
              const description = req.body.description;
              const priority = req.body.priority;
              const status = req.body.status;
              const recipient = req.body.recipient;
              const submitter = req.body.submitter;
              const assignee_id = req.body.assignee_id;
              const follower_ids = req.body.follower_ids;
              const tags = req.body.tags;
  
              //creating the ticket of type JSON
              const ticket = {
                  ticketID: ticketID,
                  created_at: Date.now(),
                  updated_at: Date.now(),
                  type: type,
                  subject: subject,
                  description: description,
                  priority: priority,
                  status: status,
                  recipient: recipient,
                  submitter: submitter,
                  assignee_id: assignee_id,
                  follower_ids: follower_ids,
                  tags: tags
              };
  
              //here we don't handle much errors because all fields are pre-filled so if a mistake has been made
              //the ticket should be deleted and then added again
              const addTicket = await collection.insertOne(ticket);
             // const xml = json2xml(ticket, { compact: true, spaces: 4 });
              console.log(addTicket);
             // console.log(xml);
              //console.log(js2xmlparser.parse("ticket", ticket));
              //console.log(js2xmlparser.parse("ticket", ticket));
              console.log('Parsed XML: ' + JSON.stringify(req.body));
              res.json(ticket);
          } catch (err) {
              console.log(err);
              res.status(500).send("Error!")
          } finally {
              // Ensures that the client will close when you finish/error
              await client.close();
          }
      }
      run().catch(console.dir);
  });

  
})