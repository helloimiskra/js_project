class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :comment
      t.datetime :time
      t.boolean :complete
      t.references :pet, null: false, foreign_key: true

      t.timestamps
    end
  end
end
