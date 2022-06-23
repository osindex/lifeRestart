export default class Loading extends ui.view.LoadingUI {
    constructor() {
        super();
        console.log('加载....')
    }

    static load() {
        return [
            "images/atlas/images/resource.atlas"
        ]
    }

    show() {}

    onProgress(progress) {}
}