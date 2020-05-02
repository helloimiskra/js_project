# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
require 'securerandom'

User.delete_all
Pet.delete_all
Task.delete_all

users_name = [
    'Amelia',
    'Bobby',
    'Carol',
    'Dmitri'
]

user_collection = []

users_name.each do |name|
    user_collection << User.create(name: name)
end

user_collection.each do |user|
    pet_size = (SecureRandom.random_number(6) + 1).floor
    (1..pet_size).each do |poke|
        name = Faker::Creature::Dog.name
        kind = Faker::Creature::Animal.name
        Pet.create(name: name, kind: kind, user_id: user.id)
    end
end

Pet.all.each do |pet|
    task_size = (SecureRandom.random_number(6)+ 1).floor
    (1..task_size).each do |poke|
        title = Faker::Verb.base
        comment = Faker::TvShows::DrWho.catch_phrase
        time = Faker::Time.backward(days: 14)
        complete = false
        Task.create(title: title, comment: comment, time: time, complete: complete, pet_id: pet.id)
    end
end


