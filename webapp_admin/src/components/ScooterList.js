import { React } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../App.css";

export default function ScooterList({scooterData, setSelectedScooter, selectedScooter,selectedCategory,setSelectedCategory}) {

const [filteredScooters,setFilteredScooters] = useState([])

useEffect(()=>{
    if(selectedCategory === -1){
        setFilteredScooters(scooterData)
    } else{
        setFilteredScooters(scooterData.filter(scooter => scooter.status === selectedCategory))
    }
},[scooterData,selectedCategory]);

function handleScooterChange(scooter){
    setSelectedScooter(scooter)
} 

function handleCategoryChange(e){
    console.log(e.target.value)
    console.log(selectedCategory)
    if(parseInt(e.target.value) === selectedCategory){
        console.log("Hej")
        setSelectedCategory(-1);
        return
    }
    setSelectedCategory(parseInt(e.target.value))
}

return (
    <div>
        <div className="category-select-div">
        <button value="0" className={`category-button category-status-0 ${0 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
        <button value="1" className={`category-button category-status-1 ${1 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
        <button value="2" className={`category-button category-status-2 ${2 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
        <button value="3" className={`category-button category-status-3 ${3 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
        <button value="4" className={`category-button category-status-4 ${4 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
        <button value="5" className={`category-button category-status-5 ${5 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
        <button value="6" className={`category-button category-status-6 ${6 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
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

