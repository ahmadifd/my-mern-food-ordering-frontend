export enum AlertType {
  success = "success",
  error = "error",
}

export type AlertState = {
  type: AlertType;
  message: string;
  visible: boolean;
};
