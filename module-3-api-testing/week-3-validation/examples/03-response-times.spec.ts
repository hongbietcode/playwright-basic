/**
 * Example: Response Time Testing
 */

import { test, expect } from '@playwright/test';

test.describe('Response Time Testing @api @performance', () => {
  test('measure API response time', async ({ request }) => {
    const startTime = Date.now();

    const response = await request.get('https://reqres.in/api/users/1');

    const responseTime = Date.now() - startTime;

    expect(response.ok()).toBeTruthy();
    expect(responseTime).toBeLessThan(2000); // Should respond in < 2s

    console.log(`⚡ Response time: ${responseTime}ms`);
  });

  test('compare response times across endpoints', async ({ request }) => {
    const endpoints = [
      '/api/users/1',
      '/api/users',
      '/api/users?page=2',
    ];

    for (const endpoint of endpoints) {
      const start = Date.now();
      await request.get(`https://reqres.in${endpoint}`);
      const duration = Date.now() - start;

      console.log(`${endpoint}: ${duration}ms`);
      expect(duration).toBeLessThan(3000);
    }
  });

  test('test under load', async ({ request }) => {
    const requests = 10;
    const times: number[] = [];

    console.log(`Making ${requests} concurrent requests...`);

    const promises = Array(requests)
      .fill(null)
      .map(async () => {
        const start = Date.now();
        await request.get('https://reqres.in/api/users/1');
        return Date.now() - start;
      });

    const results = await Promise.all(promises);
    times.push(...results);

    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const maxTime = Math.max(...times);

    console.log(`Average: ${avgTime.toFixed(2)}ms`);
    console.log(`Max: ${maxTime}ms`);

    expect(avgTime).toBeLessThan(2000);
    expect(maxTime).toBeLessThan(5000);
  });

  test('performance benchmark', async ({ request }) => {
    const iterations = 5;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      await request.get('https://reqres.in/api/users/1');
      times.push(Date.now() - start);
    }

    const avg = times.reduce((a, b) => a + b) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);

    console.log(`📊 Performance Metrics:`);
    console.log(`  Min: ${min}ms`);
    console.log(`  Max: ${max}ms`);
    console.log(`  Avg: ${avg.toFixed(2)}ms`);

    expect(avg).toBeLessThan(2000);
  });
});

test.describe('Timeout Testing @api @performance', () => {
  test('request with custom timeout', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1', {
      timeout: 5000, // 5 second timeout
    });

    expect(response.ok()).toBeTruthy();
    console.log('✅ Completed within timeout');
  });

  test('slow endpoint simulation', async ({ request }) => {
    // httpbin.org/delay/{n} delays response by n seconds
    const start = Date.now();

    const response = await request.get('https://httpbin.org/delay/2', {
      timeout: 5000,
    });

    const duration = Date.now() - start;

    expect(response.ok()).toBeTruthy();
    expect(duration).toBeGreaterThan(2000);
    expect(duration).toBeLessThan(3000);

    console.log(`⏱️ Delayed response: ${duration}ms`);
  });
});

/*
PERFORMANCE TESTING:

1. Response Time Metrics:
   - Measure with Date.now()
   - Set acceptable thresholds
   - Compare across endpoints

2. Load Testing:
   - Multiple concurrent requests
   - Calculate average/min/max
   - Identify bottlenecks

3. Benchmarking:
   - Run multiple iterations
   - Statistical analysis
   - Performance regression detection

4. Timeouts:
   - Set custom timeouts
   - Test slow endpoints
   - Handle timeout errors

THRESHOLDS:
- Fast: < 200ms
- Acceptable: < 1000ms
- Slow: > 2000ms
- Timeout: > 30000ms
*/
