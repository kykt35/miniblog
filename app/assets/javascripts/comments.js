$(function(){
  function buildHTML(comment){
    var html = `<p>
                  <strong>
                    ${comment.user_name}
                    :
                  </strong>
                  ${comment.text}
                </p>`
    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    console.log("comment");
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log("done");
      var html = buildHTML(data);
      $('.comments').append(html);
      $('#comment_content').val('');
      $('.comment-btn').removeAttr("disabled");
    })
    .fail(function(){
      alert('error');
    })
  });
});
