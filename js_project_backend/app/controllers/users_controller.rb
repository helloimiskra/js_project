class UsersController < ApplicationController

    def index
        users = User.all 

        render json: users, include: [:pets]
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, include: [:pets, :tasks]
        else
            render json: {message: 'User not found'}
        end
    end

    def create
        if User.find_by(name: user_params[:name])
            user = User.find_by(name: user_params[:name])
            redirect_to "/users/#{user.id}"
        else
            user = User.create(user_params)
            render json: user
        end
    end

    private
    
    def user_params
        params.require(:user).permit(:name, pet_attributes: [:id, :name, :kind, :user_id, tasks_attributes: %i[:id, :title, :comment, :time, :complete, :pet_id]])
    end
end

