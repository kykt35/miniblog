class ArticlesController < ApplicationController

  def index
    @articles = Article.includes(:user).order('created_at DESC')
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save

    else
      render :index
    end
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])
    @article.update(article_params) if @article.user == current_user
  end

  def show
    @article = Article.find(params[:id])
    @comment = Comment.new
    @comments = @article .comments.includes(:user)
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy if @article.user.id == current_user.id
  end

  private

  def article_params
    params.require(:article).permit(:title, :content, :image).merge(user_id: current_user.id)
  end

end
