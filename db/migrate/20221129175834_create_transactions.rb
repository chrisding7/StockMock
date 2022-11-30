class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :stock, null: false, foreign_key: true
      t.string :transaction_type
      t.float :transaction_price

      t.timestamps
    end
  end
end
