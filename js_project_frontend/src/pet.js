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

    static renderPets(json, u_id){
        
        let pets = json
        let userPets = pets.filter(function(pet){
            return pet.user_id === u_id})
        userPets.map(pet => {
            const div = document.getElementById('pets-container')
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
            }
        )
    }
    static newPetForm(user_id){
        const petsContainer = document.getElementById('pets-container')

        const newPetForm = `
        
        <form id = "new-pet-form">
        <label>Pet Name</label>
        <input type = "text" id = "name"><br>
        <label>Pet Type (dog, cat, fish, etc)</label>
        <input type = "text" id = "kind">
        <input type = "submit"/> </form>
        `

        petsContainer.insertAdjacentHTML('beforeend', newPetForm)
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
                            name: e.target.children[1].value,
                            kind: e.target.children[4].value,
                            user_id: user_id
                        }
                    })
                })
                .then(resp => {
                    return resp.json()
                })
                .then (pet => {
                    const newPet = new Pet(pet)
                    newPet.displayPet()
                })
            })
        }
        

    displayPet(){
        const div = document.getElementById('pets-container')
        const p = document.createElement('div')
        p.className = "card"
        const name = document.createElement('h3')
        name.innerText = `Name: ${this.name}`
        p.appendChild(name)
        const kind = document.createElement('h3')
        kind.innerText = `Kind: ${this.kind}`
        p.appendChild(kind)
        const button = document.createElement('button')
        button.innerText = 'My Tasks'
        button.classList = 'task-btn'
        button.setAttribute("id", this.id)
        p.appendChild(button)
        div.appendChild(p)
    }

}
