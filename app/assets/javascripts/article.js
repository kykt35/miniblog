$(function(){
  var updateTimer = setInterval(function(){update()},5000);
  console.log('timerstart');

  function update(){
    if ($('.articles-area').length !== 0 ){
      updateArticles();
    }
   }


  function buildHTML(article){
      article_html = `<div article-id=${article.id} class="col s12 m4 article">
                        <div class="card">
                        <div class="card-author blue-grey-text darken-3-text center-left">
                          <a href="/users/${article.id}"><i class="material-icons">face</i>
                          ${article.user_name}
                        </div>
                          <div class="card-image">
                            <img id="article-image__img" src=${article.image}>
                          </div>
                          <div class="card-title blue-grey-text darken-3-text center-align">
                            <p>${article.title}</p>
                          </div>
                        </div>
                    </div>`
    return article_html;
  }


  function updateArticles(){
    var article_length = $('.article').length;
    $.ajax({
      type: "GET",
      url: location.href,
      data: {article_length: article_length},
      dataType: 'json',
      processData: true,
      contentType: false,
      timeout: 10000
    })
    .done(function(articles){
      console.log('done');
      var i = 0;
      if ((articles.length !==0) && (articles.length !== article_length)){
        $('.articles-area').empty();
        articles.forEach(function(article){
          if (i%3 == 0 ){
            $('.articles-area').append($('<div>',{class: 'row'}));
          }

          var row =$('.row:last');
          $(row).append($(buildHTML(article)));
          i +=1;
        });
        console.log("view更新");
      }
    })
    .fail(function(){
      console.log('fail');
      clearInterval(updateTimer);
      alert('サーバーとの通信に失敗しました');
    })
  }

  $('#article_image').change(function(e){
    var file = e.target.files[0];
    var reader = new FileReader();

    if (file.type.indexOf("image") < 0) {
      alert("画像ファイルを洗濯してください");
      return false;
    }
    reader.onload = (function(file){
      return function(e){
        $('#article-image__img').attr("src", e.target.result);
        $('#article-image__img').attr("alt", file.name);
      };
    })(file);
    reader.readAsDataURL(file);
  })
});
