json.array! @articles do |article|
  json.id           article.id
  json.title        article.title
  json.content      article.content
  json.user_id      article.user.id
  json.user_name    article.user.name
  if article.image.url=="noimage.png"
    json.image        "/assets/noimage.png"
  else
    json.image        article.image.url
  end
end
