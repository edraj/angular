import { StateService } from '../utils/state.abstract';
import { INewProfile } from './profile.model';


export class ProfileState extends StateService<INewProfile> {
   constructor() {
      super();
      this.SetState({ stage: 0 });
   }
}
