class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :company
      t.string :ticker
      t.float :price
      t.integer :quantity
      
      t.timestamps
    end
  end
end
