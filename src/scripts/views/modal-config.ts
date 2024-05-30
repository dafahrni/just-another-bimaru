export class ModalConfig {
  public message!: string;
  public action: (() => void) | null = null;
  public hasTimeout: boolean = false;
  public hasCancel: boolean = false;
  public hasAmount: boolean = false;
}
