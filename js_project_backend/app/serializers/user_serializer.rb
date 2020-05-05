class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
  has_many :pets
  has_many :tasks, through: :pets

  
end
