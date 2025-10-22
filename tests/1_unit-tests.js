const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
	test('convertHandler should correctly read a whole number input', function() {
		assert.strictEqual(convertHandler.getNum('32L'), 32);
	});

	test('convertHandler should correctly read a decimal number input', function() {
		assert.strictEqual(convertHandler.getNum('3.2mi'), 3.2);
	});

	test('convertHandler should correctly read a fractional input', function() {
		assert.strictEqual(convertHandler.getNum('3/2kg'), 1.5);
	});

	test('convertHandler should correctly read a fractional input with a decimal', function() {
		assert.strictEqual(convertHandler.getNum('7.5/2lbs'), 3.75);
	});

	test('convertHandler should return an error on a double-fraction', function() {
		assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
	});

	test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
		assert.strictEqual(convertHandler.getNum('kg'), 1);
	});

	test('convertHandler should correctly read each valid input unit', function() {
		const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
		units.forEach(u => {
			assert.oneOf(convertHandler.getUnit(`3${u}`), ['gal','L','mi','km','lbs','kg']);
		});
	});

	test('convertHandler should return an error for an invalid input unit', function() {
		assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
	});

	test('convertHandler should return the correct return unit for each valid input unit', function() {
		const pairs = { gal: 'L', L: 'gal', mi: 'km', km: 'mi', lbs: 'kg', kg: 'lbs' };
		Object.entries(pairs).forEach(([from, to]) => {
			assert.strictEqual(convertHandler.getReturnUnit(from), to);
		});
	});

	test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
		const words = { gal: 'gallons', L: 'liters', mi: 'miles', km: 'kilometers', lbs: 'pounds', kg: 'kilograms' };
		Object.entries(words).forEach(([u, w]) => {
			assert.strictEqual(convertHandler.spellOutUnit(u), w);
		});
	});

	test('convertHandler should correctly convert gal to L', function() {
		assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
	});

	test('convertHandler should correctly convert L to gal', function() {
		assert.approximately(convertHandler.convert(3.78541, 'L'), 1, 0.00001);
	});

	test('convertHandler should correctly convert mi to km', function() {
		assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
	});

	test('convertHandler should correctly convert km to mi', function() {
		assert.approximately(convertHandler.convert(1.60934, 'km'), 1, 0.00001);
	});

	test('convertHandler should correctly convert lbs to kg', function() {
		assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
	});

	test('convertHandler should correctly convert kg to lbs', function() {
		assert.approximately(convertHandler.convert(0.453592, 'kg'), 1, 0.00001);
	});
});