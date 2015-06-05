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
		'fadeIn'			: 'n:fadeIn d:0.5 e:ease op:1',
		'fadeOut'			: 'n:fadeOut d:0.5 e:ease op:0',
		//http://www.justinaguilar.com/animations/#
		'slideDown'     : 'n:slideDown d:1 e:ease per:0 y:-100%|per:50 y:8%|per:65 y:-4%|per:80 y:4%|per:95 y:-2%|per:100 y:0',
		'slideUp'       : 'n:slideUp d:1 e:ease per:0 y:100%|per:50 y:-8%|per:65 y:4%|per:80 y:-4%|per:95 y:2%|per:100 y:0%',
		'slideLeft'     : 'n:slideLeft d:1 e:easeInOut per:0 x:150%|per:50 x:-8%|per:65 x:4%|per:80 x:-4%|per:95 x:2%|per:100 x:0%',
		'slideRight'    : 'n:slideRight d:1 e:easeInOut per:0 x:-150%|per:50 x:8%|per:65 x:-4%|per:80 x:4%|per:95 x:-2%|per:100 x:0%',
		'slideExpandUp' : 'n:slideExpandUp d:1.6 e:easeOut per:0 y:100% scx:0.5|per:30 y:-8% scx:0.5|per:40 y:2% scx:0.5|per:50 y:0% scx:1.1|per:60 y:0% scx:0.0|per:70 y:0% scx:1.05|per:80 y:0% scx:0.95%|per:90 y:0% scx:1.02|per:100 y:0% scx:1',
		'expandUp'      : 'n:expandUp d:0.7 e:ease per:0 y:100% sc:0.6 scy:0.5|per:60 y:-7% scy:1.12|per:75 y:3%|per:100 y:0% sc:1 scy:1',
		'fadeIn2'		: 'n:fadeIn2 d:1.5 e:easeInOut per:0 sc:0 op:0|per:60 sc:1.1|per:80 sc:0.9 op:1|per:100 sc:1 op:1',
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
		'wobble'		: 'n:wobble d:1 per:0 transform:none|per:15 x:-25% rot:-5|per:30 x:20% rot:3|per:45 x:-15% rot:-3|per:60% x:10% rot:2|per:75 x:-5% rot:-1|per:100 transform:none',
		'jello'			: 'n:jello d:1 per:11.1 transform:none|per:22.2 sk:-12.5,-12.5|per:33.3 sk:6.25,6.25|per:44.4 sk:-3.125,-3.125|per:55.5 sk:1.5625,1.5625|per:66.6 sk:-0.78125,-0.78125|per:77.7 sk:0.390625,0.390625|per:88.8 sk:-0.1953125,-0.1953125|per:100 transform:none',
		'bounceIn'		: 'n:bounceIn d:1 per:0%,20%,40%,60%,80%,100% e:easeOutCubic|per:0 op:0 sc:0.3|per:20 sc:1.1|per:40 sc:0.9|per:60 sc:1.03|per:80 sc:.97|per:100 op:1 sc:1',
		'bounceInDown'	: 'n:bounceInDown d:1 per:0%,60%,75%,90%,100% e:easeOutCubic|per:0 op:0 y:-3000|per:60 op:1 y:25|per:75 y:-10|per:90 y:5|per:100 transform:none',
		'bounceInLeft'	: 'n:bounceInLeft d:1 per:0%,60%,75%,90%,100% e:easeOutCubic|per:0 op:0 x:-3000|per:60 op:1 x:25|per:75 x:-10|per:90 x:5|per:100 transform:none',
		'bounceInRight'	: 'n:bounceInRight d:1 per:0%,60%,75%,90%,100% e:easeOutCubic|per:0 op:0 x:3000|per:60 op:1 x:-25|per:75 x:10|per:90 x:-5|per:100 transform:none',
		'bounceInUp'	: 'n:bounceInUp d:1 per:0%,60%,75%,90%,100% e:easeOutCubic|per:0 op:0 y:3000|per:60 op:1 y:-25|per:75 y:10|per:90 y:-5|per:100 transform:none',
		'bounceOut'		: 'n:bounceOut d:1 per:20 sc:0.9|per:50%,55% sc:1.1 op:1|per:100 op:0 sc:0.3',
		'bounceOutDown'	: 'n:bouceOutDown d:1 per:20 y:10|per:40%,45% op:1 y:-20|per:100 op:0 y:2000',
		'bounceOutLeft'	: 'n:bounceOutLeft d:1 per:20 op:1 x:20|per:100 op:0 x:-2000',
		'bounceOutRight': 'n:bounceOutRight d:1 per:20 op:1 x:-20|per:100 op:0 x:2000',
		'bounceOutUp'	: 'n:bounceOutUp d:1 per:20 x:-10|per:40%45% op:1 x:20|per:100 op:0 x:-2000',
		'fadeInDown'	: 'n:fadeInDown d:1 per:0 y:-100%|per:100 op:1 transform:none',
		'fadeInDownBig'	: 'n:fadeInDownBig d:1 per:0 op:0 y:-2000|per:100 op:1 transform:none',
		'fadeInLeft'	: 'n:fadeInLeft d:1 per:0 op:0 x:-100%|per:100 op:1 transform:none',
		'fadeInLeftBig'	: 'n:fadeInLeftBig d:1 per:0 op:0 x:-2000|per:100 op:1 transform:none',
		'fadeInRight'	: 'n:fadeInRight d:1 per:0 op:0 x:100%|per:100 op:1 transform:none',
		'fadeInRightBig': 'n:fadeInRightBig d:1 per:0 op:0 x:2000|per:100 op:1 transform:none',
		'fadeInUp'		: 'n:fadeInUp d:1 per:0 op:0 y:100%|per:100 op:1 transform:none',
		'fadeInUpBig'	: 'n:fadeInUpBig d:1 per:0 op:0 y:2000|per:100 op:1 transform:none',
		'fadeOutDown'	: 'n:fadeOutDown d:1 per:0 op:1|per:100 op:0 y:100%',
		'fadeOutDownBig': 'n:fadeOutDownBig d:1 per:0 op:1|per:100 op:0 y:2000',
		'fadeOutLeft'	: 'n:fadeOutLeft d:1 per:0 op:1|per:100 op:0 x:-100%',
		'fadeOutLeftBig': 'n:fadeOutLeftBig d:1 per:0 op:1|per:100 op:0 x:-2000',
		'fadeOutRight'	: 'n:fadeOutRight d:1 per:0 op:1|per:100 op:0 x:100%',
		'fadeOutRightBig':'n:fadeOutRightBig d:1 per:0 op:1|per:100 op:0 x:2000',
		'fadeOutUp'		: 'n:fadeOutUp d:1 per:0 op:1|per:100 op:0 y:-100%',
		'fadeOutUpBig'	: 'n:fadeOutUpBig d:1 per:0 op:1|per:100 op:0 y:-2000',
		'flip'			: 'n:flip d:1 e:easeOut backfaceVisibility:visible per:0 p3d:400 r3d:y,-360|per:40 e:easeOut p3d:400 t3d:0,0,150 r3d:y,-190|per:50 e:easeIn p3d:400 t3d:0,0,150 r3d:y,-170|per:80 e:easeIn p3d:400 s3d:0.95,0.95,0.95|per:100 p3d:400 e:easeIn',
		'flipInX'		: 'n:flipInX d:1 e:easeIn backfaceVisibility:visible per:0 p3d:400 r3d:x,90|per:40 e:easeIn p3d:400 r3d:x,-20|per:60 p3d:400 r3d:x,10|per:80 p3d:400 r3d:x,-5|per:100 p3d:400',
		'flipInY'		: 'n:flipInY d:1 e:easeIn backfaceVisibility:visible per:0 p3d:400 r3d:y,90|per:40 e:easeIn p3d:400 r3d:y,-20|per:60 p3d:400 r3d:y,10|per:80 p3d:400 r3d:y,-5|per:100 p3d:400',
		'flipOutX'		: 'n:flipOutX d:1 per:0 p3d:400|per:30 p3d:400 r3d:x,-20 op:1|per:100 p3d:400 r3d:x,90 op:0',
		'flipOutY'		: 'n:flipOutX d:1 per:0 p3d:400|per:30 p3d:400 r3d:y,-15 op:1|per:100 p3d:400 r3d:y,90 op:0',
		'lightSpeedIn'	: 'n:lightSpeedIn d:1 e:easeOut per:0 op:0 x:100% sk:-30|per:60 op:1 sk:20|per:80 op:1 sk:-5|per:100 op:1 transform:none',
		'lightSpeedOut'	: 'n:lightSpeedOut d:1 e:easeOut per:0 op:1|per:100 op:0 x:100% sk:30',
		'rotateIn'		: 'n:rotateIn d:1 per:0 to:center r3d:z,-200 op:0|per:100 to:center transform:none op:1',
		'rotateInDownLeft':'n:rotateInDownLeft d:1 per:0 to:left,bottom r3d:z,-45 op:0|per:100 to:left,bottom transform:none op:1',
		'rotateInDownRight':'n:rotateInDownRight d:1 per:0 to:right,bottom r3d:z,45 op:0|per:100 to:right,bottom transform:none op:1',
		'rotateInUpLeft':'n:rotateInUpLeft d:1 per:0 to:left,bottom r3d:z,45 op:0|per:100 to:left,bottom transform:none op:1',
		'rotateInUpRight':'n:rotateInUpRight d:1 per:0 to:right,bottom r3d:x,-90 op:0|per:100 to:right,bottom transform:none op:1',
		'rotateOut'		: 'n:rotateOut d:1 per:0 to:center op:1|per:100 to:center r3d:z,200 op:0',
		'rotateOutDownLeft':'n:rotateOutDownLeft d:1 per:0 to:left,bottom op:1|per:100 to:left,bottom r3d:z,-45 op:0',
		'rotateOutDownRight':'n:rotateOutDownRight d:1 per:0 to:right,bottom op:1|per:100 to:right,bottom r3d:z,-45 op:0',
		'rotateOutUpLeft'	:'n:rotateOutUpLeft d:1 per:0 to:left,bottom op:1|per:100 to:left,bottom r3d:z,-45 op:1',
		'rotateOutUpRight'	:'n:rotateOutUpRight d:1 per:0 to:right,bottom op:1|per:100 to:right,bottom r3d:z,90 op:0',
		'hinge'			: 'n:hinge d:2 per:0 to:top,left e:easeInOut|per:20%,60% r3d:z,80 to:top,left e:easeInOut|per:40%,80% r3d:z,60 to:top,left e:easeInOut op:1|per:100 y:700 op:0',
		'rollIn'		: 'n:rollIn d:1 per:0 op:0 x:-100% rot:-120|per:100 op:1 transform:none',
		'rollOut'		: 'n:rollOut d:1 per:0 op:1|per:100 op:0 x:100% rot:120',
		'zoomIn'		: 'n:zoomIn d:1 per:0 s3d:0.3,0.3,0.3 op:0|per:100 op:1',
		'zoomInDown'	: 'n:zoomInDown d:1 per:0 op:0 s3d:0.1,0.1,0.1 y:-1000 e:easeInCubic|per:60 op:1 s3d:0.475,0.475,0.475 y:60 e:easeOutBack',
		'zoomInLeft'	: 'n:zoomInLeft d:1 per:0 op:0 s3d:0.1,0.1,0.1 x:-1000 e:easeInCubic|per:60 op:1 s3d:0.475,0.475,0.475 x:10 e:easeOutBack',
		'zoomInRight'	: 'n:zoomInRight d:1 per:0 op:0 s3d:0.1,0.1,0.1 x:1000 e:easeInCubic|per:60 op:1 s3d:0.475,0.475,0.475 x:-10 e:easeOutBack',
		'zoomInUp'		: 'n:zoomInUp d:1 per:0 op:0 s3d:0.1,0.1,0.1 y:1000 e:easeInCubic|per:60 op:1 s3d:0.475,0.475,0.475 y:-60 e:easeOutBack',
		//https://github.com/IanLunn/Hover/blob/master/css/hover.css
		'hang'			:'n:hang d:1.5 e:easeInOut fillMode:forwards direction:alternate loop:-1 backfaceVisibility:hidden per:0 y:8|per:50 y:4|per:100 y:8',

		//https://github.com/miniMAC/magic/blob/master/magic.css
		'magic'			:'n:magic d:1 per:0 to:100%,200% sc:1 rot:0 op:1|per:100 to:100%,500% sc:0 rot:270'


	}
	//check if a property is a configuration property or css property
	function isCSS(prop){	
		return (('isTransition name duration loop ease delay fillMode useAll percent transform useLongForm transformOrigin direction animationTimingFunction animationPlayState play animationIterationCount backfaceVisibility').indexOf(prop) === -1);
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
		'r3d'	:'rotate3d',
		't3d'	:'translate3d',
		's3d'	:'scale3d',
		'p3d'	:'perspective',
		'per' 	:'percent'
	};
	//a data map to format properties
	var formatMap = {
		't3d' : function(v){
			if(v.indexOf('px') == -1){
				return 'translate3d(' + v.split(',')[0] + 'px, ' + v.split(',')[1] + 'px, ' + v.split(',')[2] + 'px) ';
			}
			return 'translate3d(' + v + ') ';
		},
		'r3d' : function(v){
			var raw = v.split(',');
			var axis = raw[0];
			var map = {
				'x':'1,0,0,',
				'y':'0,1,0,',
				'z':'0,0,1,',
				'xy':'1,1,0,',
				'xz':'1,0,1,',
				'yz':'0,1,1,',
				'xyz':'1,1,1,'
			}
			return 'rotate3d(' + map[axis] + raw[1] + 'deg) ';
		},
		's3d' : function(v){
			return 'scale3d(' + v + ') ';
		},
		'p3d' : function(v){
			if(v.indexOf('px') == -1){
				return 'perspective(' + v + 'px) ';
			}
			return 'perspective(' + v + ') ';
		},
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
		'spin' : function(v){
			return 'rotate(' + v +'turn) ';
		},
		'sk' : function(v){
			if(v.indexOf(',') != -1){
				return 'skew(' + v.split(',')[0] + 'deg, ' + v.split(',')[1] + 'deg) ';
			}
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
			if('translateX' in o || 'translateY' in o || 'rotate' in o || 'skew' in o || 'scale' in o || 'scaleX' in o || 'scaleY' in o || 'perspective' in o || 'scale3d' in o || 'translate3d' in o || 'rotate3d' in o){
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
				if('perspective' in o){
					o['transform'] += o['perspective'];
					delete o['perspective'];
				}
				if('translate3d' in o){
					o['transform'] += o['translate3d'];
					delete o['translate3d'];
				}
				if('scale3d' in o){
					o['transform'] += o['scale3d'];
					delete o['scale3d'];
				}
				if('rotate3d' in o){
					o['transform'] += o['rotate3d'];
					delete o['rotate3d'];
				}
			}
			//check if percentage is present
			if(!o.percent){
				o.percent = Math.round(i + 1/(fr.length) * 100) + '%';
			}
			frames.push(o);
		}
		return frames;
	}
	//receives an object the duration and the easing name
	function getCSS(properties, duration, easing){
		var frames = parse(properties),
			prop = frames[0],
			isTransition = (prop.isTransition != undefined)?prop.isTransition:0,
			n = prop.name || 'myTween',
			d = prop.duration || duration || '0.5',
			l = prop.animationIterationCount || prop.loop || '1',
			e = prop.animationTimingFunction || prop.ease || easing || 'ease',
			ad = prop.direction || 'normal',
			dy = prop.delay || '0',
			fm = prop.fillMode || (parseInt(dy) !== 0)?'both':'forwards',
			p = prop.percent || 'to',
			isPlaying = prop.play || prop.animationPlayState || 'running',
			useAll = prop.useAll || false,
			useLongForm = prop.useLongForm || true,
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
		dy += 's';
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
		if(isTransition < 1){
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
						}else if(k === 'backfaceVisibility'){
							t += _t + _t + prefix[px] + 'backface-visibility: ' + prop[k] + _e + _n;
						}
					}
					t += _t + _x + _n;
					t += _x + _n;					
				}else{
					t += '@' + prefix[px] + _k + n + _s + _o + _n;
					for(var i=0; i < fQty; i++){
						p = (fQty == 2)?(i == 0)?(frames[i].percent === '0%')?'from':frames[i].percent:(frames[i].percent === '100%')?'to':frames[i].percent:frames[i].percent;
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
							}else if(k === 'backfaceVisibility'){
								t += _t + _t + prefix[px] + 'backface-visibility: ' + frames[i][k] + _e + _n;
							}
						}
						t += _t + _x + _n;	
					}
					t += _x + _n;
				}
			}
			s += t;
			//class
			var states = _d + n + ':hover, ' + _d + n + ':focus, ' + _d + n + ':active ';
			if(isTransition === 0){
				s += _d + n + _o + _n;
				s += hacks;	
			}else if(isTransition === -1){
				s += _d + n + _o + _n;
				s += hacks;	
				s += _x + _n;
				s += states + _o + _n;
			}else if(isTransition === -2){
				s += _d + n + _o + _n;
				s += hacks;
			}
			t = '';
			if(!useLongForm){
				t += 'animation: ' + n + _s + d + _s + ceaser[e] + _s + dy + _s + l + _s + ad + _e + _n;
				s += _t + t;
				s += _t + _w + t;				
			}else{
				for(var px=0; px < prefix.length; px++){
					t += _t + prefix[px] +'animation-name: ' + n + _e + _n;
					t += _t + prefix[px] +'animation-duration: ' + d + _e + _n;
					t += _t + prefix[px] +'animation-timing-function: ' + ceaser[e] + _e + _n;
					t += _t + prefix[px] +'animation-delay: ' + dy + _e + _n;
					t += _t + prefix[px] +'animation-iteration-count: ' + l + _e + _n;
					t += _t + prefix[px] +'animation-direction: ' + ad + _e + _n;
					t += _t + prefix[px] +'animation-fill-mode: ' + fm + _e + _n;
					t += (isTransition === -2)? _t + prefix[px] +'animation-play-state: paused' + _e + _n : _t + prefix[px] +'animation-play-state: ' + isPlaying + _e + _n;					
				}
				s += t;
			}
			s += _x + _n;
			if(isTransition === -2){
				s += states + _o + _n;
				s += _t +'animation-play-state: running' + _e + _n;
				s += _t + _w + 'animation-play-state: running' + _e + _n;
				s += _x + _n;
			}	
		}else{
			//TRANSITION
			s += _d + n + _s + _o + _n;
			s += hacks;
			t += 'transition:'
			if(!useAll){
				for(var k in prop){
					if(isCSS(k)){
						t += _s + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + d + _s + ceaser[e] + _s + dy + ',';
					}else if(k === 'transform'){
						t += _s + 'transform ' + _s + d + _s + ceaser[e] + _s + dy + ',';
						t += _s + '-webkit-transform ' + _s + d + _s + ceaser[e] + _s + dy + ',';
					}else if(k === 'transformOrigin'){
						t += _s + 'transform-origin ' + _s + d + _s + ceaser[e] + _s + dy + ',';
						t += _s + '-webkit-transform-origin ' + _s + d + _s + ceaser[e] + _s + dy + ',';
					}else if(k === 'backfaceVisibility'){
						t += _s + 'backface-visibility ' + _s + d + _s + ceaser[e] + _s + dy + ',';
						t += _s + '-webkit-backface-visibility ' + _s + d + _s + ceaser[e] + _s + dy + ',';
					}
				}	
			}else {
				t += ' all ' + d + _s + ceaser[e] + _s + dy + ',';
			}
			t = t.replace(/,\s*$/, _e);
			t += _n;
			s += _t + t;
			s += _t + _w + t;
			s += _x + _n;
			//hover
			var states = _d + n + ':hover, ' + _d + n + ':focus, ' + _d + n + ':active ';
			s += states + _o + _n;
			t = '';
			for(var k in prop){
				if(isCSS(k)){
					t += _t + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + _c + _s + prop[k] + _e + _n;
				}else if(k === 'transform'){
					t += _t + _t + 'transform: ' + prop[k] + _e + _n;
					t += _t + _t + '-webkit-transform: ' + prop[k] + _e + _n;
				}else if(k === 'transformOrigin'){
					t += _t + _t + 'transform-origin: ' + prop[k] + _e + _n;
					t += _t + _t + '-webkit-transform-origin: ' + prop[k] + _e + _n;
				}else if(k === 'backfaceVisibility'){
					t += _t + _t + 'backface-visibility: ' + prop[k] + _e + _n;
					t += _t + _t + '-webkit-backface-visibility: ' + prop[k] + _e + _n;
				}
			}
			s += t;
			s += _x + _n;
		}
		return s;
	}
	//get transition instead of keyframes
	function getTransition(properties, duration, easing, type){
		var ob = parse(properties);
		ob[0].isTransition = type || 1;
		ob[0].useAll = true;
		return getCSS(ob, duration, easing);
	}
	//get keyframed transition instead or regular transition
	function getKeyframedTransition(properties, duration, easing){
		return getTransition(properties, duration, easing, -1);
	}
	function getInteractiveTransition(properties, duration, easing){
		return getTransition(properties, duration, easing, -2);
	}
	//apply the animation to an element (can be string or element object)
	function applyCSS(element, properties, duration, easing, isTransition){
		var code = (isTransition === 0)?getCSS(properties, duration, easing):getTransition(properties, duration, easing, isTransition);
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
		return applyCSS(element, properties, duration, easing, 1);
	}
	//vii API
	return {
		k : getCSS,
		t : getTransition,
		kt : getKeyframedTransition,
		it : getInteractiveTransition,
		getKeyframes : getCSS,
		applyKeyframes : applyCSS,
		getTransition : getTransition,
		applyTransition : applyTransition,
		getKeyframedTransition: getKeyframedTransition,
		getInteractiveTransition: getInteractiveTransition
	}
})();
