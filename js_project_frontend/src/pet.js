document.addEventListener('DOMContentLoaded', function(){
    Pet.newPetForm()
})

class Pet {
    constructor(pet){
        this.id = pet.id
        this.name = pet.name
        this.kind = pet.kind
        this.tasks = pet.tasks
    }

    static newPetForm(user_id){
        const petsContainer = document.getElementById('pets-container')

        const newPetForm = `<form id = "new-pet-form">
        <label>Pet Name</label>
        <input type = "text" id = "name">
        <label>Pet Type (dog, cat, fish, etc)<label>
        <input type = "text" id = "kind">
        <input type = "submit"/> </form>`

        petsContainer.insertAdjacentHTML('afterend', newPetForm)
        Pet.createPet(user_id)
    }

    
}
