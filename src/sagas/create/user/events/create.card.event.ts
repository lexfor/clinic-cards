export class CreateCardEvent {
  actionID: string;

  userID: string;

  constructor(actionID, userID) {
    this.actionID = actionID;
    this.userID = userID;
  }
}
