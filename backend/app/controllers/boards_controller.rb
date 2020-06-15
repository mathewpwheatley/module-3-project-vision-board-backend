class BoardsController < ApplicationController

    def index
        boards = Board.all
        render json: BoardSerializer.new(boards)
    end

    def show
        board = Board.find(params[:id])
        render json: BoardSerializer.new(board)
    end

    def create
        board = Board.create(board_params)
        if board.valid?
            render json: BoardSerializer.new(board)
        else
            # Send error somehow
        end
    end

    def update
        board = Board.find(params[:id])
        board.update(board_params)
        if board.valid?
            render json: BoardSerializer.new(board)
        else
            # Send error somehow
        end
    end

    def destroy
        board = Board.find(params[:id])
        board.destroy
        render json: BoardSerializer.new(board)
    end

    private
    def board_params
        params.require(:board).permit(:title, :background)
    end

end
