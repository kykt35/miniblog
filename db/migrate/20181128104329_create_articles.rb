class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.string  :title, null: false
      t.string  :content
      t.string  :image
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
