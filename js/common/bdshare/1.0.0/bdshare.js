define("common/bdshare/1.0.0/bdshare", ["$"], function(require, exports, module) {

    var $ = require('$');

    require.async('http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date()/36e5));

    $('.bdshare_style').html('<div class="bdsharebuttonbox" data-tag="share_1"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a></div>');

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