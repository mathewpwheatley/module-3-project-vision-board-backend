class GoalSerializer
  include FastJsonapi::ObjectSerializer
  attributes(:title, :content, :status)
  belongs_to(:board)
end
