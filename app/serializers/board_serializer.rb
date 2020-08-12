class BoardSerializer
  include FastJsonapi::ObjectSerializer
  attributes(:title, :category, :background, :goals)
  belongs_to(:user)
end
