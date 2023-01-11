// Model for writing and reading trip info from database.

const dbModel = require('./database')
const calcModel = require('./statusCalc')
const scooterModel = require('./scooter')
const statusCalc = require('./statusCalc')
const mapModel = require('./map')


const trip = {

  // Gets all trips from database.
  getAll: async function getAll () {

    const sql = "CALL get_all_trips()"
    let res
    const db = await dbModel.getDb()

    res = await db.query(sql)
    db.end() 
    return res[0]
  },

  // Gets one trip from database.
  getOne: async function getOne (tripId) {

    const sql = "CALL get_one_trip(?)"
    let res;
    const db = await dbModel.getDb();

    res = await db.query(sql, [tripId]);
    db.end();
    return res[0];
  },

  // Adds a new trip.
  addTrip: async function addTrip (args) {

    const sql = "CALL add_trip(?,?,?,?)"

    let res
    const db = await dbModel.getDb()
    res = await db.query(sql, [args.scooter_id, args.customer_id, args.start_pos,args.city])
    db.end()

    return res
  },

  // Ends an existing trip.
  endTrip: async function endTrip (tripId) {

    let id = tripId.id;

    let discount = 0;
    let penalty = 0;

    let trip = await this.getOne(id);
    let scooter = await scooterModel.getOne(trip[0].scooter_id);
    let city = await mapModel.getOneCity(trip[0].city);

    let cityFee = city[0].fee;
    let cityFeePerMin = city[0].fee_per_min;

    let cityPenaltyFee = city[0].penalty_fee;
    let cityDiscount = city[0].discount;

    let startPosCode = await statusCalc.zoneCalculation(trip[0].start_pos);

    let endPos = scooter[0].pos;
    let endPosCode = await statusCalc.zoneCalculation(endPos);

    if((startPosCode === 0 && endPosCode === 1) 
      || (startPosCode === 0 && endPosCode === 2) ){
      discount = cityDiscount;
    }

    console.log("Discount: ", discount);

    if( endPosCode === 0) {
      penalty = cityPenaltyFee;
    }

    console.log("Penalty: ", penalty);

    const db = await dbModel.getDb();
    let res;
    const sql = "CALL update_trip(?,?,?,?)";
    await db.query(sql, [id, endPos, penalty, discount]);

    let updatedTrip = await this.getOne(id);

    let timeDiff = updatedTrip[0].end_time - updatedTrip[0].start_time;
    let duration = Math.floor(timeDiff/1000/60);
    console.log("Trips duration: ", duration);

    let price = cityFee + cityFeePerMin * duration + penalty - discount;

    if (price < cityFee) {
      price = cityFee;
    }

    console.log("Price: ", price);

    const sql1 = "CALL update_trips_price(?,?)";
    res = await db.query(sql1, [id, price]);

    //Här ska det också göras en update med status till scootern beroende var den parkeras

    let newScooterStatus;

    if (endPosCode === 2) {
      newScooterStatus = 4;
    } else if (endPosCode === 1) {
      newScooterStatus = 3
    } else {
      newScooterStatus = 2
    }

    let scooterId = scooter[0].id;
    
    await scooterModel.updateScooter({id: scooterId, status: newScooterStatus});
    
    return res;
  }
}

module.exports = trip
