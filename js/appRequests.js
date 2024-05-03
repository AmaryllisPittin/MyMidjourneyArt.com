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
          return [];
      });
}

function displayImagesForCategory(categoryId) {
  const container = document.getElementById(`category-${categoryId}`);
  if(container) {
      getImagesForCategory(categoryId)
          .then(imageUrls => {
              imageUrls.forEach(url => {
                  const img = document.createElement('img');
                  img.classList.add('img');
                  img.src = url;
                  container.appendChild(img);
              });
          });
  } else {
      console.log(`Le conteneur pour la catégorie ${categoryId} n'existe pas sur cette page.`);
  }
}


let categories = [1, 2, 3, 4, 5, 6, 7, 8];
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
