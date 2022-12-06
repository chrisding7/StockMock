class FollowsController < ApplicationController
    def index
        follows = Follow.all
        render json: follows, status: :ok
    end

    def create
        follow = Follow.create(follow_params)
        render json: follow, status: :created
    end

    def destroy
        follow = Follow.find(params[:id])
        follow.destroy
        head :no_content
    end

    private

    def follow_params
        params.permit(:follower_id, :followed_user_id)
    end
    
end
