(function ($,root) {
	
	var $playList = $(`<div class='list-wrapper'>
			<div class='list-header'>播放列表</div>
			<ul class='play-list'></ul>
			<div class='close-btn'>关闭</div>
		</div>`),
		$scope = $(document.body),
		controlmanager;

	function renderList(data) {
		var html = '',
			len = data.length;
		for(var i = 0; i < len; i++) {
			html += '<li><h3>' + data[i].song + '—<span>' + data[i].singer + '</span></h3></li>'
		}
		$playList.find('ul').html(html);
		$scope.append($playList);
		bindEvent();
	}
	function show(control) {
		controlmanager = control;
		$playList.addClass('show');
		var index = controlmanager.index;
		signRed(index);
	}
	function bindEvent() {
		$scope.find('.close-btn').on('click',function() {
			$playList.removeClass('show');
		});
		$scope.find('li').on('click',function() {
			var index = $(this).index();
			controlmanager.index = index;
			signRed(index);
			$scope.trigger('play:change',[index,true]);
			$scope.find('.play-btn').addClass('playing');
			setTimeout(() => {
			 $playList.removeClass('show');
			}, 400);
		});
	}
	function signRed(index) {
		$playList.find('.showList').removeClass('showList');
		$playList.find('li').eq(index).addClass('showList');
	}
	root.playList = {
		renderList : renderList,
		show : show,
		close : close
	}
}(window.Zepto, window.player))