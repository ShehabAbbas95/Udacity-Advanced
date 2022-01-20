'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const server_1 = __importDefault(require('../server'));
const requestTest = (0, supertest_1.default)(server_1.default);
describe('test our main server api', () => {
  it('test welcome api', (done) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const apiResponse = yield requestTest.get('/');
      expect(apiResponse.status).toBe(200);
      done();
    }));
  it('test our image processing api if no query data is given ', (done) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const apiResponse = yield requestTest.get('/image');
      expect(apiResponse.status).toBe(500);
      const apiResponses = yield requestTest.get('/image?filename=index.jpg');
      expect(apiResponses.status).toBe(500);
      console.log('you should specify positive value for width and height');
      done();
    }));
  it('test our image processing api ', (done) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const apiResponse = yield requestTest.get(
        '/image?filename=index.jpg&width=200&height=200'
      );
      expect(apiResponse.status).toBe(200);
      done();
    }));
});
