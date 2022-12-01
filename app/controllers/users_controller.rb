class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    #GET /users for all users 
    def index
        users = User.all
        render json: users, status: :ok
    end

    #sign-up
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    #stay signed in
    def show
        current_user = User.find_by(id: session[:user_id])
        render json: current_user
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :email, :password_digest, :buying_power)
    end
end
