export class Signal<T> {
  set = $state<T | null>(null);
  constructor(initial?: T) {
    this.set = initial ?? null;
  }
  get get() {
    return this.set;
  }
}

export function signal<T>(initial?: T): { value: T | null } {
  let state = $state<T | null>(initial ?? null);
  return {
    get value(): T | null {
      return state;
    },
    set value(arg: T) {
      state = arg;
    },
  };
}

export function createSignal<T>(initial?: T): [() => T | null, (v: T) => void] {
  let state = $state<T | null>(initial ?? null);
  return [
    () => {
      return state;
    },
    (arg: T) => {
      state = arg;
    },
  ];
}
