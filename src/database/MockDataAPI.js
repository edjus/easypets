import { events, productCategories, categories, ingredients } from './dataArrays';

export function getCategoryById(categoryId) {
  let category;
  productCategories.map(data => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getIngredientName(ingredientID) {
  let name;
  ingredients.map(data => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map(data => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getProductCategoryName(categoryId) {
  let name;
  productCategories.map(data => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}

export function getCategoryName(categoryId) {
  let name;
  categories.map(data => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}

export function getEvents(categoryId) {
  const eventsArray = [];
  events.map(data => {
    if (data.categoryId == categoryId) {
      eventsArray.push(data);
    }
  });
  return eventsArray;
}

// modifica
export function getEventsByIngredient(ingredientId) {
  const eventsArray = [];
  events.map(data => {
    data.ingredients.map(index => {
      if (index[0] == ingredientId) {
        eventsArray.push(data);
      }
    });
  });
  return eventsArray;
}

export function getNumberOfRecipes(categoryId) {
  let count = 0;
  events.map(data => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.map(index => {
    ingredients.map(data => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}