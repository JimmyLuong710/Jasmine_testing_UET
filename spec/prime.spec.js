/**
 * Áp dụng kỹ thuật phân tích giá trị biên ta sinh được các test tương ứng
 * nhóm test 1: -1, 0, 1 (các giá trị nhỏ hơn số nguyên tố bé nhất - 2)
 * nhóm test 2: giá trị nguyên tố nhỏ nhất là 2
 * nhóm test 3: giá biên max_int và cận biên max_int - 1
 * nhóm 4: các giá trị normal: 29, 1000
 */

describe("isPrime function", function () {
  // Test with values less than the boundary
  it("should return false for values less than 2", function () {
    expect(isPrime(-1)).toBe(false);
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
  });

  // Test with the smallest and largest boundary values
  it("should return true for the smallest prime number (2)", function () {
    expect(isPrime(2)).toBe(true);
  });

  it("should return true for the largest prime number (2^31 - 1)", function () {
    expect(isPrime(Math.pow(2, 31) - 1)).toBe(true);
    expect(isPrime(Math.pow(2, 31))).toBe(false);
  });

  // Test with values greater than the boundary
  it("should return false for values greater than the boundary", function () {
    expect(isPrime(29)).toBe(true);
    expect(isPrime(1000)).toBe(false);
  });
});

function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
