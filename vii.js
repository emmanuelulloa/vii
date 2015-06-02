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
	//check if a property is a configuration property or css property
	function isCSS(prop){	
		return (('useTransition name duration loop ease delay transform fillMode useAll percent').indexOf(prop) === -1);
	}
	//a data map to shorcut words so tweens can be created Emmet style
	var propMap = {
		'd':'duration',
		'e':'ease',
		'dy':'delay',
		'n': 'name',
		'w':'width',
		'h':'height',
		't':'top',
		'l':'left',
		'r':'right',
		'b':'bottom',
		'm':'margin',
		'p':'padding',
		'fz':'font-size',
		'bg':'background',
		'bgc':'background-color',
		'bgp':'background-position',
		'c':'color',
		'op':'opacity',
		'bd':'border',
		'x' : 'translateX',
		'y' : 'translateY',
		'rot': 'rotate',
		'sk': 'skew',
		'sc': 'scale',
		'per' : 'percent'
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
		'per' : function(v){return v + '%'},
		'none' : function(v){return v}
	};
	formatMap['h'] = formatMap['t'] = formatMap['l'] = formatMap['r'] = formatMap['b'] = formatMap['fz'] = formatMap['w'];
	formatMap['bg'] = formatMap['bgc'] = formatMap['c'];
	formatMap.d = formatMap.e = formatMap.m = formatMap.p = formatMap.op = formatMap.bd = formatMap.dy = formatMap.n = formatMap['none'];
	//receives an object or spring and parse and reads its data
	function parse(val){
		var fr = [];
		if(typeof val === 'string'){
			//is string
			if(val.indexOf('|') !== -1){
				fr = val.split('|');
			}else{
				fr = [val];
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
				var raw = fr[i].split(' ');
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
			if('translateX' in o || 'translateY' in o || 'rotate' in o || 'skew' in o || 'scale' in o){
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
			l = prop.loop || '1',
			e = prop.ease || easing || 'ease',
			delay = prop.delay || '0',
			useAll = prop.useAll || false,
			fm = prop.fillMode || 'both',
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
		//KEYFRAMES
		if(!useTransition){
			//keyframes
			for(var px=0; px < prefix.length; px++){
				var fQty = frames.length;
				if(fQty == 1){
					t += '@' + prefix[px] + _k + n + _s + _o + _n;
					t += _t + p + _s + _o + _n;
					for(var k in prop){
						if(isCSS(k)){
							t += _t + _t + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + _c + _s + prop[k] + _e + _n;
						}else if(k === 'transform'){
							t += _t + _t + prefix[px] + 'transform: ' + prop[k] + _e + _n;
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
								t += _t + _t + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + _c + _s + prop[k] + _e + _n;
							}else if(k === 'transform'){
								t += _t + _t + prefix[px] + 'transform: ' + frames[i][k] + _e + _n;
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
