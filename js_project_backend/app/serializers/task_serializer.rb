class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :comment, :time, :complete
  belongs_to :pet
end
