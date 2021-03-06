class Pet {
    constructor(pet) {
        this.id = pet.id;
        this.name = pet.name;
        this.kind = pet.kind;
        this.user_id = pet.user_id;
        this.tasks = pet.tasks;
    }

    static getPets(user_id) {
        const petUrl = `http://localhost:3000/pets/`;
        return fetch(petUrl)
            .then((resp) => resp.json())
            .then((json) => Pet.renderPets(json, user_id));
    }

    static renderPets(json, u_id) {
        let pets = json;
        let userPets = pets.filter(function(pet) {
            return pet.user_id === u_id;
        });
        userPets.map((pet) => {
            const div = document.getElementById("pets-container");
            const p = document.createElement("div");
            p.className = "card";
            const name = document.createElement("h3");
            name.innerText = `Name: ${pet.name}`;
            p.appendChild(name);
            const kind = document.createElement("h3");
            kind.innerText = `Kind: ${pet.kind}`;
            p.appendChild(kind);
            const button = document.createElement("button");
            button.innerText = "My Tasks";
            button.classList = "task-btn";
            button.setAttribute("id", pet.id);
            p.appendChild(button);
            div.appendChild(p);
        });
    }
    static newPetForm(user_id) {
        const petsContainer = document.getElementById("pets-container");

        const newPetForm = `
        <div class="sidenav">
        <form id = "new-pet-form">
        <label><h4>Register a new pet:</h4></label><br>
        <input type = "text" id = "name" placeholder="Input your pet's name..." required ><br>
        <input type = "text" id = "kind" placeholder = "Input your pet type(cat, dog, fish, etc.) required"> <br>
        <input type = "submit" class = "btn btn-light"/> </form>
        </div>
        `;

        petsContainer.insertAdjacentHTML("beforeend", newPetForm);
        Pet.createPet(user_id);
    }

    static createPet(user_id) {
        const petForm = document.getElementById("new-pet-form");
        petForm.addEventListener("submit", function(e) {
            e.preventDefault();
            fetch("http://localhost:3000/pets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        pet: {
                            name: e.target.children[2].value,
                            kind: e.target.children[4].value,
                            user_id: user_id,
                            tasks: []
                        },
                    }),
                })
                .then((resp) => {
                    return resp.json();
                })
                .then((pet) => {
                    const newPet = new Pet(pet);
                    newPet.user_id = user_id;
                    newPet.displayPet();
                });
        });
    }

    displayPet() {
        const div = document.getElementById("pets-container");
        const p = document.createElement("div");
        p.className = "card";
        p.setAttribute("id", this.id);
        const name = document.createElement("h3");
        name.innerText = `Name: ${this.name}`;
        p.appendChild(name);
        const kind = document.createElement("h3");
        kind.innerText = `Kind: ${this.kind}`;
        p.appendChild(kind);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete Pet";
        deleteButton.classList = "delete-btn btn btn-dark";
        deleteButton.setAttribute("id", this.id);
        p.insertAdjacentElement("beforeend", deleteButton);

        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.deletePet(e, this.id);
            e.target.parentElement.remove();
        });

        const taskContainer = document.createElement("div");
        taskContainer.setAttribute("id", `${this.id} - tasks-container`);

        const button = document.createElement("button");
        button.innerText = "My Tasks";
        button.classList = "task-btn btn btn-dark";
        button.setAttribute("id", `btn-${this.id}`);
        taskContainer.appendChild(button);
        let tasks = this.tasks;

        button.addEventListener("click", (e) => {
            if (!document.getElementById(`new-task-form-${this.id}`)) {
                Task.newTaskForm(e, this.id);
                let allTasks = document.createElement("div");
                allTasks.setAttribute("id", `${this.id} - tasks`);
                taskContainer.appendChild(allTasks);
                const sortButton = document.createElement("button");
                sortButton.innerText = "Sort by Alphabetical Order";
                sortButton.classList = "sort-btn btn btn-dark";
                allTasks.appendChild(sortButton);
                sortButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    tasks.sort(function(a, b) {
                        return a.title.localeCompare(b.title);
                    });

                    let clearedTasks = document.getElementById(`${this.id} - tasks`);
                    clearedTasks.innerHTML = "";
                    tasks.forEach(function(task) {
                        let newTask = new Task(task);
                        newTask.displayTask();
                    });
                });
                if (tasks) {
                    tasks.forEach(function(task) {
                        let newTask = new Task(task);
                        newTask.displayTask();
                    });
                }
            }
        });
        p.appendChild(taskContainer);
        div.appendChild(p);
    }
    deletePet(e, pet_id) {
        fetch(`http://localhost:3000/pets/` + pet_id, {
            method: "DELETE",
        });
    }
}