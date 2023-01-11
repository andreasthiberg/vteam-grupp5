import { React } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../App.css'

export default function ScooterList ({ scooterData, setSelectedScooter, selectedScooter, selectedCategory, setSelectedCategory }) {
  const [filteredScooters, setFilteredScooters] = useState([])

  useEffect(() => {
    if (selectedCategory === -1) {
      setFilteredScooters(scooterData)
    } else {
      setFilteredScooters(scooterData.filter(scooter => scooter.status === selectedCategory))
    }
  }, [scooterData, selectedCategory])

  function handleScooterChange (scooter) {
    setSelectedScooter(scooter)
  }

  function scrollToSelectedScooter (id) {
    const listDiv = document.getElementById('unit-list-div')
    const selectedDiv = document.getElementById('scooter-div-' + id)
    if (listDiv !== null && selectedDiv !== null) {
      listDiv.scrollTop = selectedDiv.offsetTop
    }
  }

  // Scroll to selected scooter when changed
  useEffect(() => {
    scrollToSelectedScooter(selectedScooter.id)
  }, [selectedScooter])

  return (
    <>
      <div>
        {filteredScooters.map((scooter) => (
          <div
            className={`single-scooter-div ${scooter.id === selectedScooter.id ? 'selected-scooter-div' : ''}`}
            key={scooter.id} onClick={() => handleScooterChange(scooter)}
            id={`scooter-div-${scooter.id}`}
          >
            <p>Cykel {scooter.id} <span className={`scooter-status-${scooter.status}`}>&#9632;</span></p>
          </div>
        ))}
      </div>
    </>
  )
}
