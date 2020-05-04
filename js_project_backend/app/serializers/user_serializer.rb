class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :pets
  has_many :pets
end
