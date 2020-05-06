class Pet < ApplicationRecord
  validates_presence_of :name, :kind
  belongs_to :user
  has_many :tasks, :dependent => :destroy
end
