class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals do |t|
      t.string :title
      t.string :content
      t.string :status
      t.references :board, null: false, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
