class Pet < ApplicationRecord
  belongs_to :user
  has_many :tasks, through: :user
end
