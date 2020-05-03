document.addEventListener('DOMContentLoaded', function(){
    Pet.newPetForm()
    Pet.getPets()
})

class Pet {
    constructor(pet){
        this.id = pet.id
        this.name = pet.name
        this.kind = pet.kind
        this.tasks = pet.tasks
    }

    static getPets(user_id){
        const petUrl = `http://localhost:3000/pets/`
        return fetch(petUrl)
        .then(resp => resp.json())
        .then(json => Pet.renderPets(json, user_id))
    }

    static renderPets(json){
        const div = document.getElementById('pets-container')
        let pets = json
        pets.forEach(pet => {
            
            const p = document.createElement('div')
            p.className = "card"
            const name = document.createElement('h3')
            name.innerText = `Name: ${pet.name}`
            p.appendChild(name)
            const kind = document.createElement('h3')
            kind.innerText = `Kind: ${pet.kind}`
            p.appendChild(kind)
            const button = document.createElement('button')
            button.innerText = 'My Tasks'
            button.classList = 'task-btn'
            button.setAttribute("id", pet.id)
            p.appendChild(button)
            div.appendChild(p)
            
        })
        .catch(function(error){
            document.body.innerHTML = `<h1>${error.message} </h1>`;
            console.log(error.message)
        })
    }
    static newPetForm(user_id){
        const petsContainer = document.getElementById('pets-container')

        const newPetForm = `<form id = "new-pet-form">
        <label>Pet Name</label>
        <input type = "text" id = "name"><br>
        <label>Pet Type (dog, cat, fish, etc)<label>
        <input type = "text" id = "kind">
        <input type = "submit"/> </form>`

        petsContainer.insertAdjacentHTML('afterend', newPetForm)
        Pet.createPet(user_id)
    }

    static createPet(user_id){
        const petForm = document.getElementById('new-pet-form')
        petForm.addEventListener('submit', function(e){
            e.preventDefault()
            fetch('http://localhost:3000/pets', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        pet: {
                            name: e.target.children[1].value
                        }
                    })
                })
                .then(resp => {
                    return resp.json()
                })
                .then (pet => {
                    const newPet = new Pet(pet)
               
                })
            })
        }

    ''
}
