Rails.application.routes.draw do
  resources :tweets do
    resource :like, only:[:create]
    resource :retweet, only:[:create]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "tweets#index"
end
