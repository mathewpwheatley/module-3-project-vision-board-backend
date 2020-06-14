class GoalsController < ApplicationController

    def index
        goals = Goals.all
        render json: GoalSerializer.new(goals)
    end

    def show
        goal = Goals.find(params[:id])
        render json: GoalSerializer.new(goal)
    end

end
