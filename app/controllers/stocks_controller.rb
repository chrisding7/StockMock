class StocksController < ApplicationController
    # GET :Index /stocks (all users stocks)
    def index
        stocks = Stock.all
        render json: stocks, status: :ok
    end

    # GET :Show /stocks/:id (logged in user)
    def show
        stock = Stock.find(params[:id])
        render json: stock, status: :ok
    end

    def create
        new_stock = Stock.create(stock_params)
        render json: new_stock, status: :created
    end

    def update
        stock = Stock.find(params[:id])
        stock.update!(stock_params)
        render json: stock, status: :accepted
    end
    
    def destroy
        stock = Stock.find(params[:id])
        stock.destroy
        head :no_content
    end

    private

    def stock_params 
        params.permit(:user_id, :company, :ticker, :price, :quantity)
    end

end
