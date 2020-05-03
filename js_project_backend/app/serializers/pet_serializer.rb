class PetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :kind
  belongs_to :user
end
