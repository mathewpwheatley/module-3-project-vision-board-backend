class User < ApplicationRecord
    # ActiveRecord Relationships
    has_many(:boards)
    has_many(:goals, through: :boards)

    # ActiveRecord Validatons
    validates(:email, presence: true)
    validates(:email, uniqueness: true)
    validates(:first_name, presence: true)
    validates(:last_name, presence: true)
    

    # Instance Methods
    def name
        "#{self.first_name} #{self.last_name}"
    end

end
