export class DeleteCardEvent {
  actionID: string;

  userID: string;

  credentialID: string;

  constructor(actionID, userID, credentialID) {
    this.actionID = actionID;
    this.userID = userID;
    this.credentialID = credentialID;
  }
}
