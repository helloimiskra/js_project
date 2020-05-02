class PetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :kind
end
