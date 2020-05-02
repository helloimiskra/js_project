class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :comment, :time, :complete
  belongs_to :user
  belongs_to :pet
end
