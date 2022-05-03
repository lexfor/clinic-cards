export class DeleteCardCommandUsecase {
  actionID: string;

  userID: string;

  constructor(actionID, userID) {
    this.actionID = actionID;
    this.userID = userID;
  }
}
