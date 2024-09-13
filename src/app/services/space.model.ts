import { DataList, IList } from './list.model';

export interface ISpace {
   id: string;

}

export class Space implements ISpace {
	public id: string;
	
	public static NewInstance(space: any): ISpace {	
		return {
			id: space.id
		}
	}
	public static NewInstances(spaces: any[]): ISpace[] {
		return spaces.map(Space.NewInstance);
	}
	public static NewList(dataset: any): IList<ISpace> {
		const dl = new DataList<ISpace>();
		dl.mapper = Space.NewInstance;
		return dl.NewDataList(dataset);

	}

	// prepare to POST
	public static PrepCreate(space: ISpace): any {
		return {
			id: space.id
		};
	}
	// prepare to PUT
	public static PrepSave(space: ISpace): any {

		return {
			id: space.id
		};

	}

}
