const statuCalcModel = require('../models/statusCalc')
const authModel = require('../models/auth')

describe('Test function testing if point is in zone', () => {

  it('Coordinate inside zone should return true', async () => {
    let result = statuCalcModel.pointInside([10,10],[[9,9],[9,11],[11,11],[11,9]]);
    expect(result).toBe(true)
    
  });

  it('Coordinate outside zone should return false', async () => {
    let result = statuCalcModel.pointInside([12,12],[[9,9],[9,11],[11,11],[11,9]]);
    expect(result).toBe(false)
  });

});


describe('Test auth functions', () => {

  it('Login function should return login message, jwt token and email ', async () => {
    let result = await authModel.loginUser("test-email","password");
    expect(result.email).toBe("test-email")
    expect(result.token).not.toBe(undefined)
    expect(result.loginMessage).toBe("Inloggad!")
  });


});

