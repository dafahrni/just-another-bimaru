
export class ValueConfig {
  id!: string;
  labelText!: string;
  min!: number;
  max!: number;
  val!: number;

  constructor(id: string, labelText: string, min: number, max: number, val: number | null = null) {
    this.id = id;
    this.labelText = labelText;
    this.min = min;
    this.max = max;
    this.val = val ? val : min;
  }
}
