export class Observer {
  private _events: Record<string, Set<Function>> = {};

  on(type: string, callback: Function) {
    this._events[type] = this._events[type] || new Set();
    this._events[type].add(callback);

    return this;
  }

  emit(type: string, arg?: any): any {
    this._events[type]?.forEach((cb) => cb.apply(this, arg ? [arg] : []));

    return this;
  }
}
