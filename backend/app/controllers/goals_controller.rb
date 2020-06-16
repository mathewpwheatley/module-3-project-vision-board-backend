class GoalsController < ApplicationController

    def index
        goals = Goal.all
        render json: GoalSerializer.new(goals)
    end

    def show
        goal = Goal.find(params[:id])
        render json: GoalSerializer.new(goal)
    end

end
