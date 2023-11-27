import type {
  ConstraintByStatus,
  ErrBound,
  IModels,
  IStatus,
  OmittedErr,
  StatusKeys,
} from "../type";

export interface IArgumentCore<
  S extends StatusKeys,
  M extends ConstraintByStatus<S>,
  V = M extends OmittedErr ? IModels[OmittedErr] : ErrBound,
> {
  status: IStatus[S];
  from?: V;
  to?: V;
}

export abstract class IStateCore<
  S extends StatusKeys,
  M extends ConstraintByStatus<S>,
> {
  status?: IArgumentCore<S, M>["status"] = $state();
  from?: IArgumentCore<S, M>["from"] = $state();
  constructor(initial: IArgumentCore<S, M>) {
    this.status = initial.status;
    this.from = initial.from;
  }
  copy(to: Partial<IArgumentCore<S, M>>): void {
    this.status = to.status ?? this.status;
    this.from = to.from ?? this.from;
  }
}
