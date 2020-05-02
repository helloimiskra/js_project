class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users 
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user
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
        params.require(:user).permit(:name)
    end
end

