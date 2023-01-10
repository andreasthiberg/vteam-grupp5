import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../App.css";

export default function ScooterList({scooterData, setSelectedScooter, selectedScooter,selectedCategory,setSelectedCategory}) {

const [filteredScooters,setFilteredScooters] = useState([])

useEffect(()=>{
    setFilteredScooters(scooterData.filter(scooter => scooter.status === selectedCategory))
},[scooterData,selectedCategory]);

function handleScooterChange(scooter){
    setSelectedScooter(scooter)
} 

function handleCategoryChange(e){
    setSelectedCategory(parseInt(e.target.value))
    console.log(selectedCategory)
}

return (
    <div>
        <div className="category-select-div">
        <button value="0" className="category-button category-status-0" onClick={handleCategoryChange}></button>
        <button value="1" className="category-button category-status-1" onClick={handleCategoryChange}></button>
        <button value="2" className="category-button category-status-2" onClick={handleCategoryChange}></button>
        <button value="3" className="category-button category-status-3" onClick={handleCategoryChange}></button>
        <button value="4" className="category-button category-status-4" onClick={handleCategoryChange}></button>
        <button value="5" className="category-button category-status-5" onClick={handleCategoryChange}></button>
        <button value="6" className="category-button category-status-6" onClick={handleCategoryChange}></button>
        </div>
        {filteredScooters.map((scooter) => (
            <div className={`single-scooter-div ${scooter.id === selectedScooter.id ? "selected-scooter-div" : ""}`} 
            key={scooter.id} onClick={() => handleScooterChange(scooter)}
            id={`scooter-div-${scooter.id}`}>
                <p>Cykel {scooter.id} <span className={`scooter-status-${scooter.status}`}>&#9632;</span></p>
            </div>
        ))}
    </div>
  );
}

