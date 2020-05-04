class Task {
    constructor(task){
        this.id = task.id
        this.title = task.title
        this.comment = task.comment
        this.time = task.time
        this.complete = task.complete
    }


    static newTaskForm(pet_id){
        const tasksContainer = document.getElementById('tasks-container')

        const newTaskForm = `
        
        <form id = "new-task-form">
        <label>Task Name</label>
        <input type = "text" id = "title"><br>
        <label>Comment:</label>
        <input type = "text" id = "comment"><br>
        <input type = "submit"/> </form>
        `

        tasksContainer.insertAdjacentHTML('beforeend', newTaskForm)
        Task.createTask(pet_id)
    }

    static createTask(pet_id){
        const taskForm = document.getElementById('new-task-form')
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
                            title: e.target.children[1].value,
                            comment: e.target.children[4].value,
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
                    newTask.displayTask()
                })
            })
        }
        

        displayTask(){

            const div = document.getElementById('tasks-container')
            const t = document.createElement('div')
            t.className = "card"
            const title = document.createElement('h3')
            title.innerText = `Title: ${this.title}`
            t.appendChild(title)
            const comment = document.createElement('h3')
            comment.innerText = `Comment: ${this.comment}`
            t.appendChild(comment)
            const complete = document.createElement("input")
            complete.setAttribute("type", "checkbox")
            const button = document.createElement('button')
            button.innerText = 'Delete Task'
            button.classList = 'delete-btn'
            button.setAttribute("id", this.id)
            t.appendChild(button)
            div.appendChild(t)
        }

}

