const pdfjsLib = require('pdfjs-dist')
const path = require('path')

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.work.bundle.js')

export class DocumentPreviewController {
    constructor(file) {
        this._file = file
    }

    getPreviewData() {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            
            switch(this._file.type) {
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':                    
                    reader.onload = e => {
                        resolve({
                            src: reader.result,
                            info: this._file.name 
                        })
                    }
                    reader.onerror = e => {
                        reject(e)
                    }
                    reader.readAsDataURL(this._file)
                    break;
                case 'application/pdf':
                    reader.onload = e => {
                        pdfjsLib.getDocument(new Uint8Array(reader.result))
                        .then(pdfDocumentProxy => {
                            pdfDocumentProxy.getPage(1)
                            .then(pdfPageProxy => {
                                let viewport = pdfPageProxy.getViewport(1)
                                
                                let canvas = document.createElement('canvas')
                                let canvasContext = canvas.getContext('2d')

                                canvas.height = viewport.height
                                canvas.width = viewport.width

                                pdfPageProxy.render({
                                    canvasContext,
                                    viewport
                                }).then(() => {
                                    let numPages = pdfDocumentProxy.numPages
                                    console.log('numPages', numPages)
                                    let text = (numPages > 1) ? 'páginas' : 'página'
                                    resolve({
                                        src: canvas.toDataURL('image/png'),
                                        info: `${numPages} ${text}` 
                                    })                                    
                                }).catch(err => {
                                    reject(err)
                                })
                            })
                            .catch(err => {
                                reject(err)
                            })
                        })
                        .catch(err => {
                            reject(err)
                        })
                    }
                    reader.onerror = e => {
                        reject(e)
                    }
                    reader.readAsArrayBuffer(this._file)                    
                break;
                default:
                    reject()
            } 
        })
    }
}