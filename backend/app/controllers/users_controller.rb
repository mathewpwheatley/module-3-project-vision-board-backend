class UsersController < ApplicationController

    def index
        users = User.all
        render json: UserSerializer.new(users)
    end

    def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user)
    end
    
    def create
        new_user = User.new(new_user_params)
        if new_user.valid?
        new_user.save
        # render json: user, status: 201
        render json: UserSerializer.new(new_user), status: 201
        else
            render :json => { errors: new_user.errors.full_messages, status: 422}
        end
    end

    def login                 
        if login_user_params[:email] == ""
            render json: { errors: ["You must enter an email to login"], status: 401}
        else
            current_user = User.find_by(login_user_params)
            render json: UserSerializer.new(current_user), status: 200
        end
    end  
    
    def logout
        current_user = nil
    end

    private
    def login_user_params
        params.require(:user).permit(:email)
    end

    def new_user_params
        params.require(:user).permit(:email, :first_name, :last_name)
    end

end
