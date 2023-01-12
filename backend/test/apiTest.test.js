const statuCalcModel = require('../models/statusCalc')
const authModel = require('../models/auth')
const scooterModel = require('../models/scooter');

describe('Test recieving data from database', () => {

  it('Scooter getAll function should return list of scooter data', async () => {
    let result = await scooterModel.getAll();
    console.log(result)
    expect(result).toBe(true)
  });

});
