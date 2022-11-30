class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :type, :transaction_price
  has_one :user
  has_one :stock
end
