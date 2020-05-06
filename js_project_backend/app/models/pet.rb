class Pet < ApplicationRecord
  validates :name, presence: true
  validates :kind, presence: true
  belongs_to :user
  has_many :tasks, :dependent => :destroy
end
