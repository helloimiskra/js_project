document.addEventListener('DOMContentLoaded', function(){
    User.createUser()
})

class User {
    constructor(user){
        this.id = user.id
        this.name = user.name
        this.pets = user.pets
        this.tasks = user.tasks
    }

    static createUser(){
        const userForm = document.getElementById('new-user-form')
        userForm.addEventListener('submit', function(e){
            e.preventDefault()
            fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        user: {
                            name: e.target.children[0].value
                        }
                    })
                })
                .then(resp => {
                    return resp.json()
                })
                .then (user => {
                    const newUser = new User(user)
                    newUser.displayUser()
                })
            })
        }

        displayUser() {
            const body = document.getElementById('index-container')
            body.innerHTML = `<h1>Welcome back, ${this.name}.</h1>`

            const petContainer = document.createElement('div')
            petContainer.setAttribute('id', 'pets-container')
            body.append(petContainer)
            Pet.newPetForm(this.id)
            if (this.pets){
                this.pets.forEach(function(pet){
                    let newPet = new Pet(pet)
                    newPet.displayPet()
                })
            }
            if (this.tasks){
                this.tasks.forEach(function(task){
                    let newTask = new Task(task)
                    newTask.displayTask()
                })
            }
            
            
        }

    }
