class Board < ApplicationRecord
  # ActiveRecord Relationships
  belongs_to(:user)

  # ActiveRecord Validatons
  validates(:title, presence: true)
end
