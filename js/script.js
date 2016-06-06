$(document).ready(function(){
	var SliderModule = (function(){
		//create a new empty object which will handle the slider
		var pb = {};
		pb.el = $('#slider');
		pb.items = pb.el.find("[class^='main-header']");

		var currentSlide = 0;
		var nextSlide = 1;
		var sliderLength = pb.items.length;
		//offset calculates from which position do we have to start to link the index from the slide and the slider button
		var offset = pb.el.children().length - sliderLength;
		//initialize
		pb.init = function(settings){
			//Activate the slider
			SliderInit();
		}

		var SliderInit = function(){
			pb.createNavigation();
			setSliderInterval();
		};

		var setSliderInterval = function(){
			sliderInterval = setInterval(pb.startSlider, 5000);
		};

		pb.createNavigation = function(){
			var ulSlider = pb.el.find('.slider-nav');
			var newLI = '<li></li>';
			var newLIActive = '<li class= "active-button"></li>';
			for (var i = 0; i< sliderLength ; i++){
				if (i === 0){
					ulSlider.append(newLIActive);	
				}
				else{
					ulSlider.append(newLI);
				}
				
			}
		};

		pb.startSlider = function(){
			var mainDivs = pb.items;
			var ulSlider = pb.el.find('.slider-nav');
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
			
			mainDivs.eq(nextSlide).delay(300).fadeIn('slow');

			//find offset of child elements to use their index to match the current slide with the selected button
			ulSlider.children().removeClass("active-button");
			ulSlider.children().eq(mainDivs.eq(nextSlide).index() - offset).addClass("active-button");


			//update variables
			currentSlide = nextSlide;
			nextSlide += 1;
		};

		
		//add event binders to the dynamically added li elements
		$('.slider-nav').on('click', 'li', function() {
			//set this to be the next slide, stop the function interval and start it again 
			nextSlide = $(this).index();
			clearInterval(sliderInterval);
			pb.startSlider();
			setSliderInterval();
			
		});

		return pb;

	}()); //autoexecute on ready

	SliderModule.init();

});