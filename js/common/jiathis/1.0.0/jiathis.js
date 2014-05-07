define(function(require, exports, module) {

    var $ = require('$');
    require.async('http://v3.jiathis.com/code/jia.js?uid=1354496213975930');

    $('.jiathis_style').html('<span class="jiathis_txt">分享到：</span><a class="jiathis_button_qzone"></a><a class="jiathis_button_tsina"></a><a class="jiathis_button_tqq"></a><a class="jiathis_button_renren"></a><a class="jiathis_button_kaixin001"></a><a class="jiathis_button_douban"></a><a class="jiathis_button_tieba"></a><a class="jiathis_button_weixin"></a><a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank"></a><a class="jiathis_counter_style"></a>');

	function setShare(title, url) {
		jiathis_config.title = title;
		jiathis_config.url = url;
	}

	// 全局变量
	jiathis_config = {}

	$('.jiathis_style').mouseover(function() {
		var title = $(this).attr('data-title');
		var url = $(this).attr('data-url');
		setShare(title, url);
	});
});