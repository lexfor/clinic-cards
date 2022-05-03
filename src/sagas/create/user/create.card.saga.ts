import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreateCardEvent } from './events';
import { CreateCardCommandUsecase } from '../../../domain/card/usecase/commands';

export class CreateCardSaga {
  @Saga()
  execute(events$: Observable<any>): Observable<ICommand> {
    return events$.pipe(
      ofType(CreateCardEvent),
      map(
        (event: CreateCardEvent) =>
          new CreateCardCommandUsecase(event.actionID, event.userID),
      ),
    );
  }
}
