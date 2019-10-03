class TigidSlider{
    constructor(container, config = {}){
        this.slider = container;
        this.items = [].slice.call(this.slider.children);

        this.sliderClassName = config.sliderClassName || 'tigid-slider';

        this.nextButton = config.nextButton;
        this.prevButton = config.prevButton;
        this.currentIndexTitle = config.currentIndexTitle;
        this.countTitle = config.countTitle;
		this.beforeChangeItemCallback = config.beforeChangeItemCallback;
		
        this.initInterface();
        this.initEvents();

        this.currentIndex = 0;
    }

    initInterface(){
        this.slider.style.whiteSpace = 'nowrap';
        this.slider.style.overflow = 'hidden';
        this.slider.style.position = 'relative';
        this.slider.classList.add(this.sliderClassName);

        if(this.countTitle) this.countTitle.innerHTML = this.decorateNumber(this.items.length);
        if(this.currentIndexTitle) this.changeCurrentIndexTitle( 0);

        this.innerContainer = document.createElement('div');
        this.innerContainer.style.cssText = "height: 100%; position: absolute; transition: all .5s; left: 0px;";
        this.items.forEach((item, index) => {
            item.classList.add(`${this.sliderClassName}__item`);
            item.dataset.index = index;
            this.innerContainer.appendChild(item);
        })
        this.slider.appendChild(this.innerContainer);

    }

    initEvents(){
        if(this.nextButton) this.nextButton.addEventListener('click', this.nextItem.bind(this));
        if(this.prevButton) this.prevButton.addEventListener('click', this.previousItem.bind(this));

        this.items.forEach((item, index) => {
           item.addEventListener('click', this.goToItem.bind(this, index))
        });
    }

    nextItem(){
        let currentItem = this.items[this.currentIndex];

        let newIndex = 0;
        if(this.currentIndex !== this.items.length - 1){
            newIndex = this.currentIndex + 1;
        };
        this.goToItem(newIndex);
    }

    previousItem(){
        //if(this.currentIndex === 0) return;
        let currentItem = this.items[this.currentIndex];
        let newIndex = this.currentIndex - 1;
		if(this.currentIndex === 0){
            newIndex = this.items.length - 1;
        };
        this.goToItem(newIndex);
    }

    goToItem(index) {
        if(index == this.currentIndex){
            this.nextItem();
            return;
        }
        if (index >= 0 && index < this.items.length) {
            this.changeCurrentIndexTitle(index);
            this.currentIndex = index;
			if(this.beforeChangeItemCallback) this.beforeChangeItemCallback();
            let nextItem = this.items[this.currentIndex];
            this.moveSlider(-1 * nextItem.offsetLeft);
        }
    }

    moveSlider(newPosition){
        let _newPosition = newPosition;
        this.innerContainer.style.left = _newPosition + 'px';
    }

    changeCurrentIndexTitle(index){
        this.currentIndexTitle.innerHTML = this.decorateNumber(index + 1);
    }


    decorateNumber(number){
        number = parseInt(number);
        if(number < 10) number = `0${number}`;
        return number;
    }

    logString(string){
        console.log(`Tigid Slider: ${string}`);
    }
}