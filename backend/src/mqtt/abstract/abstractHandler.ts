export class AbstractHandler<T, K> {

  public observerMap: Map<T, Function> = new Map();
  public subject: K;
  private readonly _mapper: Function


  constructor(subject: K, mapper: Function) {
    this.subject = subject;
    this._mapper = mapper;
  }

  public subscribe(event: T, observer: Function) {
    if (Array.from(this.observerMap.values()).includes(observer)) {
      // observer already subscribed
      return;
    }
    this.observerMap.set(event, observer)
  }

  public unsubscribe(observer: Function) {
    Array.from(this.observerMap.entries()).forEach((entry) => {
      if (entry[1] === observer) {
        this.observerMap.delete(entry[0])
      }
    })
  }

  private _notifyObserver(event: T) {
    const callback = this.observerMap.get(event)
    if (callback) {
      callback(this.subject)
    }
  }

  public triggerEvent(event: T) {
    const triggeredEvents = this._mapper(event, this.subject)
    triggeredEvents.forEach((event: T) => {
      this._notifyObserver(event);
    })
  }
}