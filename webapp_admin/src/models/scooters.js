// Fetch scooters's info from graphql
const scooters = {

  getAllScooters: async function getAllScooters () {
    const query = `
            query {
                scooters {
                    id
                    pos
                    status
                    battery
                    city
                    station
                    zone
                }
            }
        `

    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })

    const result = await response.json()
    for (const i in result.data.scooters) {
      const posAsIntArray = JSON.parse(result.data.scooters[i].pos)
      result.data.scooters[i].pos = posAsIntArray
    }

    return result.data
  },
  getAllTrips: async function getAllTrips () {
    const query = `
            query {
                trips {
                    id
                    scooter_id
                    customer_id
                    start_time
                    end_time
                    start_pos
                    end_pos
                    city
                    price
                }
            }
        `

    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })

    const result = await response.json()
    for (const i in result.data.trips) {
      let posAsIntArray = JSON.parse(result.data.trips[i].start_pos)
      result.data.trips[i].start_pos = posAsIntArray
      posAsIntArray = JSON.parse(result.data.trips[i].end_pos)
      result.data.trips[i].end_pos = posAsIntArray
    }
    return result.data
  },
  changeScooterStatus: async function changeScooterStatus (scooterId, newStatus) {
    const query = `
        mutation {
            updateScooter(id:${scooterId},status:${newStatus}){id,pos,status,city,battery} 
        }
    `

    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
    const result = await response.json()
    const newScooterData = result.data.updateScooter
    newScooterData.pos = JSON.parse(newScooterData.pos)
    return newScooterData
  },
  endTrip: async function endTrip (tripId) {
    const query = `
        mutation {
            endTrip(id:${tripId}){
                new_scooter_status
            }
        }
    `

    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
    const result = await response.json()
    console.log(result)
    return result.data.endTrip
  }
}

export default scooters
