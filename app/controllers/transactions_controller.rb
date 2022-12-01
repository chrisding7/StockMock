class TransactionsController < ApplicationController
    # GET :Index /transactions (all users transactions)
    def index
        transactions = Transaction.all
        render json: transactions, status: :ok
    end

    # GET :Show /transactions/:id (logged in user)
    def show
        transaction = Transaction.find(params[:id])
        render json: transaction, status: :ok
    end

    def create
        new_transaction = Transaction.create(transaction_params)
        render json: new_transaction, status: :created
    end
    
    def destroy
        transaction = Transaction.find(params[:id])
        transaction.destroy
        head :no_content
    end

    private

    def transaction_params 
        params.permit(:user_id, :stock_id, :transaction_type, :transaction_price)
    end
end
