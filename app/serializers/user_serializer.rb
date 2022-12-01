class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :buying_power
  has_many :stocks
  has_many :transactions
  has_many :followings
  has_many :followers
end
