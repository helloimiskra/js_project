class PetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :kind, :tasks
  belongs_to :user
  has_many :tasks
end
