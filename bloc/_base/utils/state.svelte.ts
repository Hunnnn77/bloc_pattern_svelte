export class Signal<T> {
  get = $state<T | undefined>();
  constructor(arg?: T) {
    this.get = arg;
  }
  get value() {
    return this.get;
  }
}

export function signal<T>(initial?: T): { value: T | undefined } {
  let state = $state<T | undefined>(initial);
  return {
    get value(): T | undefined {
      return state;
    },
    set value(arg: T) {
      state = arg;
    },
  };
}

export function createSignal<T>(
  initial?: T,
): [() => T | undefined, (v: T) => void] {
  let state = $state<T | undefined>(initial);
  return [
    () => {
      return state;
    },
    (arg: T) => {
      state = arg;
    },
  ];
}
