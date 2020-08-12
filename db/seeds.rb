# Seed counts
user_seeds = 25
board_seeds = 50
goal_seeds = 200

# Clear Old Seeds (Not database is setup to cascade delete)
User.destroy_all

# User seeds
user_seeds.times do 
    User.create(
        email: Faker::Internet.email,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name
    )
end

board_seeds.times do 
    Board.create(
        title: Faker::Book.title,
        category: ["Career", "Education", "Family", "Financial", "Health", "Home", "Other", "Personal", "Relationship", "Self Improvement", "Travel"].sample,
        background: ["black_board.jpg", "cork_board.jpg", "dragon.jpg", "green_board.jpg", "monster_truck.jpg", "rocket.png", "school.jpg", "space.jpg", "unicorn.jpg"].sample,
        user_id: User.all.sample.id
    )
end

goal_seeds.times do 
    Goal.create(
    title: Faker::Book.title,
    content: Faker::Lorem.sentence,
    status: ["Not Started", "In Progress", "Completed"].sample,
    board_id: Board.all.sample.id
    )
end