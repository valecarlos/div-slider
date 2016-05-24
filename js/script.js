$(document).ready(function(){
	var SliderModule = (function(){
		//create a new empty object which will handle the 
		var pb = {};
		pb.el = $('#slider');
		pb.items = pb.el.find("[class^='main-header']");

		var currentSlide = 0;
		var nextSlide = 1;
		var sliderLength = pb.items.length;
		//initialize
		pb.init = function(settings){
			//Activate the slider
			SliderInit();
		}

		var SliderInit = function(){
			sliderInterval = setInterval(pb.startSlider, 3000)
		};

		pb.startSlider = function(){
			var mainDivs = pb.items;
			if(nextSlide >= sliderLength){
				nextSlide = 0;
				currentSlide = sliderLength -1;
			}

			//animations using the eq selector
			//we first add the animation class, and then remove the previous one we don't want
			//toggle class results in an unwanted behaviour
			mainDivs.eq(currentSlide).find('h1').addClass('fade-out-bottom-top');
			mainDivs.eq(currentSlide).find('h1').removeClass('fade-in-top-bottom');

			mainDivs.eq(currentSlide).find('p').addClass('fade-out-left-right');
			mainDivs.eq(currentSlide).find('p').removeClass('fade-in-left-right');

			mainDivs.eq(currentSlide).find('a').addClass('fade-out-top-bottom');
			mainDivs.eq(currentSlide).find('a').removeClass('fade-in-bottom-top');
			
			mainDivs.eq(currentSlide).fadeOut('slow');

			mainDivs.eq(nextSlide).find('h1').addClass('fade-in-top-bottom');
			mainDivs.eq(nextSlide).find('h1').removeClass('fade-out-bottom-top');
			
			mainDivs.eq(nextSlide).find('p').addClass('fade-in-left-right');
			mainDivs.eq(nextSlide).find('p').removeClass('fade-out-left-right');

			mainDivs.eq(nextSlide).find('a').addClass('fade-in-bottom-top');
			mainDivs.eq(nextSlide).find('a').removeClass('fade-out-top-bottom');
			
			mainDivs.eq(nextSlide).fadeIn('slow');


			//update variables
			currentSlide = nextSlide;
			nextSlide += 1;
		};



		return pb;


	}()); //autoexecute on ready

	SliderModule.init();

});