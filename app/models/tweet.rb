class Tweet < ApplicationRecord
  validates_presence_of :body

  broadcasts_to -> (tweet){ :tweets }, inserts_by: :prepend
end
