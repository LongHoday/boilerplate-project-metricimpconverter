'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    const invalidNum = initNum === 'invalid number';
    const invalidUnit = initUnit === 'invalid unit';

    if (invalidNum && invalidUnit) {
      return res.send('invalid number and unit');
    }
    if (invalidNum) {
      return res.send('invalid number');
    }
    if (invalidUnit) {
      return res.send('invalid unit');
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
