import { ClassEvent } from "../utils/ClassEvent";

export default class MicrophoneController extends ClassEvent{
    constructor() {
        super()
        this._defineMimeType()
        this._available = false
        //Solicita permissão de acesso a mídia
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            this._available = true
            this._stream = stream
            this.trigger('ready', this._stream)
        }).catch(err => {
            console.error(err)
        })
    }

    _defineMimeType() {
        if (MediaRecorder.isTypeSupported('audio/mp3')) {
            this._mimeType = 'audio/mp3'
            return
        }
        this._mimeType = 'audio/webm'
    }

    isAvailable() {
        return this._available
    }

    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop()
        })        
    }

    startRecord() {
        if (!this.isAvailable) return
        this._mediaRecorder = new MediaRecorder(this._stream, {
            mimeType: this._mimeType
        })

        this._recordedChunks = []

        this._mediaRecorder.addEventListener('dataavailable', e => {
            if (e.data.size > 0) this._recordedChunks.push(e.data.size)

        })

        this._mediaRecorder.addEventListener('stop', e => {
            let blob = new Blob(this._recordedChunks, {
                tupe: this._mimeType
            })

            let mimeType = this._mimeType.split('/')
            let filename = `rec${Date.now()}.${mimeType[1]}`

            let file = new File([blob], filename, {
                type: this._mimeType,
                lastModified: Date.now()
            })
        })

        this._mediaRecorder.start()
        this.startTime()
    }

    stopRecord() {
        if (!this.isAvailable) return

        this.stopTime()
        this._mediaRecorder.stop()
        this.stop()
    }

    startTime(){
        let start = Date.now()
        this._recordMicrophoneInterval = setInterval(() => {
            this.trigger('recordtimer', (Date.now() - start))
        }, 100)
    }

    stopTime(){
        clearInterval(this._recordMicrophoneInterval)
    }
}