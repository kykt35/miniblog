$(function(){
    var blob = null;
  // var updateTimer = setInterval(function(){update()},5000);
  // console.log('timerstart');

  // function update(){
  //   if ($('.articles-area').length !== 0 ){
  //     updateArticles();
  //   }
  //  }


  function buildHTML(article){
      article_html = `<div article-id=${article.id} class="col s12 m4 article">
                        <div class="card">
                        <div class="card-author blue-grey-text darken-3-text center-left">
                          <a href="/users/${article.user_id}"><i class="material-icons">face</i>
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
  function resizeImage(file) {
    const WIDTH = 800;
    var img = new Image();
    var def =$.Deferred();
    var canvas = document.createElement('canvas');
    var reader = new FileReader();
    var orientation;
    EXIF.getData(file, function(){
      orientation = file.exifdata.Orientation;
    });
    reader.onload = function(e){
      img.onload = function(){
        var aspect = (orientation == 5 || orientation == 6 || orientation == 7 || orientation == 8) ? img.width / img.height : img.height / img.width;
        var canvas_width = WIDTH;
        var canvas_height = Math.floor(WIDTH * aspect);
        var ctx = canvas.getContext('2d');
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        width = canvas_width;
        height = canvas_height;
        //画像方向の調整
        switch(orientation){
          case 2:
            ctx.transform(-1, 0, 0, 1, canvas_width, 0);
            break;
          case 3:
            ctx.transform(-1, 0, 0, -1, canvas_width, canvas_height);
            break;
          case 4:
            ctx.transform(1, 0, 0, -1, 0, canvas_height);
            break;
          case 5:
            ctx.transform(-1, 0, 0, 1, 0, 0);
            ctx.rotate((90 * Math.PI) / 180);
            width = canvas_height;
            height = canvas_width;
            break;
          case 6:
            ctx.transform(1, 0, 0, 1, canvas_width, 0);
            ctx.rotate((90 * Math.PI) / 180);
            width = canvas_height;
            height = canvas_width;
            break;
          case 7:
            ctx.transform(-1, 0, 0, 1, canvas_width, canvas_height);
            ctx.rotate((-90 * Math.PI) / 180);
            width = canvas_height;
            height = canvas_width;
            break;
          case 8:
            ctx.transform(1, 0, 0, 1, 0, canvas_height);
            ctx.rotate((-90 * Math.PI) / 180);
            width = canvas_height;
            height = canvas_width;
            break;
          default:
            break;
        }

        // canvasに描写
        ctx.drawImage(img,0,0,width,height);

        // base64からBlobデータを作成
        var base64 = canvas.toDataURL('image/jpeg');
        var barr, bin, i, len;
        bin = atob(base64.split('base64,')[1]);
        len = bin.length;
        barr = new Uint8Array(len);
        i = 0;
        while (i < len) {
          barr[i] = bin.charCodeAt(i);
          i++;
        }
        blob = new Blob([barr], {type: 'image/jpeg'});
        def.resolve(canvas);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    return def.promise();
  }

  $('#article_image').change(function(e){
    var file = e.target.files[0];
    var reader = new FileReader();

    if (file.type.indexOf("image") < 0) {
      alert("画像ファイルを選択してください");
      return false;
    }
    resizeImage(file).then(function(){
          // uploadImage(blob);
      reader.onload = (function(blob){
        return function(e){
          $('#article-image__img').attr("src", reader.result);
          $('#article-image__img').attr("alt", blob.name);
        };
      })(blob);
      reader.readAsDataURL(blob);


        });

  })
});
