export enum AlertType {
  success = "success",
}

export type AlertState = {
  type: AlertType;
  message: string;
  visible: boolean;
};
