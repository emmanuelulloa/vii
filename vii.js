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
	ceaser.hesitate = 'cubic-bezier(.2,1,.9,-0.5)';
	ceaser.anticipate = 'cubic-bezier(.5,0,.8,.15)';
	ceaser.overshoot = 'cubic-bezier(.41,.41,.35,1.2)';
	ceaser.anticipateOvershoot = 'cubic-bezier(.45,-0.67,.53,1.63)';
	ceaser.bounce = 'cubic-bezier(.65, 1.95, .03, .32)';
	ceaser.elastic = 'cubic-bezier(0.47, 2.02, 0.31, -0.36)';
	ceaser.spring = 'cubic-bezier(.25,2,.75,.5)';
	ceaser.fastOut = 'cubic-bezier(0.4,0,1,1)';
	ceaser.slowIn = 'cubic-bezier(0,0,0.2,1)';
	ceaser.fastOutSlowIn = 'cubic-bezier(0.4,0,0.2,1)'
	//pre-made animations
	var preMade = {
		'fadeIn'		: 'n:fadeIn d:0.5 e:ease op:1',
		'fadeOut'		: 'n:fadeOut d:0.5 e:ease op:0',
		//Created by Justin Aguilar's Animation CheatSheet
		'slideDown'     : 'n:slideDown d:1 e:ease kf:0 y:-100%|kf:50 y:8%|kf:65 y:-4%|kf:80 y:4%|kf:95 y:-2%|kf:100 y:0',
		'slideUp'       : 'n:slideUp d:1 e:ease kf:0 y:100%|kf:50 y:-8%|kf:65 y:4%|kf:80 y:-4%|kf:95 y:2%|kf:100 y:0%',
		'slideLeft'     : 'n:slideLeft d:1 e:easeInOut kf:0 x:150%|kf:50 x:-8%|kf:65 x:4%|kf:80 x:-4%|kf:95 x:2%|kf:100 x:0%',
		'slideRight'    : 'n:slideRight d:1 e:easeInOut kf:0 x:-150%|kf:50 x:8%|kf:65 x:-4%|kf:80 x:4%|kf:95 x:-2%|kf:100 x:0%',
		'slideExpandUp' : 'n:slideExpandUp d:1.6 e:easeOut kf:0 y:100% scx:0.5|kf:30 y:-8% scx:0.5|kf:40 y:2% scx:0.5|kf:50 y:0% scx:1.1|kf:60 y:0% scx:0.0|kf:70 y:0% scx:1.05|kf:80 y:0% scx:0.95%|kf:90 y:0% scx:1.02|kf:100 y:0% scx:1',
		'expandUp'      : 'n:expandUp d:0.7 e:ease kf:0 y:100% sc:0.6 scy:0.5|kf:60 y:-7% scy:1.12|kf:75 y:3%|kf:100 y:0% sc:1 scy:1',
		'expandOpen'	: 'n:expandOpen d:1.2 e:easeOut kf:0 sc:1.8|kf:50 sc:0.95|kf:80 sc:1.05|kf:90 sc:0.98|kf:100 sc:1',
		'bigEntrance'	: 'n:bigEntrance d:1.6 e:easeOut kf:0 sc:0.3 rot:6 x:-30% y:30% op:0.2|kf:30 sc:1.03 rot:-2 x:2% y:-2% op:1|kf:45 sc:0.98 rot:1 x:0% y:0% op:1|kf:60 sc:1.01 rot:-1 x:0% y:0% op:1|kf:75 sc:0.99 rot:1 x:0% y:0% op:1|kf:90 sc:1.01 rot:0 x:0% y:0% op:1|kf:100 sc:1 rot:0 x:0% y:0% op:1',
		'hatch'			: 'n:hatch d:2 e:easeInOut to:50%,100% kf:0 rot:0 scy:0.6|kf:20 rot:-2 scy:1.05|kf:35 rot:2 scy:1|kf:50 rot:-2|kf:65 rot:1|kf:80 rot:-1|kf:100 rot:100 rot:0',
		'floating'		: 'n:floating d:1.5 loop:-1 kf:0 y:0%|kf:50 y:8%|kf:100 y:0%',
		'tossing'		: 'n:tossing d:2.5 loop:-1 kf:0 rot:-4|kf:50 rot:4|kf:100 rot:-4',
		'pullUp'		: 'n:pullUp d:1.1 e:easeOut to:50%,100% kf:0 scy:0.1|kf:40 scy:1.02|kf:60 scy:0.98|kf:80 scy:1.01|kf:100 scy:1',
		'pullDown'		: 'n:pullDown d:1.1 e:easeOut to:50%,0% kf:0 scy:0.1|kf:40 scy:1.02|kf:60 scy:0.98|kf:80 scy:1.01|kf:100 scy:1',
		'stretchLeft'	: 'n:stretchLeft d:1.5 e:easeOut to:100%,0% kf:0 scx:0.3|kf:40 scx:1.02|kf:60 scx:0.98|kf:80 scx:1.01|kf:100 scx:1',
		'stretchRight'	: 'n:stretchRight d:1.5 e:easeOut to:0%,0% kf:0 scx:0.3|kf:40 scx:1.02|kf:60 scx:0.98|kf:80 scx:1.01|kf:100 scx:1',
		'bounce2'		: 'n:bounce d:1.6 e:ease to:50%,100% kf:0 y:0% scy:0.6|kf:60 y:-100% scy:1.1|kf:70 y:0% scy:0.95 scx:1.05|kf:80 y:0% scy:1.05 scx:1|kf:90 y:0% scy:0.95% scx:1|kf:100 y:0% scy:1 scx:1',
		'fadeIn2'		: 'n:fadeIn2 d:1.5 e:easeInOut kf:0 sc:0 op:0|kf:60 sc:1.1|kf:80 sc:0.9 op:1|kf:100 sc:1 op:1',
		'pulse2' 		: 'n:pulse d:1.5 loop:-1 kf:0 sc:0.9 op:0.7|kf:50 sc:1 op:1|kf:100 sc:0.9 op:0.7',
		//Created by Daniel T. Eden for Animate.css & Nick Pettit for Glide
		'bounce'		: 'n:bounce d:0.75 kf:0%,20%,53%,80%,100% x:0 y:0 to:cb e:easeOutCubic|kf:40%,43% y:-30 e:easeInQuint|kf:70% y:-15 e:easeInQuint|kf:90% y:-4',
		'flash'			: 'n:flash d:1 kf:0%,50%100% op:1|kf:25%,75% op:0',
		'rubberBand'	: 'n:rubberBand d:1 kf:0 scx:1 scy:1|kf:30 scx:1.25 scy:0.75|kf:40 scx:0.75 scy:1.25|kf:50 scx:1.15 scy:0.85|kf:65 scx:0.95 scy:1.05|kf:75 scx:1.05 scy:0.95|kf:100 scx:1 scy:1',
		'shake'			: 'n:shake d:1 kf:0%,100% x:0|kf:10%,30%,50%,70%,90% x:-10|kf:20%,40%,60%,80% x:10',
		'swing'			: 'n:swing d:1 to:ct kf:20 rot:15|kf:40 rot:-10|kf:60 rot:5|kf:80 rot:-5|kf:100 rot:0',
		'tada'			: 'n:tada d:1 kf:0% scx:1 scy:1|kf:10%,20% scx:0.9 scy:0.9 rot:-3|kf:30%,50%,70%,90% scx:1.1 scy:1.1 rot:3|kf:40%,60%,80% scx:1.1 scy:1.1 rot:-3|kf:100% scx:1 scy:1',
		'wobble'		: 'n:wobble d:1 kf:0 transform:none|kf:15 x:-25% rot:-5|kf:30 x:20% rot:3|kf:45 x:-15% rot:-3|kf:60% x:10% rot:2|kf:75 x:-5% rot:-1|kf:100 transform:none',
		'jello'			: 'n:jello d:1 kf:11.1 transform:none|kf:22.2 sk:-12.5,-12.5|kf:33.3 sk:6.25,6.25|kf:44.4 sk:-3.125,-3.125|kf:55.5 sk:1.5625,1.5625|kf:66.6 sk:-0.78125,-0.78125|kf:77.7 sk:0.390625,0.390625|kf:88.8 sk:-0.1953125,-0.1953125|kf:100 transform:none',
		'bounceIn'		: 'n:bounceIn d:1 kf:0%,20%,40%,60%,80%,100% e:easeOutCubic|kf:0 op:0 sc:0.3|kf:20 sc:1.1|kf:40 sc:0.9|kf:60 sc:1.03|kf:80 sc:.97|kf:100 op:1 sc:1',
		'bounceInDown'	: 'n:bounceInDown d:1 kf:0%,60%,75%,90%,100% e:easeOutCubic|kf:0 op:0 y:-3000|kf:60 op:1 y:25|kf:75 y:-10|kf:90 y:5|kf:100 transform:none',
		'bounceInLeft'	: 'n:bounceInLeft d:1 kf:0%,60%,75%,90%,100% e:easeOutCubic|kf:0 op:0 x:-3000|kf:60 op:1 x:25|kf:75 x:-10|kf:90 x:5|kf:100 transform:none',
		'bounceInRight'	: 'n:bounceInRight d:1 kf:0%,60%,75%,90%,100% e:easeOutCubic|kf:0 op:0 x:3000|kf:60 op:1 x:-25|kf:75 x:10|kf:90 x:-5|kf:100 transform:none',
		'bounceInUp'	: 'n:bounceInUp d:1 kf:0%,60%,75%,90%,100% e:easeOutCubic|kf:0 op:0 y:3000|kf:60 op:1 y:-25|kf:75 y:10|kf:90 y:-5|kf:100 transform:none',
		'bounceOut'		: 'n:bounceOut d:1 kf:20 sc:0.9|kf:50%,55% sc:1.1 op:1|kf:100 op:0 sc:0.3',
		'bounceOutDown'	: 'n:bouceOutDown d:1 kf:20 y:10|kf:40%,45% op:1 y:-20|kf:100 op:0 y:2000',
		'bounceOutLeft'	: 'n:bounceOutLeft d:1 kf:20 op:1 x:20|kf:100 op:0 x:-2000',
		'bounceOutRight': 'n:bounceOutRight d:1 kf:20 op:1 x:-20|kf:100 op:0 x:2000',
		'bounceOutUp'	: 'n:bounceOutUp d:1 kf:20 x:-10|kf:40%45% op:1 x:20|kf:100 op:0 x:-2000',
		'fadeInDown'	: 'n:fadeInDown d:1 kf:0 y:-100%|kf:100 op:1 transform:none',
		'fadeInDownBig'	: 'n:fadeInDownBig d:1 kf:0 op:0 y:-2000|kf:100 op:1 transform:none',
		'fadeInLeft'	: 'n:fadeInLeft d:1 kf:0 op:0 x:-100%|kf:100 op:1 transform:none',
		'fadeInLeftBig'	: 'n:fadeInLeftBig d:1 kf:0 op:0 x:-2000|kf:100 op:1 transform:none',
		'fadeInRight'	: 'n:fadeInRight d:1 kf:0 op:0 x:100%|kf:100 op:1 transform:none',
		'fadeInRightBig': 'n:fadeInRightBig d:1 kf:0 op:0 x:2000|kf:100 op:1 transform:none',
		'fadeInUp'		: 'n:fadeInUp d:1 kf:0 op:0 y:100%|kf:100 op:1 transform:none',
		'fadeInUpBig'	: 'n:fadeInUpBig d:1 kf:0 op:0 y:2000|kf:100 op:1 transform:none',
		'fadeOutDown'	: 'n:fadeOutDown d:1 kf:0 op:1|kf:100 op:0 y:100%',
		'fadeOutDownBig': 'n:fadeOutDownBig d:1 kf:0 op:1|kf:100 op:0 y:2000',
		'fadeOutLeft'	: 'n:fadeOutLeft d:1 kf:0 op:1|kf:100 op:0 x:-100%',
		'fadeOutLeftBig': 'n:fadeOutLeftBig d:1 kf:0 op:1|kf:100 op:0 x:-2000',
		'fadeOutRight'	: 'n:fadeOutRight d:1 kf:0 op:1|kf:100 op:0 x:100%',
		'fadeOutRightBig':'n:fadeOutRightBig d:1 kf:0 op:1|kf:100 op:0 x:2000',
		'fadeOutUp'		: 'n:fadeOutUp d:1 kf:0 op:1|kf:100 op:0 y:-100%',
		'fadeOutUpBig'	: 'n:fadeOutUpBig d:1 kf:0 op:1|kf:100 op:0 y:-2000',
		'flip'			: 'n:flip d:1 e:easeOut backfaceVisibility:visible kf:class|kf:0 p3d:400 r3d:y,-360|kf:40 e:easeOut p3d:400 t3d:0,0,150 r3d:y,-190|kf:50 e:easeIn p3d:400 t3d:0,0,150 r3d:y,-170|kf:80 e:easeIn p3d:400 s3d:0.95,0.95,0.95|kf:100 p3d:400 e:easeIn',
		'flipInX'		: 'n:flipInX d:1 e:easeIn backfaceVisibility:visible kf:class|kf:0 p3d:400 r3d:x,90|kf:40 e:easeIn p3d:400 r3d:x,-20|kf:60 p3d:400 r3d:x,10|kf:80 p3d:400 r3d:x,-5|kf:100 p3d:400',
		'flipInY'		: 'n:flipInY d:1 e:easeIn backfaceVisibility:visible kf:class|kf:0 p3d:400 r3d:y,90|kf:40 e:easeIn p3d:400 r3d:y,-20|kf:60 p3d:400 r3d:y,10|kf:80 p3d:400 r3d:y,-5|kf:100 p3d:400',
		'flipOutX'		: 'n:flipOutX d:1 kf:0 p3d:400|kf:30 p3d:400 r3d:x,-20 op:1|kf:100 p3d:400 r3d:x,90 op:0',
		'flipOutY'		: 'n:flipOutX d:1 kf:0 p3d:400|kf:30 p3d:400 r3d:y,-15 op:1|kf:100 p3d:400 r3d:y,90 op:0',
		'lightSpeedIn'	: 'n:lightSpeedIn d:1 e:easeOut kf:0 op:0 x:100% sk:-30|kf:60 op:1 sk:20|kf:80 op:1 sk:-5|kf:100 op:1 transform:none',
		'lightSpeedOut'	: 'n:lightSpeedOut d:1 e:easeOut kf:0 op:1|kf:100 op:0 x:100% sk:30',
		'rotateIn'		: 'n:rotateIn d:1 kf:0 to:center r3d:z,-200 op:0|kf:100 to:center transform:none op:1',
		'rotateInDownLeft':'n:rotateInDownLeft d:1 kf:0 to:lb r3d:z,-45 op:0|kf:100 to:lb transform:none op:1',
		'rotateInDownRight':'n:rotateInDownRight d:1 kf:0 to:rb r3d:z,45 op:0|kf:100 to:rb transform:none op:1',
		'rotateInUpLeft':'n:rotateInUpLeft d:1 kf:0 to:lb r3d:z,45 op:0|kf:100 to:lb transform:none op:1',
		'rotateInUpRight':'n:rotateInUpRight d:1 kf:0 to:rb r3d:x,-90 op:0|kf:100 to:rb transform:none op:1',
		'rotateOut'		: 'n:rotateOut d:1 kf:0 to:center op:1|kf:100 to:center r3d:z,200 op:0',
		'rotateOutDownLeft':'n:rotateOutDownLeft d:1 kf:0 to:lb op:1|kf:100 to:lb r3d:z,-45 op:0',
		'rotateOutDownRight':'n:rotateOutDownRight d:1 kf:0 to:rb op:1|kf:100 to:rb r3d:z,-45 op:0',
		'rotateOutUpLeft'	:'n:rotateOutUpLeft d:1 kf:0 to:lb op:1|kf:100 to:lb r3d:z,-45 op:1',
		'rotateOutUpRight'	:'n:rotateOutUpRight d:1 kf:0 to:rb op:1|kf:100 to:rb r3d:z,90 op:0',
		'hinge'			: 'n:hinge d:2 kf:0 to:lt e:easeInOut|kf:20%,60% r3d:z,80 to:lt e:easeInOut|kf:40%,80% r3d:z,60 to:lt e:easeInOut op:1|kf:100 y:700 op:0',
		'rollIn'		: 'n:rollIn d:1 kf:0 op:0 x:-100% rot:-120|kf:100 op:1 transform:none',
		'rollOut'		: 'n:rollOut d:1 kf:0 op:1|kf:100 op:0 x:100% rot:120',
		'zoomIn'		: 'n:zoomIn d:1 kf:0 s3d:0.3,0.3,0.3 op:0|kf:100 op:1',
		'zoomInDown'	: 'n:zoomInDown d:1 kf:0 op:0 s3d:0.1,0.1,0.1 y:-1000 e:easeInCubic|kf:60 op:1 s3d:0.475,0.475,0.475 y:60 e:easeOutBack',
		'zoomInLeft'	: 'n:zoomInLeft d:1 kf:0 op:0 s3d:0.1,0.1,0.1 x:-1000 e:easeInCubic|kf:60 op:1 s3d:0.475,0.475,0.475 x:10 e:easeOutBack',
		'zoomInRight'	: 'n:zoomInRight d:1 kf:0 op:0 s3d:0.1,0.1,0.1 x:1000 e:easeInCubic|kf:60 op:1 s3d:0.475,0.475,0.475 x:-10 e:easeOutBack',
		'zoomInUp'		: 'n:zoomInUp d:1 kf:0 op:0 s3d:0.1,0.1,0.1 y:1000 e:easeInCubic|kf:60 op:1 s3d:0.475,0.475,0.475 y:-60 e:easeOutBack',
		'zoomOut'		: 'n:zoomOut d:1 kf:0 op:1|kf:50 op:0 s3d:0.3,0.3,0.3|kf:100 op:0',
		'zoomOutDown'	: 'n:zoomOutDown d:1 kf:40 op:1 s3d:0.475,0.475,0.475 y:-60 e:easeInCubic|kf:100 op:0 s3d:0.1,0.1,0.1 y:2000 to:cb e:easeOutBack',
		'zoomOutLeft'	: 'n:zoomOutLeft d:1 kf:40 op:1 s3d:0.475,0.475,0.475 x:42|kf:100 op:0 sc:0.1 x:-2000 to:lc',
		'zoomOutRight'	: 'n:zoomOutRight d:1 kf:40 op:1 s3d:0.475,0.475,0.475 x:-42|kf:100 op:0 sc:0.1 x:2000 to:rc',
		'zoomOutUp' 	: 'n:zoomOutUp d:1 kf:40 op:1 s3d:0.475,0.475,0.475 y:60 e:easeInCubic|kf:100 op:0 s3d:0.1,0.1,0.1 y:-2000 to:cb e:easeOutBack',
		'slideInDown'	: 'n:slideInDown d:1 kf:0 y:-100%|kf:100 y:0%',
		'slideInLeft'	: 'n:slideInLeft d:1 kf:0 x:-100%|kf:100 y:0%',
		'slideInRight'	: 'n:slideInRight d:1 kf:0 x:100%|kf:100 y:0%',
		'slideInUp'		: 'n:slideInUp d:1 kf:0 y:100%|kf:100 y:0%',
		'slideOutDown'	: 'n:slideOutDown d:1 kf:100 y:100%',
		'slideOutLeft'	: 'n:slideOutLeft d:1 kf:100 x:-100%',
		'slideOutRight'	: 'n:slideOutRight d:1 kf:100 x:100%',
		'slideOutUp'	: 'n:slideOutUp d:1 kf:100 y:-100%',
		//Created by Ian Lunn for Hover.css
		'pulse'			:'n:pulse d:1 e:linear loop:-1 dir:>< backfaceVisibility:hidden kf:class|kf:25% sc:1.1|kf:75% sc:0.9',
		'pulseGrow'		:'n:pulseGrow d:1 e:linear loop:-1 dir:>< backfaceVisibility:hidden kf:class|kf:100 sc:1.1',
		'pulseShrink'	:'n:pulseShrink d:1 e:linear loop:-1 dir:>< backfaceVisibility:hidden kf:class|kf:100 sc:0.9',
		'push'			:'n:push d:1 backfaceVisibility:hidden e:linear kf:class|kf:50 sc:0.8|kf:100 sc:1',
		'pop'			:'n:pop d:1 backfaceVisibility:hidden e:linear kf:class|kf:50 sc:1.2',
		'bounceIn2'		:'n:bounceIn2 d:0.5 backfaceVisibility:hidden kf:class e:elastic|kf:100 sc:1.2',
		'bounceOut2'	:'n:bounceOut2 d:0.5 backfaceVisibility:hidden kf:class e:elastic|kf:100 sc:0.8',
		'rotate'		:'n:rotate d:0.3 backfaceVisibility:hidden kf:class|kf:100 rot:4',
		'floating2'		:'n:floating2 d:0.3 backfaceVisibility:hidden kf:class|kf:100 y:-8',
		'sink'			:'n:sink d:0.3 backfaceVisibility:hidden kf:class|kf:100 y:8',
		'bob'			:'n:bob d:1.5 loop:-1 kf:class backfaceVisibility:hidden|kf:0 y:-8|kf:50 y:-4|kf:100 y:-8',
		'hang'			:'n:hang d:1.5 e:easeInOut fillMode:forwards dir:>< loop:-1 backfaceVisibility:hidden kf:class|kf:0 y:8|kf:50 y:4|kf:100 y:8',
		'skewForward'	:'n:skewForward d:0.3 backfaceVisibility:hidden kf:class|kf:100 sk:-10',
		'skewBackward'	:'n:skewBackward d:0.3 backfaceVisibility:hidden kf:class|kf:100 sk:10',
		'wobbleVertical':'n:wobbleVertical d:1 backfaceVisibility:hidden kf:class|kf:100 kf:16.65% y:8|kf:33.3% y:-6|kf:49.95% y:4|kf:66.6% y:-2|kf:83.25% y:1|kf:100 y:0',
		'wobbleHorizontal':'n:wobbleHorizontal d:1 backfaceVisibility:hidden kf:class|kf:16.65% x:8|kf:33.3% x:-6|kf:49.95% x:4|kf:66.6% x:-2|kf:83.25% x:1|kf:100 x:0',
		'wobbleToBottomRight':'n:wobbleToBottomRight d:1 backfaceVisibility:hidden kf:class|kf:16.65% x:8 y:8|kf:33.3% x:-6 y:-6|kf:49.95% x:4 y:4|kf:66.6% x:-2 y:-2|kf:83.25% x:1 y:1|kf:100 x:0 y:0',
		'wobbleToTopRight':'n:wobbleToTopRight d:1 backfaceVisibility:hidden kf:class|kf:16.65% x:8 y:-8|kf:33.3% x:-6 y:6|kf:49.95% x:4 y:-4|kf:66.6% x:-2 y:2|kf:83.25% x:1 y:-1|kf:100 x:0 y:0',
		'wobbleTop'		:'n:wobbleTop d:1 backfaceVisibility:hidden to:0%,100% kf:class|kf:16.65% sk:-12|kf:33.3% sk:10|kf:49.95% sk:-6|kf:66.6% sk:4|kf:83.25% sk:-2|kf:100 sk:0',
		'wobbleBottom'	:'n:wobbleBottom d:1 backfaceVisibility:hidden to:100%,0% kf:class|kf:16.65% sk:-12|kf:33.3% sk:10|kf:49.95% sk:-6|kf:66.6% sk:4|kf:83.25% sk:-2|kf:100 sk:0',
		'wobbleSkew'	:'n:wobbleSkew d:1 backfaceVisibility:hidden kf:class|kf:16.65% sk:-12|kf:33.3% sk:10|kf:49.95% sk:-6|kf:66.6% sk:4|kf:83.25% sk:-2|kf:100 sk:0',
		'buzz'			:'n:buzz d:0.15 loop:-1 e:linear backfaceVisibility:hidden kf:class|kf:50 x:3 rot:2|kf:100 x:-3 rot:-2',
		'buzzOut'		:'n:buzzOut d:0.75 e:linear backfaceVisibility:hidden kf:class|kf:10%,30% x:3 rot:2|kf:20%,40% x:-3 rot:-2|kf:50%,70% x:2 rot:1|kf:60%,80% x:-2 rot:-1|kf:90 x:1 rot:0|kf:100 x:-1 rot:0',
		//CHRISTIAN PUCCI Magic Animations
		'magic'			:'n:magic d:1 kf:0 to:100%,200% sc:1 rot:0 op:1|kf:100 to:100%,500% sc:0 rot:270',
		'openDownLeft'	:'n:openDownLeft d:1 kf:0 to:lb rot:0 e:easeOut|kf:100 to:lb rot:-110 e:easeInOut',
		'openDownRight'	:'n:openDownRight d:1 kf:0 to:lb rot:0 e:easeOut|kf:100 to:lb rot:110 e:easeInOut',
		'openUpLeft'	:'n:openUpLeft d:1 kf:0 to:lt rot:0 e:easeOut|kf:100 to:lt rot:110 e:easeInOut',
		'openUpRight'	:'n:openDownRight d:1 kf:0 to:lt rot:0 e:easeOut|kf:100 to:lt rot:-110 e:easeInOut',
		'openDownLeftRetourn':'n:openDownLeftRetourn d:1 kf:0 to:lb rot:-110 e:easeInOut|kf:100 to:lb rot:0 e:easeOut',
		'openDownRightRetourn':'n:openDownRightRetourn d:1 kf:0 to:rb rot:110 e:easeInOut|kf:100 to:rb rot:0 e:easeOut',
		'openUpLeftRetourn':'n:openUpLeftRetourn d:1 kf:0 to:lt rot:110 e:easeInOut|kf:100 to:lt rot:0 e:easeOut',
		'openUpRightRetourn':'n:openUpRightRetourn d:1 kf:0 to:rt rot:-110 e:easeInOut|kf:100 to:rt rot:0 e:easeOut',
		'openDownLeftOut':'n:openDownLeftOut d:1 kf:0 to:lb rot:0 op:1 e:easeOut|kf:100 to:lb rot:-110 op:0 e:easeInOut',
		'openDownRightOut':'n:openDownRightOut d:1 kf:0 op:1 to:rb rot:0 e:easeOut|kf:100 op:0 to:rb rot:110 e:easeInOut',
		'openUpLeftOut':'n:openUpLeftOut d:1 kf:0 op:1 to:lt rot:0 e:easeOut|kf:100 op:0 to:lt rot:110 e:easeInOut',
		'openUpRightOut':'n:openUpRightOut d:1 kf:0 op:1 to:rt rot:0 e:easeOut|kf:100 op:0 to:rt rot:-110 e:easeInOut',
		'perspectiveDown':'n:perspectiveDown d:1 kf:0 to:0%,100% p3d:800 r3d:x,0|kf:100 to:0%,100% p3d:800 r3d:x,-180',
		'perspectiveLeft': 'n:perspectiveLeft d:1 kf:0 to:0,0 p3d:800 r3d:y,0|kf:100 to:0,0 p3d:800 r3d:y,-180',
		'perspectiveRight':'n:perspectiveRight d:1 kf:0 to:100%,0 p3d:800 r3d:y,0|kf:100 to:100%,0 p3d:800 r3d:y,180',
		'perspectiveUp':'n:perspectiveUp d:1 kf:0 to:0,0 p3d:800 r3d:x,0|kf:100 to:0,0 p3d:800 r3d:x,180',
		'perspectiveDownRetourn':'n:perspectiveDownRetourn d:1 kf:0 to:0,100% p3d:800 r3d:x,-180|kf:100',
		'perspectiveLeftRetourn':'n:perspectiveLeftRetourn d:1 kf:0 to:0,0 p3d:800 r3d:y,-180|kf:100 to:0,0 p3d:800 r3d:y,0',
		'perspectiveRightRetourn':'n:perspectiveRightRetourn d:1 kf:0 to:100%,0 r3d:y,180|kf:100 to:100%,0 p3d:800 r3d:y,0',
		'perspectiveUpRetourn':'n:perspectiveUpRetourn d:1 to:0,0 p3d:800 r3d:x,180|kf:100 to:0,0 p3d:800 r3d:x,0',
		'puffIn'		: 'n:puffIn d:1 kf:0 op:0 to:cc sc:2 bl:2|kf:100 op:1 to:cc sc:1 bl:0',
		'puffOut'		: 'n:puffOut d:1 kf:0 op:1 to:cc sc:1 bl:0|kf:100 op:0 to:cc sc:2 bl:2',
		'rotateDown'	: 'n:rotateDown d:1 kf:0 op:1 to:0%,0% p3d:800 r3d:x,0 z:0|kf:100 op:0 to:50%,100% p3d:800 r3d:x,-180 z:300',
		'rotateLeft'	: 'n:rotateLeft d:1 kf:0 op:1 to:0%,0% p3d:800 r3d:y,0 z:0|kf:100 op:0 to:50%,0% p3d:800 r3d:y,180 z:300',
		'rotateRight'	: 'n:rotateRight d:1 kf:0 op:1 to:0%,0% p3d:800 r3d:y,0 z:0|kf:100 op:0 to:50%,0% p3d:800 r3d:y,-180 z:150',
		'rotateUp'		: 'n:rotateUp d:1 kf:0 op:1 to:0%,0% p3d:800 r3d:x,0 z:0|kf:100 op:0 to:0%,50% p3d:800 r3d:x,180 z:100',
		'swap'			: 'n:swap d:1 kf:0 op:0 to:0%,100% sc:0 x:-700|kf:100 op:1 to:100%,100% sc:1 x:0',
		'twisterInDown'	: 'n:twisterInDown d:1 kf:0%,30% op:0 to:0%,100% sc:0 rot:360 y:-100%|kf:100 to:100%,100% sc:1 rot:0 y:0',
		'twisterInUp'	: 'n:twisterInUp d:1 kf:0%,30% op:0 to:0%,100% sc:0 rot:360 y:100%|kf:100 to:100%,100% sc:1 rot:0 y:0',
		'vanishIn'		: 'n:vanishIn d:1 kf:0 op:0 to:50%,50% sc:2 bl:90|kf:100 op:1 to:50%,50% sc:1 bl:0',
		'vanishOut'		: 'n:vanishOut d:1 kf:0 op:1 to:50%,50% sc:1 bl:0|kf:100 op:0 to:50%,50% sc:2 bl:20',
		'swashIn'		: 'n:swashIn d:1 kf:0 op:0 to:50%,50% sc:0|kf:90 op:1 to:50%,50% sc:0.9|kf:100 op:1 to:50%,50% sc:1',
		'swashOut'		: 'n:swashOut d:1 kf:0 op:1 to:50%,50% sc:1|kf:80 op:1 to:50%,50% sc:0.9|kf:100 to:50%,50% sc:0',
		'foolishOut'	: 'n:foolishOut d:1 kf:0 op:1 to:50%,50% sc:1 rot:360|kf:20 op:1 to:0%,0% sc:0.5 rot:0|kf:40 op:1 to:100%,100% sc:0.5 rot:0|kf:60 op:1 to:0% sc:0.5 rot:0|kf:80 to:0%,100% sc:0.5 rot:0|kf:100 op:0 to:50%,50% sc:0 rot:0',
		'foolishIn'		: 'n:foolishIn d:1 kf:0 op:0 to:50%,50% sc:0 rot:360|kf:20 op:1 to:0%,100% sc:0.5 rot:0|kf:40 op:1 to:100%,100% sc:0.5 rot:0|kf:60 op:1 to:0% sc:0.5 rot:0|kf:80 op:1 to:0%,0% sc:0.5 rot:0|kf:100 op:1 to:50%,50% sc:1 rot:0',
		'holeOut'		: 'n:holeOut d:1 kf:0 op:1 to:50%,50% sc:1 r3d:y,0|kf:100 op:0 to:50%,50% sc:0 r3d:y,180',
		'tinRightOut'	: 'n:tinRightOut d:1 kf:0%,20%,40%,50% op:1 sc:1 x:0|kf:10%,30% op:1 sc:1.1 x:0|kf:100 op:0 sc:1 x:900%',
		'tinLeftOut'	: 'n:tinLeftOut d:1 kf:0%,20%,40%,50% op:1 sc:1 x:0|kf:10%,30% op:1 sc:1.1 x:0|kf:100 op:0 sc:1 x:-900%',
		'tinUpOut'		: 'n:tinUpOut d:1 kf:0%,20%,40%,50% op:1 sc:1 y:0|kf:10%,30% op:1 sc:1.1 y:0|kf:100 op:0 sc:1 y:-900%',
		'tinDownOut'	: 'n:tinDownOut d:1 kf:0%,20%,40%,50% op:1 sc:1 y:0|kf:10%,30% op:1 sc:1.1 y:0|kf:100 op:0 sc:1 y:900%',
		'tinRightIn'	: 'n:tinRightIn d:1 kf:0 op:0 sc:1 x:900%|kf:50%,70%,90% op:1 sc:1.1 x:0|kf:60%,80%,100% op:1 sc:1 x:0',
		'tinLeftIn'		: 'n:tinLeftIn d:1 kf:0 op:0 sc:1 x:-900%|kf:50%,70%,90% op:1 sc:1.1 x:0|kf:60%,80%,100% op:1 sc:1 x:0',
		'tinUpIn'		: 'n:tinUpIn d:1 kf:0 op:0 sc:1 y:-900%|kf:50%,70%,90% op:1 sc:1.1 y:0|kf:60%,80%,100% op:1 sc:1 y:0',
		'tinDownIn'		: 'n:tinDownIn d:1 kf:0 op:0 sc:1 y:900%|kf:50%,70%,90% op:1 sc:1.1 y:0|kf:60%,80%,100% op:1 sc:1 y:0',
		'bombRightOut'	: 'n:bombRightOut d:1 kf:0 op:1 to:50%,50% rot:0 bl:0|kf:50 op:1 to:200%,50% rot:160 bl:0|kf:100 op:0 to:200%,50% rot:160 bl:20',
		'bombLeftOut'	: 'n:bombLeftOut d:1 kf:0 op:1 to:50%,50% rot:0 bl:0|kf:50 op:1 to:-100%,50% rot:-160 bl:0|kf:100 op:0 to:-100%,50% rot:-160 bl:20',
		'boingInUp'		: 'n:boingInUp d:1 to:50%,0% kf:class|kf:0 p3d:800 r3d:x,-90|kf:50 p3d:800 r3d:x,50|kf:100 op:1 p3d:800 r3d:x,0',
		'boingOutDown'	: 'n:boingOutDown d:1 kf:class to:100%,100%|kf:0 p3d:800 r3d:y,0|kf:20 op:1 p3d:800 r3d:y,10|kf:30 op:1 p3d:800 r3d:y,0|kf:40 op:1 p3d:800 r3d:xy,10|kf:100 op:0 p3d:800 r3d:x,90',
		'spaceOutUp'	: 'n:spaceOutUp d:1 kf:0 op:1 to:50%,0% sc:1 y:0%|kf:100 op:0 to:50%,0% sc:0.2 y:-200%',
		'spaceOutRight'	: 'n:spaceOutRight d:1 kf:0 op:1 to:100%,50% sc:1 x:0%|kf:100 op:0 to:100%,50% sc:0.2 x:200%',
		'spaceOutDown'	: 'n:spaceOutDown d:1 kf:0 op:1 to:50%,100% sc:1 y:0%|kf:100 op:0 to:50%,100% sc:0.2 y:200%',
		'spaceOutLeft'	: 'n:spaceOutLeft d:1 kf:0 op:1 to:0%,50% sc:1 x:0%|kf:100 op:0 to:0%,50% sc:0.2 x:-200%',
		'spaceInUp'		: 'n:spaceInUp d:1 kf:0 op:0 to:50%,0% sc:0.2 y:-200%|kf:100 op:1 to:50%,0% sc:1 y:0%',
		'spaceInRight'	: 'n:spaceInRight d:1 kf:0 op:0 to:100%,50% sc:0.2 x:200%|kf:100 op:1 to:100%,50% sc:1 x:0%',
		'spaceInDown'	: 'n:spaceInDown d:1 kf:0 op:0 to:50%,100% sc:0.2 y:200%|kf:100 op:1 to:50%,100% sc:1 y:0%',
		'spaceInLeft'	: 'n:spaceInLeft d:1 kf:0 op:0 to:0%,50% sc:0.2 x:-200%|kf:100 op:1 to:0%,50% sc:1 x:0%',
		//Adem Ilter liffect animations
		'pageTop'		: 'n:pageTop d:600ms e:ease fm:both kf:0 op:0 to:ct p3d:400 r3d:x,90|kf:100 op:1 to:ct p3d:400 r3d:x,0',
		'pageTopBack'	: 'n:pageTopBack d:600ms e:ease fm:both kf:0 op:0 to:ct p3d:400 r3d:x,-90|kf:100 op:1 to:ct p3d:400 r3d:x,0',
		'pageRight'		: 'n:pageRight d:600ms e:ease fm:both kf:0 op:0 to:rc p3d:400 r3d:y,90|kf:100 op:1 to:rc p3d:400 r3d:y,0',
		'pageRightBack'	: 'n:pageRightBack d:600ms e:ease fm:both kf:0 op:0 to:rc p3d:400 r3d:y,-90|kf:100 op:1 to:rc p3d:400 r3d:y,0',
		'pageBottom'	: 'n:pageBottom d:600ms e:ease fm:both kf:0 op:0 to:ct p3d:400 r3d:x,90|kf:100 op:1 to:ct p3d:400 r3d:x,0',
		'pageBottomBack': 'n:pageBottomBack d:600ms e:ease fm:both kf:0 op:0 to:ct p3d:400 r3d:x,-90|kf:100 op:1 to:ct p3d:400 r3d:x,0',
		'pageLeft'		: 'n:pageLeft d:600ms e:ease fm:both kf:0 op:0 to:lc p3d:400 r3d:y,90|kf:100 op:1 to:lc p3d:400 r3d:y,0',
		'pageLeftBack'	: 'n:pageLeftBack d:600ms e:ease fm:both kf:0 op:0 to:lc p3d:400 r3d:y,-90|kf:100 op:1 to:lc p3d:400 r3d:y,0',
		'flip2'			: 'n:flip2 d:600ms fm:both kf:0 to:cc e:ease op:0 p3d:500 r3d:y,0 e:easeOut|kf:40 p3d:500 z:150 r3d:y,170 e:easeOut|kf:50 p3d:500 z:150 r3d:y,190 sc:1 e:easeIn|kf:80 p3d:500 r3d:y,360 sc:0.95 e:easeIn|kf:100 op:1 p3d:500 sc:1 e:easeIn',
		'galaxyIn'		: 'n:galaxyIn d:600ms fm:both kf:0 to:cc e:easeOut op:0 p3d:200 sc:3 y:180 r3d:x,80|kf:80 op:1 p3d:200 sc:1 r3d:x,60|kf:100 op:1 p3d:200 sc:1 r3d:x0',
		'bobble'		: 'n:bobble d:2 loop:-1 y:0% e:easeIn|y:10% e:easeOut|y:0%',
		'pulsate'		: 'n:pulsate d:3 e:linear loop:-1 kf:0 sc:1|kf:30 sc:1.4|kf:50 sc:1|kf:100 sc:1',
		'bump'			: 'n:bump d:3 e:linear dy:2 loop:-1 y:0|y:-10|y:0|y:10|y:0'
	}
	var tutorial = {
		'Tutorial: Timeline sketch (special characters)' :'[u.U.d.D.r.R.l.L.w.W.h.H.s.S.k.K.t.T.x.X.y.Y.z.Z.f.F.p.P.v.V.+.-.<.>.^._.@.0.5.1.#.=.8.2.4.6.7.9.m.M.n.N]',
		'Tutorial: Timeline sketch' :'[.....*....**..*.*......*]',
		'Tutorial: Walk cycle':'n:walk dy:-0.5 loop:-1 kf:class e:linear to:50%,5%|kd:0 x:-20 y:0 rot:25|kd:0.3 x:0 y:-10 rot:-5|kd:0.2 x:20 y:0 rot:-20|kd:0.3 y:0 rot:0|kd:0.2 x:-20 y:0 rot:25',
		'Tutorial: Squash & Stretch' :'n:squashStretch loop:-1 dir:>< kf:class to:cb|ss:0.8|ss:1.3',
		'Tutorial: Keyframe duration':'n:randomName kf:class x:-200 y:-50% sc:0.2 rot:-20 to:bl bl:5 op:0|kd:0.2 op:1|kd:0.6 sc:1 sk:-20,0 x:25 y:0 e:fastOut|kd:0.3 sk:20,0 rot:-10 x:0 e:slowIn bl:0|kd:0.2 bl:0 op:1 transform:none',
		'Tutorial: Multiple elements':'n:sync*10 loop:-1 d:3 dy:100ms kf:0,100 sc:0 spin:0|kf:45,55 sc:1 spin:3',
		'Tutorial: Animated backgrounds 2' :'n:gradientAnimation2 d:1 dir:> loop:-1 e:linear blg:br,gold,crimson bgs:50%,50% kf:class|kf:0 bgp:tl|kf:100 bgp:br',
		'Tutorial: Animated backgrounds 1' :'n:gradientAnimation1 d:3 dir:> loop:-1 e:linear blg:t,gold,crimson,gold bgs:200%,200% kf:class|kf:0 bgp:0%,0%|kf:100 bgp:-200%,-200%',
		'Tutorial: Combine filters':'gs:1 bl:10',
		'Tutorial: Saturate filter':'sat:10',
		'Tutorial: Invert filter':'inv:1',
		'Tutorial: Hue-Rotate filter':'hue:180',
		'Tutorial: Contrast filter':'con:10',
		'Tutorial: Brightness filter':'bri:10',
		'Tutorial: Sepia filter':'sep:1',
		'Tutorial: Drop Shadow filter': 'ds:1,10,6,#CCC',
		'Tutorial: Grayscale filter': 'gs:0|gs:1',
		'Tutorial: Blur filter': 'bl:0|bl:10',
		'Tutorial: steps easing (sprite animation)': 'n:frameWidthIs100pxImageWidthIs500px d:2 loop:-1 steps:4 fps:4 bgp:-400px,0px',
		'Tutorial: Rotate 3 times' : 'spin:3',
		'Tutorial: 3D Transforms': 'n:my3D kf:0 p3d:800 r3d:xy,180 t3d:25,30,15|kf:100 p3d:300 rx:90 ry:-90 z:50',
		'Tutorial: Transforms': 'n:myTransforms kf:0 to:tl x:0 y:0 sc:1 rot:180 sk:10|kf:100 to:b x:100 y:-50 sc:2.2 rot:0 sk:0',
		'Tutorial: CSS properties (shorthand)' : 'n:myCSS l:100 t:25 w:50 h:50 bgc:#F00|l:0 t:0 w:200 h:25 bgc:#00F',
		'Tutorial: CSS properties' : 'n:myCascadingStyleSheets left:100px top:25px width:50px height:50px background-color:#F00|left:0px top:0px width:200px height:25px background-color:#00F',
		'Tutorial: Auto-keyframes': 'x:0|x:100|x:150|x:125|x:110',
		'Tutorial: Keyframes' : 'kf:0|kf:30|kf:50,70|kf:60|kf:100',
		'Tutorial: Animation Parameters':'n:animationName dur:2 e:easeOut dy:3 loop:4 dir:>< fm:<> sh:true'
	}
	//check if a property is a configuration property or css property
	function isCSS(prop){	
		return (('isTransition name duration loop ease delay fillMode useAll percent transform useShortHand useHacks transformOrigin direction animationTimingFunction animationPlayState play animationIterationCount backfaceVisibility filter').indexOf(prop) === -1);
	}
	//a data map to shorcut words so tweens can be created Emmet style
	var propMap = {
		'd'		:'duration',
		'dur'	:'duration',
		'dir'	:'direction',
		'e'		:'animationTimingFunction',
		'steps'	:'animationTimingFunction',
		'fps'	:'duration',
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
		'blg'	:'background',
		'bgp'	:'background-position',
		'bgs'	:'background-size',
		'c'		:'color',
		'bd'	:'border',
		'br'	:'border-radius',
		'x' 	:'translateX',
		'y' 	:'translateY',
		'z'		:'translateZ',
		'tr'	:'translate',
		'rot'	:'rotate',
		'spin'	:'rotate',
		'sk'	:'skew',
		'sc'	:'scale',
		'scx'	:'scaleX',
		'scy' 	:'scaleY',
		'rx'	:'rotateX',
		'ry'	:'rotateY',
		'rz'	:'rotateZ',
		'to' 	:'transformOrigin',
		'r3d'	:'rotate3d',
		't3d'	:'translate3d',
		's3d'	:'scale3d',
		'p3d'	:'perspective',
		'op'	:'opacity',
		'bl'	:'blur',
		'gs'	:'grayscale',
		'sep'	:'sepia',
		'bri'	:'brightness',
		'con'	:'contrast',
		'hue'	:'hueRotate',
		'inv'	:'invert',
		'sat'	:'saturate',
		'ds'	:'dropShadow',
		'ss'	:'scale',
		'kf' 	:'percent',
		'kd'	:'keyframeDuration',
		'fm'	:'fillMode',
		'sh'	:'useShortHand',
		'vis'	:'visibility'
	};
	//a data map to format properties
	var formatMap = {
		'vis':function(v){
			return (v === '1' || v.toLowerCase() === 'true')?'visible':'hidden';
		},
		'sh':function(v){
			return Boolean(v.toLowerCase());
		},
		'ss':function(v){
			var raw = [1,1], x = 1, y = 1, s = 1;
			if(v.indexOf(',') != -1){
				raw = v.split(',');
				v = parseFloat(raw[0]);
				s = parseFloat(raw[1]);
			}else{
				v = parseFloat(v);
			}
			v = (v > 2)?0.9:(v <= 0)?0.1:v;
			if(v < 1){
				x = v;
				y = parseFloat((1 + (1 - v)).toFixed(3));
			}else if(v > 1){
				x = v;
				y = parseFloat((1 - (v - 1)).toFixed(3));
			}
			return 'scale(' + (x * s) + ',' + (y * s) + ') ';
		},
		'bl':function(v){
			return 'blur(' + v +'px) ';
		},
		'gs':function(v){
			return 'grayscale(' + v + ') ';
		},
		'sep':function(v){
			return 'sepia(' + v + ') ';
		},
		'bri':function(v){
			return 'brightness(' + v + ') ';
		},
		'con':function(v){
			return 'contrast(' + v + ') ';
		},
		'hue':function(v){
			return 'hue-rotate(' + v + 'deg) ';
		},
		'inv':function(v){
			return 'invert(' + v + ') ';
		},
		'sat':function(v){
			return 'saturate(' + v + ') ';
		},
		'ds':function(v){
			var raw = v.split(','),
			defaults = {
				offset:'5px ',
				blurRadius:'5px ',
				spreadDistance:'5px ',
				color:'#000 ',
				inset:'inset '
			};
			return 'drop-shadow(' + ((raw[0])?raw[0]+'px ':defaults.offset) + ((raw[1])?raw[1]+'px ':((raw[0])?raw[0]+'px ':defaults.offset)) + (raw[2]?raw[2] + 'px ':defaults.blurRadius) + (raw[3]?raw[3] + ' ':defaults.color) + (raw[4]?'inset':'') + ') ';
		},
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
				'x'  :'1,0,0,',
				'y'  :'0,1,0,',
				'z'  :'0,0,1,',
				'xy' :'1,1,0,',
				'xz' :'1,0,1,',
				'yz' :'0,1,1,',
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
		'_numberPX' : function(v){
			if(v.indexOf('%') != -1){
				return v;
			}
			if(v.indexOf('px') == -1){
				if(!isNaN(parseFloat(v))){
					return v + 'px';
				}
			}
			return v;
		},
		'color' : function(v){
			if(v.indexOf('#') == -1){
				if(/(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(v)){
					return '#' + v;
				}
			}
			return v;
		},
		'tr':function(v){
			return 'translate(' + v + ') ';
		},
		'_transPX' : function(v){
			if(v.indexOf('%') != -1){
				return v;
			}
			return v +'px';
		},
		'z' : function(v){
			if(v.indexOf('%') != -1){
				return 'translateZ(' + v + ') ';
			}
			return 'translateZ(' + v +'px) ';
		},
		'deg': function(v){
			return v +'deg'
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
		'kf' : function(v){
			var s = '';
			if(v.toLowerCase() === 'class'){
				return 'class';
			}
			if(v.indexOf(',')!= -1){
				s = v.indexOf('%') != -1 ? v : v.replace(/,/g, ' ').replace(/ /g,'%,') + '%';
			}else if(v.indexOf('%') != -1){
				s = v;
			}else {
				s = v + '%';
			}
			return s;
		},
		'to' : function(v){
			var map = {
				'lb':'left bottom',
				'lt':'left top',
				'lc':'left center',
				'rb':'right bottom',
				'rt':'right top',
				'rc':'right center',
				'cc':'center center',
				'cb':'center bottom',
				'ct':'center top'
			}
			map['b'] = map.cb;
			map['bl'] = map.lb;
			map['br'] = map.rb;
			map['l'] = map.lc;
			map['r'] = map.rc;
			map['t'] = map.ct;
			map['tl'] = map.lt;
			map['tr'] = map.rt;
			if(map[v]){
				return map[v];
			}
			if(v.indexOf(',') != -1){
				return v.replace(',',' ');
			}
			return v;
		},
		'dir' : function(v){
			var map = {
				'>':'normal',
				'<':'reverse',
				'><':'alternate',
				'<>':'alternate-reverse'
			}
			if(map[v]){
				return map[v];
			}
			return v;
		},
		'fm' : function(v){
			var map = {
				'>':'forwards',
				'<':'backwards',
				'><':'both',
				'<>':'both'
			}
			if(map[v]){
				return map[v];
			}
			return v;
		},
		'steps' : function(v){
			return 'steps(' + v + ')';
		},
		'fps' : function(v){
			if(v.indexOf(',') != -1){
				var raw = v.split(',');
				return ((parseInt(raw[1])/1000) * parseInt(raw[0])).toFixed(1) + 's';
			}
			return (60/1000 * parseInt(v)).toFixed(1) + 's';
		},
		'bgp':function(v){
			var map = {
				't' :'50% 0%',
				'b' :'50% 100%',
				'l':'0% 50%',
				'tl':'0% 0%',
				'bl':'0% 100%',
				'tr':'100% 0%',
				'r' :'100% 50%',
				'br':'100% 100%',
			};
			map.horizontal = map.l;
			map.vertical   = map.b;
			map.diagonal   = map.bl
			map.h = map.horizontal;
			map.v = map.vertical;
			map.d = map.diagonal;
			if(map[v]){
				return map[v];
			}
			if(v.indexOf(',')){
				return v.replace(',',' ');
			}
			return v;
		},
		'bgs':function(v){
			if(v === '<>'){
				return 'contain';
			}
			if(v === '><'){
				return 'cover'
			}
			if(v.indexOf(',') != -1){
				var raw = v.split(',');
				if(raw[0].indexOf('%') == -1){
					raw[0] += 'px';
				}
				if(raw[1].indexOf('%') == -1){
					raw[1] += 'px';
				}
				return raw[0] + ' ' + raw[1];
			}else{
				if(v.indexOf('%') == -1){
					return v + 'px';
				}
			}
			return v;
		},
		'blg': function(v){
			//http://www.ianforrest.me/
			var map = {
				'b':'0deg',
				'l':'90deg',
				'tl':'135deg',
				'bl':'45deg',
				't' :'180deg', 
				'tr':'225deg',
				'r' :'270deg',
				'br':'315deg',
			};
			map.horizontal = map.l;
			map.vertical = map.b;
			map.diagonal = map.bl
			map.h = map.horizontal;
			map.v = map.vertical;
			map.d = map.diagonal;
			var	raw = v.split(','),
				a = (map[raw[0]])?map[raw[0]]:raw[0] + 'deg',
				s = 'linear-gradient(' + a ;
			for(var i=1; i<raw.length; i++)	{
				s += ',' + raw[i];
			}
			s += ')';
			return s;
		},
		'none' : function(v){return v}
	};
	formatMap['x'] = formatMap['y'] = formatMap._transPX;
	formatMap['h'] = formatMap['t'] = formatMap['l'] = formatMap['r'] = formatMap['b'] = formatMap['fz'] = formatMap['w'] = formatMap['br'] = formatMap['_numberPX'];
	formatMap['bg'] = formatMap['bgc'] = formatMap['c'] = formatMap['color'];
	formatMap['rx'] = formatMap['ry'] = formatMap['rz'] = formatMap.deg;
	formatMap.d = formatMap.dur = formatMap.e = formatMap.m = formatMap.p = formatMap.op = formatMap.bd = formatMap.dy = formatMap.n = formatMap.kd = formatMap['none'];
	function cleanWhiteSpace(s){
		return s.replace(/\s\s+/g, ' ');
	}
	function trim(s){
		return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	//GLOBAL
	var global = {};
	global.className = 'myTween';
	global.code = '/* No css has been created */';
	global.command = '/**/';
	global.frameQty = 0;
	global.startFrom = 0;
	//create timeline
	function createTimeline(v){
		function isKeyframe(v){
			return (('*uUdDrRlLwWhHsSkKtTxXyYzZfFvV+-<>^_@#=015iI!234|6789oOmMnNbBpPqQcCeE/\\').indexOf(v) != -1)
		}
		function randomColor(){
			return '#' + Math.floor(Math.random()*16777215).toString(16); 
		}
		function getKeyframeValue(v){
			var map = {
				'*' : '',
				'u'	: ' y:-10',
				'U'	: ' y:-100%',
				'd'	: ' y:10',
				'D' : ' y:100%',
				'r' : ' x:10',
				'R' : ' x:100%',
				'l' : ' x:-10',
				'L' : ' x:-100%',
				'w' : ' w:0',
				'W' : ' w:auto',
				'h' : ' h:0',
				'H' : ' h:auto',
				's' : ' sc:0.5',
				'S' : ' sc:2',
				'k' : ' sk:-20',
				'K' : ' sk:20',
				't' : ' ss:1.5',
				'T' : ' ss:0.5',
				'z' : ' z:-800',
				'Z' : ' z:300',
				'f' : ' sc:-1,1',
				'F' : ' sc:1,-1',
				'+' : ' rot:45',
				'-' : ' rot:-45',
				'<' : ' rot:-90',
				'>' : ' rot:90',
				'^' : ' rot:0',
				'i' : ' rot:-180',
				'I' : ' rot:180',
				'@' : ' spin:1',
				'x' : ' rx:-90',
				'X' : ' rx:90',
				'y' : ' ry:-90',
				'Y' : ' ry:90',
				'/' : ' ry:-60',
				'\\': ' ry:60',
				'_' : ' to:cb',
				'#' : ' bgc:' + randomColor(),
				'=' : ' op:1 transform:none',
				'v' : ' vis:0',
				'V' : ' vis:1',
				'0' : ' op:0',
				'5' : ' op:0.5',
				'1' : ' op:1',
				'o' : ' op:0 sc:0',
				'O' : ' op:0 sc:3',
				'7' : ' op:0 x:-263% y:-425%',
				'8' : ' op:0 y:-500%',
				'9' : ' op:0 x:263% y:-425%',
				'|' : ' op:0 x:0 y:0',
				'4' : ' op:0 x:-500%',
				'6' : ' op:0 x:500%',
				'!' : ' op:0 x:-263% y:425%',
				'2' : ' op:0 y:500%',
				'3' : ' op:0 x:263% y:425%',
				'm' : ' op:0 rx:-180 z:300',
				'M' : ' op:1 rx:0 z:300',
				'n' : ' op:0 rx:180 z:300',
				'N' : ' op:1 rx:0 z:300',
				'q' : ' op:0 ry:-180 z:300',
				'Q' : ' op:1 ry:0 z:300',
				'p' : ' op:0 ry:180 z:300',
				'P' : ' op:1 ry:0 z:300',
				'c' : ' br:0',
				'C' : ' br:50',
				'b' : ' bl:0',
				'B' : ' bl:10',
				'e' : ' e:easeIn',
				'E' : ' e:easeOut'
			}
			return map[v];
		}
		//clean up
		var t = trim(v);
		var params = '()[]{}';
		if(params.indexOf(t[0]) === -1 && params.indexOf(t[v.length - 1]) === -1){
			return false;
		}
		//[......*..**...]
		var r = 'n:randomName e:linear d:';
		var loop = ' loop:1';
		var rev = false;
		//check looping and type of animation
		if(t[0] == '('){
			loop = ' loop:-1';
		}else if(t[0] == ')'){
			loop = ' loop:-1';
			rev = true;
		}else if(t[0] == ']'){
			rev = true;
		}
		//remove parenthesis
		for(var i=0; i<params.length; i++){
			t = t.replace(params[i],'');
		}
		if(rev){
			t = t.split('').reverse().join('');
		}
		var l = t.length;
		//duration
		r += parseFloat((l * 0.06).toFixed(2)) + 's';
		r += loop;
		r += ' to:cc kf:class';
		for(var i=0; i<l; i++){
			if(isKeyframe(t[i])){
				if(i == 0){
					r += '|kf:0' + getKeyframeValue(t[i]);
				}else if(i == l - 1){
					r += '|kf:100' + getKeyframeValue(t[i]);
				}else{
					r += '|kf:' + parseFloat(((i+1)/l * 100).toFixed(2)) + getKeyframeValue(t[i]);
				}
			}
		}
		return r;
	}
	//receives an object or spring and parse and reads its data
	function parse(val){
		//RESET
		global.className = 'myTween';
		global.code = '/* No css has been created */';
		global.command = '/**/';
		global.frameQty = 0;
		global.startFrom = 0;
		//begin parsing
		var fr = [];
		if(typeof val === 'string'){
			if(preMade[val]){
				global.command = val;
				return parse(preMade[val]);
			}
			//is it a timeline?
			var timeline = createTimeline(val);
			if(timeline){
				global.command = timeline;
				return parse(global.command);
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
		global.frameQty = fr.length
		for(var i=0;i<global.frameQty;i++){
			var obj;
			//check if string
			if(typeof fr[i] === 'string'){
				obj = {};
				var raw = trim(fr[i]).split(' ');
				for(var j = 0; j < raw.length; j++){
					var nameValue = raw[j].split(':');
					obj[nameValue[0]] = (nameValue[0] in formatMap)?formatMap[nameValue[0]](nameValue[1],i):nameValue[1];
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
			if('translate' in o || 'translateX' in o || 'translateY' in o || 'translateZ' in o || 'rotate' in o || 'skew' in o || 'scale' in o || 'scaleX' in o || 'scaleY' in o || 'perspective' in o || 'scale3d' in o || 'translate3d' in o || 'rotate3d' in o || 'rotateX' in o || 'rotateY' in o || 'rotateZ' in o){
				o['transform'] = '';
				if('perspective' in o){
					o['transform'] += o['perspective'];
					global.has3D = true;
					delete o['perspective'];
				}
				if('translate3d' in o){
					o['transform'] += o['translate3d'];
					global.has3D = true;
					delete o['translate3d'];
				}
				if('scale3d' in o){
					o['transform'] += o['scale3d'];
					global.has3D = true;
					delete o['scale3d'];
				}
				if('rotate3d' in o){
					o['transform'] += o['rotate3d'];
					global.has3D = true;
					delete o['rotate3d'];
				}
				if('rotateX' in o){
					o['transform'] += 'rotateX(' + o['rotateX'] + ') ';
					global.has3D = true;
					delete o['rotateX'];
				}
				if('rotateY' in o){
					o['transform'] += 'rotateY(' + o['rotateY']+ ') ';
					global.has3D = true;
					delete o['rotateY'];
				}
				if('rotateZ' in o){
					o['transform'] += 'rotateZ(' + o['rotateZ']+ ') ';
					global.has3D = true;
					delete o['rotateZ'];
				}
				if('translateZ' in o){
					o['transform'] += o['translateZ'];
					global.has3D = true;
					delete o['translateZ'];
				}
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
				if('translate' in o){
					o['transform'] += o['translate'];
					delete o['translate'];
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
			//clean filters
			if('blur' in o || 'grayscale' in o || 'sepia' in o || 'brightness' in o || 'contrast' in o || 'hueRotate' in o || 'invert' in o || 'saturate' in o || 'dropShadow' in o){
				o['filter'] = '';
				if('blur' in o){
					o['filter'] += o['blur'];
					delete o['blur'];
				}
				if('grayscale' in o){
					o['filter'] += o['grayscale'];
					delete o['grayscale'];
				}
				if('sepia' in o){
					o['filter'] += o['sepia'];
					delete o['sepia'];
				}
				if('brightness' in o){
					o['filter'] += o['brightness'];
					delete o['brightness'];
				}
				if('contrast' in o){
					o['filter'] += o['contrast'];
					delete o['contrast'];
				}
				if('hueRotate' in o){
					o['filter'] += o['hueRotate'];
					delete o['hueRotate'];
				}
				if('invert' in o){
					o['filter'] += o['invert'];
					delete o['invert'];
				}
				if('saturate' in o){
					o['filter'] += o['saturate'];
					delete o['saturate'];
				}
				if('dropShadow' in o){
					o['filter'] += o['dropShadow'];
					delete o['dropShadow'];
				}
			}
			if(o.percent === 'class'){
				global.startFrom = 1;
			}
			frames.push(o);
		}
		global.frameQty = frames.length;
		global.command = val;
		return fixKeyframePercent(frames);
	}
	function fixKeyframePercent(frames){
		var dur = 0;
		var isKeyframeDuration = false;
		var i = 0;
		for(i = global.startFrom; i < global.frameQty; i++){
			var o = frames[i];
			//check if percentage is present
			if(!o.percent){
				o.percent = (i == global.startFrom)?'0%':(i == global.frameQty - 1)?'100%':(Math.floor(i/((global.frameQty - global.startFrom) - 1) * 100)) + '%';
			}
			//use time instead of percent
			if(o.keyframeDuration){
				dur += parseFloat(o.keyframeDuration);
				o._step = dur;
				isKeyframeDuration = true;
			}else{
				dur += 0.5;
				o._step = dur;
			}
		}
		dur = parseFloat(dur.toFixed(3) + '');
		//fix the percentage if there is any keyframeDuration available
		if(isKeyframeDuration){
			for(i = global.startFrom; i < global.frameQty; i++){
				var o = frames[i];
				var pos = (Math.round(o._step/dur * 100));
				o.percent = (i == global.startFrom && o._step == 0)?'0%':(i == global.frameQty - 1 && pos == 100)?'100%':pos + '%';
				delete o['keyframeDuration'];
				delete o['_step'];
			}
			frames[0].duration = dur + '';		
		}else{
			for(i = global.startFrom; i < global.frameQty; i++){
				delete frames[i]['_step'];
			}
		}
		return frames;
	}
	function getKeyframeCSS(k,v,p){
		var s = '',
			_c = ':',
			_e = ';',
			_d = '.',
			_s = ' ',
			_n = '\n',
			_t = '\t',
			_o = '{',
			_x = '}'
			_k = 'keyframes ',
			_w = '-webkit-';
		if(isCSS(k)){
			s += _t + _t + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + _c + _s + v + _e + _n;
		}else if(k === 'transform'){
			s += _t + _t + p + 'transform: ' + v + _e + _n;
		}else if(k === 'transformOrigin'){
			s += _t + _t + p + 'transform-origin: ' + v + _e + _n;
		}else if(k === 'animationTimingFunction'){
			if(v.indexOf('steps') === -1){
				s += _t + _t + p + 'animation-timing-function: ' + (ceaser[v]?ceaser[v]:v) + _e + _n;
			}
		}else if(k === 'backfaceVisibility'){
			s += _t + _t + p + 'backface-visibility: ' + v + _e + _n;
		}else if(k === 'filter'){
			s += _t + _t + _w + 'filter: ' + v + _e + _n;
		}
		return s;
	}
	function getSimpleCSS(k,v){
		var s = '',
			_c = ':',
			_e = ';',
			_d = '.',
			_s = ' ',
			_n = '\n',
			_t = '\t',
			_o = '{',
			_x = '}'
			_k = 'keyframes ',
			_w = '-webkit-';
		if(isCSS(k)){
			s += _t + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + _c + _s + v + _e + _n;
		}else if(k === 'transform'){
			s += _t + 'transform: ' + v + _e + _n;
			s += _t + _w +'transform: ' + v + _e + _n;
		}else if(k === 'transformOrigin'){
			s += _t + 'transform-origin: ' + v + _e + _n;
			s += _t + _w +'transform-origin: ' + v + _e + _n;
		}else if(k === 'backfaceVisibility'){
			s += _t + 'backface-visibility: ' + v + _e + _n;
			s += _t + _w +'backface-visibility: ' + v + _e + _n;
		}else if(k === 'filter'){
			s += _t + _w +'filter: ' + v + _e + _n;
		}
		return s;
	}
	//receives an object the duration and the easing name
	function getCSS(properties, duration, easing){
		var frames = parse(properties),
			prop = frames[0],
			isTransition = (prop.isTransition != undefined)?prop.isTransition:0,
			n = prop.name || global.className,
			d = prop.duration || duration || 0.5,
			l = prop.animationIterationCount || prop.loop || '1',
			e = prop.animationTimingFunction || prop.ease || easing || 'ease',
			ad = prop.direction || 'normal',
			dy = prop.delay || 0,
			fm = prop.fillMode || (parseFloat(dy) !== 0)?'both':'forwards',
			p = prop.percent || 'to',
			isPlaying = prop.play || prop.animationPlayState || 'running',
			useAll = prop.useAll || false,
			useShortHand = prop.useShortHand || false,
			useHacks = Boolean(prop.useHacks) || false,
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
			prefix = ['',_w],
			nTimes = 1,
			nDirection = '>';
		if(n.indexOf('*') != -1){
			var nRaw = n.split('*');
			n = nRaw[0];
			if((nRaw[1]).indexOf(',') != -1){
				var nRawB = (nRaw[1]).split(',');
				nTimes = parseInt(nRawB[0]);
				nDirection = nRawB[1];
			}else{
				nTimes = parseInt(nRaw[1]);
			}
		}
		if(n.toLowerCase() == 'randomname'){
			n = global.className = 'myTween-' + Math.round(Math.random() * 1000);
		}
		global.className = n;
		var dpx  = (d + '').indexOf('ms') != -1?'ms':(d + '').indexOf('s') == -1?'s':'s';
		var dypx = (dy + '').indexOf('ms') != -1?'ms':(dy + '').indexOf('s') == -1?'s':'s';
		d = parseFloat(d);
		dy = parseFloat(dy);
		if(useHacks){
			if(!global.has3D){
				hacks += _t + '/*enable hardware acceleration*/' + _n;
				hacks += _t + 'transform:translateZ(0)' + _e + _n;
				hacks += _t + _w + 'transform:translateZ(0)' + _e + _n + _n;	
			}
			hacks += _t + '/*improve anti-alias*/'  + _n;
			hacks += _t + 'box-shadow: 0 0 1px rgba(0, 0, 0, 0)' + _e + _n + _n;
			hacks += _t + '/*font smoothing*/'  + _n;
			if(!global.has3D){
				hacks += _t + 'backface-visibility: hidden' + _e + _n;
				hacks += _t + _w + 'backface-visibility: hidden' + _e + _n;	
				global.has3D = false;
			}
			hacks += _t + '-moz-osx-font-smoothing: grayscale' + _e + _n + _n;	
		}
		if(l == '-1'){
			l = 'infinite';
		}
		s += '/* '+ global.command + ' */' + _n;
		//KEYFRAMES
		if(isTransition < 1){
			//keyframes
			var fQty = global.frameQty;
			for(var px=0; px < prefix.length; px++){
				if(fQty == 1){
					p = (p != '0%')?(p != 'class')?p:'to':'to';
					t += '@' + prefix[px] + _k + n + _s + _o + _n;
					t += _t + p + _s + _o + _n;
					for(var k in prop){
						t += getKeyframeCSS(k,prop[k],prefix[px]);
					}
					t += _t + _x + _n;
					t += _x + _n;					
				}else{
					t += '@' + prefix[px] + _k + n + _s + _o + _n;
					for(var i = global.startFrom; i < fQty; i++){
						p = (fQty == 2)?(i == 0)?(frames[i].percent === '0%')?'from':frames[i].percent:(frames[i].percent === '100%')?'to':frames[i].percent:frames[i].percent;
						t += _t + p + _s + _o + _n;
						for(var k in frames[i]){
							t += getKeyframeCSS(k,frames[i][k],prefix[px]);
						}
						t += _t + _x + _n;	
					}
					t += _x + _n;
				}
			}
			s += t;
			//class
			function nChildName(i,direction){
				var dir = direction || '>';
				var map = {
					'>' :':nth-child',
					'<' :':nth-last-child',
					'>>':':nth-of-type',
					'<<':':nth-last-of-type'
				}
				return map[dir] + '(' +(i + 1)+ ')';
			}
			var states = _d + n + ':hover, ' + _d + n + ':focus, ' + _d + n + ':active ';
			if(isTransition === 0){
				s += _d + n + _s + _o + _n;
				s += hacks;	
			}else if(isTransition === -1){
				s += _d + n + _s + _o + _n;
				s += hacks;	
				s += _x + _n + _s;
				s += states + _o + _n;
			}else if(isTransition === -2){
				s += _d + n + _s + _o + _n;
				s += hacks;
			}
			//global properties within the class
			if(prop.percent == 'class'){
				t = '';
				for(var k in prop){
					t += getSimpleCSS(k,prop[k],'',false);
				}
				s += t;				
			}
			//animation code
			t = '';
			if(useShortHand){
				t += 'animation: ' + n + _s + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + ((nTimes == 1)?dy + dypx + _s : '' + _s) + l + _s + ad + _e + _n;
				s += _t + t;
				s += _t + _w + t;				
			}else{
				for(var px=0; px < prefix.length; px++){
					t += _t + prefix[px] +'animation-name: ' + n + _e + _n;
					t += _t + prefix[px] +'animation-duration: ' + d + dpx + _e + _n;
					t += _t + prefix[px] +'animation-timing-function: ' + (ceaser[e]?ceaser[e]:e) + _e + _n;
					t += (nTimes == 1)? _t + prefix[px] +'animation-delay: ' + dy + dypx + _e + _n : '';
					t += _t + prefix[px] +'animation-iteration-count: ' + l + _e + _n;
					t += _t + prefix[px] +'animation-direction: ' + ad + _e + _n;
					t += _t + prefix[px] +'animation-fill-mode: ' + fm + _e + _n;
					t += (isTransition === -2)? _t + prefix[px] +'animation-play-state: paused' + _e + _n : _t + prefix[px] +'animation-play-state: ' + isPlaying + _e + _n;					
				}
				s += t;
			}
			s += _x + _n;
			//:nth-child
			for(var nCounter = 0; nCounter < nTimes; ++nCounter){
				if(isTransition === 0 && nTimes > 1){
					s += _d + ((nTimes > 1)?n+nChildName(nCounter,nDirection):n) + _s + _o + _n;
					for(var px=0; px < prefix.length; px++){
						s += _t + prefix[px] +'animation-delay: ' + (dy * nCounter) + dypx + _e + _n;
					}
					s += _x + _n;
				}
			}
			//:hover :focus :active
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
						t += _s + (k).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + _s + d + dpx + _s + ceaser[e] + _s + dy + dypx + ',';
					}else if(k === 'transform'){
						t += _s + 'transform ' + _s + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + dy + dypx + ',';
						t += _s + _w +'transform ' + _s + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + dy + dypx + ',';
					}else if(k === 'transformOrigin'){
						t += _s + 'transform-origin ' + _s + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + dy + dypx + ',';
						t += _s + _w +'transform-origin ' + _s + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + dy + dypx + ',';
					}else if(k === 'backfaceVisibility'){
						t += _s + 'backface-visibility ' + _s + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + dy + dypx + ',';
						t += _s + _w +'backface-visibility ' + _s + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + dy + dypx + ',';
					}else if(k === 'filter'){
						//t += _s + 'filter ' + _s + d + dpx + _s + ceaser[e] + _s + dy + dypx + ',';
						t += _s + _w +'filter ' + _s + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + dy + dypx + ',';
					}
				}	
			}else {
				t += ' all ' + d + dpx + _s + (ceaser[e]?ceaser[e]:e) + _s + dy + dypx + ',';
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
				t += getSimpleCSS(k,prop[k]);
			}
			s += t;
			s += _x + _n;
		}
		global.code = s;
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
		getInteractiveTransition: getInteractiveTransition,
		getTutorial: function(){return tutorial},
		getPreMade: function(){return preMade},
		getClassName: function(){return global.className},
		getCode: function(){return global.code}
	}
})();
