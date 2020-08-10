import jQuery from 'jquery';

(function( jQuery, $ ) {

	$.fn.serializeObject = function () {
		var o = {};
		var a = this.serializeArray();
		$.each( a, function () {
			if ( o[ this.name ] !== undefined ) {
				if ( !o[ this.name ].push ) {
					o[ this.name ] = [ o[ this.name ] ];
				}
				o[ this.name ].push( this.value || '' );
			}
			else {
				o[ this.name ] = this.value || '';
			}
		} );
		return o;
	};

	Number.prototype.round = function( decimals ) {
		var multiplyWith = "1";
		for (var count = 0; count < decimals; count++) {
			multiplyWith += "0";
		}
		multiplyWith = parseInt( multiplyWith, 10 );
		var value = this.valueOf() * multiplyWith;
		value = Math.round( value );
		return value / multiplyWith;
	};

	String.prototype.endsWith = function ( suffix ) {
		return this.indexOf( suffix, this.length - suffix.length ) !== -1;
	};

	String.prototype.startsWith = function ( prefix ) {
		return this.indexOf( prefix ) === 0;
	};

	String.prototype.capitalize = function () {
		return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
	};

	String.prototype.lettersAndNumbers = function () {
		return this.match( /\d+|\D+/gi )
	};

	String.prototype.chunkify = function ( chunksize ) {
		chunksize = chunksize || 3;
		var expr = new RegExp( ".{1," + chunksize + "}", "g" );
		return this.match( expr );
	};

	String.prototype.isNumeric = function () {
		return !isNaN( parseFloat( this ) ) && isFinite( this );
	};

	Array.prototype.objectIntersectKey = function ( keysToKeep ) {
		var theArray = this;
		for ( var index = 0; index < theArray.length; index++ ) {
			theArray[ index ] = Object.intersectKey( theArray[ index ], keysToKeep );
		}
		return theArray;
	};

	Object.intersectKey = function ( obj, keysToKeep ) {
		var returnValue = {};
		keysToKeep = keysToKeep instanceof Array ? keysToKeep : Object.keys( keysToKeep );
		keysToKeep.map( function ( key ) {
			returnValue[ key ] = obj[ key ];
		} );
		return returnValue;
	};

	Array.prototype.diff = function ( array ) {
		var values = {};
		var diff = [];
		for ( var arrayIndex = 0; arrayIndex < this.length; arrayIndex++ ) {
			if ( "string" == typeof this[ arrayIndex ] ) {
				this[ arrayIndex ] = this[ arrayIndex ].trim();
			}
			values[ this[ arrayIndex ] ] = true;
		}

		for ( arrayIndex = 0; arrayIndex < array.length; arrayIndex++ ) {
			if ( "string" == typeof array[ arrayIndex ] ) {
				array[ arrayIndex ] = array[ arrayIndex ].trim();
			}
			if ( values[ array[ arrayIndex ] ] ) {
				delete values[ array[ arrayIndex ] ];
			}
			else {
				values[ array[ arrayIndex ] ] = true;
			}
		}

		for ( var value in values ) {
			diff.push( value );
		}
		return diff;
	};

	Array.prototype.move = function(from, to) {
		this.splice(to, 0, this.splice(from, 1)[0]);
	};

	Array.prototype.remove = function ( index ) {
		this.splice( index, 1 );
	};

	Array.prototype.removeIndex = function ( index ) {
		this.splice( index, 1 );
	};

	Array.prototype.removeValue = function ( value ) {
		var index = this.getValueIndex( value );
		if ( null !== index ) {
			this.remove( index );
		}
	};

	Array.prototype.getValueIndex = function ( value ) {
		var i = this.length;
		while ( i-- ) {
			if ( this[ i ] === value ) {
				return i;
			}
		}
		return null;
	};

	Array.prototype.findAll = function ( filter, caseInsensitive ) {
		return this.filter( function ( obj ) {
			if ( !obj ) {
				return false;
			}
			return Object.keys( filter ).map( function ( prop ) {
				if ( obj[ prop ] instanceof Array ) {
					if ( filter[ prop ] instanceof Array ) {
						for ( var filterIndex = 0; filterIndex < filter[ prop ].length; filterIndex++ ) {
							if ( -1 === obj[ prop ].indexOf( filter[ prop ][ filterIndex ] ) ) {
								return false;
							}
						}
						return true;
					}
					return -1 !== obj[ prop ].indexOf( filter[ prop ] );
				} else if ( filter[ prop ] instanceof Array ) {
					return -1 !== filter[ prop ].indexOf( obj[ prop ] );
				}
				if (caseInsensitive && typeof filter[ prop ] === "string" && typeof obj[ prop ] === "string") {
					return obj[ prop ].toLowerCase() === filter[ prop ].toLowerCase();
				}
				return obj[ prop ] === filter[ prop ];
			} ).reduce( function ( allPreviousMatches, thisMatches ) {
				return allPreviousMatches && thisMatches;
			}, true );
		} );
	};

	Array.prototype.findOne = function ( filter, caseInsensitive ) {
		var results = this.findAll( filter, caseInsensitive );
		if ( results[ 0 ] ) {
			return results[ 0 ];
		}
		return null;
	};

	Array.prototype.contains = function ( value ) {
		return ( null !== this.getValueIndex( value ) );
	};

	Array.prototype.copyInto = function ( other ) {
		other.length = this.length;
		for ( var i = 0; i < this.length; i++ ) {
			other[ i ] = this[ i ];
		}
	};

	Array.prototype.mapReplace = function ( fn ) {
		for ( var i = 0; i < this.length; i++ ) {
			this[ i ] = fn( this[ i ] );
		}
	};

	Array.prototype.minus = function ( a ) {
		return this.filter( function ( i ) {
			return a.indexOf( i ) < 0;
		} );
	};

	Array.prototype.intersect = function ( a ) {
		return this.filter( function ( i ) {
			return a.indexOf( i ) >= 0;
		} );
	};

	Array.prototype.groupBy = function(prop) {
		return this.reduce(function(groups, item) {
			const val = item[prop]
			groups[val] = groups[val] || []
			groups[val].push(item)
			return groups
		}, {})
	};


	if ( !Array.isArray ) {
		Array.isArray = function ( arg ) {
			return Object.prototype.toString.call( arg ) === '[object Array]';
		};
	}

	jQuery.fn.updateStyles = function () {
		for ( var i = 0; i < arguments.length; i++ ) {
			// by getting the computed style, the browser
			// is forced to evaluate the css and apply the styles
			this.each( function ( i, el ) {
			} );
		}
	};

	Object.forEach = function ( object, callback ) {
		var proto = Object.getPrototypeOf( object );
		var dummy = new proto.constructor();
		for ( var key in object ) {
			if ( typeof dummy[ key ] === 'undefined' ) {
				callback( key, object[ key ] );
			}
		}
	};

	Object.size = function ( obj, ignoreEmptyValues ) {
		if ( typeof ignoreEmptyValues === 'undefined' ) {
			ignoreEmptyValues = false;
		}
		;
		var elementCount = 0;
		for ( var element in obj ) {
			if ( false === ignoreEmptyValues || ( obj[ element ] != false && obj[ element ] !== null && typeof obj[ element ] !== 'undefined') ) {
				elementCount++;
			}
		}
		return elementCount;
	};

	Object.copyValues = function ( oldObject, newObject ) {
		for ( var i in oldObject ) {
			if ( "function" === typeof oldObject[ i ] ) {
				// do nothing
			}
			else if ( "object" === typeof oldObject[ i ] && oldObject[ i ] instanceof Date ) {
				newObject[ i ] = new Date( oldObject[ i ].getTime() );
			}
			else if ( "object" === typeof oldObject[ i ] && oldObject[ i ] === oldObject ) {
				// do nothing
			}
			else if ( oldObject[ i ] instanceof Array ) {
				newObject[ i ] = [];
				Object.copyValues( oldObject[ i ], newObject[ i ] );
			}
			else if ( "object" === typeof oldObject[ i ] ) {
				newObject[ i ] = {};
				Object.copyValues( oldObject[ i ], newObject[ i ] );
			}
			else {
				newObject[ i ] = oldObject[ i ];
			}
		}
	}

	Object.empty = function ( obj ) {
		for ( var key in obj ) {
			return false;
		}
		return true;
	};

	Object.forEach = function ( object, callback ) {
		var proto = Object.getPrototypeOf( object );
		var dummy = new proto.constructor();
		for ( var key in object ) {
			if ( typeof dummy[ key ] === 'undefined' ) {
				callback( key, object[ key ] );
			}
		}
	};

	//for a 1 level copy of string/number/plain-object/null
	Object.fastCopy = function( source ){
		return JSON.parse(JSON.stringify(source));
	};

	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	if ( !Object.keys ) {
		Object.keys = (function () {
			'use strict';
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({ toString: null }).propertyIsEnumerable( 'toString' ),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;

			return function ( obj ) {
				if ( typeof obj !== 'object' && (typeof obj !== 'function' || obj === null) ) {
					throw new TypeError( 'Object.keys called on non-object' );
				}

				var result = [], prop, i;

				for ( prop in obj ) {
					if ( hasOwnProperty.call( obj, prop ) ) {
						result.push( prop );
					}
				}

				if ( hasDontEnumBug ) {
					for ( i = 0; i < dontEnumsLength; i++ ) {
						if ( hasOwnProperty.call( obj, dontEnums[ i ] ) ) {
							result.push( dontEnums[ i ] );
						}
					}
				}
				return result;
			};
		}());
	}


	function cdelay( howLong ) {
		return function () {
			return delay( howLong );
		};
	}

	function alwaysResolve( what ) {
		return new Promise( function ( resolve ) {
			resolve( what );
		} );
	}

	function randomString( length ) {
		return Math.round( (Math.pow( 36, length + 1 ) - Math.random() * Math.pow( 36, length )) ).toString( 36 ).slice( 1 );
	}

	function ip2long( IP ) {
		//  discuss at: http://phpjs.org/functions/ip2long/

		var i = 0;
		IP = IP.match(
			/^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i
		); // Verify IP format.
		if ( !IP ) {
			return false; // Invalid format.
		}
		// Reuse IP variable for component counter.
		IP[ 0 ] = 0;
		for ( i = 1; i < 5; i += 1 ) {
			IP[ 0 ] += !!((IP[ i ] || '')
				.length);
			IP[ i ] = parseInt( IP[ i ] ) || 0;
		}
		// Continue to use IP for overflow values.
		// PHP does not allow any component to overflow.
		IP.push( 256, 256, 256, 256 );
		// Recalculate overflow of last component supplied to make up for missing components.
		IP[ 4 + IP[ 0 ] ] *= Math.pow( 256, 4 - IP[ 0 ] );
		if ( IP[ 1 ] >= IP[ 5 ] || IP[ 2 ] >= IP[ 6 ] || IP[ 3 ] >= IP[ 7 ] || IP[ 4 ] >= IP[ 8 ] ) {
			return false;
		}
		return IP[ 1 ] * (IP[ 0 ] === 1 || 16777216) + IP[ 2 ] * (IP[ 0 ] <= 2 || 65536) + IP[ 3 ] * (IP[ 0 ] <= 3 || 256) + IP[ 4 ] * 1;
	}

	function long2ip( ip ) {
		if ( !isFinite( ip ) )
			return false;

		return [ ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF ].join( '.' );
	}


	Date.prototype.daysInMonth = function () {
		var oDate = new Date( this.getFullYear(), this.getMonth() + 1, 0 );
		return oDate.getDate();
	}

	Date.prototype.compare = function ( oDate ) {
		return (this.getTime() - oDate.getTime() );
	}


	Date.prototype.format = function ( format ) {
		var returnStr = '';
		var replace = Date.replaceChars;
		for ( var i = 0; i < format.length; i++ ) {
			var curChar = format.charAt( i );
			if ( replace[ curChar ] ) {
				returnStr += replace[ curChar ].call( this );
			}
			else {
				returnStr += curChar;
			}
		}
		return returnStr;
	};

	Date.replaceChars = {
		shortMonths: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		longMonths: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
		shortDays: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
		longDays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],

		// Day
		d: function () {
			return (this.getDate() < 10 ? '0' : '') + this.getDate();
		},
		D: function () {
			return Date.replaceChars.shortDays[ this.getDay() ];
		},
		j: function () {
			return this.getDate();
		},
		l: function () {
			return Date.replaceChars.longDays[ this.getDay() ];
		},
		N: function () {
			return this.getDay() + 1;
		},
		S: function () {
			return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th')));
		},
		w: function () {
			return this.getDay();
		},
		z: function () {
			return "Not Yet Supported";
		},
		// Week
		W: function () {
			return "Not Yet Supported";
		},
		// Month
		F: function () {
			return Date.replaceChars.longMonths[ this.getMonth() ];
		},
		m: function () {
			return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1);
		},
		M: function () {
			return Date.replaceChars.shortMonths[ this.getMonth() ];
		},
		n: function () {
			return this.getMonth() + 1;
		},
		t: function () {
			var checkDate = new Date();
			checkDate.setDate( 1 );
			checkDate.setYear( this.getYear() );
			checkDate.setMonth( this.getMonth() + 1 );
			checkDate.setDate( checkDate.getDate() - 1 );
			return checkDate.getDate();
		},
		// Year
		L: function () {
			return (((this.getFullYear() % 4 == 0) && (this.getFullYear() % 100 != 0)) || (this.getFullYear() % 400 == 0)) ? '1' : '0';
		},
		o: function () {
			return "Not Supported";
		},
		Y: function () {
			return this.getFullYear();
		},
		y: function () {
			return ('' + this.getFullYear()).substr( 2 );
		},
		// Time
		a: function () {
			return this.getHours() < 12 ? 'am' : 'pm';
		},
		A: function () {
			return this.getHours() < 12 ? 'AM' : 'PM';
		},
		B: function () {
			return "Not Yet Supported";
		},
		g: function () {
			return this.getHours() % 12 || 12;
		},
		G: function () {
			return this.getHours();
		},
		h: function () {
			return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12);
		},
		H: function () {
			return (this.getHours() < 10 ? '0' : '') + this.getHours();
		},
		i: function () {
			return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
		},
		s: function () {
			return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
		},
		// Timezone
		e: function () {
			return "Not Yet Supported";
		},
		I: function () {
			return "Not Supported";
		},
		O: function () {
			return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs( this.getTimezoneOffset() / 60 ) < 10 ? '0' : '') + (Math.abs( this.getTimezoneOffset() / 60 )) + '00';
		},
		P: function () {
			return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs( this.getTimezoneOffset() / 60 ) < 10 ? '0' : '') + (Math.abs( this.getTimezoneOffset() / 60 )) + ':' + (Math.abs( this.getTimezoneOffset() % 60 ) < 10 ? '0' : '') + (Math.abs( this.getTimezoneOffset() % 60 ));
		},
		T: function () {
			var m = this.getMonth();
			this.setMonth( 0 );
			var result = this.toTimeString().replace( /^.+ \(?([^\)]+)\)?$/, '$1' );
			this.setMonth( m );
			return result;
		},
		Z: function () {
			return -this.getTimezoneOffset() * 60;
		},
		// Full Date/Time
		c: function () {
			return this.format( "Y-m-d" ) + "T" + this.format( "H:i:sP" );
		},
		r: function () {
			return this.toString();
		},
		U: function () {
			return this.getTime() / 1000;
		}
	};

	String.prototype.strip_tags = function(allowed) {
		var input = this;
		allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
		var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
		var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
		return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
			return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
		});
	}

	String.prototype.safeUriName = function() {
		if(this !== null){
			var regExpStrangeChars = new RegExp('[^a-z0-9\-]', 'gi');
			var regExpDoub = new RegExp('-{2,}', 'g');
			return this.toLowerCase()
				.replace( regExpStrangeChars, '-' )
				.replace( regExpDoub, '-' );
		}
	};

	/* Source   https://stackoverflow.com/questions/7753448/how-do-i-escape-quotes-in-html-attribute-values  */
	String.prototype.quoteAttribute = function() {
		return this
			.replace(/&/g, '&amp;')
			.replace(/'/g, '&apos;')
			.replace(/"/g, '&quot;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\r\n/g, '\n')
			.replace(/[\r\n]/g, '\n');
	};

})( jQuery, jQuery );