FictionalTimeCollection = new Mongo.Collection("fictionaltime");
/*
{
  "name": "Standard Universal Time",
  "beginning": 13569483600000,
  "units": [50000000000, 100000000, 10000000, 100000, 1000],
  "separators": ["SUT ", ".", " ", ":", ":", ""],
  "declaration": "before"
}
*/
fictionalTime = Astro.Class({
	name: 'fictionalTime',
	collection: FictionalTimeCollection,
	fields: {
		user: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		description: {
			type: 'string',
			optional: true
		},
		connectedToET: {
			type: 'boolean',
			default: true
		},
		beginning: {
			// must be in GMT+0 timezone
			type: 'number',
			optional: true
		},
		units: {
			type: 'array',
			nested: 'number'
			//validator: Validators.number() //TODO check that this works properly
			//type: [Number]
		},
		separators: {
			type: 'array',
			nested: 'string',
			//validator: Validators.string() //TODO same thing as above
		},
		declaration: {
			type: 'string'
		},
		declarationLocation: {
			type: 'string',
			validator: Validators.choice(["before", "after", "both", "none"])
		}
	}
});
