document.addEventListener('DOMContentLoaded', function(){
    User.createUser()
})

class User {
    constructor(user){
        this.id = user.id
        this.name = user.name
        this.pets = user.pets
    }

    static createUser(){
        const userForm = document.getElementById('new-user-form')
        userForm.addEventListener('submit', function(e){
            fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        user: {
                            name: e.target.children[1].value
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
        }

    }
