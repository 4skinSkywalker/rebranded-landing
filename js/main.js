function startEboxLogoAnimation() {
    document.querySelector('#ebox-logo-animation-image').setAttribute('src','./img/ebox-logo-animation.gif');
}
startEboxLogoAnimation();

// define images
var images = Array(20).fill(0).map((_, i) =>
    `img/ebox-logo-animation-frames/frame_${ (i+"").padStart(2, "0") }_delay-0.04s.png`
);

// TweenMax can tween any property of any object. We use this object to cycle through the array
var obj = {curImg: 0};

// create tween
var tween = TweenMax.to(obj, 0.5,
    {
        curImg: images.length - 1,	// animate propery curImg to number of images
        roundProps: "curImg",		// only integers so it can be used as an array index
        repeat: 3,					// repeat 3 times
        immediateRender: true,	    // load first image automatically
        ease: Linear.easeNone,		// show every image the same ammount of time
        onUpdate: function () {
          document.querySelector("#ebox-logo-animation-image").setAttribute("src", images[obj.curImg]);                 // set the image source
        }
    }
);

// init controller
var controller = new ScrollMagic.Controller();

// build scene
var scene = new ScrollMagic.Scene({ triggerElement: "#ebox-logo-animation-trigger", duration: 300 })
                           .setTween(tween)
                        //    .addIndicators() // add indicators (requires plugin)
                           .addTo(controller);





var textForRotation = ["Made Simple", "Made Safe", "Made Reversible", "Reinvented"];
var textForRotationIndex = 1;
var rotateTime = 3000;
function rotateText() {
	document.querySelector("#rotatedText").style.opacity = "0";

	setTimeout(function() {
		document.querySelector("#rotatedText").innerHTML = textForRotation[textForRotationIndex];
		document.querySelector("#rotatedText").style.opacity = "1";

        document.querySelector("#rotatedTextUnderline").style.width = document.querySelector("#rotatedText").offsetWidth + "px";
		
		textForRotationIndex = ++textForRotationIndex % textForRotation.length;
	
		setTimeout(rotateText, rotateTime);
	}, 450);
}
rotateText();




// define images
var images2 = Array(61).fill(0).map((_, i) =>
    `img/rotating-cube/frame_${ (i+"").padStart(2, "0") }_delay-0.03s.png`
);

// TweenMax can tween any property of any object. We use this object to cycle through the array
var obj2 = {curImg: 0};

// create tween
var tween = TweenMax.to(obj2, 0.5,
    {
        curImg: images2.length - 1,	// animate propery curImg to number of images
        roundProps: "curImg",		// only integers so it can be used as an array index
        repeat: 3,					// repeat 3 times
        immediateRender: true,	    // load first image automatically
        ease: Linear.easeNone,		// show every image the same ammount of time
        onUpdate: function () {
          document.querySelector("#rotating-cube").setAttribute("src", images2[obj2.curImg]);                         // set the image source
        }
    }
);

// init controller
var controller = new ScrollMagic.Controller();

// build scene
var scene = new ScrollMagic.Scene({ triggerElement: "#rotating-cube-trigger", duration: 555 })
                           .setTween(tween)
                        //    .addIndicators() // add indicators (requires plugin)
                           .addTo(controller);





// build tween
var tween = new TimelineMax ()
.add([
    TweenMax.fromTo("#rotating-cube", 1, { transform: "translateY(150px)" }, { transform: "translateY(-150px)", ease: Linear.easeNone })
]);

// build scene
var scene = new ScrollMagic.Scene({ triggerElement: "#cube-parallax-trigger", duration: 666 })
                           .setTween(tween)
                        //    .addIndicators() // add indicators (requires plugin)
                           .addTo(controller);





// build tween
var tween = new TimelineMax ()
.add([
    TweenMax.fromTo("#magic-border-1 .magic-border-inner", 1, { transform: "translate(0, 0)" }, { transform: "translate(-2rem, -2rem)", ease: Linear.easeNone })
]);

// build scene
var scene = new ScrollMagic.Scene({ triggerElement: "#magic-border-1-trigger", duration: 333 })
                           .setTween(tween)
                        //    .addIndicators() // add indicators (requires plugin)
                           .addTo(controller);