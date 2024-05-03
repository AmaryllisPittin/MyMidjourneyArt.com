token = localStorage.getItem("token");

/******** GESTION OUVERTURE ET FERMETURE DE LA MODALE ********/

const openModal = function (e) {
  e.preventDefault();

  if (overlay !== null) {
    overlay.style.display = "flex";
    overlay.removeAttribute("aria-hidden");
    overlay.setAttribute("aria-modal", "true");

    overlay.addEventListener("click", closeModal);
    document.getElementById("js-close-modal-icon").addEventListener("click", closeModal);
  } else {
    console.log("la cible n'a pas été trouvée / ou est null");
  }
};

document.getElementById("portfolio-modified").addEventListener("click", openModal);

const modal = document.querySelector("modal-1").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    return;
  });

const stopPropagation = function (e) {
  e.stopPropagation();
};

const closeModal = function () {
  if (overlay === null) return;
  if (overlay !== null) {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    overlay.removeAttribute("aria-modal");

    const closeModalEvent = new Event('modalClosed');
    document.dispatchEvent(closeModalEvent);
  } else {
    console.log("la cible n'a pas été trouvée / ou est null");
  }
};

document.addEventListener('modalClosed', function() {
  resetModalContent();
});

let overlay = document.getElementById("modal");

/****AJOUT DES IMAGES******* */

function loadImagesInModal(categoryId) {
  return getImagesForCategory(categoryId)
    .then(imageUrls => {
      const container = document.getElementById(`modal-${categoryId}`);
      if (!container) {
        console.error(`Le conteneur modal avec l'ID modal-${categoryId} n'existe pas.`);
        return;
      }
      container.innerHTML = "";
      imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.classList.add('img');
        img.src = url;
        container.appendChild(img);
      });
    });
}

// Appel de loadImagesInModal pour chaque catégorie
categories.forEach(categoryId => {
  loadImagesInModal(categoryId);
});


/*function displayImagesForCategory(categoryId) {
  getImagesForCategory(categoryId)
      .then(imageUrls => {
          const container = document.getElementById(`modal-${categoryId}`);
          if (!container) {
              console.error(`Le conteneur modal avec l'ID modal-${categoryId} n'existe pas.`);
              return;
          }
          imageUrls.forEach(url => {
              const img = document.createElement('img');
              img.classList.add('img');
              img.src = url;
              container.appendChild(img);
          });
      });
}

let categories = [1, 2, 3, 4, 5, 6, 7, 8];
categories.forEach(categoryId => {
  displayImagesForCategory(categoryId);
});


let modalWorks = [];
const getWorkModal = async () => {
  await fetch("http://localhost:3000/category/${categoryId}/images")
    .then((res) => {
      return res.json();
    })
    .then((data) => (modalWorks = data))
    .then(() => {
      createGalleryModal();
    });
};
getWorkModal();*/

// Fonction pour charger les images dans la modale
function loadImagesInModal(categoryId) {
  getImagesForCategory(categoryId)
      .then(imageUrls => {
          const container = document.getElementById(`modal-${categoryId}`);
          if (!container) {
              console.error(`Le conteneur modal avec l'id' modal-${categoryId} n'existe pas.`);
              return;
          }
          container.innerHTML = "";
          imageUrls.forEach(url => {
              const img = document.createElement('img');
              img.classList.add('img');
              img.src = url;
              container.appendChild(img);
          });
      });
}


/*** Création de la galerie ***/
const createGalleryModal = () => {
  const modalContainer = document.querySelector(".modal-body");
  modalContainer.innerHTML = "";

  modalWorks.forEach((item) => {
    const imgElement = document.createElement("img");
    const figureElement = document.createElement("figure");
    figureElement.setAttribute("id", item.id);

    imgElement.src = item.imageUrl;

    figureElement.appendChild(imgElement);
    modalContainer.appendChild(figureElement);

    const spanBinElement = document.createElement("span");
    const binIcon = document.createElement("i");
    spanBinElement.classList.add("modal-span-bin");
    binIcon.classList.add("fa-solid", "fa-trash-can");
    binIcon.setAttribute("id", item.id);

    binIcon.addEventListener("click", DeleteProject);

    spanBinElement.appendChild(binIcon);
    figureElement.appendChild(spanBinElement);
  });
};

/* GESTION DE SUPPRESSION DE PROJET*/
const DeleteProject = async (e) => {
  const id = e.target.id;
  const confirmation = confirm("Etes-vous sûr de supprimer ce projet ?");
  if (confirmation) {
    await fetch(`http://localhost:3000/category/${categoryId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.ok) {
        window.alert("Le projet a été supprimé");
        getWorkModal();
        getWorks();
      } else {
        console.error("Erreur lors de la suppression du projet:", error);
      }
    });
  }
};

const AddProject = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title-input").value;
  const category = document.getElementById("category-select").value;
  const image = document.getElementById("file-input").files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  await fetch("http://localhost:3000/category/${categoryId}", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  }).then((response) => {
    if (response.ok) {
      getWorkModal();
      getWorks();
      closeModal();
    }
  });
};

 overlay = document.getElementById("modal");
let arrowIcon;
let xIcon;
let modalContentAddBody;

/*CREATION de la partie "AJOUT PHOTOS"*/

const modalAddContainer = () => {};

modalAddContainer();

let modalContent = document.querySelector(".modal-wrapper");
const addImagesButton = document.querySelector(".modal-btn-add");
const modalContainer = document.getElementById("modal");
let modalContentAdd = document.createElement("div");

modalContentAdd.classList.add("modal-add-wrapper");
modalContentAdd.id = "modal-content";

/*MODALE 2: header du modalContentAdd**/

const modalAddTitle = document.createElement("h3");
modalAddTitle.innerText = "Ajout photo";

arrowIcon = document.createElement("i");
arrowIcon.classList.add("fa-solid", "fa-arrow-left");

xIcon = document.createElement("i");
xIcon.classList.add("fa-solid", "fa-x");
xIcon.id = "js-close-modal-icon";

modalContentAdd.appendChild(modalAddTitle);
modalContentAdd.appendChild(arrowIcon);
modalContentAdd.appendChild(xIcon);

/*AJOUT PHOTOS: body du modalContentAdd*/

modalContentAddBody = document.createElement("div");
modalContentAddBody.classList.add("modal-add-body");

const modalAddInputContainer = document.createElement("div");
modalAddInputContainer.classList.add("input-container");

modalContentAddBody.appendChild(modalAddInputContainer);
modalContentAdd.appendChild(modalContentAddBody);

/*AJOUT PHOTOS: Contenu du modalAddInputContainer pour importer le fichier image*/

const inputContainerFlex = document.createElement("div");
inputContainerFlex.classList.add("input-container-flex");
modalAddInputContainer.appendChild(inputContainerFlex);

const imageIcon = document.createElement("i");
imageIcon.classList.add("fa-regular", "fa-image");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/jpeg, image/png";
fileInput.id = "file-input";

fileInput.style.display = "none";

const labelInsertImage = document.createElement("label");
labelInsertImage.htmlFor = "file-input";
labelInsertImage.textContent = "+ Ajouter photo";
labelInsertImage.classList.add("insert-image-label");

const pImageFormat = document.createElement("p");
pImageFormat.innerText = "jpg, png: 4mo max";

inputContainerFlex.appendChild(imageIcon);
inputContainerFlex.appendChild(fileInput);
inputContainerFlex.appendChild(labelInsertImage);
inputContainerFlex.appendChild(pImageFormat);

/*AJOUT PHOTOS: Le formulaire*/

const formContainer = document.createElement("div");
formContainer.classList.add("form-container");
const addImageForm = document.createElement("form");

formContainer.appendChild(addImageForm);
modalContentAddBody.appendChild(formContainer);

/*MODALE 2: création du bouton "Valider"*/

const validButton = document.createElement("button");
validButton.type = "submit";
validButton.classList.add("modal-btn-valid");
validButton.innerText = "Valider";

addImageForm.appendChild(validButton);

modalContentAdd.addEventListener("click", function (e) {
  stopPropagation(e);
});

modalContentAdd.querySelector("#js-close-modal-icon").addEventListener("click", closeModal);

addImagesButton.addEventListener("click", () => {
  modalContent.style.display = "none";
  modalContainer.appendChild(modalContentAdd);
  modalContentAdd.style.display = "block";
  inputContainerFlex.style.display = "flex";
});

arrowIcon.addEventListener("click", () => {
  modalContentAdd.style.display = "none";
  modalContainer.appendChild(modalContent);
  modalContent.style.display = "block";
});

/*MODALE 2: PRESENTATION de l'IMAGE dans la modale avant de valider*/

fileInput.addEventListener("change", function (event) {
  if (event.target.files.length > 0) {
    const selectedFile = event.target.files[0];

    if (
      selectedFile.type.startsWith("image/jpeg") ||
      selectedFile.type.startsWith("image/png")
    ) {
      const imageElement = document.createElement("img");
      imageElement.src = URL.createObjectURL(selectedFile);
      imageElement.classList.add("selected-image");

      modalAddInputContainer.innerHTML = "";
      modalAddInputContainer.appendChild(imageElement);

      imageElement.style.maxWidth = "100%";
      imageElement.style.height = "100%";
    }
  }
});

/***** */
const resetModalContent = function () {

  const imageTag = document.querySelector('.input-container img');
  if (imageTag) {
    imageTag.remove();
  }

  modalAddInputContainer.innerHTML = "";
  modalAddInputContainer.appendChild(inputContainerFlex);

  modalContentAdd.style.display = "none";
  modalContainer.appendChild(modalContent);
  modalContent.style.display = "block";
};

/****TENTATIVE POST******/

fileInput.addEventListener("change", function (event) {
  if (event.target.files.length > 0) {
    const selectedFile = event.target.files[0];

    if (
      selectedFile.type.startsWith("image/jpeg") ||
      selectedFile.type.startsWith("image/png")
    ) {
      const imageElement = document.createElement("img");
      imageElement.src = URL.createObjectURL(selectedFile);
      imageElement.classList.add("selected-image");

      modalAddInputContainer.innerHTML = "";
      modalAddInputContainer.appendChild(imageElement);

      imageElement.style.maxWidth = "100%";
      imageElement.style.height = "100%";

      validButton.style.backgroundColor = "#1D6154";
    }
  } else {
    validButton.style.backgroundColor = "";
  }
});
