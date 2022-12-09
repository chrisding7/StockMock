# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
# #   Character.create(name: 'Luke', movie: movies.first)

# puts "deleting seeds"
# Follow.destroy_all
# Transaction.destroy_all
# Stock.destroy_all
# User.destroy_all

# puts "seeding users"
# User.create(first_name: "Chris", last_name: "Ding", email:"chrisding7@gmail.com", password: User.digest('123'), password_confirmation: User.digest('123'), buying_power:"10000.00")
# User.create(first_name: "John", last_name: "Smith", email:"john.smith@gmail.com", password: User.digest('123'), pas: User.digest('123'), buying_power:"10000.00")

# puts "seeding stocks"
# Stock.create(user_id: User.first.id, company: "Apple Inc.", ticker: "AAPL", price: 140.00, quantity: 4)
# Stock.create(user_id: User.first.id, company: "Google", ticker: "GOOG", price: 100.00, quantity: 5)
# Stock.create(user_id: User.second.id, company: "Tesla, Inc.", ticker: "TSLA", price: 200.00, quantity: 3)
# Stock.create(user_id: User.second.id, company: "Amazon.com, Inc.", ticker: "AMZN", price: 100.00, quantity: 5)

# puts "seeding transactions"
# Transaction.create(user_id: User.first.id, stock_id: Stock.first.id, transaction_type: "buy", transaction_price: 560.00)
# Transaction.create(user_id: User.first.id, stock_id: Stock.second.id, transaction_type: "buy", transaction_price: 500.00)
# Transaction.create(user_id: User.second.id, stock_id: Stock.third.id, transaction_type: "buy", transaction_price: 600.00)
# Transaction.create(user_id: User.second.id, stock_id: Stock.fourth.id, transaction_type: "buy", transaction_price: 500.00)

# puts "seeding follows"
# Follow.create(follower_id: User.first.id, followed_user_id: User.second.id)
# Follow.create(follower_id: User.second.id, followed_user_id: User.first.id)

# puts "done seeding!"
