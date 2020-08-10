export class LibString {

	public static addSlashes(inputString: string, quote: string = '\''): string {
		if (!inputString) {
			return inputString;
		}
		let quoteRegExp: RegExp = new RegExp(quote, 'g');
		let backSlashRegExp: RegExp = new RegExp('\\\\', 'g');
		return inputString.replace( backSlashRegExp, '\\\\' )
			.replace( quoteRegExp, '\\' + quote );
	}

	public static count(inputString: string, character: string): number {
		return (inputString.match( RegExp(character, 'g') ) || [] ).length;
	}

	public static safeFilename(inputString: string): string {
		return inputString.replace(/[^a-z0-9]/gi, '_')
			.replace(/__+/g, '_');
	}

	public static startsWith(inputString: string, prefix: string): boolean {
		return inputString.indexOf(prefix) === 0;
	}

	public static toUnixEnters(inputString: string): string {
		return inputString.replace(/\r?\n/g, '\n');
	}
}
