class Goal < ApplicationRecord
  # ActiveRecord Relationships
  belongs_to(:board)
  has_one(:user, through: :board)

  # ActiveRecord Validatons
  validates(:title, presence: true)

end