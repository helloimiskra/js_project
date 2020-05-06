class Task < ApplicationRecord
    validates_presence_of :title, :comment
    belongs_to :pet
end
