class User < ApplicationRecord
    validates_presence_of :name
    has_many :pets
    has_many :tasks, through: :pets
end
