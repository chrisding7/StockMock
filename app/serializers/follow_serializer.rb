class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :followed_user_id

  has_one :follower
  has_one :followed_user
end
