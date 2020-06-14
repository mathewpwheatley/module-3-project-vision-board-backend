class BoardsController < ApplicationController

    def index
        boards = Board.all
        render json: BoardSerializer.new(boards)
    end

    def show
        board = Board.find(params[:id])
        render json: BoardSerializer.new(board)
    end

end
