// Callbacks

const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');
  const detailRating = document.getElementById('rating-display');
  const detailComment = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); 

      const newRamen = {
        name: e.target['new-name'].value,
        restaurant: e.target['new-restaurant'].value,
        image: e.target['new-image'].value,
        rating: e.target['new-rating'].value,
        comment: e.target['new-comment'].value,
      };
      const img = document.createElement('img');
      img.src = newRamen.image;
      img.alt = newRamen.name;

      img.addEventListener('click', () => handleClick(newRamen));

      document.getElementById('ramen-menu').appendChild(img);
      
    });
  } else {
    console.error('Form not found'); 
  }
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById('ramen-menu');

      ramens.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;

        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch((error) => console.error('Error fetching ramens:', error));
};

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // Invoke displayRamens here
    displayRamens();

    // Invoke addSubmitListener here
    addSubmitListener();
  });
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};