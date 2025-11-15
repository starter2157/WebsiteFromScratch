async function setTemperature() {
    const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
    const weatherData = await weatherPromise.json()

    const temperature = weatherData.properties.periods[0].temperature

    document.querySelector("#temperature-output").textContent = temperature
}

setTemperature()

const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function setPetCard() {
    const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
    const petsData = await petsPromise.json()

    petsData.forEach(petData => {
        const petCard = template.content.cloneNode(true)
        petCard.querySelector("h3").textContent = petData.name
        petCard.querySelector(".pet-description").textContent = petData.description
        petCard.querySelector(".pet-age").textContent = ageCal(petData.birthYear)
        if (!petData.photo) petData.photo = "images/Fallback.jpg" 
        petCard.querySelector(".pet-card-photo img").src = petData.photo
        petCard.querySelector(".pet-card-photo img").alt = `A ${petData.species} named ${petData.name}`
        wrapper.appendChild(petCard)
    })

    document.querySelector(".list-of-pets").appendChild(wrapper)
}

function ageCal(birthYear) {
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear
    if (age == 1) return "1 year old"
    else if (age < 1) return "Less than a year old"
    else return `${age} years old`
}

setPetCard()