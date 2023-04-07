const express = require('express');
const router = express.Router();
const openaiService = require('../services/openai.service');

router.post('/getData', getDataOpenAi);

module.exports = router;

function getDataOpenAi(req, res, next) {
  openaiService.getDataOpenAi(req)
      .then(response => response ? res.status(200).json({ status: true, data: response }) : res.status(400).json({ status: false, message: 'Erorr', data: [] }))
      .catch(err => next(res.json({ status: false, message: err })));
}