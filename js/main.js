// Vars
var eboxLogoImageUrls = Array(20).fill(0).map((_, i) =>
    `img/ebox-logo-animation-frames/frame_${(i + "").padStart(2, "0")}_delay-0.04s-min.png`
);

var rotatingCubeImageUrls = Array(61).fill(0).map((_, i) =>
    `img/rotating-cube/frame_${(i + "").padStart(2, "0")}_delay-0.03s-min.png`
);

var textForRotation = ["Made Simple", "Made Safe", "Made Reversible", "Reinvented"];
var textForRotationIndex = 1;
var rotateTime = 3000;

let loader = new SVGLoader(
    document.getElementById('loader'),
    { speedIn: 300, easingIn: mina.easeinout }
);

// Functions
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

function preloadImg(imgUrl) {
    return new Promise((resolve) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.src = imgUrl;
    });
}

function preloadImgs(imageUrls) {
    return Promise.all(
        imageUrls.map(imageUrl => preloadImg(imageUrl))
    );
}

function replaceImg(oldImg, newImg) {
    let parent = oldImg.parentElement;
    newImg.classList = oldImg.classList;
    newImg.id = oldImg.id;
    newImg.alt = oldImg.alt;
    parent.replaceChild(newImg, oldImg);
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}

function scrollParallax(elementSelector, triggerElement, duration, transformFrom, transformTo) {

    var tween = new TimelineMax().
        add([
            TweenMax.fromTo(
                elementSelector,
                1,
                { transform: transformFrom },
                { transform: transformTo, ease: Linear.easeNone }
            )
        ]);

    // build scene
    new ScrollMagic.Scene({ triggerElement, duration })
        .setTween(tween)
        // .addIndicators()
        .addTo(new ScrollMagic.Controller());
}

function scrollImgSequencer(images, imageSelector, triggerElement, duration) {

    // TweenMax can tween any property of any object
    let obj = { curImg: 0 };

    // create tween
    let tween = TweenMax.to(obj, 0.5,
        {
            curImg: images.length - 1,	// animate propery curImg to number of images
            roundProps: "curImg",		// only integers so it can be used as an array index
            repeat: 0,					// repeat 0 times
            immediateRender: false,	    // load first image automatically
            ease: Linear.easeNone,		// show every image the same ammount of time
            onUpdate: function () {
                replaceImg(
                    document.querySelector(imageSelector),
                    images[obj.curImg]
                );
            }
        }
    );

    // build scene
    new ScrollMagic
        .Scene({ triggerElement, duration })
        .setTween(tween)
        // .addIndicators()
        .addTo(new ScrollMagic.Controller());
}

function initScrollSpy() {
	var controller = new ScrollMagic.Controller({ globalSceneOptions: { duration: 666 } });
	new ScrollMagic.Scene({ triggerElement: "#token-section" })
				   .setClassToggle("#token-link", "active")
				   .addTo(controller);
	new ScrollMagic.Scene({ triggerElement: "#partners-section" })
				   .setClassToggle("#partners-link", "active")
		           .addTo(controller);
	new ScrollMagic.Scene({ triggerElement: "#team-section" })
				   .setClassToggle("#team-link", "active")
				   .addTo(controller);
	new ScrollMagic.Scene({ triggerElement: "#roadmap-section" })
				   .setClassToggle("#roadmap-link", "active")
				   .addTo(controller);
}

// Async execution context
(async function() {

    initScrollSpy();

    loader.show();

    // Preloading images (may take a while)
    let eboxLogoImages = await preloadImgs(eboxLogoImageUrls);
    let rotatingCubeImages = await preloadImgs(rotatingCubeImageUrls);
    let preloadedEboxLogo = await preloadImg("img/ebox-logo-animation.gif");

    await delay(450);

    // Create tiles for partners section
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            let img = document.createElement("IMG");
            img.id = `tile-${i}-${j}`;
            if (j < 1) {
                img.src = `img/tiles/grey-tile.PNG`;
            }
            else if (j < 3) {
                img.src = `img/tiles/orange-tile.PNG`;
            }
            else {
                img.src = `img/tiles/mixed-tile.PNG`;
            }
            document.querySelector("#partners-bg-tiles").appendChild(img);
        }
    }

    loader.hide();

    replaceImg(
        document.querySelector("#ebox-logo-animation-image"),
        preloadedEboxLogo
    );

    let site = document.getElementById('site');
    classie.removeClass( site, 'show' );
    classie.addClass( site, 'show' );

    rotateText();

    scrollImgSequencer(
        rotatingCubeImages,
        "#rotating-cube",
        "#rotating-cube-trigger",
        555
    );

    scrollParallax(
        ".animated-cube",
        "#cube-parallax-trigger",
        666,
        "translate(0, 120px)",
        "translate(0, -120px)"
    );
    
    scrollParallax(
        "#magic-border-1 .magic-border-inner",
        "#magic-border-1-trigger",
        333,
        "translate(0, 0)",
        "translate(-2rem, -2rem)"
    );

    scrollParallax(
        "#roadmap-ghost-title",
        "#roadmap-ghost-title-trigger",
        333,
        "translate(-50%, -20%)",
        "translate(-50%, -80%)"
    );

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            scrollParallax(
                `#tile-${i}-${j}`,
                "#partners-bg-tiles-trigger",
                i * 50 + j * 75 + 222,
                "translate(4rem, 4rem)",
                "translate(-4rem, -4rem)"
            );
        }
    }

    await delay(3760);

    scrollImgSequencer(
        eboxLogoImages,
        "#ebox-logo-animation-image",
        "#ebox-logo-animation-trigger",
        333
    );

})();
