$(function(){

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
