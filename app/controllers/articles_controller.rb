class ArticlesController < ApplicationController

  def index
    @articles = Article.includes(:user).order('created_at DESC')
  end

  def new
  end

  def create
    @article = Article.new(article_params)

    if @article.save

    else
      render :index
    end
  end

  def edit
  end

  def update
    @article.update(article_params) if @article.user == current_user
  end

  def show
  end

  def destroy
    @article.destroy if @article.user == current_user
  end

  private

  def article_params
    params.permit(:title.:content, :image).merge(user_id: current_user.id)
  end

end
