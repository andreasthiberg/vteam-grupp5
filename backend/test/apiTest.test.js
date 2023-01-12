const statuCalcModel = require('../models/statusCalc')
const authModel = require('../models/auth')
const scooterModel = require('../models/scooter');
const mapModel = require('../models/map')
const dbModel = require('../models/database')
const tripModel = require('../models/trip')

async function setupTestDB(){
  const db = await dbModel.getDb()
  const res = await db.query("select * from scooter")
  db.end()
  return res[0]
}

beforeAll(async ()=>{return setupTestDB()})

describe('Test recieving data from database', () => {

  it('Scooter getAll function should return list of scooter data', async () => {
    let scooters = await scooterModel.getAll();
    expect(scooters[0].id).toEqual(1)
    expect(scooters[0].status).toBe(2)
    expect(scooters[0].pos).toBeTruthy()
    expect(scooters[0].city).toBe("Stockholm")   
  });

  it('Scooter getOne function should return a scooter with given ID', async () => {
    let scooters = await scooterModel.getOne(2);
    expect(scooters[0].id).toEqual(2)
    expect(scooters[0].status).toBe(2)
    expect(scooters[0].pos).toBeTruthy()
    expect(scooters[0].city).toBe("Stockholm")   
  });

  it('Cities getAll function should return list of city data', async () => {
    let cities = await mapModel.getCities()
    expect(cities[0].name).toEqual("Lund")
    expect(cities.length).toBeGreaterThan(1)
  });

  it('Stations getAll function should return list of station data', async () => {
    let stations = await mapModel.getChargingStations()
    expect(stations[1].id).toEqual(2)
  });

  it('Stations getOne function should return corret station data', async () => {
    let stations = await mapModel.getOneStation(1)
    expect(stations[0].pos).toEqual("[59.30869399565023,18.029345150006222]")
  });

  it('Zones getAll function should return list of parking zones', async () => {
    let zones = await mapModel.getParkingZones()
    expect(zones[0].city).toEqual("Stockholm")
    expect(zones.length).toBeGreaterThan(1)
  });

  it('Trips getAll function should return array of trips', async () => {
    let trips = await tripModel.getAll()
    expect(trips[0].start_pos).toEqual("[0,0]")
  });


  it('Trips getOne function should return correct of trip', async () => {
    let trips = await tripModel.getOne(2)
    expect(trips[0].start_pos).toEqual("[10,10]")
  });

});
