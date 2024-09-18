import beautifulCost from "../beautifulCost";

describe('beautifulCost', () => {
    test('should format number with spaces and currency symbol', () => {
        expect(beautifulCost(1000)).toBe('1 000 ₸');
        expect(beautifulCost(1000000)).toBe('1 000 000 ₸');
        expect(beautifulCost(123456789)).toBe('123 456 789 ₸');
    });

    test('should format string with spaces and currency symbol', () => {
        expect(beautifulCost('1000')).toBe('1 000 ₸');
        expect(beautifulCost('1000000')).toBe('1 000 000 ₸');
        expect(beautifulCost('123456789')).toBe('123 456 789 ₸');
    });

    test('should handle small numbers and strings without changes', () => {
        expect(beautifulCost(10)).toBe('10 ₸');
        expect(beautifulCost('50')).toBe('50 ₸');
    });

    test('should handle invalid input gracefully', () => {
        // In case of empty string or zero
        expect(beautifulCost('')).toBe(' ₸');
        expect(beautifulCost(0)).toBe('0 ₸');
    });
});
