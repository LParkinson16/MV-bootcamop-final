class Project {
    constructor(name, description) {
        this.name = name 
        this.description = description
        this.tasks = []
    }

    addTask(taskName) {
        const task = new Task({title, description, proj_id})
        this.tasks.push(task)
    }
}

module.exports = Project