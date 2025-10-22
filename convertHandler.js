function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    if (!input) return 'invalid number';
    const trimmed = String(input).trim();
    // Extract numeric portion at the start up to the first letter
    const match = trimmed.match(/^[^a-zA-Z]*/);
    const numStr = match ? match[0] : '';

    if (!numStr) {
      // Default to 1 when no numeric input provided
      return 1;
    }

    // Validate double fraction
    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return 'invalid number';

    if (slashCount === 1) {
      const [nStr, dStr] = numStr.split('/');
      const n = parseFloat(nStr);
      const d = parseFloat(dStr);
      if (isNaN(n) || isNaN(d)) return 'invalid number';
      if (d === 0) return 'invalid number';
      result = n / d;
    } else {
      const n = parseFloat(numStr);
      if (isNaN(n)) return 'invalid number';
      result = n;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    if (!input) return 'invalid unit';
    const trimmed = String(input).trim();
    // Extract unit: consecutive letters from first letter to end
    const match = trimmed.match(/[a-zA-Z]+$/);
    if (!match) return 'invalid unit';
    let unit = match[0];
    unit = unit.toLowerCase();
    const valid = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!valid.includes(unit)) return 'invalid unit';
    // Normalize L to uppercase
    result = unit === 'l' ? 'L' : unit;
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const normalized = (initUnit || '').toString();
    const u = normalized.toLowerCase() === 'l' || normalized === 'L' ? 'L' : normalized.toLowerCase();
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    result = map[u];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const u = (unit === 'L' || unit === 'l') ? 'L' : String(unit).toLowerCase();
    const map = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    result = map[u];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const u = (initUnit === 'L' || initUnit === 'l') ? 'L' : String(initUnit).toLowerCase();
    switch (u) {
      case 'gal':
        result = initNum * galToL; break;
      case 'L':
        result = initNum / galToL; break;
      case 'mi':
        result = initNum * miToKm; break;
      case 'km':
        result = initNum / miToKm; break;
      case 'lbs':
        result = initNum * lbsToKg; break;
      case 'kg':
        result = initNum / lbsToKg; break;
      default:
        return undefined;
    }
    // Round to 5 decimals per project specs
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const initSpell = this.spellOutUnit(initUnit);
    const returnSpell = this.spellOutUnit(returnUnit);
    result = `${initNum} ${initSpell} converts to ${returnNum} ${returnSpell}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
