define("lib/events/1.1.0/events",[],function(){function a(){}function b(a,b,c,d){var e;if(a)for(var f=0,g=a.length;g>f;f+=2)e=a[f].apply(a[f+1]||c,b),e===!1&&d.status&&(d.status=!1)}var c=/\s+/;a.prototype.on=function(a,b,d){var e,f,g;if(!b)return this;for(e=this.__events||(this.__events={}),a=a.split(c);f=a.shift();)g=e[f]||(e[f]=[]),g.push(b,d);return this},a.prototype.off=function(a,b,e){var f,g,h,i;if(!(f=this.__events))return this;if(!(a||b||e))return delete this.__events,this;for(a=a?a.split(c):d(f);g=a.shift();)if(h=f[g])if(b||e)for(i=h.length-2;i>=0;i-=2)b&&h[i]!==b||e&&h[i+1]!==e||h.splice(i,2);else delete f[g];return this},a.prototype.trigger=function(a){var d,e,f,g,h,i,j=[],k={status:!0};if(!(d=this.__events))return this;for(a=a.split(c),h=1,i=arguments.length;i>h;h++)j[h-1]=arguments[h];for(;e=a.shift();)(f=d.all)&&(f=f.slice()),(g=d[e])&&(g=g.slice()),b(g,j,this,k),b(f,[e].concat(j),this,k);return k.status},a.mixTo=function(b){b=b.prototype||b;var c=a.prototype;for(var d in c)c.hasOwnProperty(d)&&(b[d]=c[d])};var d=Object.keys;return d||(d=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b}),a});
