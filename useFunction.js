import { macBookAirModels } from './modeli.js';
import { customMap, customReduce, customFilter, customPipe } from './function.js';


window.addEventListener('DOMContentLoaded', function () {
  displayModels(macBookAirModels);
});


function displayModels(models) {
  console.log('Displaying Models:', models);  
  let displayMenu = customMap(models, (model) => {
    return `<article class="model-item">
      <img src=${model.slika} alt=${model.naziv} class="photo" />
      <div class="model-info">
        <header>
          <h4>${model.naziv}</h4>
        </header>
        <p class="model-text">${model.boja}</p>
        <p class="model-text">${model.zaslon}</p>
        <p class="model-text">${model.grupa_procesora}</p>
        <p class="model-text">${model.procesor}</p>
        <p class="model-text">${model.pohrana}</p>
      </div>
    </article>`;
  });

 displayMenu = displayMenu.join('');
  document.getElementById('results').innerHTML = displayMenu;
}


function extractAndDisplayCategories(models) {
  const categories = customReduce(models, (values, model) => {
    if (!values.includes(model.kategorija_zaslona)) {
      values.push(model.kategorija_zaslona);
    }
    return values;
  }, ['Svi modeli']);

  const buttonsHTML = customMap(
    categories,
    (category) =>
      `<button type="button" class="filter-btn" data-id=${category}>${category}</button>`
  );

  document.getElementById('buttons-container').innerHTML = buttonsHTML.join('');


  const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach((button) => {
  button.addEventListener('click', function (e) {
    const selectedCategory = e.currentTarget.dataset.id;

    const filterAndDisplayModels = customPipe(
      (data) => {
        if (selectedCategory === 'Svi modeli') {
          console.log('Showing all models');
          return macBookAirModels; 
        } else {
          console.log('Filtering models by category:', selectedCategory);
          return customFilter(data, (model) => model.kategorija_zaslona === selectedCategory);
        }
      },
      displayModels
    );
    filterAndDisplayModels(macBookAirModels);
  });
});
}
extractAndDisplayCategories(macBookAirModels);
