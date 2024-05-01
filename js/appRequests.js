function getImagesForCategory(categoryId) {
  return fetch(`http://localhost:3000/category/${categoryId}/images`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(images => {
          return images.map(image => image.url);
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des images :', error);
          return [];
      });
}

function displayImagesForCategory(categoryId) {
  getImagesForCategory(categoryId)
      .then(imageUrls => {
          const container = document.getElementById(`category-${categoryId}`);
          imageUrls.forEach(url => {
              const img = document.createElement('img');
              img.classList.add('img');
              img.src = url;
              container.appendChild(img);
          });
      });
}

const categories = [1, 2, 3];
categories.forEach(categoryId => {
  displayImagesForCategory(categoryId);
});



/*****************AUTHENTIFICATION**************************************** */

let token = localStorage.getItem("token");

const Auth = () => {
  const portfolioModifyButton = document.getElementById("portfolio-modified");

  if (token) {
    const loginLinkOnIndex = document.querySelector(".li-end");
    loginLinkOnIndex.textContent = "Déconnexion";
    loginLinkOnIndex.style.cursor = "pointer";

    portfolioModifyButton.style.display = "flex";

    loginLinkOnIndex.addEventListener("click", function () {
      const confirmation = confirm(
        "Êtes-vous sûr de vouloir vous déconnecter ?"
      );
      if (confirmation) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
  } else {
    portfolioModifyButton.style.display = "none";
  }
};

Auth();
