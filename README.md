##vii.js: create CSS3 animations using Javascript##

Please be aware that vii.js is not a library you include in your projects.  Is a tool you use to generate CSS3 animation code.

Therefore something like this:

**vii.k('n:myTween d:1 e:swing kf:0 x:0% op:1|kf:100 x:500% op:0 sc:2')**

It will output this:

    @keyframes myTween {
	from {
		animation-timing-function: cubic-bezier(.175, .885,.32,1.275);
		opacity : 1;
		transform: translateX(0%) ;
	}
	to {
		opacity : 0;
		transform: translateX(500%) scale(2) ;
	}
    }
    @-webkit-keyframes myTween {
	from {
		-webkit-animation-timing-function: cubic-bezier(.175, .885,.32,1.275);
		opacity : 1;
		-webkit-transform: translateX(0%) ;
	}
	to {
		opacity : 0;
		-webkit-transform: translateX(500%) scale(2) ;
	}
    }
    .myTween{
	/*enable hardware acceleration*/
	transform:translateZ(0);
	-webkit-transform:translateZ(0);

	/*improve anti-alias*/
	box-shadow: 0 0 1px rgba(0, 0, 0, 0);

	/*font smoothing*/
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
	-moz-osx-font-smoothing: grayscale;

	animation-name: myTween;
	animation-duration: 1s;
	animation-timing-function: cubic-bezier(.175, .885,.32,1.275);
	animation-delay: 0s;
	animation-iteration-count: 1;
	animation-direction: normal;
	animation-fill-mode: forwards;
	animation-play-state: running;
	-webkit-animation-name: myTween;
	-webkit-animation-duration: 1s;
	-webkit-animation-timing-function: cubic-bezier(.175, .885,.32,1.275);
	-webkit-animation-delay: 0s;
	-webkit-animation-iteration-count: 1;
	-webkit-animation-direction: normal;
	-webkit-animation-fill-mode: forwards;
	-webkit-animation-play-state: running;
    }

## How to use ##
Include vii.js in a html document, open the document in your browser and then open the javascript console and start typing your commands.  Press enter to output the animations.  Copy and paste in a .css file.

## Animation code ##
The commands you pass to vii.js describe css animations and keyframes.  Every command is composed of key:value pairs and separated by a space.

**n:myTween**  provides the animation with the name of "myTween"

**d:2** the duration of the animation will be 2 seconds.  If you want to work with ms units then pass d:2000ms

**e:easeOut** the ease type you want to use for the whole animation

**dy:1** the animation will have a 1 second delay

**loop:3** the animation will repeat 3 times.  If you want the animation to run infinitely use loop:-1

## Keyframe code ##
If you only pass a set of parameters then vii will asume it is a 1 keyframe animation and it will tween the animation from the current state of the element to a final frame.

**vii.k('n:move d:1 e:easeIn w:100')**

Will output the following keyframe:

     @keyframes move {
	   100% {
		   animation-timing-function: ease-in;
		   width : 100px;
	   }
      }
Several keyframes are represented by separating parameters with a pipe character | and by using 'kf' you can designate what frame that is:

**vii.k('kf:0 x:0|kf:100 x:350')**

Will output the following keyframes:

    @keyframes myTween {
	    from {
		    transform: translateX(0px) ;
	    }
	    to {
		    transform: translateX(350px) ;
	    }
    }

(Notice that since the animation contained only 2 frames with values 0 and 100 it will be rendered as a to-from animation).

**vii.k('kf:0 x:0|kf:80 x:400|kf:100 x:350')**

Will output the following keyframes:

    @keyframes myTween {
	    0% {
		    transform: translateX(0px) ;
	    }
	    80% {
		    transform: translateX(400px) ;
	    }
	    100% {
		    transform: translateX(350px) ;
	   }
    }
## Element parameters ##
You can describe elements using the following shortcuts:

**w:100**  it will set the width to 100px if you want to use percentage then use w:100%

**h:100** same as width but for height

**t:50** it will set the top value to 50px

**l:50** same as previous but for left

**r:50** same as previous but for right

**b:50** same as previous but for bottom

you get the idea...

**m** for margin values

**p** for padding values

**fz** for font size

**bg** for background

**bgc** for background-color

**bgp** for background-position

**c** for color

**bd** for border

## CSS Transforms ##

In general you'll want to use CSS Transforms to animate your elements.

**vii.k('x:300 sc:2.5 rot:90')**

Will output the correct transform string

    transform: translateX(300px) scale(2.5) rotate(90deg) ;
(It will also output the prefixed version with -webkit- when required)

**x** for translateX

**y** for translateY

**z** for translateZ

**rot** for 2D rotation (on the Z axis) using degrees

**sc** for x and y scale

**scx** for scaleX

**scy** for scaleY

**sk** for skew

## 3D Transforms ##

CSS 3d transforms are also supported.

**p3d:800** will output perspective(800px)

**t3d:5,4,3** will output translate3d(5px,4px,3px)

**s3d:0.5,1,2**  will output scale3d(0.5,1,2)

**r3d:x,90** will output rotate3d(1,0,0,90deg)

**r3d:xz,45** will output rotate3d(1,0,1,45deg)

**r3d:xyz,270** will output rotate3d(1,1,1,270deg)

##Pre-made animations##

vii.js encapsulate a lot pre-made animations, you only need to provide it its name:

**vii.k('bounce2')**

I went through [Animate.css][1], [CSS3 Animation Cheat Sheet][2], [Hover.css][3] and [Magic CSS][4] and implemented the majority of the animations.

## Transitions ##

Transitions are also implemented in 3 flavors: regular, keyframed and interactive.

Regular transitions only require the set of parameters for the final frame, use method t() to obtain the code:

**vii.t('n:move d:1 e:easeIn w:100')**

Will output:

    .move {
	    /*enable hardware acceleration*/
	    transform:translateZ(0);
	    -webkit-transform:translateZ(0);

	   /*improve anti-alias*/
	    box-shadow: 0 0 1px rgba(0, 0, 0, 0);

	    /*font smoothing*/
	    backface-visibility: hidden;
	    -webkit-backface-visibility: hidden;
	    -moz-osx-font-smoothing: grayscale;

	    transition: all 1s ease-in 0s;
	    -webkit-transition: all 1s ease-in 0s;
    }
    .move:hover, .move:focus, .move:active {
	    width : 100px;
    }

Keyframed and interactive transitions use animations in back. Use the methods kt() and it() to test them out.

## Want to learn more? ##

While I improve the documentation and create tutorials my recommendation for you is to go into the vii.js code and read it.  Specially testing the pre-made animations will teach you how the string command compiles to the actual output

## TODO ##
* Improve overall documentation
* Implement better and simpler 3D transform methods (rotateX,rotateY,etc).
* Implement reverse keyframes order
* Implement joined animations
* Implement tweened animations

  [1]: https://daneden.github.io/animate.css/
  [2]: http://www.justinaguilar.com/animations/
  [3]: http://ianlunn.github.io/Hover/
  [4]: http://www.minimamente.com/example/magic_animations/
