export default class CameraController {
    constructor(videoEl) {
        this._videoEl = videoEl

        //Solicita permissão de acesso a mídia
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {
            //Cria url do vídeo
            //this._videoEl.src = URL.createObjectURL(stream) //deprecated
            this._videoEl.srcObject = stream;
            this._videoEl.play()
        }).catch(err => {
            console.error(err)
        })
    }
}