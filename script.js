
//const APIKEY="sk-rTUm65c3fe816e1324068";
//const APIKEY="sk-yoVU65c4f724016454078"
const baseURL = "https://perenual.com/api/";
const selectedPlantKind = document.getElementById("selectedPlantKind");

document.addEventListener("DOMContentLoaded", () => {

    fetch(baseURL + "species-list?key=" + APIKEY)
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

let selectedOption = document.getElementById("selectMethod");
let selectedSpecies = document.getElementById("selectedPlantKind");

const img = document.getElementById("plantImg");
const p = document.getElementById("scientificName");

selectedOption.addEventListener("change", () => {
    let event = new Event('change');

    // Dispatch it.
    selectedSpecies.dispatchEvent(event);
});

const defaultImg=document.getElementById("defaultImg");
selectedPlantKind.addEventListener("change", () => {
    console.log("Bien3");
    p.style = "display:none";
    img.style = "display:none";
    console.log(selectedSpecies)
    if (selectedOption.value === "optionImgAsync") {

        const apiAsync = async () => {
            try {
                let response = await fetch(baseURL + "species/details/" + selectedSpecies.value + "?key=" + APIKEY);
                response = await response.json();
                const img = document.getElementById("plantImg");
                img.setAttribute("src", response.default_image.small_url);
                img.style = "display:block;";
                defaultImg.style="display:none";
            } catch (error) {
                console.error("Error fetching image asynchronously:", error);
            }
        }
        apiAsync();
    }
    else if (selectedOption.value === "optionImgPromise") {
        p.style = "display:none";
        fetch(baseURL + "species/details/" + selectedSpecies.value + "?key=" + APIKEY)

            .then(response => response.json())
            .then(response => {
                const img = document.getElementById("plantImg");
                img.setAttribute("src", response.default_image.small_url);
                img.style = "display:block;"
                defaultImg.style="display:none";
            })
            .catch(error => {
                console.error("Error fetching image with promise:", error);
            });

    }
    else if (selectedOption.value === "optionTxAsync") {
        img.style = "display:none";
        const apiAsync = async () => {
            try {
                let response = await fetch(baseURL + "species/details/" + selectedSpecies.value + "?key=" + APIKEY);
                response = await response.json();
                document.getElementById("scientificName").textContent = response.scientific_name;
                p.style = "display:block;"
                document.getElementById("scientificName").innerHTML = `El nombre científico de la especie seleccionada es: ${response.scientific_name}`;
                defaultImg.style="display:none";
            } catch (error) {
                console.error("Error fetching scientific name with promise:", error);
            }
        }
        apiAsync();

    }
    else if (selectedOption.value === "optionTxPromise") {
        img.style = "display:none";
        fetch(baseURL + "species/details/" + selectedSpecies.value + "?key=" + APIKEY)

            .then(response => response.json())
            .then(response => {
                document.getElementById("scientificName").textContent = response.scientific_name;
                console.log(response);
                p.style = "display:block;"
                document.getElementById("scientificName").innerHTML = `El nombre científico de la especie seleccionada es: ${response.scientific_name}`;
                defaultImg.style="display:none";
            })
            .catch(error => {
                console.error("Error fetching scientific name with promise:", error);
            });

    }
    else {
        alert("Debe seleccionar una opción");
    }
});