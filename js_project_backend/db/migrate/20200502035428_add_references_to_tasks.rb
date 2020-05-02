class AddReferencesToTasks < ActiveRecord::Migration[6.0]
  def change
    add_reference :tasks, :user, index: true
    add_foreign_key :tasks, :users
  end
end
