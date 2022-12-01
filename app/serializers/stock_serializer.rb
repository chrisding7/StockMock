class StockSerializer < ActiveModel::Serializer
  attributes :id, :company, :ticker, :price, :quantity
  has_one :user_id
  has_many :transactions

end
