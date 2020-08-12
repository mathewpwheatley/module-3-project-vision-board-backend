class Board < ApplicationRecord
  # ActiveRecord Relationships
  belongs_to(:user)
  has_many(:goals)

  # ActiveRecord Validatons
  validates(:title, presence: true)
end
