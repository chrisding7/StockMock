class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :transaction_type, :transaction_price
  has_one :user
  has_one :stock
end
