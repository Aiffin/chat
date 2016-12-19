function initData()
{
	return [
		{
			'id' : '1',
			'name': 'Sishir',
			'messages': [
				{
					'owner' : '1',
					'body': 'Hello I am sishir'
				},
				{
					'owner': '2',
					'body': 'Hello I am ram'
				},
				{
					'owner': '2',
					'body': 'How are you mate ?'
				},
				{
					'owner' : '1',
					'body': 'Hi I am fine'
				}
			]
		},
		{
			'id' : '2',
			'name': 'Subin',
			'messages': [
				{
					'owner' : '1',
					'body': 'Hello I am Subin'
				},
				{
					'owner': '2',
					'body': 'Hello I am ram'
				},
				{
					'owner': '2',
					'body': 'How are you mate ?'
				},
				{
					'owner' : '1',
					'body': 'Hi I am fine'
				}
			]
		},
		{
			'id' : '3',
			'name': 'Ram',
			'messages': [
				{
					'owner' : '1',
					'body': 'Hello I am Ram'
				},
				{
					'owner': '2',
					'body': 'Hello I am ram'
				},
				{
					'owner': '2',
					'body': 'How are you mate ?'
				},
				{
					'owner' : '1',
					'body': 'Hi I am fine'
				}
			]
		}
	];
}


$(document).ready(function(){

	var chatBodyHtml = createChatBody(initData());

	$('.chat_body').html(chatBodyHtml);

	$('.chat_head').click(function(){
		$('.chat_body').slideToggle('slow');
	});
	
	$(document).on('click','.msg_head',function(){
		$(this).parent().find('.msg_wrap').slideToggle('slow');
	});
	
	$(document).on('click','.close',function(e)
	{
		e.stopPropagation();
		var userId = $(this).closest('.msg_box').attr('data-user-id');
		closeChatBox(userId);
		$(this).closest('.msg_box').remove();
	});
	
	$('.user').click(function(){

		var id = $(this).attr('id');

		//load from ajax the user replies,
		// for now i am using my own data

		var user;

		initData().map(function(u)
		{
			if( u.id == id){
				user = u;
			}
		})

		//we have the data for replies and now cook the msg box

		var messageBox = createChatBox(user);

		if( $('[data-user-id="'+id+'"]').length === 1 ){
			$('[data-user-id="'+id+'"]').remove();
			closeChatBox(id);
		}

		$(document).find('body').append(messageBox);

	});

	$('textarea').keypress(
    
    function(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            var msg = $(this).val();
			$(this).val('');
			if(msg!='')
			$('<div class="msg_b">'+msg+'</div>').insertBefore('.msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
        }
    });
});

function createChatBody(users)
{
	var userBodyHtml = '';

	users.forEach(function(user){
		userBodyHtml += '<div class="user" id="'+user.id+'">'+user.name+'</div>';
	})

	return userBodyHtml;
}

function closeChatBox(id){
	
	openedChatBox.map(function(u, index){
		if(id === u.user){
			openedChatBox.splice(index , 1)
		}
	});
}


var openedChatBox = [];

function createChatBox(user)
{
	var width = $(document).width() - 100;


	var rightPosition;

	if( openedChatBox.length === 0 )
	{
		rightPosition = 290;
	}
	else
	{
		rightPosition = ( (250) * (openedChatBox.length + 1) ) + 50 + ( (openedChatBox.length + 1) * 10 );
	}

	openedChatBox.push({user: user.id})

	if( width < rightPosition )
	{
		console.log('CHat Box Space is toatall filled, need to close some old')
		return;
	}


	var message = '<div class="msg_body">';

	user.messages.forEach(function(msg)
	{
		var messageClass = 'msg_b';
	
		if( msg.owner == user.id)
		{
			messageClass = 'msg_a';
		}

		message +='<div class="'+ messageClass +'">'+msg.body+'</div>';
	});

	message +="<div class='msg-push'></div></div>";

	var msgBox = 
	'<div class="msg_box" data-user-id="'+user.id+'" style="right:'+rightPosition+'px">\
		<div class="msg_head"><span>'+user.name+'</span>\
		<div class="close">x</div>\
		</div>\
		<div class="msg_wrap">\
		'+ message +'\
		<div class="msg_footer"><textarea class="msg_input" rows="4"></textarea></div>\
		</div>\
	</div>';

	return msgBox;
}