class TigidPreloader{
    constructor(config){
        this.preloader = document.createElement('div');
        this.preloader.bar = document.createElement('div');

        this.container = config.container || document.body;
        this.isScrollBlock = config.isScrollBlock || true;
        this.preloaderClassName = config.preloaderClassName || 'tigid-preloader';

        this.preloader.bar.barType = config.barType || 'horizontal';
        this.preloader.bar.xPosition = config.xPosition || 'left';
        this.preloader.bar.yPosition = config.yPosition || 'top';

        this.images = [].slice.call(this.container.getElementsByTagName('img'));
        this.images.forEach(item => {
            item.src = item.src;
        })

        let allElements = [].slice.call(this.container.querySelectorAll('*'));
        allElements.push(this.container);
        allElements.forEach(item => {
            let imgUrl = getComputedStyle(item).backgroundImage;
            if(imgUrl && imgUrl !== 'none'){
                imgUrl = imgUrl.replace('url(','').replace(')','').replace(/\"/gi, '');
                let imgFromElement = document.createElement('img');
                imgFromElement.src = imgUrl;
                this.images.push(imgFromElement);
            }
        })

        this.imagesLoaded = 0;

        if(this.isScrollBlock){
            this.container.style.overflow = 'hidden';
        }

        this.initInterface();
        this.initEvents();
    }

    initInterface(){

        this.preloader.classList.add(this.preloaderClassName);

        this.preloader.logo = document.createElement('div');
        this.preloader.logo.classList.add(this.preloaderClassName + '__logo');
        this.preloader.appendChild(this.preloader.logo);

        this.preloader.bar.classList.add(this.preloaderClassName + '__bar', this.preloader.bar.barType, this.preloader.bar.xPosition, this.preloader.bar.yPosition);
        this.preloader.appendChild(this.preloader.bar);


        this.container.appendChild(this.preloader);
    }

    initEvents(){
        this.images.forEach(item => {
            item.addEventListener('load', (event) => {
                this.increaseLoadedImages();
            })
            item.addEventListener('error', (event) => {
                this.logString(`Image wasn't uploaded: ${event.target.src}`);
                this.increaseLoadedImages();
            })
        });

        this.preloader.addEventListener('transitionend', (event) => {
            if(this.target != this.preloader) return;
            this.removePreloader();
        })
    }

    increaseLoadedImages(){
        this.imagesLoaded++;

        if(this.preloader.bar.barType == 'horizontal'){
            this.preloader.bar.style.width = Math.ceil((this.imagesLoaded / this.images.length) * 100) + '%';
        }else if(this.preloader.bar.barType == 'vertical'){
            this.preloader.bar.style.height = Math.ceil((this.imagesLoaded / this.images.length) * 100) + '%';
        }

        if(this.imagesLoaded == this.images.length){
            this.hidePreloader();
        }
    }

    hidePreloader(){
        if(this.isScrollBlock){
            this.container.style.overflow = '';
        }
        this.preloader.classList.add('hidden');
    }

    removePreloader(){
        this.preloader.remove();
    }

    logString(string){
        console.log(`Tigid Preloader: ${string}`);
    }
}