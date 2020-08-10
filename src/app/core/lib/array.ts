
export class LibArray {

	public static extractProperty<C, O>(collection: C[], prop: string): O[] {
		return collection.map((item: C) => item[prop]);
	}

	public static findAll<T>(inputArray: T[], filter: object, caseInsensitive: boolean = false): T[] {
		return inputArray.filter((obj: T) => {
			if (!obj) {
				return false;
			}

			return Object.keys(filter).map((prop: any) => {
				if (obj[prop] instanceof Array) {
					if (filter[prop] instanceof Array ) {
						for (let filterValue of filter[prop]) {
							if (-1 === obj[ prop ].indexOf(filterValue)) {
								return false;
							}
						}
						return true;
					}
					return -1 !== obj[ prop ].indexOf( filter[ prop ] );
				}

				if (filter[prop] instanceof Array) {
					return -1 !== filter[ prop ].indexOf( obj[ prop ] );
				}

				if (caseInsensitive && typeof filter[ prop ] === 'string' && typeof obj[ prop ] === 'string') {
					return obj[ prop ].toLowerCase() === filter[ prop ].toLowerCase();
				}

				return obj[ prop ] === filter[ prop ];
			} ).reduce(
				(allPreviousMatches: any, thisMatches: any) => {
					return allPreviousMatches && thisMatches;
				},
				true
			);
		});
	}

	public static findAndRemove(inputArray: any[], filter: object, caseInsensitive: boolean = false): void {
		LibArray.remove(inputArray, LibArray.findOne(inputArray, filter, caseInsensitive));
	}

	public static findOne<T>(inputArray: T[], filter: object, caseInsensitive: boolean = false): T {
		let results: any[] = LibArray.findAll(inputArray, filter, caseInsensitive );
		if (results[0]) {
			return results[0];
		}
		return null;
	}

	public static flatten<T>(inputArray: Array<Array<T>>): Array<T> {
		let outputArray: T[] = [];
		inputArray.map((entry: T[]) => {
			outputArray.concat(entry);
		});
		return outputArray;
	}

	public static getValue<T>(obj: T, nestedProperty: string): any {
		const properties: string[] = nestedProperty.split('.');
		let value: T = obj;

		for (let property of properties) {
			value = value[property];

			if (value === undefined) {
				break;
			}
		}

		return value;
	}

	public static getValueIndex(inputArray: any[], value: any): number|null {
		let index: number = inputArray.length;
		while (index--) {
			if (inputArray[index] === value) {
				return index;
			}
		}
		return null;
	}

	public static groupBy(inputArray: any[], groupBy: string): any {
		return inputArray.reduce((acc: any, obj: any) => {
			let key: any = obj[groupBy];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
	}

	public static paginate<T>(inputArray: T[], page: number, perPage: number): T[] {
		return inputArray.slice(
			(page - 1) * perPage,
			page * perPage
		);
	}

	public static remove(inputArray: any[], index: number): void {
		inputArray.splice(index, 1);
	}

	public static removeIndex(inputArray: any[], index: number): void {
		inputArray.splice(index, 1);
	}

	public static removeValue(inputArray: any[], value: any): void {
		let index: number|null = LibArray.getValueIndex(inputArray, value);
		if ( null !== index ) {
			LibArray.removeIndex(inputArray, index);
		}
	}

	public static unique<T>(inputArray: T[]): T[] {
		return inputArray.filter((value: T, index: number, self: T[]) => self.indexOf(value) === index);
	}
}
