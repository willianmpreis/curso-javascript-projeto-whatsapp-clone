export class ClassEvent{
    constructor() {
        this._events = {}
    }

    on(eventName, fn) {
        if (!this._events[eventName]) this._events[eventName] = new Array()
        this._events[eventName].push(fn)
    }

    /**
     * @param eventName
     * @param fn : Array
     */
    trigger() {
        //Recupera todos os argumentos passados para a funcao
        let args = [...arguments]
        //Remove o nome do evento da primeira opção passada
        let eventName = args.shift()

        //Adiciona o evento chamado ao fim do array
        args.push(new Event(eventName))

        if (!this._events[eventName] instanceof Array) return

        this._events[eventName].forEach(fn => {
            //Executa a funcao passando os argumentos
            fn.apply(null, args)
        })
    }
}