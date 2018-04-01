var root = window.player,
	render = root.render,
	$ = window.Zepto,
	$scope = $(document.body),
	songList,
	controlmanager,
	audiomanager = new root.audioManager(),
	proccessor = root.proccessor,
	playList = root.playList;

function bindTouch() {
	var $sliderPoint = $scope.find('.slider-point'),
		offset = $scope.find('.pro-wrapper').offset(),
		left = offset.left,
		width = offset.width;
	$sliderPoint.on('touchstart',function(){
		proccessor.stopPro();
	}).on('touchmove',function(e) {
		var x = e.changedTouches[0].clientX;
		var percent = (x - left) / width; 
		if(percent < 0) {
			percent = 0;
		}else if (percent > 1) {
			percent = 0.98;
		}
		proccessor.update(percent);
	}).on('touchend',function(e) {
		var x = e.changedTouches[0].clientX;
		var percent = (x - left) / width; 
		proccessor.startPro(percent);
		var time = percent * songList[controlmanager.index].duration;
		audiomanager.jumpToPlay(time);
		$scope.find('.play-btn').addClass('playing');
	})
}
function bindClick() {
	$scope.on('play:change',function(event,index,flag) {
		var song = songList[index];
		render(song);
		audiomanager.setAudioSource(song.audio);
		if(audiomanager.status == 'play' || flag) {
			audiomanager.play();
			proccessor.startPro();
		}
		proccessor.renderAllTime(song.duration);
		proccessor.update(0);
	});
	$scope.find('.prev-btn').on('click',function() {
		var index = controlmanager.prev();
		$scope.trigger('play:change',[index]);
	});
	$scope.find('.next-btn').on('click',function() {
		var index = controlmanager.next();
		$scope.trigger('play:change',[index]);
	});
	$scope.find('.list-btn').on('click',function() {
		playList.show(controlmanager);
	});
	$scope.find('.like-btn').on('click',function() {
		var index = controlmanager.index,
			song = songList[index],
			like = song.isLike;
		like = like ? false : true;
		song.isLike = like;
		render(song);
	});
	$scope.on('click','.play-btn',function() {
		if(audiomanager.status == 'pause') {
			audiomanager.play();
			proccessor.startPro();
		}else {
			audiomanager.pause();
			proccessor.stopPro();
		}
		$scope.find('.play-btn').toggleClass('playing');
	})
}

function successFn(data) {
	songList = data;
	bindClick();
	bindTouch();
	$scope.trigger('play:change',0);
	controlmanager = new root.controlManager(data.length);
	playList.renderList(data);
}

function getData(url) {
	$.ajax({
		type : 'GET',
		url : url,
		success : successFn
	});
}

getData('/mock/data.json');