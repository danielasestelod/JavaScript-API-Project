"use strict";
const APIKEY="sk-Fp8X65c7ee8312fb54101";
const BASE_URL = "https://perenual.com/api/";
const selectedPlantKind = document.getElementById("selectedPlantKind");

document.addEventListener("DOMContentLoaded", () => {

    fetch(BASE_URL
        + "species-list?key=" + APIKEY)
        .then(response => response.json())
        .then(response => {
            const species = response.data;
            species.forEach((specie) => {
                let option = document.createElement("option");
                option.setAttribute("value", specie.id);
                option.textContent = specie.common_name;
                selectedPlantKind.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching species list:", error);
        });
});

const selectedOption = document.getElementById("selectMethod");
const selectedSpecies = document.getElementById("selectedPlantKind");

//simula que cambia una especie en caso de que cambies de método de llamada, así se volverá a hacer una llamada a la api
selectedOption.addEventListener("change", () => {
    const event = new Event('change');
    selectedSpecies.dispatchEvent(event);
});

const defaultImg = document.getElementById("defaultImg");
const OPTION_IMG_ASYNC = "optionImgAsync";
const OPTION_IMG_PROMISE = "optionImgPromise";
const OPTION_TXT_ASYNC = "optionTxAsync";
const OPTION_TXT_PROMISE = "optionTxPromise";
const img = document.getElementById("plantImg");
const p = document.getElementById("scientificName");
const errorMessage = document.getElementById("errorMessage");
console.log("DDDDDDddddd" + selectedSpecies.value);
selectedPlantKind.addEventListener("change", () => {
    p.style = "display:none";
    img.style = "display:none";
    errorMessage.style = "display:none";
    if (selectedOption.value === OPTION_IMG_ASYNC && selectedSpecies.value) {

        const apiAsync = async () => {
            try {
                let response = await fetch(BASE_URL + "species/details/" + selectedSpecies.value + "?key=" + APIKEY);

                response = await response.json();
                const img = document.getElementById("plantImg");
                img.setAttribute("src", response.default_image.small_url);
                img.style = "display:block;";
                defaultImg.style = "display:none";
            } catch (error) {
                errorMessage.style = "display:block";
                console.log("Error fetching image asynchronously:", error);
            }
        }
        apiAsync();
    }
    else if (selectedOption.value === OPTION_IMG_PROMISE && selectedSpecies.value) {
        p.style = "display:none";
            fetch(BASE_URL + "species/details/" + selectedSpecies.value + "?key=" + APIKEY)
                .then(response => response.json())
                .then(response => {
                    const img = document.getElementById("plantImg");
                    img.setAttribute("src", response?.default_image.small_url);
                    img.style = "display:block;"
                    defaultImg.style = "display:none";
                })
                .catch(error => {
                    errorMessage.style = "display:block";
                    console.log("Error fetching image with promise:", error);
                });
        

    }
    else if (selectedOption.value === OPTION_TXT_ASYNC && selectedSpecies.value) {
        img.style = "display:none";
        const apiAsync = async () => {
            try {
                let response = await fetch(BASE_URL + "species/details/" + selectedSpecies.value + "?key=" + APIKEY);
                response = await response.json();
                document.getElementById("scientificName").textContent = response.scientific_name;
                p.style = "display:block;"
                document.getElementById("scientificName").innerHTML = `El nombre científico de la especie seleccionada es: ${response.scientific_name}`;
                defaultImg.style = "display:none";
            } catch (error) {
                errorMessage.style = "display:block";
                console.log("Error fetching scientific name with promise:", error);
            }
        }
       apiAsync();

    }
    else if (selectedOption.value === OPTION_TXT_PROMISE && selectedSpecies.value) {
        img.style = "display:none";
        
            fetch(BASE_URL + "species/details/" + selectedSpecies.value + "?key=" + APIKEY)
                .then(response => response.json())
                .then(response => {
                    document.getElementById("scientificName").textContent = response.scientific_name;
                    p.style = "display:block;"
                    document.getElementById("scientificName").innerHTML = `El nombre científico de la especie seleccionada es: ${response.scientific_name}`;
                    defaultImg.style = "display:none";
                })
                .catch(error => {
                    console.log("Error fetching scientific name with promise:", error);
                    errorMessage.style = "display:block";
                });
    }
    else {
        defaultImg.style="display:block";
    }
});