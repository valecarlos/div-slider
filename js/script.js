var Slider = function(options){
	// check that there was an element sent, otherwise just return
	if(!(options && options.el)){
		return;
	}
	//recieve options, we need the -el- attribute and the duration of the slide on screen
	var slider = {};
	var currentSlide = 0;
	var nextSlide = 1;
	var sliderInterval = false;

	slider.el = document.querySelector(options.el); //the slider container
	slider.sliderTimeInterval = options.sliderTimeInterval; //time interval passed by the user
	slider.items = slider.el.querySelectorAll("[class^='main-header']"); //items
	slider.sliderLength = slider.items.length; //how many slides?
	slider.offset = slider.el.children.length - slider.sliderLength; //the slider container's children vs which of those children are actually slides

	_createNavigation();
	startSliderInterval();

	function _createNavigation(){
		//create the -buttons- to navigate between slides
		var ulSlider = slider.el.querySelector('.slider-nav'); //position this where you want your navigation buttons to be with CSS
		for (var i = 0; i< slider.sliderLength ; i++){
			if (i === 0){
				var newLIActive = document.createElement('li');
				newLIActive.className = 'active-button';
				ulSlider.appendChild(newLIActive);	
			}
			else{
				var newLI = document.createElement('li');
				ulSlider.appendChild(newLI);
			}
		}
		_addEventListeners();
	};

	function _addEventListeners(){
		// add event binders to the dynamically added li elements
		slider.el.querySelector('.slider-nav').addEventListener('click', function(event) {
			//create our event delegation
			if (event.target && event.target.nodeName == "LI"){
				//set this -> this will be the link to be the next slide, stop the function interval and start it again
				stopSliderInterval(); 
				nextSlide = indexInParent(event.target);
				_startSlider();
				startSliderInterval();
			}
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
		var ulSlider = slider.el.querySelector('.slider-nav');
		//which slide comes next?
		if(nextSlide >= slider.sliderLength){
			nextSlide = 0;
			currentSlide = slider.sliderLength -1;
		}

		//we first add the animation class, and then remove the previous one we don't want
		//toggle class, it results in an unwanted behaviour

		mainDivs[currentSlide].querySelector('h1').classList.add('fade-out-bottom-top');
		mainDivs[currentSlide].querySelector('h1').classList.remove('fade-in-top-bottom');

		mainDivs[currentSlide].querySelector('p').classList.add('fade-out-left-right');
		mainDivs[currentSlide].querySelector('p').classList.remove('fade-in-left-right');

		mainDivs[currentSlide].querySelector('a').classList.add('fade-out-top-bottom');
		mainDivs[currentSlide].querySelector('a').classList.remove('fade-in-bottom-top');

		fadeOut(mainDivs[currentSlide], 600);

		mainDivs[nextSlide].querySelector('h1').classList.add('fade-in-top-bottom');
		mainDivs[nextSlide].querySelector('h1').classList.remove('fade-out-bottom-top');
		
		mainDivs[nextSlide].querySelector('p').classList.add('fade-in-left-right');
		mainDivs[nextSlide].querySelector('p').classList.remove('fade-out-left-right');

		mainDivs[nextSlide].querySelector('a').classList.add('fade-in-bottom-top');
		mainDivs[nextSlide].querySelector('a').classList.remove('fade-out-top-bottom');
		
		//create a inmediatly self invoked function so we can send the next slide variable as a parameter, otherwise, the variable is updated
		//and when the setTimeout function is executed, it will use the variable that has been updated in it's closure
		(function delayAnimation(slideNumber){
			setTimeout(function(){
				fadeIn(mainDivs[slideNumber], 600);
			}, 300);
		})(nextSlide); 

		//find offset of child elements to use their index to match the current slide with the selected button

		Array.prototype.forEach.call(ulSlider.children, function(element){
			// remove the active class from each navigation button
			element.classList.remove("active-button");
		});
		//now add the active class to the correspondent navigation button
		ulSlider.children[ indexInParent(mainDivs[nextSlide]) - slider.offset].classList.add("active-button");
		// ulSlider.children().eq(mainDivs.eq(nextSlide).index() - slider.offset).addClass("active-button");


		//update variables
		currentSlide = nextSlide;
		nextSlide += 1;
	};

	//helper functions
	function indexInParent(node){
		//get the index number of the node, inside its parent the equivalent of jquery's index()
		var children = node.parentNode.childNodes;
		var num = 0;
		for (var i=0; i<children.length ; i++){
			if (children[i] == node){ return num;}
			if (children[i].nodeType == 1){ num++}
		}
	}

	function fadeIn(node, time){
		var opacity = 0;
		node.style.opacity = opacity;
		node.style.display = 'block';

		var timer = setInterval(function fade(){
			opacity += 50 / time;
			if (opacity >= 1){
				clearInterval(timer);
				opacity = 1;
				node.style.removeProperty('opacity');
			} else {
				node.style.opacity = opacity;
			}
		}, 50);
	}

	function fadeOut(node, time){
		var opacity = 1;
		node.style.opacity = opacity;
		
		var timer = setInterval(function fade(){
			opacity -= 50 / time;
			if (opacity <= 0){
				clearInterval(timer);
				node.style.display = 'none';
				node.style.removeProperty('opacity');
				opacity = 0;
			} else{
				node.style.opacity = opacity;
			}
		}, 50);
	}

	//return the functions we want to reveal
	return {
		startSliderInterval: startSliderInterval,
		stopSliderInterval: stopSliderInterval
	}
	
}

var headerSlider = new Slider({el: '#slider', sliderTimeInterval: 4000});

//just to try the functions provided by the module work
Array.prototype.forEach.call(document.querySelectorAll("#slider a"), function(element){
	element.addEventListener('mouseover', function(){
		console.log("i should stop");
		headerSlider.stopSliderInterval();
	});
	
	element.addEventListener('mouseout', function(){
		console.log("i should stop");
		headerSlider.startSliderInterval();
	});
});
