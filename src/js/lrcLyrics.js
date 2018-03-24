(function($,root) {


    $.ajax({
        url:'/mock/data.json',
        headers: {
            contentType: "application/x-www-form-urlencoded"
        },
        success: function(data) {
        	var lrc = data[1].lrc;
            var lyric = parseLyric(lrc);
            // console.log(lrc)
            // console.log(lyric);
        }
    })


	//解析歌词
	function parseLyric(lrc) {

0	    var lyrics = lrc.split("\n"),
	    	lrcObj = {},
	    	len = lyrics.length;
	    for(var i = 0; i < len; i++) {
	    	var lyric = decodeURIComponent(lyrics[i]),
	    		timeReg = /\[\d*:\d((\.|\:)\d*)*\]/g,
	    		timeRegExpArr = lyric.match(timeReg);
	    	if(!timeRegExpArr) {
	    		continue;
	    	}
	    	var clause = lyric.replace(timeReg,'');
	    	for(var k = 0, h = timeRegExpArr.length; k < h; k++) {
	    		var t = timeRegExpArr[k],
	    			min = Number(String(t.match(/\[\d*/i)).slice(1)),
	                sec = Number(String(t.match(/\:\d*/i)).slice(1));
	            var time = min * 60 + sec;
	            lrcObj[time] = clause;
	        }
	    }
	    return lrcObj;
	}

	//渲染歌词
	// $player.bind("playing",function(){
 //        renderLyric($player.music);
 //    });
	// function renderLyric(music){
	//     lyric.html("");
	//     var lyricLineHeight = 27,
	//         offset = lyric_wrap.offset().height*0.4;
	//     music.lyric.fetch(function(data){
	//         music.lyric.parsed = {};
	//         var i = 0;
	//         for(var k in data){
	//             var txt = data[k];
	//             if(!txt)txt = "&nbsp;";
	//             music.lyric.parsed[k] = {
	//                 index:i++,
	//                 text:txt,
	//                 top: i*lyricLineHeight-offset
	//             };
	//             var li = $("<li>"+txt+"</li>");
	//             lyric.append(li);
	//         }
	//         $player.bind("timeupdate",updateLyric);
	//     },function(){
	//         lyric.html("<li style='text-align: center'>歌词加载失败</li>");
	//     });
	// }

	// //歌词滚动
	// $player.bind("timeupdate",updateLyric);
	// var text_temp;
	// function updateLyric(){
	//     var data = $player.music.lyric.parsed;
	//     if(!data)return;
	//     var currentTime = Math.round(this.currentTime);
	//     var lrc = data[currentTime];
	//     if(!lrc)return;
	//     var text = lrc.text;
	//     if(text != text_temp){
	//         locationLrc(lrc);
	//         text_temp = text;
	//     }
	//     function locationLrc(lrc){
	//         lyric_wrap.find(".lyric_wrap .on").removeClass("on");
	//         var li = lyric_wrap.find("li:nth-child("+(lrc.index+1)+")");
	//         li.addClass("on");
	//         var top = Math.min(0,-lrc.top);
	//         //lyric.css({"-webkit-transform":"translate(0,-"+lrc.top+"px)"});
	//         lyric.css({"margin-top":top});
	//     }
	// }

	root.showLyrics = {
		parseLyric : parseLyric
	}

}(window.Zepto, window.player))