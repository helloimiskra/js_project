class PetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :kind, :tasks, :user_id
  belongs_to :user
  has_many :tasks

  


end
