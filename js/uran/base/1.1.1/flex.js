define("uran/base/1.1.1/flex",["$","lib/detector/1.2.1/detector"],function(a){var b=a("$"),c=a("lib/detector/1.2.1/detector");if(!navigator.standalone){var d=c.device,e=c.browser;if(b.support,!d.wp){var f=window,g=document,h=g.body.style,i="onorientationchange"in f?"orientationchange":"resize",j=function(){return e.safari&&d.iphone?function(){h.minHeight=g.documentElement.clientHeight+60+"px",f.scrollTo(0,0)}:function(){f.scrollTo(0,0)}}();b.support.touch&&b(f).on("touchmove",function(a){a.preventDefault()}),b(f).on(i,j),b(j)}}});
