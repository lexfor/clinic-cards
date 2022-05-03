export class CreateCardCommandUsecase {
  actionID: string;

  userID: string;

  constructor(actionID, userID) {
    this.actionID = actionID;
    this.userID = userID;
  }
}
