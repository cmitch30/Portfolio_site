const express = require("express");
const router = express.Router();
const { data } = require("../data/data.json");
const { projects } = data;


router.get('/about', (req, res) => {
res.render('about')
})




module.exports = router;