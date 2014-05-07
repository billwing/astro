/**
 * @Description : JZMobiLogin, JZMobiRegister, JZMobiVer, JZQQVer
 * @Author : Billwing(tbrweb@gmail.com)
 * @Version : 1.0
 * @Date : 2013-05-14
 * @Update : 2013-09-02
 */

(function( win, undefined ){

	var	doc = win.document,
		docElem = doc.documentElement;

	var JZLoginPopup = function(){

	var	body = doc.body,
		//isIE = !-[1,],	// 判断IE6/7/8 不能判断IE9
		//isIE6 = isIE && /msie 6/.test( navigator.userAgent.toLowerCase() ), // 判断IE6
		ua = (window.navigator.userAgent || "").toLowerCase(),
        isIE = ua.indexOf("msie") !== -1,
        isIE6 = ua.indexOf("msie 6") !== -1,
		uuid = 1,
		expando = 'cache' + ( +new Date() + "" ).slice( -8 ),  // 生成随机数
		cacheData = {
		/**
		 *	1 : {
		 *		eclick : [ handler1, handler2, handler3 ]; 
		 *		clickHandler : function(){ //... }; 
		 *	} 
		 */	
		};

	var	Popup = function(){};

	Popup.prototype = {
		// 参数设置
		getOptions : function( arg ){
			var i,
				options = {},
				// 默认参数
				defaults = {
					container:   null,			// string / object   弹处层内容的id或内容模板
					overlay:     true,			// boolean  		 是否添加遮罩层
					drag:	     true,			// boolean  		 是否绑定拖拽事件
					fixed: 	     true,			// boolean  		 是否静止定位
					follow:      null,			// string / object   是否跟随自定义元素来定位
					followX:     0,				// number   		 相对于自定义元素的X坐标的偏移
					followY:     0,				// number  		     相对于自定义元素的Y坐标的偏移
					autoClose:   0,				// number            自动关闭弹出层的时间
					lock:        false,			// boolean           是否允许ESC键来关闭弹出层
					callback:    null			// function          关闭弹出层后执行的回调函数
					/** 
					 *  container为object时的参数格式
					 *	container : {
					 *		header : '弹出层标题',
					 *		content : '弹出层内容',
					 *		yesFn : function(){},	    // 确定按钮的回调函数
					 *		noFn : function(){} / true,	// 取消按钮的回调函数
					 *		yesText : '确定',		    // 确定按钮的文本，默认为‘确定’
					 *		noText : '取消' 		    // 取消按钮的文本，默认为‘取消’		
					 *	}		
					 */
				};
			
			for( i in defaults ){
				options[i] = arg[i] !== undefined ? arg[i] : defaults[i];
			}
			Popup.data( 'options', options );
			return options;
		},
			
		// 防止IE6模拟fixed时出现抖动
		setBodyBg : function(){
			if( body.currentStyle.backgroundAttachment !== 'fixed' ){
				body.style.backgroundImage = 'url(about:blank)';
				body.style.backgroundAttachment = 'fixed';
			}
		},
		
		// 防止IE6的select穿透
		appendIframe : function(elem){
			elem.innerHTML = '<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"></iframe>';
		},
		
		/**
		 * 设置元素跟随定位
		 * @param { Object } 跟随的DOM元素
		 * @param { String / Object } 被跟随的DOM元素
		 * @param { Number } 相对于被跟随元素的X轴的偏移
		 * @param { Number } 相对于被跟随元素的Y轴的偏移
		 */
		setFollow : function( elem, follow, x, y ){
			follow = typeof follow === 'string' ? doc.getElementById( follow ) : follow;
			var style = elem.style;
			style.position = 'absolute';			
			style.left = Popup.getOffset( follow, 'left') + x + 'px';
			style.top = Popup.getOffset( follow, 'top' ) + y + 'px';
		},
		
		/**
		 * 设置元素固定(fixed) / 绝对(absolute)定位
		 * @param { Object } DOM元素
		 * @param { Boolean } true : fixed, fasle : absolute
		 */
		setPosition : function( elem, fixed ){
			var style = elem.style;
			style.position = isIE6 ? 'absolute' : fixed ? 'fixed' : 'absolute';
			if( fixed ){
				if( isIE6 ){
					style.setExpression( 'top','fuckIE6=document.documentElement.scrollTop+document.documentElement.clientHeight/2+"px"' );
				}
				else{
					style.top = '50%';
				}
				style.left = '50%';
			}
			else{
				if( isIE6 ){
					style.removeExpression( 'top' );
				}
				style.top = docElem.clientHeight/2 + Popup.getScroll( 'top' ) + 'px';
				style.left = docElem.clientWidth/2 + Popup.getScroll( 'left' ) + 'px';
			}
		},
		
		/**
		 * 创建遮罩层
		 * @return { Object } 遮罩层 
		 */
		createOverlay : function(){
			var overlay = doc.createElement('div'),
				style = overlay.style;
				
			style.cssText = 'margin:0;padding:0;border:none;width:100%;height:100%;background:#333;opacity:0.6;filter:alpha(opacity=60);z-index:997;position:fixed;top:0;left:0;';
			
			// IE6模拟fixed
			if(isIE6){
				body.style.height = '100%';
				style.position = 'absolute';
				style.setExpression('top','fuckIE6=document.documentElement.scrollTop+"px"');
			}
			
			overlay.id = 'overlay';
			return overlay;
		},
		
		/**
		 * 创建弹出层
		 * @return { Object } 弹出层 
		 */
		createPopupBox : function(){
			var popupBox = doc.createElement('div');		
			popupBox.style.cssText = 'margin:0;padding:0;border:none;z-index:998;';
			popupBox.id = 'JZLoginPopupBox';		
			return popupBox;
		},

		/**
		 * 创建默认的弹出层内容模板
		 * @param { Object } 模板参数
		 * @return { Object } 弹出层内容模板
		 */
		createPopupWrap : function( tmpl ){
			// 弹出层标题
			var header = tmpl.header ? 
				'<h4 class="JZLogin_title" id="JZLoginTitle"><a href="javascript:void(0)" title="关闭窗口" class="close_btn" id="closeBtn">&times;</a>' + tmpl.header + '</h4>' :
				'',
				// 确定按钮
				yesBtn = typeof tmpl.yesFn === 'function' ? 
					'<button class="btn_highlight" id="JZLoginYesBtn">' + ( typeof tmpl.yesText === 'string' ? tmpl.yesText : '确定' ) + '</button>' :
					'',
				// 取消按钮	
				noBtn = typeof tmpl.noFn === 'function' || tmpl.noFn === true ? 
					'<button class="btn_normal" id="JZLoginNoBtn">' + ( typeof tmpl.noText === 'string' ? tmpl.noText : '取消' ) + '</button>' :
					'',			
				// footer
				footer = yesBtn === '' && noBtn === '' ? '' :
					'<div class="JZLogin_footer">' + noBtn + yesBtn + '</div>',
				
				popupTmpl = [
				'<div class="JZLogin_content">',
					header,
					'<div class="JZLogin_text">' + tmpl.content + '</div>',
					footer,
				'</div>'
				].join(''),

				popupWrap = doc.getElementById( 'JZLoginWrapper' ),
				rScript = /<[\/]*script[\s\S]*?>/ig;
				
			if( !popupWrap ){
				popupWrap = doc.createElement( 'div' );
				popupWrap.id = 'JZLoginWrapper';
				popupWrap.className = 'JZLogin_wrapper';
			}
			popupWrap.innerHTML = popupTmpl.replace( rScript, '' );		
			return popupWrap;
		}		
	};
		
	/**
	 * 设置并返回缓存的数据 关于缓存系统详见：http://stylechen.com/cachedata.html
	 * @param { String / Object } 任意字符串或DOM元素
	 * @param { String } 缓存属性名
	 * @param { Anything } 缓存属性值
	 * @return { Object } 
	 */
	Popup.data = function( elem, val, data ){
	    if( typeof elem === 'string' ){
	        if( val !== undefined ){
				cacheData[elem] = val;
		    }
			return cacheData[elem];
		}
		else if( typeof elem === 'object' ){
			// 如果是window、document将不添加自定义属性
			// window的索引是0 document索引为1
			var index = elem === win ? 0 : 
					elem.nodeType === 9 ? 1 : 
					elem[expando] ? elem[expando] : 
					(elem[expando] = ++uuid),
				
				thisCache = cacheData[index] ? cacheData[index] : ( cacheData[index] = {} );
					
			if( data !== undefined ){
				// 将数据存入缓存中
				thisCache[val] = data;
			}
			// 返回DOM元素存储的数据
			return thisCache[val];
		}
	};

	/**
	 * 删除缓存
	 * @param { String / Object } 任意字符串或DOM元素
	 * @param { String } 要删除的缓存属性名
	 */
	Popup.removeData = function( elem, val ){
		if( typeof elem === 'string' ){
			delete cacheData[elem];
		}
		else if( typeof elem === 'object' ){
			var index = elem === win ? 0 :
					elem.nodeType === 9 ? 1 :
					elem[expando];
				
			if( index === undefined ) return;		
			// 检测对象是否为空
			var isEmptyObject = function( obj ) {
					var name;
					for ( name in obj ) {
						return false;
					}
					return true;
				},
				// 删除DOM元素所有的缓存数据
				delteProp = function(){
					delete cacheData[index];
					if( index <= 1 ) return;
					try{
						// IE8及标准浏览器可以直接使用delete来删除属性
						delete elem[expando];
					}
					catch ( e ) {
						// IE6/IE7使用removeAttribute方法来删除属性(document会报错)
						elem.removeAttribute( expando );
					}
				};

			if( val ){
				// 只删除指定的数据
				delete cacheData[index][val];
				if( isEmptyObject( cacheData[index] ) ){
					delteProp();
				}
			}
			else{
				delteProp();
			}
		}
	};

	// 事件处理系统
	Popup.event = {
		
		bind : function( elem, type, handler ){
			var events = Popup.data( elem, 'e' + type ) || Popup.data( elem, 'e' + type, [] );
			// 将事件函数添加到缓存中
			events.push( handler );
			// 同一事件类型只注册一次事件，防止重复注册
			if( events.length === 1 ){
				var eventHandler = this.eventHandler( elem );
				Popup.data( elem, type + 'Handler', eventHandler );
				if( elem.addEventListener ){
					elem.addEventListener( type, eventHandler, false );
				}
				else if( elem.attachEvent ){
					elem.attachEvent( 'on' + type, eventHandler );
				}
			}
		},
			
		unbind : function( elem, type, handler ){
			var events = Popup.data( elem, 'e' + type );
			if( !events ) return;
				
			// 如果没有传入要删除的事件处理函数则删除该事件类型的缓存
			if( !handler ){
				events = undefined;		
			}
			// 如果有具体的事件处理函数则只删除一个
			else{
				for( var i = events.length - 1, fn = events[i]; i >= 0; i-- ){
					if( fn === handler ){
						events.splice( i, 1 );
					}				
				}
			}		
			// 删除事件和缓存
			if( !events || !events.length ){
				var eventHandler = Popup.data( elem, type + 'Handler' );			
				if( elem.addEventListener ){
					elem.removeEventListener( type, eventHandler, false );
				}
				else if( elem.attachEvent ){
					elem.detachEvent( 'on' + type, eventHandler );
				}		
				Popup.removeData( elem, type + 'Handler' );
				Popup.removeData( elem, 'e' + type );
			}
		},
			
		// 依次执行事件绑定的函数
		eventHandler : function( elem ){
			return function( event ){
				event = Popup.event.fixEvent( event || win.event );
				var type = event.type,
					events = Popup.data( elem, 'e' + type );
					
				for( var i = 0, handler; handler = events[i++]; ){
					if( handler.call(elem, event) === false ){
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}
		},
		
		// 修复IE浏览器支持常见的标准事件的API
		fixEvent : function( e ){
			// 支持DOM 2级标准事件的浏览器无需做修复
			if ( e.target ) return e; 
			var event = {}, name;
			event.target = e.srcElement || document;
			event.preventDefault = function(){
				e.returnValue = false;
			};		
			event.stopPropagation = function(){
				e.cancelBubble = true;
			};
			// IE6/7/8在原生的window.event中直接写入自定义属性
			// 会导致内存泄漏，所以采用复制的方式
			for( name in e ){
				event[name] = e[name];
			}				
			return event;
		}
	};

	/**
	 * 首字母大写转换
	 * @param { String } 要转换的字符串
	 * @return { String } 转换后的字符串 top => Top
	 */
	Popup.capitalize = function( str ){
		var firstStr = str.charAt(0);
		return firstStr.toUpperCase() + str.replace( firstStr, '' );
	};

	/**
	 * 获取滚动条的位置
	 * @param { String } 'top' & 'left'
	 * @return { Number } 
	 */	
	Popup.getScroll = function( type ){
		var upType = this.capitalize( type );		
		return docElem['scroll' + upType] || body['scroll' + upType];	
	};

	/**
	 * 获取元素在页面中的位置
	 * @param { Object } DOM元素
	 * @param { String } 'top' & 'left'
	 * @return { Number } 
	 */		
	Popup.getOffset = function( elem, type ){
		var upType = this.capitalize( type ),
			client  = docElem['client' + upType]  || body['client' + upType]  || 0,
			scroll  = this.getScroll( type ),
			box = elem.getBoundingClientRect();
			
		return Math.round( box[type] ) + scroll - client;
	};

	/**
	 * 拖拽效果
	 * @param { Object } 触发拖拽的DOM元素
	 * @param { Object } 要进行拖拽的DOM元素
	 */
	Popup.drag = function( target, moveElem ){
		// 清除文本选择
		var	clearSelect = 'getSelection' in win ? function(){
			win.getSelection().removeAllRanges();
			} : function(){
				try{
					doc.selection.empty();
				}
				catch( e ){};
			},
			
			self = this,
			event = self.event,
			isDown = false,
			newElem = isIE ? target : doc,
			fixed = moveElem.style.position === 'fixed',
			_fixed = Popup.data( 'options' ).fixed;
		
		// mousedown
		var down = function( e ){
			isDown = true;
			var scrollTop = self.getScroll( 'top' ),
				scrollLeft = self.getScroll( 'left' ),
				edgeLeft = fixed ? 0 : scrollLeft,
				edgeTop = fixed ? 0 : scrollTop;
			
			Popup.data( 'dragData', {
				x : e.clientX - self.getOffset( moveElem, 'left' ) + ( fixed ? scrollLeft : 0 ),	
				y : e.clientY - self.getOffset( moveElem, 'top' ) + ( fixed ? scrollTop : 0 ),			
				// 设置上下左右4个临界点的位置
				// 固定定位的临界点 = 当前屏的宽、高(下、右要减去元素本身的宽度或高度)
				// 绝对定位的临界点 = 当前屏的宽、高 + 滚动条卷起部分(下、右要减去元素本身的宽度或高度)
				el : edgeLeft,	// 左临界点
				et : edgeTop,  // 上临界点
				er : edgeLeft + docElem.clientWidth - moveElem.offsetWidth,  // 右临界点
				eb : edgeTop + docElem.clientHeight - moveElem.offsetHeight  // 下临界点
			});
			
			if( isIE ){
				// IE6如果是模拟fixed在mousedown的时候先删除模拟，节省性能
				if( isIE6 && _fixed ){
					moveElem.style.removeExpression( 'top' );
				}
				target.setCapture();
			}
			
			event.bind( newElem, 'mousemove', move );
			event.bind( newElem, 'mouseup', up );
			
			if( isIE ){
				event.bind( target, 'losecapture', up );
			}
			
			e.stopPropagation();
			e.preventDefault();
			
		};
		
		event.bind( target, 'mousedown', down );
		
		// mousemove
		var move = function( e ){
			if( !isDown ) return;
			clearSelect();
			var dragData = Popup.data( 'dragData' ),
				left = e.clientX - dragData.x,
				top = e.clientY - dragData.y,
				et = dragData.et,
				er = dragData.er,
				eb = dragData.eb,
				el = dragData.el,
				style = moveElem.style;
			
			// 设置上下左右的临界点以防止元素溢出当前屏
			style.marginLeft = style.marginTop = '0px';
			style.left = ( left <= el ? el : (left >= er ? er : left) ) + 'px';
			style.top = ( top <= et ? et : (top >= eb ? eb : top) ) + 'px';
			e.stopPropagation();
		};
		
		// mouseup
		var up = function( e ){
			isDown = false;
			if( isIE ){
				event.unbind( target, 'losecapture', arguments.callee );
			}
			event.unbind( newElem, 'mousemove', move );
			event.unbind( newElem, 'mouseup', arguments.callee );		
			if( isIE ){
				target.releaseCapture();
				// IE6如果是模拟fixed在mouseup的时候要重新设置模拟
				if( isIE6 && _fixed ){
					var top = parseInt( moveElem.style.top ) - self.getScroll( 'top' );
					moveElem.style.setExpression('top',"fuckIE6=document.documentElement.scrollTop+" + top + '+"px"');
				}
			}
			e.stopPropagation();
		};
	};

	var	timer,	// 定时器
		// ESC键关闭弹出层
		escClose = function( e ){
			if( e.keyCode === 27 ){
				extend.close();
			}
		},	
		// 清除定时器
		clearTimer = function(){
			if( timer ){
				clearTimeout( timer );
				timer = undefined;
			}
		};
		
	var extend = {
		open : function(){
			var $ = new Popup(),
				options = $.getOptions( arguments[0] || {} ),	// 获取参数
				event = Popup.event,
				self = this,
				overlay,
				popupBox,
				popupWrap,
				boxChild;
				
			clearTimer();
			
			// ------------------------------------------------------
			// ---------------------插入遮罩层-----------------------
			// ------------------------------------------------------
			
			// 如果页面中已经缓存遮罩层，直接显示
			if( options.overlay ){
				overlay = doc.getElementById( 'overlay' );			
				if( !overlay ){
					overlay = $.createOverlay();
					body.appendChild( overlay );
					if( isIE6 ){
						$.appendIframe( overlay );
					}
				}
				overlay.style.display = 'block';
			}
			
			if(isIE6){
				$.setBodyBg();
			}
			
			// ------------------------------------------------------
			// ---------------------插入弹出层-----------------------
			// ------------------------------------------------------
			
			// 如果页面中已经缓存弹出层，直接显示
			popupBox = doc.getElementById( 'JZLoginPopupBox' );
			if( !popupBox ){
				popupBox = $.createPopupBox();
				body.appendChild( popupBox );
			}
			
			if( options.follow ){
				$.setFollow( popupBox, options.follow, options.followX, options.followY );
				if( overlay ){
					overlay.style.display = 'none';
				}
				options.fixed = false;
			}
			else{
				$.setPosition( popupBox, options.fixed );
			}
			popupBox.style.display = 'block';
			
			// 确保弹出层绝对定位时放大缩小窗口也可以垂直居中显示
			if( !options.follow && !options.fixed ){
				var resize = function(){
					$.setPosition( popupBox, false );
				};
				event.bind( win, 'resize', resize );
				Popup.data( 'resize', resize );
			}
			
			// ------------------------------------------------------
			// -------------------插入弹出层内容---------------------
			// ------------------------------------------------------
			
			// 判断弹出层内容是否已经缓存过
			popupWrap = typeof options.container === 'string' ? 
				doc.getElementById( options.container ) : 
				$.createPopupWrap( options.container );
			
			boxChild = popupBox.getElementsByTagName('*')[0];
			
			if( !boxChild ){
				popupBox.appendChild( popupWrap );
			}
			else if( boxChild && popupWrap !== boxChild ){
				boxChild.style.display = 'none';
				body.appendChild( boxChild );
				popupBox.appendChild( popupWrap );
			}
			
			popupWrap.style.display = 'block';
			
			var eWidth = popupWrap.offsetWidth,
				eHeight = popupWrap.offsetHeight;
				
			// 强制去掉自定义弹出层内容的margin	
			popupWrap.style.marginTop = popupWrap.style.marginRight = popupWrap.style.marginBottom = popupWrap.style.marginLeft = '0px';	
			
			// 居中定位
			if( !options.follow ){
				popupBox.style.marginLeft = '-' + eWidth/2 + 'px';
				popupBox.style.marginTop = '-' + eHeight/2 + 'px';
			}
			else{
				popupBox.style.marginLeft = popupBox.style.marginTop = '0px';
			}
					
			// 防止select穿透固定宽度和高度
			if( isIE6 && !options.overlay ){
				popupBox.style.width = eWidth + 'px';
				popupBox.style.height = eHeight + 'px';
			}
			
			// ------------------------------------------------------
			// --------------------绑定相关事件----------------------
			// ------------------------------------------------------
			var closeBtn = doc.getElementById( 'closeBtn' ),
				popupTitle = doc.getElementById( 'JZLoginTitle' ),
				popupYesBtn = doc.getElementById('JZLoginYesBtn'),
				popupNoBtn = doc.getElementById('JZLoginNoBtn');		

			// 绑定确定按钮的回调函数
			if( popupYesBtn ){
				event.bind( popupYesBtn, 'click', function( event ){
					if( options.container.yesFn.call(self, event) !== false ){
						self.close();
					}
				});
			}
			
			// 绑定取消按钮的回调函数
			if( popupNoBtn ){
				var noCallback = function( event ){
					if( options.container.noFn === true || options.container.noFn.call(self, event) !== false ){
						self.close();
					}
				};
				event.bind( popupNoBtn, 'click', noCallback );
				// 如果取消按钮有回调函数 关闭按钮也绑定同样的回调函数
				if( closeBtn ){
					event.bind( closeBtn, 'click', noCallback );
				}
			}			
			// 关闭按钮绑定事件	
			else if( closeBtn ){
				event.bind( closeBtn, 'click', self.close );
			}
			
			// ESC键关闭弹出层
			if( !options.lock ){
				event.bind( doc, 'keyup', escClose );
			}
			// 自动关闭弹出层
			if( options.autoClose && typeof options.autoClose === 'number' ){
				timer = setTimeout( self.close, options.autoClose );
			}		
			// 绑定拖拽
			if( options.drag && popupTitle ){
				popupTitle.style.cursor = 'move';
				Popup.drag( popupTitle, popupBox );
			}
			// 缓存相关元素以便关闭弹出层的时候进行操作
			Popup.data( 'popupElements', {
				overlay : overlay,
				popupBox : popupBox,
				closeBtn : closeBtn,
				popupTitle : popupTitle,
				popupYesBtn : popupYesBtn,
				popupNoBtn : popupNoBtn			
			});
		},
		
		close : function(){
			var options = Popup.data( 'options' ),
				elements = Popup.data( 'popupElements' ),
				event = Popup.event;
				
			clearTimer();
			//	隐藏遮罩层
			if( options.overlay && elements.overlay ){
				elements.overlay.style.display = 'none';
			}
			// 隐藏弹出层
			elements.popupBox.style.display = 'none';
			// IE6清除CSS表达式
			if( isIE6 ){
				elements.popupBox.style.removeExpression( 'top' );
			}
			
			// ------------------------------------------------------
			// --------------------删除相关事件----------------------
			// ------------------------------------------------------
			if( elements.closeBtn ){
				event.unbind( elements.closeBtn, 'click' );
			}

			if( elements.popupTitle ){
				event.unbind( elements.popupTitle, 'mousedown' );
			}
			
			if( elements.popupYesBtn ){
				event.unbind( elements.popupYesBtn, 'click' );
			}
			
			if( elements.popupNoBtn ){
				event.unbind( elements.popupNoBtn, 'click' );
			}
			
			if( !options.follow && !options.fixed ){
				var resize = Popup.data( 'resize' );
				event.unbind( win, 'resize', resize );
				Popup.removeData( 'resize' );
			}
			if( !options.lock ){
				event.unbind( doc, 'keyup', escClose );
			}
			// 执行callback
			if(typeof options.callback === 'function'){
				//alert( self );
				options.callback.call( extend );
			}
			// 清除缓存
			Popup.removeData( 'options' );
			Popup.removeData( 'popupElements' );
		}
	};

	return extend;

	};

	// ------------------------------------------------------
	// ---------------------DOM加载模块----------------------
	// ------------------------------------------------------
	var loaded = function(){
			win.JZLoginPopup = JZLoginPopup();
		},
		
		doScrollCheck = function(){
			if ( doc.body ) return;

			try {
				docElem.doScroll("left");
			} catch(e) {
				setTimeout( doScrollCheck, 1 );
				return;
			}
			loaded();
		};

	(function(){
		if( doc.body ){
			loaded();
		}
		else{
			if( doc.addEventListener ){
				doc.addEventListener( 'DOMContentLoaded', function(){
					doc.removeEventListener( 'DOMContentLoaded', arguments.callee, false );
					loaded();
				}, false );
				win.addEventListener( 'load', loaded, false );
			}
			else if( doc.attachEvent ){
				doc.attachEvent( 'onreadystatechange', function(){
					if( doc.readyState === 'complete' ){
						doc.detachEvent( 'onreadystatechange', arguments.callee );
						loaded();
					}
				});
				win.attachEvent( 'onload', loaded );			
				var toplevel = false;
				try {
					toplevel = win.frameElement == null;
				} catch(e) {}

				if ( docElem.doScroll && toplevel ) {
					doScrollCheck();
				}
			}
		}
	})();

	(function(){
		var pageHost = window.location.host;
		var pageHref =  location.href;
		var PopupStyle = '<style>.JZLogin_wrapper{display:none;font-family:"Microsoft yahei",Arial;font-size:12px;color:#444;/*border:1px solid #12458d;*/border:3px solid transparent;border-radius:5px;box-shadow:0 0 10px rgba(0, 0, 0, 0.4);}.JZLogin_wrapper p{margin:0}.JZLogin_wrapper .gray{color:#999!important;}.JZLogin_wrapper .right{float:none!important;font-family:"宋体";color:#0C0}.JZLogin_wrapper .error{color:#F00!important;}.JZLogin_wrapper .ui-form{margin:0;}.JZLogin_wrapper label{display:inline;cursor:inherit;margin:0;}.JZLogin_wrapper .ui-label{float:left;width:170px;margin:0 0 0 -180px;padding-top:4px;font-size:14px;text-align:right;}.JZLogin_wrapper input{vertical-align:middle;}.JZLogin_wrapper .ui-input{display:inline;width:150px;height:24px;margin:0 5px 5px 0;padding:0 3px;line-height:24px;border:1px solid #a5c2d4}.JZLogin_wrapper .ui-form-explain{margin:0;padding:5px 0 0 0;font-size:12px;color:#999;}.JZLogin_wrapper .ui-form-required{margin-right:6px;font-family:SimSun;color:#F00;}.JZLogin_wrapper .ui-button{color:#222;}.JZLogin_wrapper .JZLogin_content{overflow:hidden;border-radius:5px;background:#FFF}.JZLogin_wrapper .JZLogin_title{overflow:hidden;height:30px;margin:0;padding:0 10px 0 30px;font-size:14px;line-height:28px;color:#EE3A09;border-bottom:1px solid #E5E5E5;border-radius:5px 5px 0 0;background:#F7F7F7 url(http://static.n8n8.cn/Public/Images/tiny_logo.gif) no-repeat 10px 50%;}.JZLogin_wrapper .JZLogin_name{float:left;margin:0;font-size:14px;line-height:28px;}.JZLogin_wrapper .switch-btn{float:right;margin-right:30px;+margin-top:-30px;font-size:12px;line-height:33px;}.JZLogin_wrapper .close_btn{float:right;width:20px;height:20px;margin-top:5px;+margin-top:-20px;font:700 20px arial;_font-size:12px;line-height:20px;text-align:center;text-decoration:none;color:#999;}.JZLogin_wrapper .close_btn:hover{color:#333;}.JZLogin_wrapper .JZLogin_text{float:left;padding:10px}.JZLogin_wrapper .JZLogin_footer{clear:both;height:35px;line-height:35px;text-align:center;background:#ecf0f3}.JZLogin_wrapper .JZLogin_footer:after{display:block;visibility:hidden;overflow:hidden;clear:both;content:"";height:0}.JZLogin_wrapper .ui-button-sub,.JZLogin_wrapper .ui-button{cursor:pointer;padding:3px 10px;border-width:1px;border-style:solid;border-color:#CCC #CCC #B3B3B3 #CCC;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;background:-webkit-gradient(linear,left top,left bottom,from(#FFFFFF),to(#E6E6E6));background:-moz-linear-gradient(top,#FFFFFF,#E6E6E6);background:-o-linear-gradient(top,#FFFFFF,#E6E6E6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#E6E6E6",endColorstr="#FFFFFF") chroma(color=black)}.JZLogin_wrapper .ui-button-sub:hover,.JZLogin_wrapper .ui-button:hover,.JZLogin_wrapper .ui-button-hover{color:#222;border-width:1px;border-style:solid;border-color:#CCC #CCC #B3B3B3 #CCC;background:-webkit-gradient(linear,left top,left bottom,from(#E6E6E6),to(#FFFFFF));background:-moz-linear-gradient(top,#E6E6E6,#FFFFFF);background:-o-linear-gradient(top,#E6E6E6,#FFFFFF);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#FFFFFF",endColorstr="#E6E6E6") chroma(color=black)}.JZLogin_mobiReg{float:right;margin-left:10px;padding-top:15px}.JZLogin_mobiReg .ui-form-item{padding:0 5px 0 110px}.JZLogin_mobiReg .ui-input{width:190px;margin-bottom:0;}.JZLogin_mobiReg .ui-input-checkcode{width:80px}.JZLogin_mobiReg .ui-button-getcode{cursor:pointer;margin:-1px 0 0 5px;padding:3px 10px;+padding:1px 5px;}.JZLogin_mobiReg .ui-button-sub{margin:0 0 -70px 20px;}.JZLogin_mobiReg .ui-form-explain{height:20px;padding:3px 0 0 0}.JZLogin_mobiAdv{display:none;float:left;width:234px;height:210px}.JZLogin_mobiAdv img{width:234px;height:210px;}.JZLogin_mobiLog .ui-form-tips{height:20px;margin:0;line-height:20px}.JZLogin_mobiLog .ui-form-item{padding:0 5px 0 110px}.JZLogin_wrapper_mobiReg{width:400px;}.JZLogin_wrapper_mobiReg .JZLogin_text{padding:10px 30px;}.JZLogin_wrapper_mobiReg .close_btn{*margin-top:-25px;}.JZLogin_wrapper_mobiReg .ui-button-sub{*position:relative;*left:-110px;_left:0;*margin-top:25px;}.JZLogin_wrapper_mobiLog{width:376px}.JZLogin_wrapper_mobiLog .JZLogin_title{border-bottom:1px solid #e5e5e5;}.JZLogin_wrapper_mobiLog .ui-form-item{padding-left:100px}.JZLogin_wrapper_mobiLog .ui-button-reg{color:#F00}.JZLogin_wrapper_mobiLog .ui-input-savePwd{cursor:pointer;margin:-1px 5px 0 0}.JZLogin_wrapper_mobiLog .ui-button-sub{*position:relative;margin:0 15px -65px 0;*margin-top:23px;}.JZLogin_wrapper_mobiVer {*width:510px;}.JZLogin_wrapper_mobiVer .JZLogin_text{background:#FFF;}.JZLogin_wrapper_mobiVer .close_btn{*margin-top:-25px;}.JZLogin_mobiVer{padding:10px 30px;_background:#FFF;}.JZLogin_mobiVer .ui-form{font-size:14px}.JZLogin_mobiVer .ui-form-tips{padding-bottom:10px}.JZLogin_mobiVer .ui-form-tips .cnt{text-indent:2em;font-size:13px;}.JZLogin_mobiVer .ui-form-step{padding-bottom:10px;}.JZLogin_mobiVer .ui-form-item{padding:0 5px 10px 120px}.JZLogin_mobiVer .ui-input{width:170px;}.JZLogin_mobiVer .ui-form-explain{padding:0;}.JZLogin_mobiVer .ui-button-getcode{cursor:pointer;margin:-5px 0 0 10px;padding:1px 5px;font-size:12px;}.JZLogin_mobiVer .ui-input-checkcode{width:170px;}.JZLogin_mobiVer .ui-button-sub{padding:3px 10px;font-size:13px;}.pagecode-box{display:none;position:fixed;top:50%;left:50%;z-index:999;margin:-73px 0 0 -148.5px;}.pagecode .pc-txt{padding-top:5px;font-size:13px;text-align:center}.pagecode .pc-txt label{display:inline;font-size:13px}.pagecode .pc-inp{display:inline;width:60px;height:22px;margin-right:10px;padding:0 3px;font-size:13px;border:1px solid #CCC}.pagecode .pc-lnk{color:#005eac}.pagecode .pc-img{margin:-3px 5px 0 0;vertical-align:middle}.pagecode .pc-btn{margin:20px 0 0 0;padding:0 0 15px 75px;text-align:left}.pagecode .pc-sub{cursor:pointer;width:60px;height:25px;border:1px solid #CCC;background:#EAEAEA}.JZLogin_qqVer{padding:0 20px;}.JZLogin_qqVer .ui-form-tips .cnt{width:285px;}.JZLogin_qqVer .ui-input{width:110px;}.JZLogin_qqVer .ui-form-item{padding-left:90px;}</style>';
		var mobiRegBox = '<div id="JZLoginMobiRegBox"class="JZLogin_wrapper JZLogin_wrapper_mobiReg"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">手机注册</h2><a title="关闭"href="javascript:void(0);"class="close_btn JZLogin-close-btn"id="verClsBtn2">×</a><a class="switch-btn JZLogin-mobiLog-btn" href="javascript:void(0);">返回登录</a></div><div class="JZLogin_text"><div class="JZLogin_mobiAdv"></div><div class="JZLogin_mobiReg"><form id="JZLoginMobiRegForm"class="ui-form"><div class="ui-form-item"><label for="JZLoginMobiRegAcc"class="ui-label"><span class="ui-form-required">*</span>您的账号：</label><input id="JZLoginMobiRegAcc" class="mobi-inp ui-input" name="JZLoginMobiRegAcc" tabindex="5" type="text"/><div class="ui-form-explain"></div></div><div class="ui-form-item"><label for="JZLoginMobiRegCode"class="ui-label"><span class="ui-form-required">*</span>验证码：</label><input id="JZLoginMobiRegCode"class="ui-input ui-input-checkcode" tabindex="6" type="text"data-explain="请输入您手机收到的验证码"autocomplete="off"maxlength="6"name="JZLoginMobiRegCode"value=""><input id="JZLoginMobiRegGetCode" type="button"class="ui-button ui-button-getcode" tabindex="7" value="获取验证码"><div class="ui-form-explain"></div></div><div class="ui-form-item"><label for="JZLoginMobiRegPwd"class="ui-label"><span class="ui-form-required">*</span>输入密码：</label><input id="JZLoginMobiRegPwd"name="password"type="password"class="ui-input" tabindex="8" value=""/><div class="ui-form-explain"></div></div><div class="ui-form-item"><label for="JZLoginMobiConPwd"class="ui-label"><span class="ui-form-required">*</span>再输一次：</label><input id="JZLoginMobiConPwd"name="JZLoginMobiConPwd"type="password"class="ui-input" tabindex="9"/><div class="ui-form-explain ui-tiptext"></div></div><div class="ui-form-item"><input id="JZLoginMobiRegSub" type="submit"class="ui-button ui-button-sub" tabindex="10" value="立即注册"></div></form></div></div><div class="JZLogin_footer"></div></div></div>';
		var mobiLogBox = '<div id="JZLoginMobiLogBox"class="JZLogin_wrapper JZLogin_wrapper_mobiLog"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">用户登录</h2><a id="verClsBtn3"class="close_btn JZLogin-close-btn"href="javascript:void(0);"title="关闭">×</a></div><div class="JZLogin_text"><div class="JZLogin_mobiLog"><form id="JZLoginMobiLogForm" class="ui-form"><div class="ui-form-item"><p class="ui-form-tips"></p></div><div class="ui-form-item"><label for="JZLoginMobiLog-username"class="ui-label">用户名：</label><input id="JZLoginMobiLog-username" class="ui-input" type="text" name="JZLoginMobiLog-username" placeholder="请输入手机号码/软件账号" tabindex="2" title="请输入手机号码/软件账号"/><a id="JZLoginMobiLog-regBtn"class="ui-button-reg JZLogin-mobiReg-btn"href="javascript:void(0);">免费注册</a><div class="ui-form-explain"></div></div><div class="ui-form-item"><label for="JZLoginMobiLog-password"class="ui-label">密&nbsp;&nbsp;&nbsp;码：</label><input id="JZLoginMobiLog-password"name="JZLoginMobiLog-password"type="password"class="ui-input"data-explain="请输入您的密码" tabindex="3" title="请输入密码" value=""/><a class="ui-button-forPwd"href="http://u.n8n8.cn/getPassword"target="_blank">忘记密码？</a><div class="ui-form-explain"></div></div><div class="ui-form-item"><input id="JZLoginMobiLog-savePwd"class="ui-input-savePwd"type="checkbox"checked="checked"title="为了您的账号安全，请勿在网吧等公用电脑上勾选此项"/><label for="JZLoginMobiLog-savePwd">记住密码</label></div><div class="ui-form-item"><input type="submit"class="ui-button ui-button-sub" tabindex="4"value="立即登录"><input type="reset"class="ui-button ui-button-sub JZLogin-close-btn"value="取消登录"></div></form></div></div><div class="JZLogin_footer"></div></div></div>';
		var mobiVerBox = '<div id="JZLoginMobiVerBox"class="JZLogin_wrapper JZLogin_wrapper_mobiVer"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">手机验证</h2><a class="close_btn JZLogin-close-btn"href="javascript:void(0);"title="关闭">×</a><a class="switch-btn JZLogin-mobiLog-btn" href="javascript:void(0);">重新登录</a><a class="switch-btn JZLogin-mobiReg-btn" href="javascript:void(0);">重新注册</a></div><div class="JZLogin_text"><div class="JZLogin_mobiVer"><form id="JZLoginMobiVerForm" class="ui-form"><div class="ui-form-tips"><p>尊敬的用户：</p><p id="JZLoginMobiVerTips" class="cnt">请完善您的信息，该应用需要手机认证用户才可以使用全部功能。</p></div><div class="ui-form-step">1、正确输入您的手机号码，点击“获取验证码”按钮</div><div class="ui-form-item"><label for="JZLoginMobiVerAcc"class="ui-label"><span class="ui-form-required">*</span>手机号码：</label><input id="JZLoginMobiVerAcc" class="mobi-inp ui-input" name="JZLoginMobiVerAcc" tabindex="11" type="text"/><input id="JZLoginMobiVerGetCode" type="button"class="ui-button ui-button-getcode" tabindex="12" value="获取验证码"><div class="ui-form-explain">请输入您的11位手机号码</div></div><div class="ui-form-step">2、收到验证码短信后，在下方输入验证码</div><div class="ui-form-item"><label for="JZLoginMobiRegCode"class="ui-label"><span class="ui-form-required">*</span>验证码：</label><input id="JZLoginMobiVerCode"class="ui-input ui-input-checkcode" tabindex="13" type="text"data-explain="请输入您手机收到的验证码"autocomplete="off"maxlength="6"name="JZLoginMobiRegCode"value=""><div class="ui-form-explain">请输入您手机收到的6位验证码</div></div><div class="ui-form-item"><input id="JZLoginMobiRegSub" type="submit"class="ui-button ui-button-sub" tabindex="10" value="提交"></div></form><div>如果您在一分钟内没有收到验证码，请重新点击“获取验证码”</div></div></div></div></div>';
		var qqnoVerBox = '<div id="JZLoginQQVerBox"class="JZLogin_wrapper JZLogin_wrapper_qqVer"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">QQ验证</h2><a class="close_btn JZLogin-close-btn"href="javascript:void(0);"title="关闭">×</a></div><div class="JZLogin_text"><div class="JZLogin_mobiVer JZLogin_qqVer"><form id="JZLoginQQVerForm" class="ui-form"><div class="ui-form-tips"><p>尊敬的用户：</p><p id="JZLoginQQVerTips" class="cnt">请输入您的常用QQ，与客服专员建立快捷沟通。点击“提交”后，我们将向您的QQ邮箱发送一封验证邮件，请您及时查收并激活。</p></div><div class="ui-form-item"><label for="JZLoginQQVerAcc"class="ui-label"><span class="ui-form-required">*</span>QQ号码：</label><input id="JZLoginQQVerAcc" class="ui-input" name="JZLoginQQVerAcc" type="text"/><div class="ui-form-explain">请输入您的QQ号码</div></div><div class="ui-form-item"><input id="JZLoginQQVerSub" type="submit"class="ui-button ui-button-sub" value="提交"></div></form></div></div></div></div>';
		var pageCodeBox = '<div id="JZLoginCodeBox" class="pagecode-box"><div style="display:block;" class="JZLogin_wrapper"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">免费获取短信验证码</h2><a class="close_btn JZLoginCode-close-btn"href="javascript:void(0);"title="关闭">×</a></div><div class="JZLogin_text"><div class="pagecode"><form id="pageCodeForm" action="#" method="post" data-mobi=""><div class="pc-txt"><label for="pageCodeInp">验证码：</label><input id="pageCodeInp" class="pc-inp" type="text"><a class="pc-lnk" href="javascript:;" title="点击换一张" onclick="this.firstChild.src=\'http://u.n8n8.cn/User/index.php?m=Mobi&a=getVerCode&t=\' + Math.random();return false;"><img class="pc-img" src="http://u.n8n8.cn/User/index.php?m=Mobi&a=getVerCode">看不清？换一张</a></div><div class="pc-btn"><input type="submit" value="提交" class="pc-sub"></div></form></div></div></div></div></div>';
		jQuery('body').append(PopupStyle);
		jQuery('body').append(mobiRegBox);
		jQuery('body').append(mobiLogBox);
		jQuery('body').append(mobiVerBox);
		jQuery('body').append(qqnoVerBox);
		jQuery('body').append(pageCodeBox);
	})();

})( window, undefined );

$(function(){
	// 获取当前页面域名
	var pageHost = window.location.host;
	// 获取当前页面子域
	var subdomain = pageHost.split('.')[0];

	// 验证是否已经绑定手机号码
	(function(){
		$.ajax({
			type: 'GET',
			url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=ajaxCheckMobi',
			dataType: 'jsonp',
			async: false,
			success: function(msg){
				if(msg['e'] == 2){
					// 未登录
					jzLoginNoMobi = 2;
					$('.JZLogin-isMobiLog-btn').data('events', 'unlogin');
				} else if(msg['e'] == 0){
					// 未绑定手机
					jzLoginNoMobi = 0;
				} else if(msg['qq'] == 0){
					// 未绑定QQ
					jzLoginNoMobi = 3;
				} else {
					// 成功进入
					jzLoginNoMobi = 1;
				}
			}
		});
	})()

	// 倒计时一分钟
	function countdown(obj, second){
		if(second>0){
			obj.attr('disabled', 'disabled');
			obj.val('请等待' + second + '秒');
			second--;
			setTimeout(function(){
				countdown(obj, second);
			}, 1000);
		} else {
			obj.removeAttr('disabled');
			obj.val('获取验证码');
		}
	}

	// 图片验证码
	var $JZLoginCodeBox = $('#JZLoginCodeBox');
	$('.JZLoginCode-close-btn').click(function(){
		$JZLoginCodeBox.hide();
	});

	/*=============== 手机登录 ===============*/
	// 错误提示
	var mobiLogErr = '账号和密码不匹配，请重试'
	// 声明变量
	var $mobiLogTip = $('#JZLoginMobiLogForm .ui-form-tips');
	var $mobiLogInp = $('#JZLoginMobiLogForm .ui-input');
	var $mobiLogAcc = $('#JZLoginMobiLog-username');
	var $mobiLogPwd = $('#JZLoginMobiLog-password');
	var mobiAccEmp = '请输入手机号码/软件账号';
	var mobiPwdEmp = '请输入密码';
	$mobiLogInp.focus(function(){
		$mobiLogTip.html('').removeClass('error');
	});
	$mobiLogAcc.focus(function(){
		$mobiLogTip.html(mobiAccEmp);
	}).blur(function(){
		$mobiLogTip.html('');
	});
	// 手机登录表单提交
	$('#JZLoginMobiLogForm').live('submit', function(e){
		e = e || window.event;
		e.preventDefault();			
		var mobiAccVal = $mobiLogAcc.val();
		var mobiPwdVal = $mobiLogPwd.val();
		$mobiLogInp.each(function(i){
			var emp = [mobiAccEmp, mobiPwdEmp];
			if($(this).val() == '' || $(this).val() == '请输入手机号码/软件账号'){
				$mobiLogTip.html(emp[i]).addClass('error');
				return false;
			}
		});
		if(!$mobiLogTip.hasClass('error')){
			$.ajax({
				type: 'GET',
				url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=ajaxlogin',
				dataType: 'jsonp',
				data: 'username=' + mobiAccVal + '&password=' + mobiPwdVal,
				success: function(msg){
					if(msg['e'] == 1){
						if(typeof JZMobiLogGotoUrl != 'undefined') {
							location.href = JZMobiLogGotoUrl;
						} else {
							location.reload();
						}
					} else {
						$mobiLogTip.html(mobiLogErr).addClass('error');
					}
				},
				error: function(){
					alert('登录失败，请重新再试！');
				}
			});
		}
		return false;
	});

	/*=============== 手机注册 ===============*/
	// 正确提示
	var mobiRegRig = '<span class="right">√正确</span>';
 	// 声明变量
 	var $mobiRegInp = $('#JZLoginMobiRegAcc');
 	var mobiRegAccTip = '请输入您的手机号码';
 	var mobiRegAccErr = '请输入正确的11位手机号码';
 	var mobiRegAccRep = '该手机号码已注册';
 	var mobiRegInpEmp = '请输入手机号';
 	//var mobiRegInpReg = /^((1[35]\d{9})|(18[0236789]\d{8}))$/;
 	// 验证手机号码
 	$mobiRegInp.focus(function(){
 		if($(this).attr('placeholder')) $(this).removeAttr('placeholder');
 		$(this).nextAll('.ui-form-explain').html(mobiRegAccTip).removeClass('error').addClass('gray');
 		$(this).nextAll('.right').remove();
 	});
 	$mobiRegInp.blur(function(){
 		var mobiRegInpVal = $.trim($mobiRegInp.val());
 		$(this).nextAll('.ui-form-explain').html('').removeClass('gray');
 		if(mobiRegInpVal == ''){
 			return false;
 		} else if(mobiRegInpVal.length != 11){
 			$(this).nextAll('.ui-form-explain').html(mobiRegAccErr).addClass('error');
 		} else {
	 		$.ajax({
	 			type: 'GET',
	 			url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=getUserVerify',
	 			dataType: 'jsonp',
	 			data: 'account=' + mobiRegInpVal,
	 			success: function(msg){
	 				if(msg['e'] == 1){
	 					$mobiRegInp.nextAll('.ui-form-explain').html(mobiRegAccRep).addClass('error');
	 				} else {
	 					$mobiRegInp.nextAll('.ui-form-explain').html(mobiRegRig).removeClass('error');
	 				}
	 			}
	 		});
	 	}
 	});
	// 获取验证码
	var $JZLoginMobiRegGetCode = $('#JZLoginMobiRegGetCode');
 	/*$JZLoginMobiRegGetCode.click(function(){
 		var mobiRegInpVal = $.trim($mobiRegInp.val());
 		if(mobiRegInpVal == ''){
 			$mobiRegInp.nextAll('.ui-form-explain').html(mobiRegInpEmp).addClass('error');
 		} else if(!$mobiRegInp.nextAll('.ui-form-explain').hasClass('error')){
 			countdown($JZLoginMobiRegGetCode,'60');
	 		$.ajax({
	 			type: 'GET',
	 			url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=regVerify',
	 			dataType: 'jsonp',
	 			data: 'account=' + mobiRegInpVal,
	 			success: function(msg){
	 				if(msg['e'] == 1){
	 					alert('验证码发送成功，请注意查收！');
	 				} else if(msg['e'] == 2){
	 					alert('验证码发送失败，请重新再试！');
	 				} else if(msg['e'] == 3){
	 					alert('您在一小时内发送验证码超过3次，请稍后再发！');
	 				} else {
		 				alert('请勿非法操作！');
	 				}
	 			}
	 		});
	 	} else {
	 		return false;
	 	}
 	});*/
 	$JZLoginMobiRegGetCode.click(function(){
 		if($mobiRegInp.val() == '' || $mobiRegInp.nextAll('.ui-form-explain').hasClass('error')){
 			alert('请输入正确的手机号码~');
 			return false;
 		} else {
	 		$('#pageCodeForm').data('mobi', $(this).parents('form').find('.mobi-inp').val());
 			$JZLoginCodeBox.show();
	 	}
 	});
 	$('#pageCodeForm').live('submit', function(e){
 		var e = e || window.event;
 		e.preventDefault();
 		var $this = $(this);
 		var mobiNoVal = $.trim($(this).data('mobi'));
 		var codeVal = $.trim($('#pageCodeInp').val());
 		if(codeVal == '') {
 			alert('验证码不能为空~');
 		} else if(codeVal.length != 4) {
 			alert('验证码错误，请重新再试！~');
 		} else {
 			$.ajax({
	 			type: 'GET',
	 			url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=regVerify',
	 			dataType: 'jsonp',
	 			data: 'account=' + mobiNoVal + '&code=' + codeVal,
	 			success: function(msg){
	 				if(msg['e'] == 1){
	 					$this.parents('.ui-dialog').prev('.ui-mask').remove();
	 					$this.parents('.ui-dialog').remove();
	 					alert('验证码发送成功，请注意查收！');
						$JZLoginCodeBox.hide();
	 					countdown($JZLoginMobiRegGetCode,'60');
	 				} else if(msg['e'] == 2){
	 					alert('验证码发送失败，请重新再试！');
	 				} else if(msg['e'] == 3){
	 					alert('您在一小时内发送验证码超过3次，请稍后再发！');
	 				} else if(msg['e'] == 4){
	 					alert('验证码错误，请重新再试！');
	 				} else {
		 				alert(msg['msg']);
	 				}
	 			}
	 		});
	 		return false;
 		}
 	});
 	// 输入验证码
 	var $mobiRegCode = $('#JZLoginMobiRegCode');
 	var mobiRegCodeTip = '请输入您手机收到的验证码';
 	var mobiRegCodeErr = '请输入正确的验证码';
 	var mobiRegCodeEmp = '请输入验证码';
 	// 验证验证码
 	$mobiRegCode.focus(function(){
 		$(this).nextAll('.ui-form-explain').html(mobiRegCodeTip).removeClass('error').addClass('gray');
 		$(this).nextAll('.right').remove();
 	});
 	$mobiRegCode.blur(function(){
 		var verCodeVal = $mobiRegCode.val();
 		$(this).nextAll('.ui-form-explain').html('').removeClass('gray');
 		if(verCodeVal == ''){
 			return false;
 		} else if(verCodeVal.length != 6) {
	 		$mobiRegCode.nextAll('.ui-form-explain').html(mobiRegCodeErr).addClass('error');
	 	} else {
	 		$.ajax({
	 			type: 'GET',
	 			url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=chekverifycode',
	 			dataType: 'jsonp',
	 			data: 'verifycode=' + verCodeVal,
	 			success: function(msg){
	 				if(msg['e'] == 1){
	 					$mobiRegCode.nextAll('.ui-form-explain').html(mobiRegRig).removeClass('error');
	 				} else {
	 					$mobiRegCode.nextAll('.ui-form-explain').html(mobiRegCodeErr).addClass('error');
	 				}
	 			}
	 		});
	 	}
 	});
 	// 密码输入框
 	var $mobiRegPwd = $('#JZLoginMobiRegPwd');
 	var mobiRegPwdTip = '6-20位字符，字母、数字或符号组合';
 	var mobiRegPwdErr = '密码长度只能在6-20位字符之间';
 	var mobiRegPwdEmp = '请输入密码';
 	// 密码确认框
 	var $mobiConPwd = $('#JZLoginMobiConPwd');
 	var mobiConPwdTip = '请再次输入密码';
 	var mobiConPwdErr = '密码长度只能在6-20位字符之间';
 	var mobiConPwdDif = '两次输入密码不一致';
 	var mobiConPwdEmp = '请输入密码';
 	// 验证设置密码
 	$mobiRegPwd.focus(function(){
 		$mobiConPwd.nextAll('.ui-form-explain').html('').removeClass('error');
 		$(this).nextAll('.ui-form-explain').html(mobiRegPwdTip).removeClass('error').addClass('gray');
 		$(this).nextAll('.right').remove();
 		$mobiConPwd.nextAll('.right').remove();
 	});
 	$mobiRegPwd.blur(function(){
 		var setPwdVal = $mobiRegPwd.val();
 		var cnfPwdVal = $mobiConPwd.val();
 		$(this).nextAll('.ui-form-explain').html('').removeClass('gray');
 		if(setPwdVal == ''){
 			return false;
 		} else if(setPwdVal.length < 6 || setPwdVal.length >20){
 			$(this).nextAll('.ui-form-explain').html(mobiRegPwdErr).addClass('error');
 		} else if(cnfPwdVal != '' && cnfPwdVal != setPwdVal){
 			$(this).nextAll('.ui-form-explain').html(mobiRegRig);
 			$mobiConPwd.nextAll('.ui-form-explain').html(mobiConPwdDif).addClass('error');
 			$mobiConPwd.nextAll('.right').remove();
 		} else {
 			$(this).nextAll('.ui-form-explain').html(mobiRegRig);
 			if(cnfPwdVal == setPwdVal) {
	 			$mobiConPwd.nextAll('.ui-form-explain').html(mobiRegRig); 			
 			}
 		}
 	});
 	// 验证确认密码
 	$mobiConPwd.focus(function(){
 		$(this).nextAll('.ui-form-explain').html(mobiConPwdTip).removeClass('error').addClass('gray');
 		$(this).nextAll('.right').remove();
 	});
 	$mobiConPwd.blur(function(){
 		var setPwdVal = $mobiRegPwd.val();
 		var cnfPwdVal = $mobiConPwd.val();
 		$(this).nextAll('.ui-form-explain').html('').removeClass('gray');
 		if(cnfPwdVal == ''){
 			return false;
 		} else if(cnfPwdVal.length < 6 || cnfPwdVal.length >20){
 			$(this).nextAll('.ui-form-explain').html(mobiConPwdErr).addClass('error');
 			return false;
 		} else if(cnfPwdVal != setPwdVal){
 			$(this).nextAll('.ui-form-explain').html(mobiConPwdDif).addClass('error');
 		} else {
 			$(this).nextAll('.ui-form-explain').html(mobiRegRig);
 		}
 	});
 	// 手机注册表单提交
 	var $JZLoginMobiRegForm = $('#JZLoginMobiRegForm');
 	$JZLoginMobiRegForm.submit(function(e){
 		e = e || window.event;
		e.preventDefault();	
 		var mobiNoVal = $.trim($mobiRegInp.val());
 		var verCodeVal = $mobiRegCode.val();
 		var setPwdVal = $mobiRegPwd.val();
 		var cnfPwdVal = $mobiConPwd.val();
 		var $mobiRegSub = $('#JZLoginMobiRegSub');
 		$(this).find('.ui-input').each(function(i){
 			var emp = [mobiRegInpEmp, mobiRegCodeEmp, mobiRegPwdEmp, mobiConPwdEmp]
 			if($(this).val() == ''){
 				$(this).nextAll('.ui-form-explain').html(emp[i]).addClass('error');
 			}
 		});
 		if(!$(this).find('.error').length){
 			$mobiRegSub.attr('disabled', 'disabled');
			$.ajax({
	            type: 'GET',
	            url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=ajaxReg&type=' + subdomain,
	            data: 'account=' + mobiNoVal + '&verifycode=' + verCodeVal + '&password=' + cnfPwdVal,
	            dataType: 'jsonp',
	            success: function(msg){
	           		if(msg['e'] == 1) {
	           			alert('恭喜您，账号注册成功！');
						location.reload();
					} else if(msg['e'] == 2) {
						alert('手机验证码错误，请重新再试！');
					} else if(msg['e'] == 3) {
						alert('该手机号码已注册，请换一个再试！');
					} else {
						alert('很抱歉，注册失败，请重新再试！');
					}
	            },
	            complete: function(XMLHttpRequest, textStatus){
					$mobiRegSub.removeAttr('disabled');
				},
				error: function(){
					alert('很抱歉，注册失败，请稍后再试！');
				}
	        });
	        return false;
		}
	});

	/*=============== 手机验证 ===============*/
	// 正确提示
	var mobiVerRig = '<span class="right">√正确</span>';
	// 声明变量
    var $mobiVerAcc = $('#JZLoginMobiVerAcc');
    var $mobiVerCodeGet = $('#JZLoginMobiVerGetCode');
    var $mobiVerCodeInp = $('#JZLoginMobiVerCode');
 	var mobiVerAccTip = '请输入您的11位手机号码';
 	var mobiVerAccErr = '请输入正确的11位手机号码';
 	var mobiVerAccRep = '该手机号码已绑定，请换一个再试';
 	var mobiVerAccEmp = '请输入手机号码';
 	//var mobiVerAccReg = /^((1[35]\d{9})|(18[0236789]\d{8}))$/;

 	// 验证手机号码
 	//$mobiVerCodeGet.attr('disabled', true);
 	//$mobiVerCodeGet.attr('value', '请输入手机').css('color', '#999');
 	$mobiVerAcc.focus(function(){
 		$(this).nextAll('.ui-form-explain').html(mobiVerAccTip).removeClass('error right');
 	});
 	$mobiVerAcc.bind('keyup', function(){
 		$(this).removeClass('right');
 	});
 	$mobiVerAcc.bind('blur keyup', function(){
 		var $tips = $(this).nextAll('.ui-form-explain');
 		var mobiVerInpVal = $.trim($mobiVerAcc.val());
 		/*if(!$mobiVerCodeInp.hasClass('right')){
	 		$mobiVerCodeGet.attr('disabled', true);
	 		$mobiVerCodeGet.attr('value', '请输入手机').css('color', '#999'); 		
 		}*/
 		if(mobiVerInpVal == ''){
 			return false;
 		} else if(mobiVerInpVal.length < 11 && mobiVerInpVal.length > 0){
 			$tips.html(mobiVerAccTip).addClass('gray');
 		} else if(mobiVerInpVal.length != 11){
 			$tips.html(mobiVerAccErr).addClass('error');
 		} else {
	 		/*$.ajax({
	 			type: 'GET',
	 			url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=getUserVerify',
	 			dataType: 'jsonp',
	 			data: 'account=' + mobiVerInpVal,
	 			success: function(msg){
	 				if(msg['e'] == 0){
	 					$mobiVerCodeGet.attr('disabled', false);
	 					$mobiVerCodeGet.attr('value', '获取验证码').css('color', '#444');
	 				 	$tips.html(mobiVerRig).removeClass('gray error').addClass('right');
	 				} else if(msg['e'] == 1) {
	 				 	$tips.html(mobiVerAccRep).addClass('error');
	 				} else return;
	 			}
	 		});*/
	 		//$mobiVerCodeGet.attr('disabled', false);
			//$mobiVerCodeGet.attr('value', '获取验证码').css('color', '#444');
		 	$tips.html(mobiVerRig).removeClass('gray error').addClass('right');
	 	}
 	});
 	$mobiVerAcc.bind('blur', function(){
 		var $tips = $(this).nextAll('.ui-form-explain');
 		var mobiVerInpVal = $.trim($mobiVerAcc.val());
 		if(mobiVerInpVal.length > 0 && mobiVerInpVal.length < 11){
 			$tips.html(mobiVerAccErr).addClass('error');
 		}
 	});
	// 绑定手机表单验证码
	$mobiVerCodeGet.click(function(){
		var mobiVerInpVal = $.trim($mobiVerAcc.val());
		/*$.ajax({
			type: 'GET',
			url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=regVerify',
			dataType: 'jsonp',
			data: 'account=' + mobiVerInpVal,
			success: function(msg){
	           	if(msg['e'] == 1){
	           			countdown($mobiVerCodeGet, '60');
	 					alert('验证码发送成功！');
	 				} else if(msg['e'] == 2){
	 					alert('短信发送失败，请重新再试！');
	 				} else if(msg['e'] == 3){
	 					alert('您在一小时内发送验证码超过3次，请稍后再发！');
	 				} else {
	 					alert(msg['msg']);
	 				}
				}
		});
		return false;*/
		if(mobiVerInpVal == '' || $mobiVerAcc.nextAll('.ui-form-explain').hasClass('error')){
 			alert('请输入正确的手机号码~');
 			return false;
 		} else {
 			$('#pageCodeForm').data('mobi', $(this).parents('form').find('.mobi-inp').val());
 			$JZLoginCodeBox.show();
	 	}
	});
	// 绑定手机表单提交
	$('#JZLoginMobiVerForm').submit(function(){
		var mobiVerInpVal = $.trim($mobiVerAcc.val());
		var verCodeVal = $mobiVerCodeInp.val();
		$.ajax({
			type: 'GET',
			url: 'http://u.n8n8.cn/User/index.php?m=Mobi&a=ajaxSaveMobi',
			dataType: 'jsonp',
			data: 'account=' + mobiVerInpVal + '&verifycode=' + verCodeVal,
			success: function(msg){
				if(msg['e'] == 1) {
					alert('恭喜您，手机验证成功！');
					location.reload();
				} else if(msg['e'] == 0) {
					alert(msg['msg']);
				} else if(msg['e'] == 5) {
					JZLoginPopup.open({
						container : {
							header : '手机验证成功',
							content : '<div style="text-indent:2em;"><p>恭喜您，手机验证成功！</p><p>同时，<span style="color:#C00;">手机号码</span>是您的登录账号，</p><p><span style="color:#C00;">手机验证码</span>作为您的初始默认密码。</p><p style="margin-top:10px;">立即<a style="color:#C00;" href="http://u.n8n8.cn/getPassword" target="_blank">修改密码>></a></p></div>',
							noFn : true,
							noText : '确定'
						},
						overlay : true
					});
				} else return;
			}
		});
		return false;
	});

	/*=============== QQ验证 ===============*/
	var $qqVerAcc = $('#JZLoginQQVerAcc');
	var qqVerReg = /^[1-9]\d{4,10}$/;
	// QQ验证表单提交
	$('#JZLoginQQVerForm').submit(function(e){
		e.preventDefault();
		var qqVerInpVal = $.trim($qqVerAcc.val());
		
		if(!qqVerReg.test(qqVerInpVal)) {
			alert('请正确输入您的QQ号~');
		} else {
			$.ajax({
				type: 'GET',
				url: 'http://u.n8n8.cn/User/?m=Api&a=chekqq',
				dataType: 'jsonp',
				data: 'qq=' + qqVerInpVal,
				success: function(r){	
					var code = r['code'];
					var msg = r['msg'];

					if(code == 1) {
						JZLoginPopup.close();
						alert('QQ验证邮件已发送到您的QQ邮箱，请尽快去点击邮件链接进行激活！');
					} else {
						alert(msg);
					}
				}
			});
		}
	});

	// 关闭绑定手机框
	$('.JZLogin-close-btn').live('click', function(){
		JZLoginPopup.close();
	});

	// 手机登录弹出框
	$('.JZLogin-mobiLog-btn').live('click', function(){
		JZLoginPopup.open({
			container : 'JZLoginMobiLogBox',
			overlay : true
		});
		$('#JZLoginMobiLog-username').focus();
		return false;
	});

	// 手机注册弹出框
	$('.JZLogin-mobiReg-btn').live('click', function(){
		JZLoginPopup.open({
			container : 'JZLoginMobiRegBox',
			overlay : true
		});
		return false;
	});

	// 手机绑定弹出框
	$('.JZLogin-mobiVer-btn').live('click', function(){
		JZLoginPopup.open({
			container : 'JZLoginMobiVerBox',
			overlay : true
		});
		return false;
	});

	JZLoginShow = function(){};
	// 绑定登录
	JZLoginShow.mobiLog = function() {
		if(jzLoginNoMobi == 2) {
			JZLoginPopup.open({
				container : 'JZLoginMobiLogBox',
				overlay : true
			});
	    	$('#JZLoginMobiLog-username').focus();
			return false;
		}
	}

	// 绑定登录和验证手机
	JZLoginShow.mobiLogVer = function() {
		if(jzLoginNoMobi == 2) {
			JZLoginPopup.open({
				container : 'JZLoginMobiLogBox',
				overlay : true
			});
			return false;
		} else if(jzLoginNoMobi == 0){
			JZLoginPopup.open({
				container : 'JZLoginMobiVerBox',
				overlay : true
			});
			return false;
		}  else return;
	}
	$('.JZLogin-mobiLogVer-btn').live('click', function(e){
		e = e || window.event;
		e.preventDefault();

		JZLoginShow.mobiLogVer();
		$('#JZLoginPopupBox input:first').focus();
	});

	// 绑定登录、验证手机和QQ
	JZLoginShow.allLogVer = function(login, mobile, qq) {
		if(login && jzLoginNoMobi == 2) {
			JZLoginPopup.open({
				container : 'JZLoginMobiLogBox',
				overlay : true
			});
			return false;
		} else if(mobile && jzLoginNoMobi == 0){
			JZLoginPopup.open({
				container : 'JZLoginMobiVerBox',
				overlay : true
			});
			return false;
		} else if(qq){
			JZLoginPopup.open({
				container : 'JZLoginQQVerBox',
				overlay : true
			});
			return false;
		}  else return;
	}
	// 弹出手机验证
	$('.JZLogin-mobiVerPop-btn').live('click', function(e){
		e.preventDefault();
		JZLoginShow.allLogVer(0, 1, 0);
		$('#JZLoginPopupBox input:first').focus();
	});
	// 弹出QQ验证
	$('.JZLogin-qqVerPop-btn').live('click', function(e){
		e.preventDefault();
		JZLoginShow.allLogVer(0, 0, 1);
		$('#JZLoginPopupBox input:first').focus();
	});

});