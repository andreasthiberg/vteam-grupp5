// Root query object for GraphQL API.

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

// Custom types
const ScooterType = require('./types/scooter.js')
const CustomerType = require('./types/customer.js')
const TripType = require('./types/trip.js')
const CityType = require('./types/city.js')
const ParkingZoneType = require('./types/parking_zone.js')
const ChargingStationType = require('./types/charging_station.js')
const LogEntryType = require('./types/log_entry.js')

// Models for database communication
const scooterModel = require('../models/scooter.js')
const customerModel = require('../models/customer.js')
const tripModel = require('../models/trip.js')
const mapModel = require('../models/map.js')
const publicAPIModel = require('../models/publicAPI.js')


const RootQueryType = new GraphQLObjectType ({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    scooters: {
      type: new GraphQLList(ScooterType),
      description: 'List of all scooters',
      resolve: async function () {
        const scooterArray = await scooterModel.getAll()
        return scooterArray
      }
    },
    scooter: {
      type: ScooterType,
      description: 'A single scooter',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        const result = await scooterModel.getOne(args.id)
        await scooterModel.zoneCalc(result[0].pos)
        return result[0]
      }
    },
    customer: {
      type: CustomerType,
      description: 'A single customer',
      args: {
        customerId: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        const customerArray = await customerModel.getAll()
        return customerArray.find(({ id }) => id === args.customerId)
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      description: 'List of all customers',
      resolve: async function () {
        const customerArray = await customerModel.getAll()
        return customerArray
      }
    },
    trip: {
      type: TripType,
      description: 'A single trip',
      args: {
        tripId: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        const trip = await tripModel.getOne(args.tripId)
        return trip[0]
      }
    },
    trips: {
      type: new GraphQLList(TripType),
      description: 'List of all trips',
      resolve: async function () {
        const tripArray = await tripModel.getAll()
        return tripArray
      }
    },
    city: {
      type: CityType,
      description: 'A single city',
      args: {
        cityName: { type: GraphQLString }
      },
      resolve: async function (root, args) {
        const city = await mapModel.getOneCity(args.cityName)
        return city[0]
      }
    },
    cities: {
      type: new GraphQLList(CityType),
      description: 'List of all cities',
      resolve: async function () {
        const cityArray = await mapModel.getCities()
        return cityArray
      }
    },
    parkingZones: {
      type: new GraphQLList(ParkingZoneType),
      description: 'List of all parking zones',
      resolve: async function () {
        const parkingZoneArray = await mapModel.getParkingZones()
        return parkingZoneArray
      }
    },
    chargingStations: {
      type: new GraphQLList(ChargingStationType),
      description: 'List of all charging stations',
      resolve: async function () {
        const chargingStationArray = await mapModel.getChargingStations()
        return chargingStationArray
      }
    },
    chargingStation: {
      type: ChargingStationType,
      description: 'A single charging station',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        const chargingStations = await mapModel.getOneStation(args.id)
        return chargingStations[0]
      }
    },
    apiLog: {
      type: new GraphQLList(LogEntryType),
      description: 'Get public API log entries',
      resolve: async function () {
        const logEntries = await publicAPIModel.getAllEntries()
        return logEntries
      }
    }
  })
})

module.exports = RootQueryType
