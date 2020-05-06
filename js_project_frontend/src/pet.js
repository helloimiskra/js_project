class Pet {
    constructor(pet){
        this.id = pet.id
        this.name = pet.name
        this.kind = pet.kind
        this.user_id = pet.user_id
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
        <label><h4>Register a new pet:</h4></label>
        <input type = "text" id = "name" placeholder="Input your pet's name..."><br>
        <input type = "text" id = "kind" placeholder = "Input your pet type(cat, dog, fish, etc.)"> <br>
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
                            kind: e.target.children[3].value,
                            user_id: user_id,
                            tasks: []
                        }
                    })
                })
                .then(resp => {
                    return resp.json()
                })
                .then (pet => {
                    const newPet = new Pet(pet)
                    newPet.user_id = user_id
                    newPet.displayPet()
                    

                })
            })
        }
        

    displayPet(){
        const div = document.getElementById('pets-container')
        const p = document.createElement('div')
        p.className = "card"
        p.setAttribute("id", this.id)
        const name = document.createElement('h3')
        name.innerText = `Name: ${this.name}`
        p.appendChild(name)
        const kind = document.createElement('h3')
        kind.innerText = `Kind: ${this.kind}`
        p.appendChild(kind)

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Delete Pet'
        deleteButton.classList = 'delete-btn'
        deleteButton.setAttribute("id", this.id)
        p.insertAdjacentElement('beforeend', deleteButton)

        deleteButton.addEventListener('click', (e) => {
            e.preventDefault()
            this.deletePet(e, this.id)
            e.target.parentElement.remove()
        })


        const button = document.createElement('button')
        button.innerText = 'My Tasks'
        button.classList = 'task-btn'
        button.setAttribute("id", `btn-${this.id}`)
        p.appendChild(button)
        div.appendChild(p)
        button.addEventListener('click', (e)=>{
            if (!document.getElementById(`new-task-form-${this.id}`)){
                Task.newTaskForm(e, this.id)
                if (this.tasks){
                    this.tasks.forEach(function(task){
                        let newTask = new Task(task)
                        newTask.displayTask()
                    })
                }
            } else {
                
            }
            
        })
   
    }
    deletePet(e, pet_id){
        fetch(`http://localhost:3000/pets/`+ pet_id, {
        method: "DELETE"
        })
    }

}
