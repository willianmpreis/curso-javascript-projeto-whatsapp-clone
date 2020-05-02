class CameraController {
    constructor(videoEl) {
        this._videoEl = videoEl

        //Solicita permissão de acesso a mídia
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {
            //Cria url do vídeo
            this._videoEl.src = URL.createObjectURL(stream)
            this._videoEl.play()
        }).catch(err => {
            console.error(err)
        })
    }
}