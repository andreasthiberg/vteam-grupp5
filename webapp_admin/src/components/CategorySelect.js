import { React } from 'react-router-dom';
import "../App.css";

export default function ScooterList({selectedCategory,setSelectedCategory}) {


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

    <div className="category-select-div">
    <button value="0" className={`category-button category-status-0 ${0 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
    <button value="1" className={`category-button category-status-1 ${1 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
    <button value="2" className={`category-button category-status-2 ${2 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
    <button value="3" className={`category-button category-status-3 ${3 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
    <button value="4" className={`category-button category-status-4 ${4 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
    <button value="5" className={`category-button category-status-5 ${5 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
    <button value="6" className={`category-button category-status-6 ${6 === selectedCategory ? "selected-category-button" : ""}`} onClick={handleCategoryChange}></button>
    </div>
  );
}

