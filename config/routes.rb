Rails.application.routes.draw do
  
  resources :follows, only: [:index, :create, :destroy]
  resources :transactions, only: [:show, :index, :create, :destroy]
  resources :stocks, only: [:show, :index, :create, :update, :destroy]
  resources :users, only: [:show, :index, :create, :update, :destroy]

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
