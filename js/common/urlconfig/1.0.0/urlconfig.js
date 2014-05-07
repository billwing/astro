define("common/urlconfig/1.0.0/urlconfig", [], function(require, exports, module) {

	var _baseUrlConfig = {
		webpage_http: 'http://' + window.location.host,
    	webpage_host: window.location.host,
    	webpage_url: window.location.href,

    	/*==================== 用户操作 ====================*/
    	// 用户登录
    	login_url: '/index.php?m=ucenter&c=user&a=login',
    	// 用户注册
    	register_url: '/index.php?m=ucenter&c=user&a=register',
    	// 手机号码注册
    	registerByMobile_url: '/index.php?m=ucenter&c=user&a=registerByMobile',
    	// 邮箱注册
    	registerByEmail_url: '/index.php?m=ucenter&c=user&a=registerByEmail',
    	// 用户退出
    	logout_url: '/index.php?m=ucenter&c=user&a=logout',
    	// 获取图片验证码
    	getImgCode_url: '/index.php?m=ucenter&c=user&a=getImgCode',
    	// 获取手机验证码
    	getMobileCode_url: '/index.php?m=ucenter&c=user&a=getMobileCode',
    	// 获取手机验证码（检查手机是否存在系统）
    	getMobileCode2_url: '/index.php?m=ucenter&c=user&a=getMobileCode2',
        // 获取邮箱验证码
        getEmailCode_url: '/index.php?m=ucenter&c=user&a=getEmlCode',
        // 获取邮箱验证码（检查邮箱是否存在系统）
        getEmailCode2_url: '/index.php?m=ucenter&c=user&a=getEmlCode2',
    	// 获取用户信息
    	getUser_url: '/index.php?m=ucenter&c=user&a=getUser',
    	// 检查图片验证码
    	checkImgCode_url: '/index.php?m=ucenter&c=user&a=checkImgCode',
    	// 检查手机验证码
    	checkMobileCode_url: '/index.php?m=ucenter&c=user&a=checkMobileCode',
    	// 检查邮箱验证码
    	checkEmlCode_url: '/index.php?m=ucenter&c=user&a=checkEmlCode',
    	// 检查帐号唯一性
    	checkAccount_url: '/index.php?m=ucenter&c=user&a=checkAccount',
    	// 检查昵称的唯一性
    	checkNick_url: '/index.php?m=ucenter&c=user&a=checkNick',
    	// 检查手机号码的唯一性
    	checkMobile_url: '/index.php?m=ucenter&c=user&a=checkMobile',
    	// 检查邮箱的唯一性
    	checkEmail_url: '/index.php?m=ucenter&c=user&a=checkEmail',
    	// 判断用户是否登录
    	isLogin_url: '/index.php?m=ucenter&c=user&a=isLogin',

    	/*==================== 密码操作 ====================*/
    	// 通过邮箱找回密码
    	findPwdByEmail_url: '/index.php?m=ucenter&c=password&a=findPwdByEmail',
    	// 通过手机号码找回密码
    	findPwdByMobile_url: '/index.php?m=ucenter&c=password&a=findPwdByMobile',
    	// 修改密码
    	resetPwd_url: '/index.php?m=ucenter&c=password&a=resetPwd',
    	// 通过邮箱重置密码
    	resetPwdByEmail_url: '/index.php?m=ucenter&c=password&a=resetPwdByEmail',
    	// 通过手机重置密码
    	resetPwdByMobile_url: '/index.php?m=ucenter&c=password&a=resetPwdByMobile',

    	/*==================== 账户操作 ====================*/
    	// 绑定邮箱
    	bindEmail_url: '/index.php?m=ucenter&c=account&a=bindEmail',
    	// 绑定手机
    	bindMobile_url: '/index.php?m=ucenter&c=account&a=bindMobile',
    	// 修改昵称
    	updateNick_url: '/index.php?m=ucenter&c=account&a=updateNick',

		/*==================== 页面地址 ====================*/
		agreement_url: '/index.php?m=ucenter&c=user&a=agreement',
		information_url: '/index.php?m=ucenter&c=index&a=info',

        /*==================== 其它地址 ====================*/
        imgCode_url: '/index.php?m=system&c=index&a=imgcode'
		
	};

	if (window.urlConfig) {
		var urlConfig = window.urlConfig;
	  	(function() {
	    	for (var _name in _baseUrlConfig) {
	      		if (_baseUrlConfig.hasOwnProperty(_name) && !urlConfig.hasOwnProperty(_name)) {
	        		urlConfig[_name] = _baseUrlConfig[_name]
	      		}
	    	}
	  	}());
	} else {
	  	var urlConfig = _baseUrlConfig;
	}

	module.exports = urlConfig;
});
