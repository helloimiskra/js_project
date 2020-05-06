class Task {
    constructor(task){
        this.id = task.id
        this.title = task.title
        this.comment = task.comment
        this.time = task.time
        this.complete = task.complete
        this.pet_id = task.pet_id
    }


    static newTaskForm(e, pet_id){
        const card = document.getElementById(pet_id)

        const tasksContainer = document.getElementById('tasks-container')

        const newTaskForm = `
        
        <form id = "new-task-form-${pet_id}" >
        <input type = "text" id = "title" placeholder = "Task:"><br>
        <input type = "text" id = "comment" placeholder = "Comment:"><br>
        <input type = "submit"/> </form>
        `

        card.insertAdjacentHTML('beforeend', newTaskForm)
        Task.createTask(pet_id)
        console.log(pet_id)
    }

    static createTask(pet_id){
        const taskForm = document.getElementById(`new-task-form-${pet_id}`)
      
        taskForm.addEventListener('submit', function(e){
            e.preventDefault()
            fetch('http://localhost:3000/tasks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        task: {
                            title: e.target.children[0].value,
                            comment: e.target.children[2].value,
                            complete: false,
                            time: new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                            pet_id: pet_id
                        }
                    })
                })
                .then(resp => {
                    return resp.json()
                })
                .then (task => {
                    const newTask = new Task(task)
                    newTask.pet_id = pet_id
                    newTask.displayTask()
                  
                })
            })
        }
        

        displayTask(){
            const div = document.getElementById(this.pet_id)
            const t = document.createElement('div')
            const content = document.createElement('h3')
            content.innerText = `Title: ${this.title}       Comment: ${this.comment}`
            t.appendChild(content)
            const deleteButton = document.createElement('button')
            deleteButton.innerText = 'X'
            deleteButton.classList = 'delete-btn'
            deleteButton.setAttribute("id", this.id)
            t.insertAdjacentElement('beforeend', deleteButton)
            div.appendChild(t)

            deleteButton.addEventListener('click', (e) => {
                e.preventDefault()
                this.deleteTask(e, this.id)
                e.target.parentElement.remove()
            })
        }

        deleteTask(e, task_id){
            fetch(`http://localhost:3000/tasks/`+ task_id, {
            method: "DELETE"
            })
        }

}

