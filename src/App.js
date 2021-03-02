import React, { useEffect, useState } from "react";
import './App.css';
import Recipe from './Recipe';



const App = () => {

  const APP_ID = '5d1d4307';
  const APP_KEY = '2e824275187df83d7d452a691f29bf41';

  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(  () => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    
  }

  return(
    <div className = "App">
      <form onSubmit = {getSearch} className = "search-form">
        <input className = "search-bar" type = "text" onChange = {updateSearch} />
        <button className = "search-button" type = "submit">Search</button> 
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
          <Recipe key = {recipe.recipe.label} title = {recipe.recipe.label} calories = {recipe.recipe.calories}
          image = {recipe.recipe.image} ingredients = {recipe.recipe.ingredients}
          
          ></Recipe>
      ))}
      </div>
    </div>

  );
};

export default App;
