class Trait {
    constructor({src = "<svg></svg>", isVisible = true, isBackground = false}) {
        this.src = src;
        this.isVisible = isVisible;
        this.isBackground = isBackground;
    }
    clone(src) {
        return new Trait({src: src, isVisible: this.isVisible, isBackground: this.isBackground})
    }
}

export default Trait;