export abstract class DbModel {
  private _ref?: string;

  get ref(): string | undefined {
    return this.docId ?? this._ref;
  }

  set ref(value: string | undefined) {
    this._ref = value;
  }

  protected constructor(public docId?: string) {}
}
