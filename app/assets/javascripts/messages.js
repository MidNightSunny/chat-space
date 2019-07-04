$(function(){
  function buildMessage(message){
    var content = message.content ? `<p class="message__text--content"> ${message.content} </p>` : ""

    var image = message.image ? `<img class="message__text--image" img src="${message.image}">` : ""
    
    var html = `<div class="message" id="${message.id}">
                  <div class="message__info">
                    <div class="message__info--user">
                      ${message.user_name}
                    </div>
                    <div class="message__info--date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                     ${content}
                     ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      console.log(this);
      var html = buildMessage(message);
      $('.messages').append(html);
      var element = document.getElementById(message.id);
      var positionY = element.offsetTop;
      $('.messages').animate({scrollTop:positionY},20);
      $('.form__message').val('');
      $('.hidden-image').val('');
    })
    .fail(function() {
      alert('メッセージの送信に失敗しました');
    })
  });
});