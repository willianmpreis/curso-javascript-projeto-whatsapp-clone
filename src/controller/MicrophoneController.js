import { ClassEvent } from "../utils/ClassEvent";

export default class MicrophoneController extends ClassEvent{
    constructor() {
        super()
        //Solicita permissão de acesso a mídia
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            this._stream = stream
            let audio = new Audio()
            //Cria url do audio
            audio.srcObject = stream;
            //audio.play()
            this.trigger('play', audio)
        }).catch(err => {
            console.error(err)
        })
    }

    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop()
        })        
    }
}