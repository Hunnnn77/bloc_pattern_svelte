import type {
  ConstraintByStatus,
  IModels,
  IStatus,
  OmittedErr,
  StatusKeys,
} from "../type";

export interface IArgumentCore<
  S extends StatusKeys,
  M extends ConstraintByStatus<S>,
  V = M extends OmittedErr ? IModels[OmittedErr] : Record<string, any>,
> {
  statusOrErr: IStatus[S];
  from?: V;
  to?: V;
}

export abstract class IStateCore<
  S extends StatusKeys,
  M extends ConstraintByStatus<S>,
> {
  statusOrErr: IArgumentCore<S, M>["statusOrErr"] | null = $state(null);
  from?: IArgumentCore<S, M>["from"] = $state();
  constructor(initial: IArgumentCore<S, M>) {
    this.statusOrErr = initial.statusOrErr;
    this.from = initial.from;
  }
  copy(to: Partial<IArgumentCore<S, M>>): void {
    this.statusOrErr = to.statusOrErr ?? this.statusOrErr;
    this.from = to.from ?? this.from;
  }
}
