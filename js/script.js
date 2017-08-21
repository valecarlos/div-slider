$(document).ready(function(){
	var Slider = function(options){
		//recieve options, we need the -el- attribute and the duration of the slide on screen
		var slider = {};
		var currentSlide = 0;
		var nextSlide = 1;
		var sliderInterval = false;

		slider.el = $(options.el);
		slider.sliderTimeInterval = options.sliderTimeInterval;
		slider.items = slider.el.find("[class^='main-header']");
		slider.sliderLength = slider.items.length;
		slider.offset = slider.el.children().length - slider.sliderLength;
		_createNavigation();
		startSliderInterval();

		function _createNavigation(){
			//create the -buttons- to navigate between slides
			var ulSlider = slider.el.find('.slider-nav'); //position this where you want your navigation buttons to be
			var newLI = '<li></li>';
			var newLIActive = '<li class= "active-button"></li>';
			for (var i = 0; i< slider.sliderLength ; i++){
				if (i === 0){
					ulSlider.append(newLIActive);	
				}
				else{
					ulSlider.append(newLI);
				}
			}
			_addEventListeners();
		};

		function _addEventListeners(){
			// add event binders to the dynamically added li elements
			slider.el.find('.slider-nav').on('click', 'li', function() {
				//set this -> this will be the  to be the next slide, stop the function interval and start it again 
				nextSlide = $(this).index();
				stopSliderInterval();
				_startSlider();
				startSliderInterval();
			});
		}

		function startSliderInterval (){
			if (!sliderInterval){
				sliderInterval = setInterval(_startSlider, slider.sliderTimeInterval);
			}
		};

		function stopSliderInterval(){
			if (sliderInterval){
				clearInterval(sliderInterval);
				sliderInterval = false; //to easily know the interval is not running as per https://stackoverflow.com/questions/2679141/is-there-a-way-to-check-if-a-var-is-using-setinterval
			}
		}

		function _startSlider(){
			var mainDivs = slider.items;
			var ulSlider = slider.el.find('.slider-nav');
			//which slide comes next?
			if(nextSlide >= slider.sliderLength){
				nextSlide = 0;
				currentSlide = slider.sliderLength -1;
			}

			//animations using the eq selector
			//we first add the animation class, and then remove the previous one we don't want
			//toggle class, it results in an unwanted behaviour
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
			ulSlider.children().eq(mainDivs.eq(nextSlide).index() - slider.offset).addClass("active-button");


			//update variables
			currentSlide = nextSlide;
			nextSlide += 1;
		};

		//return the function we want to reveal
		return {
			startSliderInterval: startSliderInterval,
			stopSliderInterval: stopSliderInterval
		}
		
	}

	var headerSlider = new Slider({el: '#slider', sliderTimeInterval: 4000});

	//just to try the functions provided by the module work
	$("#slider a").on('mouseover', function(){
		headerSlider.stopSliderInterval();
	});

	$("#slider a").on('mouseout', function(){
		headerSlider.startSliderInterval();
	});
});