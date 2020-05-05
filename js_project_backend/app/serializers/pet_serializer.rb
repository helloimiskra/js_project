class PetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :kind
  belongs_to :user
  has_many :tasks

  


end
