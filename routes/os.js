const os = require('os');
const express = require('express');
const router = express.Router();


module.exports = (req, res) => {
    const cpus = os.cpus();
    res.json(cpus);
  };

  
 
  
