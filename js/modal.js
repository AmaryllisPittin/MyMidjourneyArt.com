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

const modal = document.getElementById("modal-content").addEventListener("click", function (e) {
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


  