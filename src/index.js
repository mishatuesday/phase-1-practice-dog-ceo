console.log('%c HI', 'color: blue')
const dogImgsUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedsUrl = "https://dog.ceo/api/breeds/list/all"
// add a listener to the ul to change color if a li is clicked
//get the ul, add a listener, evaluate if its a li and change the style
const breedList = document.getElementById("dog-breeds")
breedList.addEventListener("click", (e) => colorTheBreed(e))
const breedDropdown = document.getElementById("breed-dropdown")
breedDropdown.addEventListener("change", (e) => filterBreeds(e))

function getDogImgs() {
    fetch(dogImgsUrl)
    .then((resp) => resp.json())
    .then((dogsData) => extractDogs(dogsData))
    .catch((err) => alert(err))    
}

function getBreeds() {
    fetch(breedsUrl)
    .then((resp) => resp.json())
    .then((breedsData) => extractBreeds(breedsData))
}

function extractDogs(dogsData) {
    dogsData["message"].forEach((dog) => showDog(dog))
}

function showDog(dog) {
 const dogPhoto = document.createElement("img")
 const dogImageContainer = document.getElementById("dog-image-container")
 dogPhoto.src = dog
 dogImageContainer.appendChild(dogPhoto)
}

function extractBreeds(breedsData) {
    const breeds = Object.keys(breedsData.message)
    breeds.forEach((breed) => showBreed(breed))
}

function showBreed(breed) {
    const breedElement = document.createElement("li")
    breedElement.textContent = breed
    breedElement.className = breed.substring(0,1) // how to do in JS
    //breedElement.className = the first letter of the breed
    // for the filter
    breedList.appendChild(breedElement)
}

function colorTheBreed(e) {
    if (e.target = "li") {
    const randNum = parseInt(Math.random()*6)
    let randColor;
    switch (randNum) {
        case 0: 
            randColor = "red";
            break;
        case 1:
            randColor = "#999900";
            break;
        case 2:
            randColor = "green";
            break;
        case 3:
            randColor = "orange";
            break;
        case 4:
            randColor = "blue";
            break;
        case 5:
            randColor = "purple"
            break;
        case 6:
            randColor = "#666666"
        default:
            randColor = "#336699"
    }
    e.target.style.color = randColor
    }
}
// a filter function that turns all of the li's to hidden (somehow?)
// and turns back on only the ones that start with the selected letter
// #breed-dropdown
function filterBreeds(e) {
    const breedListItems = breedList.querySelectorAll("li")
    const filterValue = e.target.value
    console.log(filterValue)
    breedListItems.forEach((item) => {
        // need to get 'any' to match all
        if (filterValue === "any") {
            item.style.display = "block"
        } else if (item.className === filterValue) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    })
}


getDogImgs()
getBreeds()
