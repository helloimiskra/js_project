class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :comment, :time, :complete
  belongs_to :pet
end
