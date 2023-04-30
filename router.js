const { getTicket, createTicket } = require("./controllers/Ticket");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

router.get("/tickets", getTicket);
router.post("/createTicket", createTicket);




module.exports = router;
