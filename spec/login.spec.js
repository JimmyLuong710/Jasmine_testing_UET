/**
 * Mật khẩu đăng nhập hợp lệ phải là một dãy ký tự dài hơn 7 ký tự
 * Mật khẩu có tính bảo mật là mật khẩu có chứa ít nhất 1 chữ thường, chữ hoa, ký tự đặc biệt và số
 * Từ đó ta có thể suy ra 3 lớp tương đượng và mỗi lớp tương đương sinh 1 test để kiểm tra:
 *  Hợp lệ
 *  Không hợp lệ
 *  Hợp lệ và dảm bảo tính bảo mật
 */

describe("Login", function () {
  it("When username and password are valid, login successfully", function () {
    // Arrange
    var username = "testuser";
    var password = "P@ssw1rd";

    // Act
    var result = login(username, password);

    // Assert
    expect(result).toEqual(true);
  });

  it("When username or password is invalid, login failed", function () {
    // Arrange
    var username = "testuser";
    var password = "password123";

    // Act
    var result = login(username, password);

    // Assert
    expect(result).toEqual(false);
  });

  it("When passworddoes not meet the security requirements, login failed", function () {
    // Arrange
    var username = "testuser";
    var password = "password";

    // Act
    var result = login(username, password);

    // Assert
    expect(result).toEqual(false);
  });

  function login(username, password) {
    // Check the validity of username and password
    if (username && password && password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
      return true;
    } else {
      return false;
    }
  }
});
