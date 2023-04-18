/**
 * Mật khẩu đăng nhập hợp lệ phải là một dãy ký tự dài hơn 7 ký tự
 * Mật khẩu có tính bảo mật là mật khẩu có chứa ít nhất 1 chữ thường, chữ hoa, ký tự đặc biệt và số
 * Từ đó ta có thể suy ra 3 lớp tương đượng và mỗi lớp tương đương sinh 1 test để kiểm tra: 
 *  Hợp lệ
 *  Không hợp lệ
 *  Hợp lệ và dảm bảo tính bảo mật
 */
const request = require('request');

describe("Đăng nhập", function() {
   

    it('should return a list of users',
     function (done) {
        request.get('http://localhost:3000/users', function (err, res) {
        //   console.log(res)
          expect(res.statusCode).toBe(200);
          expect(res.body.length).toBeGreaterThan(0);
          done();
    })});

    it("Khi username và password hợp lệ, đăng nhập thành công", function() {
      // Arrange
      var username = "testuser";
      var password = "P@ssw1rd";
  
      // Act
      var result = login(username, password);
  
      // Assert
      expect(result).toEqual(true);
    });
  
    it("Khi username hoặc password không hợp lệ, đăng nhập thất bại", function() {
      // Arrange
      var username = "testuser";
      var password = "password123";
  
      // Act
      var result = login(username, password);
  
      // Assert
      expect(result).toEqual(false);
    });
  
    it("Khi password không đáp ứng yêu cầu bảo mật, đăng nhập thất bại", function() {
      // Arrange
      var username = "testuser";
      var password = "password";
  
      // Act
      var result = login(username, password);
  
      // Assert
      expect(result).toEqual(false);
    });
  
    function login(username, password) {
      // Kiểm tra tính hợp lệ của username và password
      if (username && password && password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
        return true;
      } else {
        return false;
      }
    }
  });
  