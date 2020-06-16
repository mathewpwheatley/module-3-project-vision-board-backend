Rails.application.routes.draw do
  resources :goals
  resources :boards
  resources :users

  post '/login', to: 'users#login'
  post '/logout', to: 'users#logout'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
