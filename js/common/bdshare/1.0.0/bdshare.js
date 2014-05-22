define("common/bdshare/1.0.0/bdshare", ["$"], function(require, exports, module) {

    var $ = require('$');

    var bdShareCode = window.bdShareCode || 89860593;

    require.async('http://bdimg.share.baidu.com/static/api/js/share.js?v=' + bdShareCode + '.js?cdnversion=' + ~(-new Date()/36e5));

    $('.bdshare_style').html('<div class="bdsharebuttonbox" data-tag="share_1"><a href="#" class="bds_more" data-cmd="more" data-text="分享到："></a><a href="#" class="bds_qzone" data-cmd="qzone" data-text="QQ空间" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" data-text="新浪微博" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" data-text="腾讯微博" title="分享到腾讯微博"></a><a href="#" class="bds_renren" data-cmd="renren" data-text="人人网" title="分享到人人网"></a><a href="#" class="bds_weixin" data-cmd="weixin" data-text="微信" title="分享到微信"></a></div>');

	// 全局变量
	window._bd_share_config = {
		"common": {
			"bdSnsKey": {},
			"bdText": "",
			"bdMini": "2",
			"bdMiniList": false,
			"bdPic": "",
			"bdStyle": "0",
			"bdSize": "16"
		},
		"share": {}
	};

	$('.bdshare_style').mouseover(function() {
		var url = $(this).data('bdUrl');
		var desc = $(this).data('bdDesc');
		var text = $(this).data('bdText');
		var pic = $(this).data('bdPic');
		
		window._bd_share_config = {
			share : [{
				"tag" : "share_1",
				"bdUrl": url,
				"bdDesc": desc,
				"bdText": text,
				"bdPic": pic
			}]
		}
	});
});