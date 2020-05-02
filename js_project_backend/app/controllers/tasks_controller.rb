class TasksController < ApplicationController

    def index
        tasks = Task.all 
        render json: tasks 
    end

    def show
        task = Task.find_by(id: params[:id])
        if task
            render json: task
        else
            render json: {message: 'Task not found'}
        end
    end

    def create
        if Task.find_by(title: task_params[:title])
            task = Task.find_by(title: task_params[:title])
            redirect_to "/tasks/#{task.id}"
        else
            task = Task.create(task_params)
            render json: task
        end
    end

    def edit
        task = Task.find(params[:id])
    end

    def update
        task = Task.find(params[:id])
        task.update(complete: params[:complete])
        redirect_to task_path(task)
    end

    private

    def task_params
        params.require(:task).permit(:title, :comment, :time, :complete)
    end
end
