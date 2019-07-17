class TigidSlider{
    constructor(container, config = {}){
        this.slider = container;
        this.items = [].slice.call(this.slider.children);

        this.sliderClassName = config.sliderClassName || 'tigid-slider';
        this.initInterface();

        this.currentIndex = 0;
    }

    initInterface(){
        this.slider.style.whiteSpace = 'nowrap';
        this.slider.style.overflow = 'hidden';
        this.slider.style.position = 'relative';
        this.slider.classList.add(this.sliderClassName);

        this.innerContainer = document.createElement('div');
        this.innerContainer.style.cssText = "height: 100%; position: absolute; transition: all .5s; left: 0px;";
        this.items.forEach(item => {
            item.classList.add(`${this.sliderClassName}__item`);
            this.innerContainer.appendChild(item);
        })
        this.slider.appendChild(this.innerContainer);

    }

    nextItem(){
        if(this.currentIndex === this.items.length - 1) return;
        let currentItem = this.items[this.currentIndex];
        this.currentIndex++;
        let nextItem = this.items[this.currentIndex];
        this.moveSlider(-1 * nextItem.offsetLeft);
    }

    previousItem(){
        if(this.currentIndex === 0) return;
        let currentItem = this.items[this.currentIndex];
        this.currentIndex--;
        let nextItem = this.items[this.currentIndex];
        this.moveSlider(-1 * nextItem.offsetLeft);
    }

    moveSlider(newPosition){
        let _newPosition = newPosition;
        if(Math.abs(newPosition) + this.slider.clientWidth > this.innerContainer.clientWidth) {
            _newPosition = -1 * (this.innerContainer.clientWidth - this.slider.clientWidth);
        }
        console.log(_newPosition);
        this.innerContainer.style.left = _newPosition + 'px';
    }



    logString(string){
        console.log(`Tigid Slider: ${string}`);
    }
}