const express = require("express");
const router = express.Router();
const { data } = require("../data/data.json");
const { projects } = data;

router.get('/:id', (req, res) => {
 const { id } = req.params;
})



module.exports = router;