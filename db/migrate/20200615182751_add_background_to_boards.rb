class AddBackgroundToBoards < ActiveRecord::Migration[6.0]
  def change
    add_column :boards, :background, :string
  end
end
