class PetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :kind
  belongs_to :user
end
