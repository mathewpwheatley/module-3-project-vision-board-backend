class BoardSerializer
  include FastJsonapi::ObjectSerializer
  attributes(:title, :category, :goals)
  belongs_to(:user)
end
