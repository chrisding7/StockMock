class StockSerializer < ActiveModel::Serializer
  attributes :id, :company, :ticker, :price
  has_one :user
end
