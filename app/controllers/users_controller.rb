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
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
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

    # DELETE :destroy /users/:id
    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :buying_power)
    end
end
