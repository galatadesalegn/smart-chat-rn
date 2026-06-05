import { generateId, formatTime, formatDate, truncate } from '../src/utils/helpers';

describe('helpers', () => {
  test('generateId returns non-empty string', () => {
    expect(generateId().length).toBeGreaterThan(0);
  });

  test('generateId returns unique values', () => {
    expect(generateId()).not.toBe(generateId());
  });

  test('truncate shortens long text', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  test('truncate leaves short text intact', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  test('formatTime returns time format', () => {
    const result = formatTime(new Date().toISOString());
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });

  test('formatDate returns Today for current date', () => {
    expect(formatDate(new Date().toISOString())).toBe('Today');
  });
});
