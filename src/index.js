document.addEventListener('DOMContentLoaded', () => {
fetch('http://localhost:3000/dogs')
.then(res => res.json())
.then(dogs => {
    dogs.forEach(dog => {
        renderDogs(dog);
    })
})
})

function renderDogs(dog) {
    const dogTable = document.getElementById('table-body');
    const dogName = document.createElement('td');
    const dogBreed = document.createElement('td');
    const dogSex = document.createElement('td');
    const editDog = document.createElement('td');
    const newRow = document.createElement('tr');
    newRow.setAttribute('id', `row-${dog.id}`)
    dogName.innerText = dog.name;
    dogName.setAttribute('id', `name-${dog.id}`)
    dogBreed.innerText = dog.breed;
    dogBreed.setAttribute('id', `breed-${dog.id}`)
    dogSex.innerText = dog.sex;
    dogSex.setAttribute('id', `sex-${dog.id}`)
    editDog.innerHTML = `<button id=edit-btn${dog.id}>Edit Dog</button>`;
    dogTable.appendChild(newRow);
    newRow.appendChild(dogName);
    newRow.appendChild(dogBreed);
    newRow.appendChild(dogSex);
    newRow.appendChild(editDog);
    editDog.addEventListener('click', (e) => {
        const buttonID = e.target.id;
        const ID = buttonID.slice(-1);
        const dogForm = document.getElementById('dog-form')
        const dogFormArray = dogForm.elements;
        const dogNameField = dogFormArray[0];
        const dogBreedField = dogFormArray[1];
        const dogSexField = dogFormArray[2];
        const dogNameToDisplay = document.getElementById(`name-${ID}`).innerText;
        const dogBreedToDisplay = document.getElementById(`breed-${ID}`).innerText;
        const dogSexToDisplay = document.getElementById(`sex-${ID}`).innerText;
        dogNameField.setAttribute('value', dogNameToDisplay)
        dogBreedField.setAttribute('value', dogBreedToDisplay);
        dogSexField.setAttribute('value', dogSexToDisplay);
        dogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nodeList = document.querySelectorAll("input[type=text]")
            const nodeArray = Array.from(nodeList);
            const updatedName = nodeArray[0].value;
            const updatedBreed = nodeArray[1].value;
            const updatedSex = nodeArray[2].value;
            const newNameInTable = document.getElementById(`name-${ID}`);
            newNameInTable.innerText = updatedName;
            const newBreedInTable = document.getElementById(`breed-${ID}`);
            newBreedInTable.innerText = updatedBreed;
            const newSexInTable = document.getElementById(`sex-${ID}`);
            newSexInTable.innerText = updatedSex;
            fetch(`http://localhost:3000/dogs/${ID}`, {
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"name": updatedName, "sex": updatedSex, "breed": updatedBreed})
            })
            .then(res => res.json())
            .then(results => {
                console.log(results);
            })
            fetch('http://localhost:3000/dogs')
            .then(res => res.json())
            .then(dogs => {
                dogs.forEach(dog => {
                renderDogs(dog);
                })
            })
        })
    })
}