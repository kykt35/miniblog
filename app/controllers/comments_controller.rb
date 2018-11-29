class CommentsController < ApplicationController

  def create

    @comment=Comment.create(comment_params) if user_signed_in?
    respond_to do |format|
      format.html {
        article = Article.find(@comment.article.id)
        redirect_to article_path(article)
         }
      format.json
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content).merge(article_id: params[:article_id],user_id: current_user.id)
  end
end
