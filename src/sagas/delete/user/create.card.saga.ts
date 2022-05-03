import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { DeleteCardEvent } from './events';
import { DeleteCardCommandUsecase } from '../../../domain/card/usecase/commands';

export class DeleteCardSaga {
  @Saga()
  execute(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(DeleteCardEvent),
      map(
        (event: DeleteCardEvent) =>
          new DeleteCardCommandUsecase(event.actionID, event.userID),
      ),
    );
  }
}
