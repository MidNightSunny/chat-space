$(document).on('turbolinks:load', function() {
$(function() {

  var user_list = $('#user-search-result')
  var group_users = $('#chat-group-users')
  var user_ids = [];

  function groupUser(user){
    var list_html = `<div class="chat-group-user clearfix">
                       <p class="chat-group-user__name">${user.name}</p>
                       <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                     </div>`
    user_list.append(list_html);
  }

  function addUser(id,name){
    var add_html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                      <input name='group[user_ids][]' type='hidden' value=${id}>
                      <p class='chat-group-user__name'>${name}</p>
                      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                    </div>`
    group_users.append(add_html);
    user_ids.push(id);
  }

  $("#user-search-field.chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field.chat-group-form__input").val();
    $.ajax({
      type: 'GET',
      url: '/users/index',
      data: { keyword: input },
      dataType: 'json',
      contentType: false
    })
    .done(function(users){ 
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          if (!(user_ids.includes(user.id))){
            groupUser(user);
          }
        });
      }
    })
    .fail(function(){
      alert('ユーザーの追加に失敗しました');
    })
  });

  $("#user-search-result").on('click','.chat-group-user__btn--add',function(){
    var id =  $(this).attr('data-user-id')-0;
    var name = $(this).attr("data-user-name");
    addUser(id,name);
    $(this).parent().remove();
  });

  $("#chat-group-users").on('click','.chat-group-user__btn--remove',function(){
    $(this).parent().remove();
  });

});
});
