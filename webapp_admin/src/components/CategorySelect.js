import { React } from 'react-router-dom'
import '../App.css'

export default function ScooterList ({ selectedCategory, setSelectedCategory }) {
  function handleCategoryChange (e) {
    console.log(e.target.value)
    console.log(selectedCategory)
    if (parseInt(e.target.value) === selectedCategory) {
      console.log('Hej')
      setSelectedCategory(-1)
      return
    }
    setSelectedCategory(parseInt(e.target.value))
  }

  return (

    <div className='category-select-div'>
      <button value='0' className={`category-button category-status-0 ${selectedCategory === 0 ? 'selected-category-button' : ''}`} onClick={handleCategoryChange} />
      <button value='1' className={`category-button category-status-1 ${selectedCategory === 1 ? 'selected-category-button' : ''}`} onClick={handleCategoryChange} />
      <button value='2' className={`category-button category-status-2 ${selectedCategory === 2 ? 'selected-category-button' : ''}`} onClick={handleCategoryChange} />
      <button value='3' className={`category-button category-status-3 ${selectedCategory === 3 ? 'selected-category-button' : ''}`} onClick={handleCategoryChange} />
      <button value='4' className={`category-button category-status-4 ${selectedCategory === 4 ? 'selected-category-button' : ''}`} onClick={handleCategoryChange} />
      <button value='5' className={`category-button category-status-5 ${selectedCategory === 5 ? 'selected-category-button' : ''}`} onClick={handleCategoryChange} />
      <button value='6' className={`category-button category-status-6 ${selectedCategory === 6 ? 'selected-category-button' : ''}`} onClick={handleCategoryChange} />
    </div>
  )
}
