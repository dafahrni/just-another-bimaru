export class ModalConfig {
  message!: string;
  action: (() => void) | null = null;
  hasTimeout: boolean = false;
  hasCancel: boolean = false;
  hasAmount: boolean = false;
}
