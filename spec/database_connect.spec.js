const mongoose = require('mongoose');


/**
 * Sinh các test case để kiểm tra kết nối với mongoose database qua các cổng (port) khác nhau
 * Gía trị cổng tối thiểu là 1, giá trị cổng tối đa là 65535
 * Dựa trên các giá trị biên này, chúng ta có thể tạo ra các giá trị kiểm thử sau:  
 * Giá trị biên duói: 0, 1, 2
 * Giá trị đầu vào normal: 27017
 * Giá trị đầu vào lớn hơn giá trị biên: 65535, 65536, 65537
 */
describe('Database Connection', () => {
  it('should connect to database with valid port', async () => {
    const port = 27017;
  
      const dbUrl = `mongodb://localhost:${port}/testdb`;
      const result = await mongoose.connect(dbUrl, { useNewUrlParser: true });
      expect(result).toBeDefined();
    
  });

  it('should throw error for invalid port', async () => {
    const invalidPorts = [-1, 0, 3305, 70000, 100000];
    for (let port of invalidPorts) {
      const dbUrl = `mongodb://localhost:${port}/testdb`;
      await expect(mongoose.connect(dbUrl, { useNewUrlParser: true })).rejects.toThrow();
    }
  });
});
