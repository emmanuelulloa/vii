vii = (function(){
	/*
	vii.js a Javascript function to create CSS3 animations
	by Emmanuel Ulloa.
	License MIT.
	*/
	//easings
	var ceaser = {
	    // defaults
	    'linear'            : 'linear',
	    'ease'              : 'ease',
	    'easeIn'            : 'ease-in',
	    'easeOut'           : 'ease-out',
	    'easeInOut'         : 'ease-in-out',
	    // Penner equations
	    'easeInCubic'       : 'cubic-bezier(.55,.055,.675,.19)',
	    'easeOutCubic'      : 'cubic-bezier(.215,.61,.355,1)',
	    'easeInOutCubic'    : 'cubic-bezier(.645,.045,.355,1)',
	    'easeInCirc'        : 'cubic-bezier(.6,.04,.98,.335)',
	    'easeOutCirc'       : 'cubic-bezier(.075,.82,.165,1)',
	    'easeInOutCirc'     : 'cubic-bezier(.785,.135,.15,.86)',
	    'easeInExpo'        : 'cubic-bezier(.95,.05,.795,.035)',
	    'easeOutExpo'       : 'cubic-bezier(.19,1,.22,1)',
	    'easeInOutExpo'     : 'cubic-bezier(1,0,0,1)',
	    'easeInQuad'        : 'cubic-bezier(.55,.085,.68,.53)',
	    'easeOutQuad'       : 'cubic-bezier(.25,.46,.45,.94)',
	    'easeInOutQuad'     : 'cubic-bezier(.455,.03,.515,.955)',
	    'easeInQuart'       : 'cubic-bezier(.895,.03,.685,.22)',
	    'easeOutQuart'      : 'cubic-bezier(.165,.84,.44,1)',
	    'easeInOutQuart'    : 'cubic-bezier(.77,0,.175,1)',
	    'easeInQuint'       : 'cubic-bezier(.755,.05,.855,.06)',
	    'easeOutQuint'      : 'cubic-bezier(.23,1,.32,1)',
	    'easeInOutQuint'    : 'cubic-bezier(.86,0,.07,1)',
	    'easeInSine'        : 'cubic-bezier(.47,0,.745,.715)',
	    'easeOutSine'       : 'cubic-bezier(.39,.575,.565,1)',
	    'easeInOutSine'     : 'cubic-bezier(.445,.05,.55,.95)',
	    'easeInBack'        : 'cubic-bezier(.6,-.28,.735,.045)',
	    'easeOutBack'       : 'cubic-bezier(.175, .885,.32,1.275)',
	    'easeInOutBack'     : 'cubic-bezier(.68,-.55,.265,1.55)'
	};
	//ease name shortcuts & special easings
	ceaser.sine    = ceaser.easeOutSine;
	ceaser.circ    = ceaser.easeOutCirc;
	ceaser.expo    = ceaser.easeOutExpo;
	ceaser.snap    = ceaser.easeInQuint;
	ceaser.swing   = ceaser.easeOutBack;
	ceaser.slowmo  = 'cubic-bezier(0,1,1,0)';
	//pre-made animations
	var preMade = {
		//http://www.justinaguilar.com/animations/#
		'slideDown'     : 'n:slideDown d:1 e:ease per:0 y:-100%|per:50 y:8%|per:65 y:-4%|per:80 y:4%|per:95 y:-2%|per:100 y:0',
		'slideUp'       : 'n:slideUp d:1 e:ease per:0 y:100%|per:50 y:-8%|per:65 y:4%|per:80 y:-4%|per:95 y:2%|per:100 y:0%',
		'slideLeft'     : 'n:slideLeft d:1 e:easeInOut per:0 x:150%|per:50 x:-8%|per:65 x:4%|per:80 x:-4%|per:95 x:2%|per:100 x:0%',
		'slideRight'    : 'n:slideRight d:1 e:easeInOut per:0 x:-150%|per:50 x:8%|per:65 x:-4%|per:80 x:4%|per:95 x:-2%|per:100 x:0%',
		'slideExpandUp' : 'n:slideExpandUp d:1.6 e:easeOut per:0 y:100% scx:0.5|per:30 y:-8% scx:0.5|per:40 y:2% scx:0.5|per:50 y:0% scx:1.1|per:60 y:0% scx:0.0|per:70 y:0% scx:1.05|per:80 y:0% scx:0.95%|per:90 y:0% scx:1.02|per:100 y:0% scx:1',
		'expandUp'      : 'n:expandUp d:0.7 e:ease per:0 y:100% sc:0.6 scy:0.5|per:60 y:-7% scy:1.12|per:75 y:3%|per:100 y:0% sc:1 scy:1',
		'fadeIn'		: 'n:fadeIn d:1.5 e:easeInOut per:0 sc:0 op:0|per:60 sc:1.1|per:80 sc:0.9 op:1|per:100 sc:1 op:1',
		'expandOpen'	: 'n:expandOpen d:1.2 e:easeOut per:0 sc:1.8|per:50 sc:0.95|per:80 sc:1.05|per:90 sc:0.98|per:100 sc:1',
		'bigEntrance'	: 'n:bigEntrance d:1.6 e:easeOut per:0 sc:0.3 rot:6 x:-30% y:30% op:0.2|per:30 sc:1.03 rot:-2 x:2% y:-2% op:1|per:45 sc:0.98 rot:1 x:0% y:0% op:1|per:60 sc:1.01 rot:-1 x:0% y:0% op:1|per:75 sc:0.99 rot:1 x:0% y:0% op:1|per:90 sc:1.01 rot:0 x:0% y:0% op:1|per:100 sc:1 rot:0 x:0% y:0% op:1',
		'hatch'			: 'n:hatch d:2 e:easeInOut to:50%100% per:0 rot:0 scy:0.6|per:20 rot:-2 scy:1.05|per:35 rot:2 scy:1|per:50 rot:-2|per:65 rot:1|per:80 rot:-1|rot:100 rot:0',
		'pulse' 		: 'n:pulse d:1.5 loop:-1 per:0 sc:0.9 op:0.7|per:50 sc:1 op:1|per:100 sc:0.9 op:0.7',
		'floating'		: 'n:floating d:1.5 loop:-1 per:0 y:0%|per:50 y:8%|per:100 y:0%',
		'tossing'		: 'n:tossing d:2.5 loop:-1 per:0 rot:-4|per:50 rot:4|per:100 rot:-4',
		'pullUp'		: 'n:pullUp d:1.1 e:easeOut to:50%,100% per:0 scy:0.1|per:40 scy:1.02|per:60 scy:0.98|per:80 scy:1.01|per:100 scy:1',
		'pullDown'		: 'n:pullDown d:1.1 e:easeOut to:50%,0% per:0 scy:0.1|per:40 scy:1.02|per:60 scy:0.98|per:80 scy:1.01|per:100 scy:1',
		'stretchLeft'	: 'n:stretchLeft d:1.5 e:easeOut to:100%,0% per:0 scx:0.3|per:40 scx:1.02|per:60 scx:0.98|per:80 scx:1.01|per:100 scx:1',
		'stretchRight'	: 'n:stretchRight d:1.5 e:easeOut to:0%,0% per:0 scx:0.3|per:40 scx:1.02|per:60 scx:0.98|per:80 scx:1.01|per:100 scx:1',
		//https://daneden.github.io/animate.css/
		'bounce'		: 'n:bounce d:0.75 per:0%,20%,53%,80%,100% x:0 y:0 to:center,bottom e:easeOutCubic|per:40%,43% y:-30 e:easeInQuint|per:70% y:-15 e:easeInQuint|per:90% y:-4',
		'flash'			: 'n:flash d:1 per:0%,50%100% op:1|per:25%,75% op:0',
		'rubberBand'	: 'n:rubberBand d:1 per:0 scx:1 scy:1|per:30 scx:1.25 scy:0.75|per:40 scx:0.75 scy:1.25|per:50 scx:1.15 scy:0.85|per:65 scx:0.95 scy:1.05|per:75 scx:1.05 scy:0.95|per:100 scx:1 scy:1',
		'shake'			: 'n:shake d:1 per:0%,100% x:0|per:10%,30%,50%,70%,90% x:-10|per:20%,40%,60%,80% x:10',
		'swing'			: 'n:swing d:1 to:top,center per:20 rot:15|per:40 rot:-10|per:60 rot:5|per:80 rot:-5|per:100 rot:0',
		'tada'			: 'n:tada d:1 per:0% scx:1 scy:1|per:10%,20% scx:0.9 scy:0.9 rot:-3|per:30%,50%,70%,90% scx:1.1 scy:1.1 rot:3|per:40%,60%,80% scx:1.1 scy:1.1 rot:-3|per:100% scx:1 scy:1',
		'wobble'		: 'n:wobble d:1 per:0 transform:none|per:15 x:-25% rot:-5|per:30 x:20% rot:3|per:45 x:-15% rot:-3|per:60% x:10% rot:2|per:75 x:-5% rot:-1|per:100 transform:none'

	}
	//check if a property is a configuration property or css property
	function isCSS(prop){	
		return (('useTransition name duration loop ease delay fillMode useAll percent transform transform-origin transformOrigin animation-timing-function animationTimingFunction').indexOf(prop) === -1);
	}
	//a data map to shorcut words so tweens can be created Emmet style
	var propMap = {
		'd'		:'duration',
		'e'		:'animationTimingFunction',
		'dy'	:'delay',
		'n'		:'name',
		'w'		:'width',
		'h'		:'height',
		't'		:'top',
		'l'		:'left',
		'r'		:'right',
		'b'		:'bottom',
		'm'		:'margin',
		'p'		:'padding',
		'fz'	:'font-size',
		'bg'	:'background',
		'bgc'	:'background-color',
		'bgp'	:'background-position',
		'c'		:'color',
		'op'	:'opacity',
		'bd'	:'border',
		'x' 	:'translateX',
		'y' 	:'translateY',
		'rot'	:'rotate',
		'sk'	:'skew',
		'sc'	:'scale',
		'scx'	:'scaleX',
		'scy' 	:'scaleY',
		'to' 	:'transformOrigin',
		'per' 	:'percent'
	};
	//a data map to format properties
	var formatMap = {
		'w' : function(v){
			if(v.indexOf('px') == -1){
				return v + 'px';
			}
			return v;
		},
		'c' : function(v){
			if(v.indexOf('#') == -1){
				return '#' + v;
			}
			return v;
		},
		'x' : function(v){
			if(v.indexOf('%') != -1){
				return v;
			}
			return v +'px';
		},
		'y' : function(v){
			if(v.indexOf('%') != -1){
				return v;
			}
			return v +'px';
		},
		'rot' : function(v){
			return 'rotate(' + v +'deg) ';
		},
		'sk' : function(v){
			return 'skew(' + v +'deg) ';
		},
		'sc' : function(v){
			return 'scale(' + v +') ';
		},
		'scx' : function(v){
			return 'scaleX(' + v +') ';
		},
		'scy' : function(v){
			return 'scaleY(' + v +') ';
		},
		'per' : function(v){
			if(v.indexOf('%') != -1){
				return v;
			}
			return v + '%';
		},
		'to' : function(v){
			if(v.indexOf(',') != -1){
				return v.split(',')[0] + ' ' + v.split(',')[1];
			}
			return v;
		},
		'none' : function(v){return v}
	};
	formatMap['h'] = formatMap['t'] = formatMap['l'] = formatMap['r'] = formatMap['b'] = formatMap['fz'] = formatMap['w'];
	formatMap['bg'] = formatMap['bgc'] = formatMap['c'];
	formatMap.d = formatMap.e = formatMap.m = formatMap.p = formatMap.op = formatMap.bd = formatMap.dy = formatMap.n = formatMap['none'];
	function cleanWhiteSpace(s){
		return s.replace(/\s\s+/g, ' ');
	}
	function trim(s){
		return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	//receives an object or spring and parse and reads its data
	function parse(val){
		var fr = [];
		if(typeof val === 'string'){
			if(preMade[val]){
				return parse(preMade[val]);
			}
			//is string
			if(val.indexOf('|') !== -1){
				fr = cleanWhiteSpace(val).split('|');
			}else{
				fr = [cleanWhiteSpace(val)];
			}
		}else if(Object.prototype.toString.call(val) === '[object Object]'){
			//is object
			fr = [val];
		}else if(Object.prototype.toString.call(val) === '[object Array]'){
			//is array
			fr = val;
		}
		var frames = [];
		for(var i=0;i<fr.length;i++){
			var obj;
			//check if string
			if(typeof fr[i] === 'string'){
				obj = {};
				var raw = trim(fr[i]).split(' ');
				for(var j = 0; j < raw.length; j++){
					var nameValue = raw[j].split(':');
					obj[nameValue[0]] = (nameValue[0] in formatMap)?formatMap[nameValue[0]](nameValue[1]):nameValue[1];
				}
			}else{
				obj = fr[i];
			}
			//create new object
			var o = {};
			for(var k in obj){
				if(k in propMap){
					o[propMap[k]] = obj[k];
				}else{
					o[k] = obj[k];
				}
			}
			//clean transforms
			if('translateX' in o || 'translateY' in o || 'rotate' in o || 'skew' in o || 'scale' in o || 'scaleX' in o || 'scaleY' in o){
				o['transform'] = '';
				if('translateX' in o && 'translateY' in o){
					o['transform'] += 'translate('+ o['translateX'] + ', ' + o['translateY'] + ') ' ;
					delete o['translateX'];
					delete o['translateY'];
				}else{
					if('translateX' in o){
						o['transform'] += 'translateX(' + o['translateX'] + ') ' ;
						delete o['translateX'];
					}
					if('translateY' in o){
						o['transform'] += 'translateY(' + o['translateY'] + ') ';
						delete o['translateY'];
					}				
				}
				if('scaleX' in o){
					o['transform'] += o['scaleX'];
					delete o['scaleX'];
				}
				if('scaleY' in o){
					o['transform'] += o['scaleY'];
					delete o['scaleY'];
				}
				if('scale' in o){
					o['transform'] += o['scale'];
					delete o['scale'];
				}
				if('rotate' in o){
					o['transform'] += o['rotate'];
					delete o['rotate'];
				}
				if('skew' in o){
					o['transform'] += o['skew'];
					delete o['skew'];
				}
			}
			//check if percentage is present
			if(!o.percent){
				o.percent = Math.round(i/(fr.length-1) * 100) + '%';
			}
			frames.push(o);
		}
		return frames;
	}
	//receives an object the duration and the easing name
	function getCSS(properties, duration, easing){
		var frames = parse(properties),
			prop = frames[0],
			useTransition = (prop.useTransition !== null)?prop.useTransition:false,
			n = prop.name || 'myTween',
			d = prop.duration || duration || '0.5',
			l = prop.animationIterationCount || prop.loop || '1',
			e = prop.animationTimingFunction || prop.ease || easing || 'ease',
			delay = prop.delay || '0',
			useAll = prop.useAll || false,
			fm = prop.fillMode || (parseInt(delay) !== 0)?'both':'forwards',
			p = prop.percent || 'to',
			hacks = '',
			t = '',
			s = '',
			_c = ':',
			_e = ';',
			_d = '.',
			_s = ' ',
			_n = '\n',
			_t = '\t',
			_o = '{',
			_x = '}'
			_k = 'keyframes ',
			_w = '-webkit-',
			prefix = ['',_w];
		d += 's';
		delay += 's';
		hacks += _t + '/*enable hardware acceleration*/' + _n;
		hacks += _t + 'transform:translateZ(0)' + _e + _n;
		hacks += _t + _w + 'transform:translateZ(0)' + _e + _n + _n;
		hacks += _t + '/*improve anti-alias*/'  + _n;
		hacks += _t + 'box-shadow: 0 0 1px rgba(0, 0, 0, 0)' + _e + _n + _n;
		hacks += _t + '/*font smoothing*/'  + _n;
		hacks += _t + 'backface-visibility: hidden' + _e + _n;
		hacks += _t + _w + 'backface-visibility: hidden' + _e + _n;
		hacks += _t + '-moz-osx-font-smoothing: grayscale' + _e + _n + _n;
		if(l == '-1'){
			l = 'infinite';
		}
		//KEYFRAMES
		if(!useTransition){
			//keyframes
			var fQty = frames.length;
			for(var px=0; px < prefix.length; px++){
				if(fQty == 1){
					t += '@' + prefix[px] + _k + n + _s + _o + _n;
					t += _t + p + _s + _o + _n;
					for(var k in prop){
						if(isCSS(k)){
							t += _t + _t + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + _c + _s + prop[k] + _e + _n;
						}else if(k === 'transform'){
							t += _t + _t + prefix[px] + 'transform: ' + prop[k] + _e + _n;
						}else if(k === 'transformOrigin'){
							t += _t + _t + prefix[px] + 'transform-origin: ' + prop[k] + _e + _n;
						}else if(k === 'animationTimingFunction'){
							t += _t + _t + prefix[px] + 'animation-timing-function: ' + (ceaser[prop[k]]?ceaser[prop[k]]:prop[k]) + _e + _n;
						}
					}
					t += _t + _x + _n;
					t += _x + _n;					
				}else{
					t += '@' + prefix[px] + _k + n + _s + _o + _n;
					for(var i=0; i < fQty; i++){
						p = (fQty == 2)?(i == 0)?'from':'to':frames[i].percent;
						t += _t + p + _s + _o + _n;
						for(var k in frames[i]){
							if(isCSS(k)){
								t += _t + _t + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + _c + _s + frames[i][k] + _e + _n;
							}else if(k === 'transform'){
								t += _t + _t + prefix[px] + 'transform: ' + frames[i][k] + _e + _n;
							}else if(k === 'transformOrigin'){
								t += _t + _t + prefix[px] + 'transform-origin: ' + frames[i][k] + _e + _n;
							}else if(k === 'animationTimingFunction'){
								t += _t + _t + prefix[px] + 'animation-timing-function: ' + (ceaser[frames[i][k]]?ceaser[frames[i][k]]:frames[i][k]) + _e + _n;
							}
						}
						t += _t + _x + _n;	
					}
					t += _x + _n;
				}
			}
			s += t;
			//class
			s += _d + n + _o + _n;
			s += hacks;
			t = '';
			t += 'animation: ' + n + _s + d + _s + ceaser[e] + _s + delay + _s + l + _s + fm + _e + _n;
			s += _t + t;
			s += _t + _w + t;
			s += _x + _n;		
		}else{
			//TRANSITION
			s += _d + n + _s + _o + _n;
			s += hacks;
			t += 'transition:'
			if(!useAll){
				for(var k in prop){
					if(isCSS(k)){
						t += _s + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + d + _s + ceaser[e] + _s + delay + ',';
					}else if(k === 'transform'){
						t += _t + _t + 'transform: ' + prop[k] + _s + d + _s + ceaser[e] + _s + delay + ',';
						t += _t + _t + '-webkit-transform: ' + prop[k] + _s + d + _s + ceaser[e] + _s + delay + ',';
					}
				}	
			}else {
				t += ' all ' + d + _s + ceaser[e] + _s + delay + ',';
			}
			t = t.replace(/,\s*$/, _e);
			t += _n;
			s += _t + t;
			s += _t + _w + t;
			s += _x + _n;
			//hover
			s += _d + n + ':hover' + _s + _o + _n;
			t = '';
			for(var k in prop){
				if(isCSS(k)){
					t += _t + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + _c + _s + prop[k] + _e + _n;
				}else if(k === 'transform'){
					t += _t + _t + 'transform: ' + prop[k] + _e + _n;
					t += _t + _t + '-webkit-transform: ' + prop[k] + _e + _n;
				}
			}
			s += t;
			s += _x + _n;
		}
		return s;
	}
	//get transition instead of keyframes
	function getTransition(properties, duration, easing){
		var ob = parse(properties);
		ob.useTransition = true;
		ob.useAll = true;
		return getCSS(ob, duration, easing);
	}
	//apply the animation to an element (can be string or element object)
	function applyCSS(element, properties, duration, easing, useTransition){
		var code = (!useTransition)?getCSS(properties, duration, easing):getTransition(properties, duration, easing);
		if(styleTag === null || styleTag === undefined){
			styleTag = document.createElement('style');
			styleTag.type = 'text/css';	
			document.getElementsByTagName('head')[0].appendChild(styleTag);
		}
		styleTag.innerHTML = code;
		var el = (typeof element === 'string') ? document.querySelectorAll(element)[0]:element
		var cn = (properties.name || 'myTween');
		if(el.className.indexOf(cn) === -1){
			el.className += ' ' + cn;
		}
		return code;
	}
	//same as previous one but for transitions
	function applyTransition(element, properties, duration, easing){
		return applyCSS(element, properties, duration, easing, true);
	}
	//vii API
	return {
		k : getCSS,
		t : getTransition,
		getKeyframes : getCSS,
		applyKeyframes : applyCSS,
		getTransition : getTransition,
		applyTransition : applyTransition
	}
})();
