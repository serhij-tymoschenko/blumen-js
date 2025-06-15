class Trait {
    constructor({src = "<svg></svg>", isVisible = true, isBackground = false}) {
        this.src = src;
        this.isVisible = isVisible;
        this.isBackground = isBackground;
    }
    copy = (src, isBackground = false) => {
        return new Trait({src: src, isVisible: this.isVisible, isBackground: this.isBackground})
    }
    changeVisibility = () => {
        return new Trait({src: this.src, isVisible: !this.isVisible, isBackground: this.isBackground})
    }
}

export default Trait;