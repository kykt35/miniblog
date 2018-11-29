class Article < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  validates :content,presence: true, unless: :image?
  mount_uploader :image, ImageUploader
end
