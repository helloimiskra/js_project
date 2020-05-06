class PetsController < ApplicationController

    def index
        pets = Pet.all 
        render json: pets, include: [:tasks]
    end

    def show
        pet = Pet.find_by(id: params[:id])
        if pet
            render json: pet, include: [:tasks]
        else
            render json: {message: 'Pet not found'}
        end
    end

    def create
        if Pet.find_by(id: params[:id])
            pet = Pet.find_by(id: params[:id])
            redirect_to pet_path(pet)
        else
            pet = Pet.create(pet_params)
            render json: pet
        end
    end

    def edit
        pet = Pet.find(params[:id])
    end

    def update
        pet = Pet.find(params[:id])
        pet.update(name: params[:name], kind: params[:kind])
        redirect_to pet_path(pet)
    end


    private

    def pet_params
        params.require(:pet).permit(:name, :kind, :user_id, :tasks)
    end


end
