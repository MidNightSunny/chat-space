$(document).on('turbolinks:load', function() {
$(function(){
  function buildMessage(message){
    var content = message.content ? `<p class="message__text--content"> ${message.content} </p>` : ""
    var image = message.image ? `<img class="message__text--image" img src="${message.image}">` : ""
    
    var html = `<div class="message" data-id="${message.id}">
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
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('.form__message').val('');
      $('.hidden-image').val('');
    })
    .fail(function() {
      alert('メッセージの送信に失敗しました');
    })
  });

  var reloadMessages = function() {
    if($('.messages')[0] && (window.location.href.match(/\/groups\/\d+\/messages/))){ 
      var last_message_id = $('.message').last().data('id');
    }else{
      var last_message_id = 0
    }
debugger
    $.ajax({
      url: location.href,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id},
    })

    .done(function(messages){
        messages.forEach(function(message){
          var insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        });         
    })
    .fail(function() {
      
    });
  };
  setInterval(reloadMessages, 5000);
});
});