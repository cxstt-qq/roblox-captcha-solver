/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common.js"
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getLocalVersion = exports.localVersion = exports.getIsBlackWhitePass = exports.getClickTime = exports.waitDo = exports.waitforbackgroundWithTimeout = exports.waitforbackground = exports.imageready = exports.waitFor = exports.notneedcontinue = exports.src2base64 = exports.delay = exports.captchaClassification = exports.messageHide = exports.message = undefined;

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.testnetwork = testnetwork;
exports.post = post;
exports.get = get;
exports.getBalance = getBalance;
exports.getconfig = getconfig;
exports.setconfig = setconfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 为替换pc客户端实现一个同样的接口的对象，这样就不用改之前的captcha.js的代码了
// 测试key  a2000da995ef93962df8a4f6d200004b1fdd4c943
// 需实现的接口
// 1.onopen  启动时调用
// 2.onclose 关闭时调用
// 3.onmessage 接收到消息时调用
// 4.send 方法发送消息
// onmessage  时需返回 json字符串+"##" 作为结束标志
// 返回对象需要有 type 属性 10,表示是否开启自动识别,2表示结果,
// 服务器版本信息

var chrome = window.chrome;

// 设置页面信息显示和隐藏
var message = exports.message = function message(_ref) {
  var _ref$text = _ref.text,
      text = _ref$text === undefined ? '' : _ref$text,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'red' : _ref$color;

  var message = document.getElementById('mymessage');
  if (!message) {
    message = document.createElement('div');
    message.id = 'mymessage';

    // message.className = 'fankui'
    message.style.position = 'fixed';
    message.style.top = '0px';
    message.style.left = '0px';

    // message.style.width = '100%'
    // message.style.height = '100%'
    message.style.zIndex = '99999999';
    // // message.style.backgroundColor = 'rgba(0,0,0,0.5)'
    // message.style.border = '1px solid red'
    // message.style.textAlign = 'left'
    // message.style.lineHeight = '100%'
    // message.style.fontSize = '20px'
    message.innerText = text;
    document.body.appendChild(message);
  } else {
    message.innerText = text;
  }
  color === 'green' ? message.className = 'fankui' : message.className = 'fankui2';
  message.style.display = 'block';
  // message.style.color = color === 'green' ? 'red' : 'green'
};

// 设置页面信息显示和隐藏
var messageHide = exports.messageHide = function messageHide() {
  var message = document.getElementById('mymessage');
  if (message) {
    message.style.display = 'none';
  }
};

// 定义页面识别方法
var captchaClassification = exports.captchaClassification = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _ref3, times, result, typelist, i;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getconfig();

          case 2:
            _ref3 = _context.sent;
            times = _ref3.times;
            _context.next = 6;
            return delay(times * 10);

          case 6:
            result = null;
            // 对不同页面判断的定义 title 表示使用的接口，url_keywork 为url中的关键字,div 为判断是否这个页面

            typelist = [{
              title: 'imageclassification',
              url_keyword: 'recaptcha',
              div: '#recaptcha-anchor-label',
              imagediv: '#recaptcha-token' // 图片的div 和点击的框架为两个不同的框架

            }, {
              title: 'hcaptcha',
              url_keyword: 'hcaptcha.com',
              div: '#anchor-state',
              imagediv: '.challenge-container' // hcaptcha 图片的div 和点击的框架为两个不同的框架
            }, {
              title: 'hcaptcha',
              url_keyword: 'hcaptcha-assets.ecosec.on.epicgames.com',
              div: '#anchor-state',
              imagediv: '.challenge-container' // hcaptcha 图片的div 和点击的框架为两个不同的框架
            }, {
              title: 'rainbow',
              // assets-us-west-2.queue-it.net
              // assets-us-west-2.queue-it.net
              url_keyword: 'queue-it.net',
              div: '#enqueue-error > a:nth-child(3) > div > strong'
            }, {
              title: 'imagetotext',
              url_keyword: 'queue',
              // div: '#challenge-container > button'
              div: '#lbHeaderP'
            }];
            i = 0;

          case 9:
            if (!(i < typelist.length)) {
              _context.next = 16;
              break;
            }

            if (!(window.location.href.indexOf(typelist[i].url_keyword) > -1 && (document.querySelector(typelist[i].div) || typelist[i].imagediv && document.querySelector(typelist[i].imagediv)))) {
              _context.next = 13;
              break;
            }

            result = typelist[i];

            return _context.abrupt('break', 16);

          case 13:
            i++;
            _context.next = 9;
            break;

          case 16:
            return _context.abrupt('return', result);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function captchaClassification() {
    return _ref2.apply(this, arguments);
  };
}();

// 网络测试
function testnetwork(url) {
  return new _promise2.default(function (resolve, reject) {
    if (window.self === window.top) {
      chrome.runtime.sendMessage({ action: 'testnetwork', url: url }, function (response) {
        resolve(response);
      });
    } else {
      resolve(true);
    }
  });
}

// post 请求代理
function post(url, data) {
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var tries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  return new _promise2.default(function (resolve, reject) {
    chrome.runtime.sendMessage({ action: 'post', url: url, data: data, delay: delay, tries: tries }, function (response) {
      if (response === "fail") {
        reject("fail");
      }
      resolve(response);
    });
  });
}
function get(url) {
  return new _promise2.default(function (resolve, reject) {
    chrome.runtime.sendMessage({ action: 'get', url: url }, function (response) {
      resolve(response);
    });
  });
}

// 获取余额
function getBalance(_ref4) {
  var host = _ref4.host,
      clientKey = _ref4.clientKey;

  return post(new URL('getBalance', host).href, {
    clientKey: clientKey
  });
}
var delay = exports.delay = function delay(s) {
  return new _promise2.default(function (resolve) {
    setTimeout(resolve, s);
  });
};

function getconfig() {
  return new _promise2.default(function (resolve, reject) {
    chrome.runtime.sendMessage({ action: 'getconfig' }, function (response) {
      response.times = response.times || 100;
      resolve(response);
    });
  });
}
function setconfig(config) {
  return new _promise2.default(function (resolve, reject) {
    chrome.runtime.sendMessage({ action: 'setconfig', config: config }, function (response) {
      resolve(response);
    });
  });
}

var src2base64 = exports.src2base64 = function src2base64(src) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 128;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 128;

  return new _promise2.default(function (resolve, reject) {
    if (!src) resolve(null);
    var img = new Image();
    img.setAttribute('crossOrigin', 'Anonymous');
    img.src = src;
    img.width = width;
    img.height = height;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    img.onload = function () {
      // 图片加载完，再draw 和 toDataURL
      context.drawImage(img, 0, 0, width, height);
      var base64 = canvas.toDataURL();
      // console.log('base64', base64)
      var out = base64.replace('data:image/png;base64,', '');

      resolve(out);
    };
  });
};

// 无需返回的错误码
var notneedcontinue = exports.notneedcontinue = function notneedcontinue(errorstr) {
  return errorstr && 'ERROR_REQUIRED_FIELDS\n  ERROR_KEY_DOES_NOT_EXIST\n  ERROR_ZERO_BALANCE\n  ERROR_ZERO_CAPTCHA_FILESIZE\n  ERROR_DOMAIN_NOT_ALLOWED\n  ERROR_TOO_BIG_CAPTCHA_FILESIZE\n  ERROR_ILLEGAL_IMAGE\n  ERROR_IP_BANNED\n  ERROR_IP_BLOCKED_5MIN\n  ERROR_CLIENTKEY_UNAUTHORIZED'.includes(errorstr);
};
// 等待dom元素存在,超时 默认10秒
var waitFor = exports.waitFor = function waitFor(divstr) {
  var outtime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  return new _promise2.default(function (resolve, reject) {
    var timer = setInterval(function () {
      if (document.querySelector(divstr)) {
        clearInterval(timer);
        resolve(true);
      }
    }, 100);
    setTimeout(function () {
      clearInterval(timer);
      resolve(true);
    }, outtime * 1000);
  });
};
// 等待图像加载完
var imageready = exports.imageready = function imageready(imgsrc) {
  return new _promise2.default(function (resolve, reject) {
    var img = new Image();
    img.src = imgsrc;
    img.onload = function () {
      resolve(true);
    };
  });
};
// 等待背景图片属性存在
var waitforbackground = exports.waitforbackground = function waitforbackground(div) {
  return new _promise2.default(function (resolve, reject) {
    var timer = setInterval(function () {
      if (div.style && div.style.background) {
        clearInterval(timer);
        resolve(true);
      }
    }, 100);
  });
};

// 等待背景图片属性存在
var waitforbackgroundWithTimeout = exports.waitforbackgroundWithTimeout = function waitforbackgroundWithTimeout(div) {
  return new _promise2.default(function (resolve, reject) {
    var timer = setInterval(function () {
      if (div.style.background) {
        clearInterval(timer);
        resolve(true);
      }
    }, 100);
    var timeoutTimer = setTimeout(function () {
      clearInterval(timer);
      clearTimeout(timeoutTimer);
      resolve(false);
    }, 3000);
  });
};

// 等待func返回true,超时默认10秒
var waitDo = exports.waitDo = function waitDo(func) {
  var outtime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  return new _promise2.default(function (resolve, reject) {
    var timer = setInterval(function () {
      if (func()) {
        console.log('func true');
        clearInterval(timer);
        resolve(true);
      }
    }, 100);
    setTimeout(function () {
      console.log('func false');
      clearInterval(timer);
      resolve(false);
    }, outtime * 1000);
  });
};

// 客户端获取版本号

function getLocalVersion() {
  return new _promise2.default(function (resolve) {
    chrome.runtime.sendMessage({
      getLocalVersion: true
    }, function (ver) {
      resolve(ver);
    });
  });
}
var getClickTime = exports.getClickTime = function getClickTime() {
  var configTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var rate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;


  var timeFloatLimit = configTime * rate;

  var timeFloat = Math.random() * 2 * timeFloatLimit - timeFloatLimit;

  return Math.ceil(timeFloat) + configTime;
};

var getIsBlackWhitePass = exports.getIsBlackWhitePass = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(config) {
    var isInUrlList, judgeBlackWhite, queryCurrentUrl, currentTabUrl, blackWhiteResult;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isInUrlList = function isInUrlList(urlList, url) {
              var index = urlList.findIndex(function (pattern) {
                return url.indexOf(pattern) > -1;
              });
              return index > -1;
            };

            judgeBlackWhite = function judgeBlackWhite(config, url) {
              try {
                var isOpenBlackList = config.blackListConfig.isOpen;
                var isOpenWhiteList = config.whiteListConfig.isOpen;
                if (isOpenWhiteList) {
                  var whiteResult = isInUrlList(config.whiteListConfig.urlList || [], url);
                  if (whiteResult) return 'inWhiteList';else return 'notInWhiteList';
                }
                if (isOpenBlackList) {
                  var blackListResult = isInUrlList(config.blackListConfig.urlList || [], url);
                  if (blackListResult) return 'inBlackList';else return 'notInBlackList';
                } else return 'normal';
              } catch (e) {
                return 'normal';
              }
            };

            queryCurrentUrl = function queryCurrentUrl() {
              return new _promise2.default(function (resolve) {
                chrome.runtime.sendMessage({ action: 'queryCurrentUrl' }, function (response) {
                  resolve(response);
                });
              });
            };

            _context2.next = 5;
            return queryCurrentUrl();

          case 5:
            currentTabUrl = _context2.sent;
            blackWhiteResult = judgeBlackWhite(config, currentTabUrl);
            _context2.t0 = blackWhiteResult;
            _context2.next = _context2.t0 === 'inWhiteList' ? 10 : _context2.t0 === 'notInWhiteList' ? 11 : _context2.t0 === 'inBlackList' ? 12 : _context2.t0 === 'notInBlackList' ? 13 : _context2.t0 === 'normal' ? 14 : 15;
            break;

          case 10:
            return _context2.abrupt('return', true);

          case 11:
            return _context2.abrupt('return', false);

          case 12:
            return _context2.abrupt('return', false);

          case 13:
            return _context2.abrupt('return', true);

          case 14:
            return _context2.abrupt('return', true);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getIsBlackWhitePass(_x9) {
    return _ref5.apply(this, arguments);
  };
}();

// 本地版本信息

function localVersion() {
  return localStorage.version ? localStorage.version : 1;
}
exports.localVersion = localVersion;
exports.getLocalVersion = getLocalVersion;

/***/ },

/***/ "./src/config.js"
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var config = exports.config = { develop: true };

/***/ },

/***/ "./src/jsonall.js"
/*!************************!*\
  !*** ./src/jsonall.js ***!
  \************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.jsonall = exports.hcaptchaItemlist = undefined;

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _hcaptchaItemlist, _jsonall;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-dupe-keys */

var hcaptchaItemlist = exports.hcaptchaItemlist = (_hcaptchaItemlist = {
  'airplane': '飞机',
  'seaplane': '飞机',
  'motorbus': '巴士',
  'bus': '巴士',
  'boat': '船'
}, (0, _defineProperty3.default)(_hcaptchaItemlist, 'bus', '公交车'), (0, _defineProperty3.default)(_hcaptchaItemlist, 'train', '火车'), (0, _defineProperty3.default)(_hcaptchaItemlist, 'truck', '卡车'), (0, _defineProperty3.default)(_hcaptchaItemlist, 'motorcycle', '摩托车'), (0, _defineProperty3.default)(_hcaptchaItemlist, 'bicycle', '自行车'), _hcaptchaItemlist);

var jsonall = exports.jsonall = (_jsonall = {
  // 白俄罗斯
  горыабопагоркі: '/m/09d_r',
  знакіпрыпынку: '/m/02pv19',
  вулічныязнакі: '/m/01mqdt',
  расліны: '/m/05s2s',
  дрэвы: '/m/07j7r',
  трава: '/m/08t9c_',
  хмызнякоў: '/m/0gqbt',
  кактус: '/m/025_v',
  пальмы: '/m/0cdl1',
  прыроды: '/m/05h0n',
  вадаспады: '/m/0j2kx',
  горы: '/m/09d_r',
  пагоркі: '/m/09d_r',
  вадаёмы: '/m/03ktm1',
  рэкі: '/m/06cnp',
  пляжы: '/m/0b3yr',
  Сонца: '/m/06m_p',
  Месяц: '/m/04wv_',
  неба: '/m/01bqvp',
  транспартныхсродкаў: '/m/0k4j',
  машыны: '/m/0k4j',
  веласіпеды: '/m/0199g',
  матацыклы: '/m/04_sv',
  пікапы: '/m/0cvq3',
  камерцыйныягрузавікі: '/m/0fkwjg',
  лодкі: '/m/019jd',
  лімузіны: '/m/01lcw4',
  таксі: '/m/0pg52',
  школьныаўтобус: '/m/02yvhj',
  аўтобус: '/m/01bjv',
  будаўнічаямашына: '/m/02gx17',
  статуі: '/m/013_1c',
  фантаны: '/m/0h8lhkg',
  мост: '/m/015kr',
  прыстань: '/m/01phq4',
  хмарачос: '/m/079cl',
  слупыабокалоны: '/m/01_m7',
  вітражы: '/m/011y23',
  дом: '/m/03jm5',
  жылыдом: '/m/01nblt',
  светлавыдом: '/m/04h7h',
  чыгуначнаястанцыя: '/m/0py27',
  попелам: '/m/01n6fd',
  вогнегадрант: '/m/01pns0',
  рэкламнышчыт: '/m/01knjb',
  дарогі: '/m/06gfj',
  пешаходныяпераходы: '/m/014xcs',
  святлафор: '/m/015qff',
  гаражныядзверы: '/m/08l941',
  аўтобусныяпрыпынкі: '/m/01jw_1',
  трафіку: '/m/03sy7v',
  паркоматары: '/m/015qbp',
  лесвіцы: '/m/01lynh',
  коміны: '/m/01jk_4',
  трактары: '/m/013xlm',

  // 泰语
  ภูเขาหรือเนินเขา: '/m/09d_r',
  ป้ายหยุด: '/m/02pv19',
  ป้ายถนน: '/m/01mqdt',
  พืช: '/m/05s2s',
  ต้นไม้: '/m/07j7r',
  หญ้า: '/m/08t9c_',
  พุ่มไม้: '/m/0gqbt',
  กระบองเพชร: '/m/025_v',
  ต้นปาล์ม: '/m/0cdl1',
  ธรรมชาติ: '/m/05h0n',
  น้ำตก: '/m/0j2kx',
  ภูเขา: '/m/09d_r',
  เนินเขา: '/m/09d_r',
  แหล่งน้ำ: '/m/03ktm1',
  แม่น้ำ: '/m/06cnp',
  ชายหาด: '/m/0b3yr',
  ดวงอาทิตย์: '/m/06m_p',
  ดวงจันทร์: '/m/04wv_',
  ท้องฟ้า: '/m/01bqvp',
  ยานพาหนะ: '/m/0k4j',
  รถ: '/m/0k4j',
  จักรยาน: '/m/0199g',
  รถจักรยานยนต์: '/m/04_sv',
  รถปิคอัพ: '/m/0cvq3',
  รถบรรทุกเชิงพาณิชย์: '/m/0fkwjg',
  เรือ: '/m/019jd',
  รถลีมูซีน: '/m/01lcw4',
  แท็กซี่: '/m/0pg52',
  รถโรงเรียน: '/m/02yvhj',
  รสบัส: '/m/01bjv',
  รถก่อสร้าง: '/m/02gx17',
  รูปปั้น: '/m/013_1c',
  น้ำพุ: '/m/0h8lhkg',
  สะพาน: '/m/015kr',
  ท่าเรือ: '/m/01phq4',
  ตึกระฟ้า: '/m/079cl',
  เสาเสา: '/m/01_m7',
  กระจกสี: '/m/011y23',
  บ้าน: '/m/03jm5',
  ตึกอพาร์ตเมนท์: '/m/01nblt',
  ประภาคาร: '/m/04h7h',
  สถานีรถไฟ: '/m/0py27',
  เถ้าถ่าน: '/m/01n6fd',
  ดับเพลิง: '/m/01pns0',
  ป้ายบิลบอร์ด: '/m/01knjb',
  ถนน: '/m/06gfj',
  ทางม้าลาย: '/m/014xcs',
  ไฟจราจร: '/m/015qff',
  ประตูโรงรถ: '/m/08l941',
  ป้ายรถเมล์: '/m/01jw_1',
  กรวยจราจร: '/m/03sy7v',
  เมตรที่จอดรถ: '/m/015qbp',
  บันได: '/m/01lynh',
  ปล่องไฟ: '/m/01jk_4',
  รถแทรกเตอร์: '/m/013xlm',
  รถบัส: '/m/01bjv',
  รถจักรยาน: '/m/0199g',
  หัวก๊อกน้ำดับเพลิง: '/m/01pns0',
  รถยนต์: '/m/0k4j',

  // 土耳其
  dağlarveyatepeler: '/m/09d_r',
  'dur"işaretleri': '/m/02pv19',
  sokakişaretleri: '/m/01mqdt',
  bitkiler: '/m/05s2s',
  ağaçlar: '/m/07j7r',
  Çimen: '/m/08t9c_',
  çalılar: '/m/0gqbt',
  kaktüs: '/m/025_v',
  Palmiyeağaçları: '/m/0cdl1',
  Doğa: '/m/05h0n',
  şelaleler: '/m/0j2kx',
  dağlar: '/m/09d_r',
  tepeler: '/m/09d_r',
  suyunbedenleri: '/m/03ktm1',
  nehirler: '/m/06cnp',
  Sahiller: '/m/0b3yr',
  Güneş: '/m/06m_p',
  Ay: '/m/04wv_',
  gökyüzü: '/m/01bqvp',
  Araçlar: '/m/0k4j',
  arabalar: '/m/0k4j',
  bisikletler: '/m/0199g',
  motosikletler: '/m/04_sv',
  kamyonetler: '/m/0cvq3',
  ticarikamyonlar: '/m/0fkwjg',
  tekneler: '/m/019jd',
  limuzinler: '/m/01lcw4',
  taksiler: '/m/0pg52',
  okulotobüsü: '/m/02yvhj',
  otobüs: '/m/01bjv',
  inşaataracı: '/m/02gx17',
  heykeller: '/m/013_1c',
  çeşmeler: '/m/0h8lhkg',
  köprü: '/m/015kr',
  iskele: '/m/01phq4',
  gökdelen: '/m/079cl',
  sütunsütunları: '/m/01_m7',
  vitray: '/m/011y23',
  ev: '/m/03jm5',
  apartmanbinası: '/m/01nblt',
  hafifev: '/m/04h7h',
  trenistasyonu: '/m/0py27',
  kül: '/m/01n6fd',
  yangınmusluğu: '/m/01pns0',
  reklampanosu: '/m/01knjb',
  yollar: '/m/06gfj',
  yayageçitleri: '/m/014xcs',
  trafikışıkları: '/m/015qff',
  garajkapıları: '/m/08l941',
  otobüsdurakları: '/m/01jw_1',
  trafikKonileri: '/m/03sy7v',
  Parksayacı: '/m/015qbp',
  merdivenler: '/m/01lynh',
  bacalar: '/m/01jk_4',
  traktörler: '/m/013xlm',
  Yangınmusluğu: '/m/01pns0',

  Traktör: '/m/013xlm',
  Trafiklambası: '/m/015qff',
  Motosikletin: '/m/04_sv',
  Baca: '/m/01jk_4',
  Merdiven: '/m/01lynh',
  Dağveyatepe: '/m/09d_r',
  Palmiyeağacı: '/m/0cdl1',
  Yayageçidi: '/m/014xcs',
  Köprü: '/m/015kr',
  Taksi: '/m/0pg52',
  Tekne: '/m/019jd',
  Otobüs: '/m/01bjv',
  Bisiklet: '/m/0199g',
  Motosiklet: '/m/04_sv',
  Taşıt: '/m/0k4j',
  Araba: '/m/0k4j',

  // 日语
  ストップサイン: '/m/02pv19',
  道路標識: '/m/01mqdt',
  植物: '/m/05s2s',
  木: '/m/07j7r',
  草: '/m/08t9c_',
  低木: '/m/0gqbt',
  カクタス: '/m/025_v',
  ヤシの木: '/m/0cdl1',
  自然: '/m/05h0n',
  滝: '/m/0j2kx',
  山: '/m/09d_r',
  丘: '/m/09d_r',
  水域: '/m/03ktm1',
  河川: '/m/06cnp',
  ビーチ: '/m/0b3yr',
  太陽: '/m/06m_p',
  月: '/m/04wv_',
  空: '/m/01bqvp',
  車両: '/m/0k4j',
  自動車: '/m/0k4j',
  車: '/m/0k4j',
  自転車: '/m/0199g',
  オートバイ: '/m/04_sv',
  ピックアップトラック: '/m/0cvq3',
  コマーシャルトラック: '/m/0fkwjg',
  ボート: '/m/019jd',
  リムジン: '/m/01lcw4',
  タクシー: '/m/0pg52',
  スクールバス: '/m/02yvhj',
  バス: '/m/01bjv',
  建設車両: '/m/02gx17',
  彫像: '/m/013_1c',
  噴水: '/m/0h8lhkg',
  橋: '/m/015kr',
  橋脚: '/m/01phq4',
  超高層ビル: '/m/079cl',
  柱または柱: '/m/01_m7',
  ステンドグラス: '/m/011y23',
  家: '/m/03jm5',
  アナパートメントビル: '/m/01nblt',
  灯台: '/m/04h7h',
  でんしゃのりば: '/m/0py27',
  小屋: '/m/01n6fd',
  消火剤: '/m/01pns0',
  アビルボード: '/m/01knjb',
  道路: '/m/06gfj',
  横断歩道: '/m/014xcs',
  信号機: '/m/015qff',
  交通灯: '/m/015qff',
  ガレージドア: '/m/08l941',
  バス停: '/m/01jw_1',
  トラフィックコーン: '/m/03sy7v',
  パーキングメーター: '/m/015qbp',
  階段: '/m/01lynh',
  煙突: '/m/01jk_4',
  トラクター: '/m/013xlm',

  山や丘: '/m/09d_r',

  // 繁体中文: 台湾
  停車標誌: '/m/02pv19',
  路牌: '/m/01mqdt',
  樹木: '/m/07j7r',
  灌木: '/m/0gqbt',
  仙人掌: '/m/025_v',
  棕櫚樹: '/m/0cdl1',
  瀑布: '/m/0j2kx',
  高山或山丘: '/m/09d_r',
  丘陵: '/m/09d_r',
  水體: '/m/03ktm1',
  河流: '/m/06cnp',
  海灘: '/m/0b3yr',
  月亮: '/m/04wv_',
  天空: '/m/01bqvp',
  車輛: '/m/0k4j',
  汽車: '/m/0k4j',
  腳踏車: '/m/0199g',
  自行車: '/m/0199g',
  機車: '/m/04_sv',
  摩托車: '/m/04_sv',
  皮卡車: '/m/0cvq3',
  商用卡車: '/m/0fkwjg',
  船: '/m/019jd',
  豪華轎車: '/m/01lcw4',
  出租車: '/m/0pg52',
  校車: '/m/02yvhj',
  公車: '/m/01bjv',
  公共汽車: '/m/01bjv',
  施工車輛: '/m/02gx17',
  雕像: '/m/013_1c',
  噴泉: '/m/0h8lhkg',
  橋梁: '/m/015kr',
  碼頭: '/m/01phq4',
  摩天大樓: '/m/079cl',
  柱子或柱子: '/m/01_m7',
  彩色玻璃: '/m/011y23',
  房子: '/m/03jm5',
  公寓樓: '/m/01nblt',
  燈塔: '/m/04h7h',
  火車站: '/m/0py27',
  一棚: '/m/01n6fd',
  消防栓: '/m/01pns0',
  廣告牌: '/m/01knjb',
  行人穿越道: '/m/014xcs',
  人行橫道: '/m/014xcs',
  紅綠燈: '/m/015qff',
  車庫門: '/m/08l941',
  巴士站: '/m/01jw_1',
  交通錐: '/m/03sy7v',
  停車場計價表: '/m/015qbp',
  樓梯: '/m/01lynh',
  煙囪: '/m/01jk_4',
  拖拉機: '/m/013xlm',

  // 繁体中文：香港
  電單車: '/m/04_sv',
  單車: '/m/0199g',
  巴士: '/m/01bjv',
  十字路口: '/m/014xcs',
  交通燈: '/m/015qff',
  斑馬線: '/m/014xcs',
  計程車: '/m/0pg52',
  的士: '/m/0pg52',
  船隻: '/m/019jd',
  山峰或山: '/m/09d_r',
  橋樑: '/m/015kr',

  // 俄语
  'стоп-сигналы': '/m/02pv19',
  'дорожные знаки': '/m/01mqdt',
  растения: '/m/05s2s',
  деревья: '/m/07j7r',
  кустарники: '/m/0gqbt',
  'пальмовые деревья': '/m/0cdl1',
  природа: '/m/05h0n',
  водопады: '/m/0j2kx',
  холмы: '/m/09d_r',
  водоемы: '/m/03ktm1',
  реки: '/m/06cnp',
  пляжи: '/m/0b3yr',
  солнце: '/m/06m_p',
  Луна: '/m/04wv_',
  небо: '/m/01bqvp',
  'транспортные средства': '/m/0k4j',
  машины: '/m/0k4j',
  велосипеды: '/m/0199g',
  мотоциклы: '/m/04_sv',
  пикапы: '/m/0cvq3',
  'коммерческие грузовики': '/m/0fkwjg',
  лодки: '/m/019jd',
  лимузины: '/m/01lcw4',
  Таксис: '/m/0pg52',
  'школьный автобус': '/m/02yvhj',
  автобус: '/m/01bjv',
  'строительная машина': '/m/02gx17',
  статуи: '/m/013_1c',
  фонтаны: '/m/0h8lhkg',
  пирс: '/m/01phq4',
  небоскреб: '/m/079cl',
  'столбыили колонны': '/m/01_m7',
  витраж: '/m/011y23',
  'многоквартирный дом': '/m/01nblt',
  'светлый дом': '/m/04h7h',
  'железнодорожная станция': '/m/0py27',
  пепельный: '/m/01n6fd',
  'пожарный гидрант': '/m/01pns0',
  'рекламный щит': '/m/01knjb',
  дороги: '/m/06gfj',
  'пешеходные переходы': '/m/014xcs',
  светофор: '/m/015qff',
  'гаражные ворота': '/m/08l941',
  'автобусные остановки': '/m/01jw_1',
  конусы: '/m/03sy7v',
  'парковочные счетчики': '/m/015qbp',
  лестница: '/m/01lynh',
  дымоходы: '/m/01jk_4',
  тракторы: '/m/013xlm',

  автомобили: '/m/0k4j',
  горыилихолмы: '/m/09d_r',
  светофоры: '/m/015qff',
  транспортныесредства: '/m/0k4j',
  пешеходныепереходы: '/m/014xcs',
  пожарныегидранты: '/m/01pns0',
  лестницы: '/m/01lynh',
  гидрантами: '/m/01pns0',
  автобусы: '/m/01bjv',
  дымовыетрубы: '/m/01jk_4',
  трактора: '/m/013xlm',
  такси: '/m/0pg52',
  мостами: '/m/015kr',

  // 乌克兰语
  горичипагорби: '/m/09d_r',
  знакизупинки: '/m/02pv19',
  дорожнізнаки: '/m/01mqdt',
  рослини: '/m/05s2s',
  дерева: '/m/07j7r',
  чагарники: '/m/0gqbt',
  пальмовідерева: '/m/0cdl1',
  водоспади: '/m/0j2kx',
  гори: '/m/09d_r',
  пагорби: '/m/09d_r',
  водойми: '/m/03ktm1',
  річки: '/m/06cnp',
  пляжі: '/m/0b3yr',
  сонце: '/m/06m_p',
  Місяць: '/m/04wv_'
}, (0, _defineProperty3.default)(_jsonall, '\u043D\u0435\u0431\u043E', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, '\u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u0456\u0437\u0430\u0441\u043E\u0431\u0438', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u0456\u0432', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0432\u0435\u043B\u043E\u0441\u0438\u043F\u0435\u0434\u0438', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u043C\u043E\u0442\u043E\u0446\u0438\u043A\u043B\u0438', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u043F\u0456\u043A\u0430\u043F\u0438', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, '\u043A\u043E\u043C\u0435\u0440\u0446\u0456\u0439\u043D\u0456\u0432\u0430\u043D\u0442\u0430\u0436\u0456\u0432\u043A\u0438', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, '\u0447\u043E\u0432\u043D\u0438', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, '\u043B\u0456\u043C\u0443\u0437\u0438\u043D\u0438', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, '\u0442\u0430\u043A\u0441\u0456', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\u0448\u043A\u0456\u043B\u044C\u043D\u0438\u0439\u0430\u0432\u0442\u043E\u0431\u0443\u0441', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, '\u0430\u0432\u0442\u043E\u0431\u0443\u0441', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u0431\u0443\u0434\u0456\u0432\u0435\u043B\u044C\u043D\u0438\u0439\u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u044C', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, '\u0441\u0442\u0430\u0442\u0443\u0457', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, '\u0444\u043E\u043D\u0442\u0430\u043D\u0438', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, '\u043C\u0456\u0441\u0442', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u043F\u0440\u0438\u0441\u0442\u0430\u043D\u044C', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, '\u0445\u043C\u0430\u0440\u043E\u0447\u043E\u0441', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, '\u0441\u0442\u043E\u0432\u043F\u0438\u0430\u0431\u043E\u043A\u043E\u043B\u043E\u043D\u0438', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, '\u0432\u0456\u0442\u0440\u0430\u0436\u043D\u0435\u0441\u043A\u043B\u043E', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, '\u0431\u0443\u0434\u0438\u043D\u043E\u043A', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, '\u0431\u0430\u0433\u0430\u0442\u043E\u043A\u0432\u0430\u0440\u0442\u0438\u0440\u043D\u0438\u0439\u0431\u0443\u0434\u0438\u043D\u043E\u043A', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, '\u0441\u0432\u0456\u0442\u043B\u0438\u0439\u0431\u0443\u0434\u0438\u043D\u043E\u043A', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, '\u0437\u0430\u043B\u0456\u0437\u043D\u0438\u0447\u043D\u0430\u0441\u0442\u0430\u043D\u0446\u0456\u044F', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, '\u043F\u043E\u043F\u0456\u043B', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, '\u0432\u043E\u0433\u043D\u0435\u0433\u0456\u0434\u0440\u0430\u043D\u0442', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u0431\u0456\u043B\u0431\u043E\u0440\u0434', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, '\u0434\u043E\u0440\u043E\u0433\u0438', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, '\u043F\u0456\u0448\u043E\u0445\u0456\u0434\u043D\u0456\u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u0441\u0432\u0456\u0442\u043B\u043E\u0444\u043E\u0440', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u0433\u0430\u0440\u0430\u0436\u043D\u0456\u0434\u0432\u0435\u0440\u0456', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, '\u0430\u0432\u0442\u043E\u0431\u0443\u0441\u043D\u0456\u0437\u0443\u043F\u0438\u043D\u043A\u0438', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, '\u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u0456\u043A\u043E\u043D\u0443\u0441\u0438', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, '\u043F\u0430\u0440\u043A\u043E\u043C\u0430\u0442\u0438', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, '\u0441\u0445\u043E\u0434\u0438', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u0434\u0438\u043C\u0430\u0440\u0456', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u0442\u0440\u0430\u043A\u0442\u043E\u0440\u0438', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u0456', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0433\u043E\u0440\u0438\u0447\u0438\u043F\u0430\u0433\u043E\u0440\u0431\u0438', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u0456\u0437\u0430\u0441\u043E\u0431\u0438', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u043A\u043E\u043C\u0438\u043D\u0438', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u043F\u0456\u0448\u043E\u0445\u0456\u0434\u043D\u0456\u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u0441\u0432\u0456\u0442\u043B\u043E\u0444\u043E\u0440\u0438', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u043C\u043E\u0441\u0442\u0438', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u043F\u043E\u0436\u0435\u0436\u043D\u0438\u0439\u0433\u0456\u0434\u0440\u0430\u043D\u0442', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u043F\u0430\u043B\u044C\u043C\u0438', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0438', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u0441\u0443\u0434\u043D\u0430', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, '\u043F\u043E\u0436\u0435\u0436\u043D\u0456\u0433\u0456\u0434\u0440\u0430\u043D\u0442\u0438', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'monta\xF1asocolinas', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'se\xF1alesdealto', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'Se\xF1alesdetransito', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'plantas', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, '\xE1rboles', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'c\xE9sped', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'arbustos', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'cactus', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'palmeras', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'naturaleza', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'cascadas', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'monta\xF1as', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'sierras', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'cuerposdeagua', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'r\xEDos', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'playas', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'sol', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'Luna', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'cielo', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'veh\xEDculos', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'coches', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'bicicletas', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'motocicletas', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'camionetas', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'camionescomerciales', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'barcos', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'limusinas', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'Taxis', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'autob\xFAsescolar', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'autob\xFAs', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'veh\xEDculodeconstrucci\xF3n', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'estatuas', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'fuentes', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'puente', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'muelle', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'rascacielos', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'pilaresocolumnas', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'Vitral', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'casa', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'Unedificiodeapartamentos', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'casaligera', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'estaci\xF3ndetren', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'cenizas', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'unabocadeincendios', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'cartelera', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'carreteras', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'crucesdepeatones', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'sem\xE1foros', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'puertasdegaraje', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'paradasdeautobus', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'conosdetr\xE1fico', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'parqu\xEDmetros', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'escalera', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'chimeneas', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'tractores', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'pasosdepeatones', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'autobuses', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'puentes', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'escaleras', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'bocasdeincendios', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'montagnesoucollines', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, "panneauxd'arrêt", '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'panneauxdesignalisation', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'lesplantes', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, 'desarbres', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'gazon', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'arbustes', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'cactus', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'palmiers', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'lanature', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'cascades', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'montagnes', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'collines', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, "corpsd'eau", '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'rivi\xE8res', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'desplages', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'soleil', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'Lune', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'ciel', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'V\xE9hicules', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'voitures', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'V\xE9los', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'motocyclettes', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'camionnettes', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'camionscommerciaux', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'bateaux', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'limousines', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'Taxis', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'busscolaire', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'bus', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'v\xE9hiculedeconstruction', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'statues', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'fontaines', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'pont', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'jet\xE9e', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'gratte-ciel', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'piliersoucolonnes', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'vitrail', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'loger', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'unimmeuble', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'maisonlumineuse', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'gare', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'encendres', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, "unebouched'incendie", '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, "unpanneaud'affichage", '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'routes', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'passagespourpi\xE9tons', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'feuxdecirculation', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'portesdegarage', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, "arrêtsd'autobus", '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'c\xF4nesdesignalisation', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'parcom\xE8tres', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'escaliers', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'chemin\xE9es', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'tracteurs', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'v\xE9hicules', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, "bouchesd'incendie", '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'v\xE9los', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'ponts', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, "borned'incendie", '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'motos', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'BergeoderH\xFCgel', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'StoppSchilder', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'Stra\xDFenschilder', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'Pflanzen', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, 'B\xE4ume', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'Gras', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'Str\xE4ucher', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'Kaktus', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'Palmen', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'Natur', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'Wasserf\xE4lle', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'Berge', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'H\xFCgel', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'Wasserk\xF6rper', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'Fl\xFCsse', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'Str\xE4nde', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'Sonne', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'Mond', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'Himmel', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'Fahrzeuge', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'Autos', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'Fahrr\xE4der', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'Motorr\xE4der', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'Pickups', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'Nutzfahrzeuge', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'Boote', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'Limousinen', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'Taxen', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'Schulbus', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'Bus', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'Baufahrzeug', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'Statuen', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'Brunnen', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'Br\xFCcke', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'Seebr\xFCcke', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'Wolkenkratzer', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'S\xE4ulenoderS\xE4ulen', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'Buntglas', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'Haus', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'einWohnhaus', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'Leuchtturm', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'Bahnhof', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'einSchuppen', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'einHydrant', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'eineWerbetafel', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'Stra\xDFen', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'Zebrastreifen', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'Ampeln', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'Garagentore', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'Bushaltestellen', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'Leitkegel', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'Parkuhren', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'Treppe', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'Schornsteine', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'Traktoren', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'Treppen(stufen)', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'BergenoderH\xFCgeln', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'Fahrzeugen', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'Hydranten', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'Zweir\xE4dern', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'Fahrr\xE4dern', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'Fu\xDFg\xE4nger\xFCberwegen', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'Pkws', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'Schornsteinen', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'Motorr\xE4dern', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'Bussen', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'Br\xFCcken', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'Booten', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'Feuerhydranten', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u062C\u0628\u0627\u0644\u0623\u0648\u0627\u0644\u062A\u0644\u0627\u0644', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0639\u0644\u0627\u0645\u0627\u062A\u0627\u0644\u062A\u0648\u0642\u0641', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, '\u0644\u0627\u0641\u062A\u0627\u062A\u0627\u0644\u0634\u0648\u0627\u0631\u0639', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0646\u0628\u0627\u062A\u0627\u062A', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0623\u0634\u062C\u0627\u0631', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, '\u0639\u0634\u0628', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0634\u062C\u064A\u0631\u0627\u062A', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, '\u0635\u0628\u0627\u0631', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, '\u0623\u0634\u062C\u0627\u0631\u0627\u0644\u0646\u062E\u064A\u0644', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u0637\u0628\u064A\u0639\u0629\u0633\u062C\u064A\u0629', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0634\u0644\u0627\u0644\u0627\u062A', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u062C\u0628\u0627\u0644', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u062A\u0644\u0627\u0644', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0645\u0633\u0637\u062D\u0627\u062A\u0627\u0644\u0645\u0627\u0626\u064A\u0629', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0623\u0646\u0647\u0627\u0631', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0634\u0648\u0627\u0637\u0626', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0634\u0645\u0633', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0642\u0645\u0631', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, '\u0633\u0645\u0627\u0621', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, '\u0645\u0631\u0643\u0628\u0627\u062A', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0633\u064A\u0627\u0631\u0627\u062A', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u062F\u0631\u0627\u062C\u0627\u062A', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u062F\u0631\u0627\u062C\u0627\u062A\u0646\u0627\u0631\u064A\u0629', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u0634\u0627\u062D\u0646\u0627\u062A\u0635\u063A\u064A\u0631\u0629', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, '\u0634\u0627\u062D\u0646\u0627\u062A\u062A\u062C\u0627\u0631\u064A\u0629', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0642\u0648\u0627\u0631\u0628', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, '\u0633\u064A\u0627\u0631\u0627\u062A\u0627\u0644\u0644\u064A\u0645\u0648\u0632\u064A\u0646', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, '\u0633\u064A\u0627\u0631\u0627\u062A\u0627\u0644\u0623\u062C\u0631\u0629', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\u0628\u0627\u0635\u0627\u0644\u0645\u062F\u0631\u0633\u0629', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, '\u0623\u0648\u062A\u0648\u0628\u064A\u0633', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u0645\u0631\u0643\u0628\u0629\u0627\u0644\u0628\u0646\u0627\u0621', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, '\u062A\u0645\u0627\u062B\u064A\u0644', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, '\u0646\u0648\u0627\u0641\u064A\u0631', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, '\u0643\u0648\u0628\u0631\u064A', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u0631\u0635\u064A\u0641\u0628\u062D\u0631\u064A', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, '\u0646\u0627\u0637\u062D\u0629\u0633\u062D\u0627\u0628', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, '\u0623\u0639\u0645\u062F\u0629\u0627\u0644\u0623\u0639\u0645\u062F\u0629', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, '\u0632\u062C\u0627\u062C\u0645\u0644\u0648\u0646', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, '\u0628\u064A\u062A', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, '\u0645\u0628\u0646\u0649\u0633\u0643\u0646\u064A', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, '\u0645\u0646\u0627\u0631\u0629', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, '\u0645\u062D\u0637\u0629\u0627\u0644\u0642\u0637\u0627\u0631', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, '\u0623\u0634\u064A\u062F', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, '\u0637\u0641\u0627\u064A\u0629\u062D\u0631\u064A\u0642', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'abillboard', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0637\u0631\u0642', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, '\u0645\u0645\u0631\u0627\u062A\u0627\u0644\u0645\u0634\u0627\u0629', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u0625\u0634\u0627\u0631\u0627\u062A\u0627\u0644\u0645\u0631\u0648\u0631', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u0645\u0631\u0622\u0628', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, '\u0645\u062D\u0637\u0627\u062A\u0627\u0644\u062D\u0627\u0641\u0644\u0627\u062A', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u0623\u0642\u0645\u0627\u0639\u0627\u0644\u0645\u0631\u0648\u0631\u064A\u0629', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, '\u0639\u062F\u0627\u062F\u0627\u062A\u0645\u0648\u0627\u0642\u0641\u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, '\u062F\u0631\u062C', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u0645\u062F\u0627\u062E\u0646', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u0627\u0644\u062C\u0631\u0627\u0631\u0627\u062A', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u0635\u0646\u0627\u0628\u064A\u0631\u0625\u0637\u0641\u0627\u0621\u062D\u0631\u0627\u0626\u0642', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u0625\u0634\u0627\u0631\u0627\u062A\u0645\u0631\u0648\u0631', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u062D\u0627\u0641\u0644\u0629', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u062F\u0631\u0651\u0627\u062C\u0627', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u062F\u0631\u0651\u0627\u062C\u0627\u062A', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u0633\u064A\u0627\u0631\u0627\u062A\u0623\u062C\u0631\u0629', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\u062C\u0633\u0648\u0631', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u062F\u064E\u0631\u064E\u062C', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u0645\u062F\u0627\u062E\u0650\u0646', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u062F\u0631\u0627\u062C\u0627\u062A\u0647\u0648\u0627\u0626\u064A\u0629', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u0645\u0645\u0631\u0651\u0627\u062A\u0644\u0644\u0645\u0634\u0627\u0629', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u0645\u062D\u0628\u0633\u0625\u0637\u0641\u0627\u0621\u062D\u0631\u064A\u0642', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u0633\u064A\u0627\u0631\u0629\u0623\u062C\u0631\u0629', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\u0642\u0648\u0627\u0631\u0628', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, '\u062C\u0628\u0627\u0644\u0623\u0648\u062A\u0644\u0627\u0644', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u062C\u0631\u0627\u0631\u0627\u062A', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u0623\u0634\u062C\u0627\u0631\u0646\u062E\u064A\u0644', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u0645\u0646\u0627\u0637\u0642\u0639\u0628\u0648\u0631\u0645\u0634\u0627\u0629', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u062D\u0627\u0641\u0644\u0627\u062A', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u062F\u0631\u0651\u0627\u062C\u0627\u062A\u0628\u062E\u0627\u0631\u064A\u0629', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u062C\u0631\u0651\u0627\u0631\u0627\u062A', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u092A\u0939\u093E\u0921\u093C\u092F\u093E\u092A\u0939\u093E\u0921\u093C\u093F\u092F\u093E\u0901', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0938\u094D\u091F\u0949\u092A\u0938\u093E\u0907\u0928\u094D\u0938', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, '\u0938\u0921\u093C\u0915\u0915\u0947\u0938\u0902\u0915\u0947\u0924', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, '\u092A\u094C\u0927\u094B\u0902', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, '\u092A\u0947\u0921\u093C', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, '\u0918\u093E\u0938', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, '\u091D\u093E\u0921\u093C\u093F\u092F\u093E\u0902', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, '\u0915\u0948\u0915\u094D\u091F\u0938', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, '\u0916\u091C\u0942\u0930\u0915\u0947\u092A\u0947\u0921\u093C', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u092A\u094D\u0930\u0915\u0943\u0924\u093F', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, '\u091D\u0930\u0928\u0947', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, '\u092A\u0939\u093E\u0921\u093C\u094B\u0902', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0939\u093F\u0932\u094D\u0938', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u091C\u0932\u0928\u093F\u0915\u093E\u092F\u094B\u0902', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, '\u0928\u0926\u093F\u092F\u094B\u0902', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, '\u0938\u092E\u0941\u0926\u094D\u0930\u0924\u091F\u094B\u0902', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, '\u0930\u0935\u093F', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, '\u091A\u0902\u0926\u094D\u0930\u092E\u093E', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, '\u0906\u0915\u093E\u0936', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, '\u0935\u093E\u0939\u0928\u094B\u0902', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0915\u093E\u0930\u094B\u0902', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0938\u093E\u0907\u0915\u093F\u0932\u0947\u0902', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u092E\u094B\u091F\u0930\u0938\u093E\u0907\u0915\u093F\u0932\u0947\u0902', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u0922\u094B\u0928\u0947\u0935\u093E\u0932\u0947\u091F\u094D\u0930\u0915\u094B\u0902', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, '\u0935\u093E\u0923\u093F\u091C\u094D\u092F\u093F\u0915\u091F\u094D\u0930\u0915', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, '\u0928\u094C\u0915\u093E\u0913\u0902', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'limousines', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, '\u091F\u0948\u0915\u094D\u0938\u0940', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\u0938\u094D\u0915\u0942\u0932\u092C\u0938', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, '\u092C\u0938', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u0928\u093F\u0930\u094D\u092E\u093E\u0923\u0935\u093E\u0939\u0928', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, '\u092E\u0942\u0930\u094D\u0924\u093F\u092F\u094B\u0902', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, '\u092B\u0935\u094D\u0935\u093E\u0930\u0947', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, '\u092A\u0941\u0932', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u0918\u093E\u091F', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, '\u0917\u0917\u0928\u091A\u0941\u0902\u092C\u0940\u0907\u092E\u093E\u0930\u0924', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, '\u0938\u094D\u0924\u0902\u092D\u092F\u093E\u0938\u094D\u0924\u0902\u092D', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, '\u0930\u0902\u0917\u0940\u0928\u0915\u093E\u0902\u091A', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, '\u092E\u0915\u093E\u0928', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, '\u0905\u092A\u093E\u0930\u094D\u091F\u092E\u0947\u0902\u091F\u0907\u092E\u093E\u0930\u0924', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, '\u0932\u093E\u0907\u091F\u0939\u093E\u0909\u0938', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, '\u0930\u0947\u0932\u0935\u0947\u0938\u094D\u091F\u0947\u0936\u0928', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, '\u090F\u0915\u091B\u092A\u094D\u092A\u0930', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, '\u0905\u0917\u094D\u0928\u093F\u0939\u093E\u0907\u0921\u094D\u0930\u0947\u0902\u091F', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u092C\u093F\u0932\u092C\u094B\u0930\u094D\u0921', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, '\u0938\u0921\u093C\u0915\u0947\u0902', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, '\u0915\u094D\u0930\u0949\u0938\u0935\u0949\u0915', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u092F\u093E\u0924\u093E\u092F\u093E\u0924\u092C\u0924\u094D\u0924\u093F\u092F\u093E', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u0917\u0948\u0930\u0947\u091C\u0915\u0947\u0926\u0930\u0935\u093E\u091C\u0947', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, '\u092C\u0938\u0930\u0942\u0915\u0928\u0947\u0915\u0940\u091C\u0917\u0939', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, '\u091F\u094D\u0930\u0948\u092B\u093F\u0915\u0915\u094B\u0928\u0938', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, '\u092A\u093E\u0930\u094D\u0915\u093F\u0902\u0917\u092E\u0940\u091F\u0930', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, '\u0938\u0940\u0922\u093C\u093F\u092F\u093E\u0902', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u091A\u093F\u092E\u0928\u093F\u092F\u093E\u0902', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u091F\u094D\u0930\u0948\u0915\u094D\u091F\u0930', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u0905\u0917\u094D\u0928\u093F\u0936\u093E\u092E\u0915\u0939\u093E\u0908\u0921\u094D\u0930\u0947\u0902\u091F', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u092A\u0948\u0926\u0932\u092A\u093E\u0930\u092A\u0925', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u091F\u094D\u0930\u0948\u092B\u093C\u093F\u0915\u0932\u093E\u0907\u091F', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u092A\u0941\u0932\u094B\u0902', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u0938\u0940\u095D\u093F\u092F\u094B\u0902', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u092A\u0939\u093E\u0921\u093C\u092F\u093E\u092A\u0939\u093E\u0921\u093C\u0940', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0935\u093E\u0939\u0928', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u092E\u094B\u091F\u0930\u0938\u093E\u0907\u0915\u0932', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u0938\u093E\u0907\u0915\u0932', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u091A\u093F\u092E\u0928\u0940', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u0938\u093E\u0907\u0915\u0932\u094B\u0902', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'bergenofheuvels', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'stoptekens', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'verkeersborden', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'planten', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, 'bomen', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'gras', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'struiken', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'cactus', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'palmbomen', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'natuur', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'watervallen', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'bergen', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'heuvels', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'waterlichamen', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'rivieren', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'stranden', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'zon', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'Maan', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'lucht', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'voertuigen', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, "auto's", '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'fietsen', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'motorfietsen', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'pick-uptrucks', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'commerci\xEBlevrachtwagens', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'boten', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'limousines', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, "taxi's", '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'schoolbus', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'bus', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'bouwvoertuig', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'standbeelden', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'fonteinen', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'brug', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'pier', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'wolkenkrabber', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'pijlersofkolommen', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'glas-in-lood', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'huis', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'eenappartementsgebouw', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'vuurtoren', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'treinstation', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'indeasgelegd', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'brandkraan', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'prikbord', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'wegen', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'zebrapaden', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'verkeerslichten', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'garagedeuren', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'busstopt', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'verkeerskegels', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'parkeermeters', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'trap', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'schoorstenen', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'tractoren', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'eenbrandkraan', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'trappen', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'eenbrandkraan', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'oversteekplaatsen', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'bussen', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'bussen', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'bruggen', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'gunungataubukit', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'tandaberhenti', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'rambujalan', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'tanaman', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, 'pohon', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'rumput', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'semakbelukar', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'kaktus', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'pohon-pohonpalem', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'alam', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'airterjun', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'pegunungan', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'bukit', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'badanair', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'sungai', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'pantai', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'matahari', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'Bulan', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'langit', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'kendaraan', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'mobil', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'sepeda', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'sepedamotor', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'trukpickup', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'trukkomersial', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'perahu', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'limusin', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'taksi', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'bussekolah', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'bis', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'kendaraankonstruksi', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'patung', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'airmancur', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'menjembatani', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'dermaga', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'gedungpencakarlangit', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'pilarataukolom', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'kacaberwarna', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'rumah', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'sebuahgedungapartemen', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'rumahcahaya', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'Stasiunkereta', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'pucat', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'pemadamkebakaran', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'papanreklame', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'jalan', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'penyeberangan', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'lampulalulintas', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'pintugarasi', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'haltebus', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'kerucutlalulintas', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'meteranparkir', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'tangga', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'cerobong', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'traktor', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'hidrankebakaran', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'jembatan', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'zebracross', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'motor', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'cerobongasap', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'pohonpalem', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'montanhasoucolinas', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'sinaisdeparada', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'Sinaisdetransito', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'plantas', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, '\xE1rvores', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'Relva', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'arbustos', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'cacto', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'Palmeiras', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'natureza', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'cachoeiras', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'montanhas', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'Colinas', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'corposde\xE1gua', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'rios', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'praias', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'sol', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'Lua', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'c\xE9u', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 've\xEDculos', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'carros', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'bicicletas', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'motocicletas', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'Caminh\xF5es', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'caminh\xF5escomerciais', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'barcos', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'limusines', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'T\xE1xis', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\xF4nibusescolar', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, '\xF4nibus', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 've\xEDculodeconstru\xE7\xE3o', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'est\xE1tuas', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'fontes', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'Ponte', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'cais', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'arranha-céu', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'pilaresoucolunas', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'vitrais', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'lar', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'umpr\xE9diodeapartamentos', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'casadeluz', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'esta\xE7\xE3odetrem', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'cinza', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'hidrante', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'quadrodeavisos', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'estradas', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'faixasdepedestres', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'luzesdetr\xE2nsito', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'portasdegaragem', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'pontode\xF4nibus', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'Conesdetr\xE1fego', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'parqu\xEDmetros', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'escadaria', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'chamin\xE9s', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'tratores', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'escadas', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'faixasdepedestre', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'palmeiras', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'umhidrante', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'pontes', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 't\xE1xis', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'hidrantes', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'hidrantes', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'n\xFAiho\u1EB7c\u0111\u1ED3i', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0111i\u1EC3md\u1EEBng', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, '\u0111\u01B0\u1EDDngph\u1ED1', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'c\xE2y', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'b\xE3ic\u1ECF', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'c\xE2yb\u1EE5i', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'c\xE2yx\u01B0\u01A1ngr\u1ED3ng', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'c\xE2yc\u1ECD', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'Thi\xEAnnhi\xEAn', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'th\xE1cn\u01B0\u1EDBc', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'n\xFAinon', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0111\u1ED3in\xFAi', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'ngu\u1ED3nn\u01B0\u1EDBc', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 's\xF4ng', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'b\xE3ibi\u1EC3n', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'm\u1EB7ttr\u1EDDi', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'M\u1EB7ttr\u0103ng', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'b\u1EA7utr\u1EDDi', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'xec\u1ED9', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\xF4t\xF4', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'xe\u0111\u1EA1p', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'xem\xE1y', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'xeb\xE1nt\u1EA3i', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'xet\u1EA3ith\u01B0\u01A1ngm\u1EA1i', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'thuy\u1EC1n', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'xelimousine', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'taxi', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'xebu\xFDtc\u1EE7atr\u01B0\u1EDDng', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'xebu\xFDt', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'xex\xE2yd\u1EF1ng', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'nh\u1EEFngb\u1EE9ct\u01B0\u1EE3ng', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, '\u0111\xE0iphunn\u01B0\u1EDBc', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'c\u1EA7u', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u0111\xEA', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 't\xF2anh\xE0ch\u1ECDctr\u1EDDi', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'c\u1ED9ttr\u1EE5', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'k\xEDnhm\xE0u', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'nh\xE0\u1EDF', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 't\xF2anh\xE0chungc\u01B0', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'ng\xF4inh\xE0\xE1nhs\xE1ng', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'gaxel\u1EEDa', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'trot\xE0n', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'afirehydrant', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'abillboard', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'nh\u1EEFngcon\u0111\u01B0\u1EDDng', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'b\u0103ngqua\u0111\u01B0\u1EDDng', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u0111\xE8ngiaoth\xF4ng', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'nh\xE0\u0111\u1EC3xe', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'tr\u1EA1md\u1EEBngxebu\xFDt', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'giaoth\xF4ng', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, '\u0111\u1ED3ngh\u1ED3\u0111\u1ED7xe', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'c\u1EA7uthang', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u1ED1ngkh\xF3i', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'm\xE1yk\xE9o', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'v\u1EA1chqua\u0111\u01B0\u1EDDng', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'xeh\u01A1i', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'tr\u1EE5c\u1EA5pn\u01B0\u1EDBcch\u1EEFach\xE1y', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'v\xF2il\u1EA5yn\u01B0\u1EDBcch\u1EEFach\xE1y', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'xeg\u1EAFnm\xE1y', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'bundokoburol', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'stopsigns', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'Tandangmgakalye', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'halaman', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, 'mgapuno', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'damo', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'mgapalumpong', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'cactus', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'mgapunongpalma', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'kalikasan', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'talon', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'mgabundok', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'mgaburol', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'anyongtubig', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'mgailog', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'mgabeach', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'Araw', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'Buwan', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'langit', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'mgasasakyan', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'mgabisikleta', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'mgamotorsiklo', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'mgapickuptruck', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'mgakomersyalnatrak', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'mgabangka', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'mgalimousine', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'mgataxi', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'busngeskwelahan', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'bus', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'sasakyangpang-konstruksyon', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'mgaestatwa', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'mgafountain', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'tulay', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'pier', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'napakataasnagusali', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'mgahaligiohaligi', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'minantsahangsalamin', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'bahay', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'gusalingisangapartment', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'ilawnabahay', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'istasyonngtren', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'abo', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'afirehydrant', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'abillboard', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'mgakalsada', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'mgatawiran', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'ilawtrapiko', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'mgagarageddoor', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'hintuanngbus', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'mgatrafficcone', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'metrongparadahan', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'hagdan', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'mgatsimenea', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'mgatraktora', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'mgacrosswalk', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'mgailaw-trapiko', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'firehydrant', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'mgakotse', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'mgachimney', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'mgapalmtree', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'mgahagdan', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'mgabus', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'mgafirehydrant', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'mgatulay', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u0E9E\u0EB9\u0EC0\u0E82\u0EBB\u0EB2\u0EAB\u0EBC\u0EB7\u0EC0\u0E99\u0EB5\u0E99\u0E9E\u0EB9', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0E9B\u0EC9\u0EB2\u0E8D\u0EA2\u0EB8\u0E94', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, '\u0E9B\u0EC9\u0EB2\u0E8D\u0E96\u0EB0\u0EDC\u0EBB\u0E99', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, '\u0E9E\u0EB7\u0E94', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, '\u0E95\u0EBB\u0EC9\u0E99\u0EC4\u0EA1\u0EC9', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, '\u0EAB\u0E8D\u0EC9\u0EB2', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, '\u0EC4\u0EA1\u0EC9\u0E9E\u0EB8\u0EC8\u0EA1', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, '\u0E81\u0EB0\u0E97\u0EBD\u0EA1', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, '\u0EC4\u0EA1\u0EC9\u200B\u0EA2\u0EB7\u0E99\u200B\u0E95\u0EBB\u0EC9\u0E99\u200B\u0E9B\u0EB2\u0EA1', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u0E97\u0ECD\u0EB2\u0EA1\u0EB0\u0E8A\u0EB2\u0E94', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, '\u0E99\u0EC9\u0EB3\u0E95\u0EBB\u0E81\u0E95\u0EB2\u0E94', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, '\u0E9E\u0EB9\u0EC0\u0E82\u0EBB\u0EB2', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0EC0\u0E99\u0EB5\u0E99\u200B\u0E9E\u0EB9', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0EAE\u0EC8\u0EB2\u0E87\u0E81\u0EB2\u0E8D\u0E82\u0EAD\u0E87\u0E99\u0EC9\u0ECD\u0EB2', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, '\u0EC1\u0EA1\u0EC8\u0E99\u0EC9\u0EB3', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, '\u0EAB\u0EB2\u0E94\u0E8A\u0EB2\u0E8D', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, '\u0E95\u0EB2\u0EC0\u0EA7\u0EB1\u0E99', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, '\u0E94\u0EA7\u0E87\u0E88\u0EB1\u0E99', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, '\u0E97\u0EAD\u0E87\u0E9F\u0EC9\u0EB2', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, '\u0E9E\u0EB2\u0EAB\u0EB0\u0E99\u0EB0', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0E96\u0EB5\u0E9A', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0E88\u0EB1\u0E81', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0E81\u0EB0\u0E9A\u0EB0', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0E9A\u0EB1\u0E99\u0E97\u0EB8\u0E81\u0E81\u0EB2\u0E99\u0E84\u0EC9\u0EB2', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, '\u0EC0\u0EAE\u0EB7\u0EAD', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0EA5\u0EB5\u0EA1\u0EB9\u0E8A\u0EB5\u0E99', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, '\u0EC1\u0E97\u0EB1\u0E81\u0E8A\u0EB5', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u200B\u0EC0\u0EA1\u200B\u0EC2\u0EAE\u0E87\u200B\u0EAE\u0EBD\u0E99', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0EC0\u0EA1', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u0E9E\u0EB2\u0EAB\u0EB0\u0E99\u0EB0\u0E81\u0ECD\u0EC8\u0EAA\u0EC9\u0EB2\u0E87', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, '\u0EAE\u0EB9\u0E9A\u0E9B\u0EB1\u0EC9\u0E99', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, '\u0E99\u0EC9\u0EB3\u0E9E\u0EB8', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, '\u0E82\u0EBB\u0EA7', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u0E97\u0EC8\u0EB2\u0EC0\u0EAE\u0EB7\u0EAD', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, '\u0E95\u0EB6\u0E81\u0EAA\u0EB9\u0E87', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, '\u0E96\u0EB1\u0E99\u0EC0\u0EAA\u0EBB\u0EB2', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, '\u0EC1\u0E81\u0EC9\u0EA7\u0EAA\u0EB5', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, '\u0EC0\u0EAE\u0EB7\u0EAD\u0E99', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, '\u0E95\u0EB6\u0E81\u0EAD\u0EB2\u0E9E\u0EB2\u0E94\u0EC0\u0EA1\u0EB1\u0E99', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, '\u0EC0\u0EAE\u0EB7\u0EAD\u0E99\u0EC1\u0EAA\u0E87\u0EAA\u0EB0\u0EAB\u0EA7\u0EC8\u0EB2\u0E87', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, '\u0EAA\u0EB0\u0E96\u0EB2\u0E99\u0EB5\u0EA5\u0EBB\u0E94\u0EC4\u0E9F', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, '\u0E82\u0EB5\u0EC9\u0EC0\u0E97\u0EBB\u0EC8\u0EB2', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, '\u0E99\u0ECD\u0EC9\u0EB2\u0E94\u0EB1\u0E9A\u0EC0\u0E9E\u0EB5\u0E87', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u0E9B\u0EC9\u0EB2\u0E8D\u0EC2\u0E84\u0EAA\u0EB0\u0E99\u0EB2', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, '\u0E96\u0EB0\u0EDC\u0EBB\u0E99\u0EAB\u0EBB\u0E99\u0E97\u0EB2\u0E87', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, '\u0E97\u0EB2\u0E87\u0E82\u0EC9\u0EB2\u0EA1', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u0EC4\u0E9F\u200B\u0EAD\u0ECD\u0EB2\u200B\u0E99\u0EB2\u0E94', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'garagedoors', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, '\u0E9B\u0EC9\u0EB2\u0E8D\u0EA5\u0EBB\u0E94\u0EC0\u0EA1', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, '\u0EC2\u0E84\u0E99\u0E81\u0EB2\u0E99\u0E88\u0EB0\u0EA5\u0EB2\u0E88\u0EAD\u0E99', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, '\u0EC1\u0EA1\u0EB1\u0E94\u0E9A\u0EC8\u0EAD\u0E99\u0E88\u0EAD\u0E94\u0EA5\u0EBB\u0E94', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, '\u0E82\u0EB1\u0EC9\u0E99\u0EC4\u0E94', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u0E97\u0ECD\u0EC8\u0EC4\u0E9F', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0EC4\u0E96\u0E99\u0EB2', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0EC3\u0EAB\u0E8D\u0EC8', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0E9E\u0EB9\u0EAB\u0EBC\u0EB7\u0E9C\u0EB2', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0EC3\u0EAB\u0E8D\u0EC8', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u0EC4\u0E9F\u0E88\u0EB0\u0EA5\u0EB2\u0E88\u0EAD\u0E99', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u0E9A\u0EC8\u0EAD\u0E99\u0E82\u0EC9\u0EB2\u0EA1\u0E97\u0EB2\u0E87', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'ຫົວ​ສີດ​ນ້ຳ​ດັບ​ເພີງ', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u0E97\u0EB2\u0E87\u0EA1\u0EC9\u0EB2\u0EA5\u0EB2\u0E8D', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u0E95\u0EBB\u0EC9\u0E99\u0E9B\u0EB2\u0EA1', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u0E9B\u0EC8\u0EAD\u0E87\u0E84\u0EA7\u0EB1\u0E99\u0EC4\u0E9F', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u0EA5\u0EBB\u0E94\u0EC1\u0E97\u0EA3\u0EB1\u0E81\u0EC0\u0E95\u0EB5', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u0EAB\u0EBB\u0EA7\u0E94\u0EB1\u0E9A\u0EC0\u0E9E\u0EB5\u0E87', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u0EAB\u0EBB\u0EA7\u0E94\u0EB1\u0E9A\u0EC0\u0E9E\u0EB5\u0E87', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u1010\u1031\u102C\u1004\u103A\u1019\u103B\u102C\u1038\u101E\u102D\u102F\u1037\u1019\u101F\u102F\u1010\u103A\u1010\u1031\u102C\u1004\u103A\u1019\u103B\u102C\u1038', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u1019\u103E\u1010\u103A\u1010\u102D\u102F\u1004\u103A\u1019\u103B\u102C\u1038', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, '\u101C\u1019\u103A\u1038\u1006\u102D\u102F\u1004\u103A\u1038\u1018\u102F\u1010\u103A\u1019\u103B\u102C\u1038', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, '\u1021\u1015\u1004\u103A\u1019\u103B\u102C\u1038', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, '\u101E\u1005\u103A\u1015\u1004\u103A\u1019\u103B\u102C\u1038', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, '\u1019\u103C\u1000\u103A', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, '\u1015\u1031\u102B\u1000\u103A\u1015\u1004\u103A\u1019\u103B\u102C\u1038', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, '\u101B\u103E\u102C\u1038\u1005\u1031\u102C\u1004\u103A\u1038', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, '\u1011\u1014\u103A\u1038\u1015\u1004\u103A\u1019\u103B\u102C\u1038', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u101E\u1018\u102C\u101D', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, '\u101B\u1031\u1010\u1036\u1001\u103D\u1014\u103A\u1019\u103B\u102C\u1038', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, '\u1010\u1031\u102C\u1004\u103A\u1019\u103B\u102C\u1038', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u1010\u1031\u102C\u1004\u103A\u1010\u103D\u1031', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u101B\u1031\u1010\u103D\u1004\u103A\u1038', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, '\u1019\u103C\u1005\u103A\u1019\u103B\u102C\u1038', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, '\u1000\u1019\u103A\u1038\u1001\u103C\u1031\u1019\u103B\u102C\u1038', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, '\u1014\u1031\u1019\u1004\u103A\u1038', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, '\u1019\u103D\u1014\u103A\u1038', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, '\u1000\u1031\u102C\u1004\u103A\u1038\u1000\u1004\u103A', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, '\u101A\u102C\u1009\u103A\u1019\u103B\u102C\u1038', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u1000\u102C\u1038\u1019\u103B\u102C\u1038', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u1005\u1000\u103A\u1018\u102E\u1038', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u1006\u102D\u102F\u1004\u103A\u1000\u101A\u103A\u1019\u103B\u102C\u1038', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u1015\u1005\u103A\u1000\u1015\u103A\u1000\u102C\u1038\u1019\u103B\u102C\u1038', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, '\u1000\u102F\u1014\u103A\u1010\u1004\u103A\u1000\u102C\u1038\u1019\u103B\u102C\u1038', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, '\u101C\u103E\u1031\u1019\u103B\u102C\u1038', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, '\u1007\u102D\u1019\u103A\u1001\u1036\u1000\u102C\u1038\u1019\u103B\u102C\u1038', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, '\u1021\u1004\u103E\u102C\u1038\u101A\u102C\u1009\u103A\u1019\u103B\u102C\u1038', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\u1000\u103B\u1031\u102C\u1004\u103A\u1038\u1000\u102C\u1038', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, '\u1018\u1010\u103A\u1005\u103A\u1000\u102C\u1038', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u1006\u1031\u102C\u1000\u103A\u101C\u102F\u1015\u103A\u101B\u1031\u1038\u101A\u102C\u1009\u103A', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, '\u101B\u102F\u1015\u103A\u1015\u103D\u102C\u1038\u1010\u1031\u102C\u103A\u1019\u103B\u102C\u1038', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, '\u1005\u1019\u103A\u1038\u101B\u1031', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, '\u1010\u1036\u1010\u102C\u1038', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u1006\u102D\u1015\u103A\u1001\u1036', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, '\u1019\u102D\u102F\u1038\u1019\u103B\u103E\u1031\u102C\u103A\u1010\u102D\u102F\u1000\u103A', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, '\u1010\u102D\u102F\u1004\u103A\u1019\u103B\u102C\u1038', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, '\u101B\u1031\u102C\u1004\u103A\u1005\u102F\u1036\u1019\u103E\u1014\u103A', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, '\u1021\u102D\u1019\u103A', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, '\u1010\u102D\u102F\u1000\u103A\u1001\u1014\u103A\u1038\u1021\u1006\u1031\u102C\u1000\u103A\u1021\u1026', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, '\u1019\u102E\u1038\u1021\u102D\u1019\u103A', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, '\u1018\u1030\u1010\u102C\u101B\u102F\u1036', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, '\u1015\u103C\u102C', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, '\u1019\u102E\u1038\u101E\u1010\u103A\u1006\u1031\u1038\u1018\u1030\u1038', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u1000\u103C\u1031\u102C\u103A\u1004\u103C\u102C\u1018\u102F\u1010\u103A', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, '\u101C\u1019\u103A\u1038\u1019\u103B\u102C\u1038', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, '\u101C\u1030\u1000\u1030\u1038\u1019\u103B\u1009\u103A\u1038\u1000\u103C\u102C\u1038\u1019\u103B\u102C\u1038', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u1019\u102E\u1038\u1015\u103D\u102D\u102F\u1004\u1037\u103A', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u1000\u102C\u1038\u1002\u102D\u102F\u1012\u1031\u102B\u1004\u103A\u1019\u103B\u102C\u1038', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, '\u1018\u1010\u103A\u1005\u103A\u1000\u102C\u1038\u1019\u103E\u1010\u103A\u1010\u102D\u102F\u1004\u103A\u1019\u103B\u102C\u1038', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'trafficcones', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, '\u1000\u102C\u1038\u1015\u102B\u1000\u1004\u103A\u1019\u102E\u1010\u102C', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, '\u101C\u103E\u1031\u1000\u102C\u1038', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u1019\u102E\u1038\u1001\u102D\u102F\u1038\u1001\u1031\u102B\u1004\u103A\u1038\u1010\u102D\u102F\u1004\u103A\u1019\u103B\u102C\u1038', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u1011\u103D\u1014\u103A\u1005\u1000\u103A\u1019\u103B\u102C\u1038', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'firehydrants', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'buses', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 't\xE0uthuy\u1EC1n', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'gunungataubukit', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'tandaberhenti', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'tandajalan', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'tumbuhan', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, 'pokok', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'rumput', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'pokokrenek', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'kaktus', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'pokokpalma', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'alamsemulajadi', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'airterjun', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'pergunungan', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'bukitbukau', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'badanair', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'sungai-sungai', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'pantai', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'matahari', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'Bulan', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'langit', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'kenderaan', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'kereta', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'basikal', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'motosikal', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'trakpikap', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'trakkomersial', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'bot', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'limosin', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'teksi', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'bassekolah', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'bas', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'kenderaanpembinaan', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'patung-patung', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'airpancut', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'jambatan', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'jeti', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'bangunanpencakarlangit', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'tiangatautiang', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'kacaberwarna', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'rumah', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'bangunananapartmen', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'rumahcahaya', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'stesenKeretapi', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'abu', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'afirehydrant', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'papaniklan', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'jalanraya', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'lintasanpejalankaki', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'lampuisyarat', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'pintugaraged', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'perhentianbas', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'Kontrafik', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'metertempatletakkereta', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'tangga', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'cerobongasap', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'traktor', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, 'pilibomba', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'serombongasap', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'stopsigns', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, 'streetsigns', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, 'plants', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, 'trees', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, 'grass', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, 'shrubs', '/m/0gqbt'), (0, _defineProperty3.default)(_jsonall, 'cactus', '/m/025_v'), (0, _defineProperty3.default)(_jsonall, 'palmtrees', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, 'nature', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, 'waterfalls', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, 'mountainsorhills', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, 'bodiesofwater', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, 'rivers', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, 'beaches', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, 'theSun', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, 'theMoon', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, 'thesky', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, 'vehicles', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'cars', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, 'bicycles', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, 'motorcycles', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, 'pickuptrucks', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, 'commercialtrucks', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, 'boats', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, 'limousines', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, 'taxis', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, 'schoolbus', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, 'bus', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, 'constructionvehicle', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, 'statues', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, 'fountains', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, 'bridges', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, 'pier', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, 'skyscraper', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, 'pillarsorcolumns', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, 'stainedglass', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, 'ahouse', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, 'anapartmentbuilding', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, 'alighthouse', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, 'atrainstation', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, 'ashed', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, 'afirehydrant', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, 'abillboard', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, 'roads', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, 'crosswalks', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, 'trafficlights', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, 'garagedoors', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, 'busstops', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, 'trafficcones', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, 'parkingmeters', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, 'stairs', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, 'chimneys', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, 'tractors', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u8DEF\u6807', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, '\u82B1', '/m/0c9ph5'), (0, _defineProperty3.default)(_jsonall, '\u6811\u6728', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, '\u68D5\u6988\u6811', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u7011\u5E03', '/m/0j2kx'), (0, _defineProperty3.default)(_jsonall, '\u5C71', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u6C34\u57DF', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, '\u6CB3\u6D41', '/m/06cnp'), (0, _defineProperty3.default)(_jsonall, '\u6D77\u6EE9', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, '\u592A\u9633', '/m/06m_p'), (0, _defineProperty3.default)(_jsonall, '\u6708\u4EAE', '/m/04wv_'), (0, _defineProperty3.default)(_jsonall, '\u5929\u7A7A', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, '\u4EA4\u901A\u5DE5\u5177', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u5C0F\u8F7F\u8F66', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u673A\u52A8\u8F66', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u81EA\u884C\u8F66', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\u6469\u6258\u8F66', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u76AE\u5361\u8F66', '/m/0cvq3'), (0, _defineProperty3.default)(_jsonall, '\u5546\u7528\u5361\u8F66', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, '\u8239', '/m/019jd'), (0, _defineProperty3.default)(_jsonall, '\u8C6A\u534E\u8F7F\u8F66', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, '\u51FA\u79DF\u8F66', '/m/0pg52'), (0, _defineProperty3.default)(_jsonall, '\u6821\u8F66', '/m/02yvhj'), (0, _defineProperty3.default)(_jsonall, '\u516C\u4EA4\u8F66', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u706B\u8F66', '/m/07jdr'), (0, _defineProperty3.default)(_jsonall, '\u65BD\u5DE5\u8F66\u8F86', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, '\u96D5\u50CF', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, '\u55B7\u6CC9', '/m/0h8lhkg'), (0, _defineProperty3.default)(_jsonall, '\u6865', '/m/015kr'), (0, _defineProperty3.default)(_jsonall, '\u7801\u5934', '/m/01phq4'), (0, _defineProperty3.default)(_jsonall, '\u6469\u5929\u5927\u697C', '/m/079cl'), (0, _defineProperty3.default)(_jsonall, '\u67F1\u5B50', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, '\u5F69\u8272\u73BB\u7483', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, '\u623F\u5C4B', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, '\u516C\u5BD3\u697C', '/m/01nblt'), (0, _defineProperty3.default)(_jsonall, '\u706F\u5854', '/m/04h7h'), (0, _defineProperty3.default)(_jsonall, '\u706B\u8F66\u7AD9', '/m/0py27'), (0, _defineProperty3.default)(_jsonall, '\u906E\u68DA', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, '\u6D88\u9632\u6813', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u6D88\u706B\u6813', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u5E7F\u544A\u724C', '/m/01knjb'), (0, _defineProperty3.default)(_jsonall, '\u9053\u8DEF', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, '\u4EBA\u884C\u6A2A\u9053', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u8FC7\u8857\u4EBA\u884C\u9053', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u7EA2\u7EFF\u706F', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u8F66\u5E93\u95E8', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, '\u516C\u4EA4\u7AD9', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, '\u9525\u5F62\u4EA4\u901A\u8DEF\u6807', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, '\u505C\u8F66\u8BA1\u65F6\u5668', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, '\u505C\u8F66\u8BA1\u4EF7\u8868', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, '\u697C\u68AF', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u70DF\u56F1', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\u62D6\u62C9\u673A', '/m/013xlm'), (0, _defineProperty3.default)(_jsonall, '\u505C\u8F66\u6807\u5FD7', '/m/02pv19'), (0, _defineProperty3.default)(_jsonall, '\u8DEF\u724C', '/m/01mqdt'), (0, _defineProperty3.default)(_jsonall, '\u690D\u7269', '/m/05s2s'), (0, _defineProperty3.default)(_jsonall, '\u6811', '/m/07j7r'), (0, _defineProperty3.default)(_jsonall, '\u8349', '/m/08t9c_'), (0, _defineProperty3.default)(_jsonall, '\u68D5\u6988\u6811', '/m/0cdl1'), (0, _defineProperty3.default)(_jsonall, '\u81EA\u7136', '/m/05h0n'), (0, _defineProperty3.default)(_jsonall, '\u4E18\u9675', '/m/09d_r'), (0, _defineProperty3.default)(_jsonall, '\u6C34\u4F53', '/m/03ktm1'), (0, _defineProperty3.default)(_jsonall, '\u6D77\u6EE9', '/m/0b3yr'), (0, _defineProperty3.default)(_jsonall, '\u5929\u7A7A', '/m/01bqvp'), (0, _defineProperty3.default)(_jsonall, '\u8F66\u8F86', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u6C7D\u8F66', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\u6469\u6258\u8F66', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\u5546\u4E1A\u5361\u8F66', '/m/0fkwjg'), (0, _defineProperty3.default)(_jsonall, '\u8C6A\u534E\u8F7F\u8F66', '/m/01lcw4'), (0, _defineProperty3.default)(_jsonall, '\u516C\u5171\u6C7D\u8F66', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\u5EFA\u7B51\u8F66\u8F86', '/m/02gx17'), (0, _defineProperty3.default)(_jsonall, '\u96D5\u50CF', '/m/013_1c'), (0, _defineProperty3.default)(_jsonall, '\u652F\u67F1\u67F1', '/m/01_m7'), (0, _defineProperty3.default)(_jsonall, '\u5F69\u8272\u73BB\u7483', '/m/011y23'), (0, _defineProperty3.default)(_jsonall, '\u623F\u5B50', '/m/03jm5'), (0, _defineProperty3.default)(_jsonall, '\u7070\u70EC', '/m/01n6fd'), (0, _defineProperty3.default)(_jsonall, '\u6D88\u706B\u6813', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\u9053\u8DEF', '/m/06gfj'), (0, _defineProperty3.default)(_jsonall, '\u4EBA\u884C\u6A2A\u9053', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\u4EA4\u901A\u706F', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\u8F66\u5E93\u95E8', '/m/08l941'), (0, _defineProperty3.default)(_jsonall, '\u5DF4\u58EB\u7AD9', '/m/01jw_1'), (0, _defineProperty3.default)(_jsonall, '\u4EA4\u901A\u9525', '/m/03sy7v'), (0, _defineProperty3.default)(_jsonall, '\u505C\u8F66\u54AA\u8868', '/m/015qbp'), (0, _defineProperty3.default)(_jsonall, '\u697C\u68AF', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\u70DF\u56F1', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\uD6A1\uB2E8\uBCF4\uB3C4', '/m/014xcs'), (0, _defineProperty3.default)(_jsonall, '\uC790\uB3D9\uCC28', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\uC790\uC804\uAC70', '/m/0199g'), (0, _defineProperty3.default)(_jsonall, '\uBC84\uC2A4', '/m/01bjv'), (0, _defineProperty3.default)(_jsonall, '\uC2E0\uD638\uB4F1', '/m/015qff'), (0, _defineProperty3.default)(_jsonall, '\uACC4\uB2E8', '/m/01lynh'), (0, _defineProperty3.default)(_jsonall, '\uC18C\uD654\uC804', '/m/01pns0'), (0, _defineProperty3.default)(_jsonall, '\uAD74\uB69D', '/m/01jk_4'), (0, _defineProperty3.default)(_jsonall, '\uC624\uD1A0\uBC14\uC774', '/m/04_sv'), (0, _defineProperty3.default)(_jsonall, '\uCC28\uB7C9', '/m/0k4j'), (0, _defineProperty3.default)(_jsonall, '\uAD50\uAC01', '/m/01phq4'), _jsonall);

/***/ },

/***/ "./node_modules/babel-runtime/core-js/array/from.js"
/*!**********************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/array/from.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/array/from */ "./node_modules/core-js/library/fn/array/from.js"), __esModule: true };

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/define-property.js"
/*!**********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/define-property.js ***!
  \**********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ "./node_modules/core-js/library/fn/object/define-property.js"), __esModule: true };

/***/ },

/***/ "./node_modules/babel-runtime/core-js/promise.js"
/*!*******************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/promise.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/promise */ "./node_modules/core-js/library/fn/promise.js"), __esModule: true };

/***/ },

/***/ "./node_modules/babel-runtime/helpers/asyncToGenerator.js"
/*!****************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/asyncToGenerator.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(/*! ../core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ },

/***/ "./node_modules/babel-runtime/helpers/defineProperty.js"
/*!**************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/defineProperty.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/babel-runtime/core-js/object/define-property.js");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ },

/***/ "./node_modules/babel-runtime/regenerator/index.js"
/*!*********************************************************!*\
  !*** ./node_modules/babel-runtime/regenerator/index.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ },

/***/ "./node_modules/core-js/library/fn/array/from.js"
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/fn/array/from.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/es6.array.from */ "./node_modules/core-js/library/modules/es6.array.from.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Array.from;


/***/ },

/***/ "./node_modules/core-js/library/fn/object/define-property.js"
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-property */ "./node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = (__webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object);
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ },

/***/ "./node_modules/core-js/library/fn/promise.js"
/*!****************************************************!*\
  !*** ./node_modules/core-js/library/fn/promise.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.promise */ "./node_modules/core-js/library/modules/es6.promise.js");
__webpack_require__(/*! ../modules/es7.promise.finally */ "./node_modules/core-js/library/modules/es7.promise.finally.js");
__webpack_require__(/*! ../modules/es7.promise.try */ "./node_modules/core-js/library/modules/es7.promise.try.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Promise;


/***/ },

/***/ "./node_modules/core-js/library/modules/_a-function.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************/
(module) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_add-to-unscopables.js"
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************/
(module) {

module.exports = function () { /* empty */ };


/***/ },

/***/ "./node_modules/core-js/library/modules/_an-instance.js"
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-instance.js ***!
  \**************************************************************/
(module) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_an-object.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_array-includes.js"
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_classof.js"
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_classof.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_cof.js"
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************/
(module) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_core.js"
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************/
(module) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ },

/***/ "./node_modules/core-js/library/modules/_create-property.js"
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_create-property.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_ctx.js"
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_defined.js"
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************/
(module) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_descriptors.js"
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ },

/***/ "./node_modules/core-js/library/modules/_dom-create.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var document = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").document);
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_enum-bug-keys.js"
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************/
(module) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ },

/***/ "./node_modules/core-js/library/modules/_export.js"
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ },

/***/ "./node_modules/core-js/library/modules/_fails.js"
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************/
(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_for-of.js"
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_for-of.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/library/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/library/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ },

/***/ "./node_modules/core-js/library/modules/_global.js"
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************/
(module) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ },

/***/ "./node_modules/core-js/library/modules/_has.js"
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_has.js ***!
  \******************************************************/
(module) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_hide.js"
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_html.js"
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var document = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").document);
module.exports = document && document.documentElement;


/***/ },

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js"
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ },

/***/ "./node_modules/core-js/library/modules/_invoke.js"
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_invoke.js ***!
  \*********************************************************/
(module) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_iobject.js"
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_is-array-iter.js"
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array-iter.js ***!
  \****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_is-object.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************/
(module) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-call.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-call.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-create.js"
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-define.js"
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-detect.js"
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-detect.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-step.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************/
(module) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_iterators.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************/
(module) {

module.exports = {};


/***/ },

/***/ "./node_modules/core-js/library/modules/_library.js"
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************/
(module) {

module.exports = true;


/***/ },

/***/ "./node_modules/core-js/library/modules/_microtask.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_microtask.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var macrotask = (__webpack_require__(/*! ./_task */ "./node_modules/core-js/library/modules/_task.js").set);
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_new-promise-capability.js"
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_new-promise-capability.js ***!
  \*************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_object-create.js"
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  (__webpack_require__(/*! ./_html */ "./node_modules/core-js/library/modules/_html.js").appendChild)(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_object-dp.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_object-dps.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_object-gpo.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_object-keys-internal.js"
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_object-keys.js"
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_perform.js"
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_perform.js ***!
  \**********************************************************/
(module) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_promise-resolve.js"
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_promise-resolve.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/library/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_property-desc.js"
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************/
(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_redefine-all.js"
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine-all.js ***!
  \***************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_redefine.js"
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");


/***/ },

/***/ "./node_modules/core-js/library/modules/_set-species.js"
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-species.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_set-to-string-tag.js"
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var def = (__webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f);
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_shared-key.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_shared.js"
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ },

/***/ "./node_modules/core-js/library/modules/_species-constructor.js"
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_species-constructor.js ***!
  \**********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_string-at.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_task.js"
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_task.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/core-js/library/modules/_invoke.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/core-js/library/modules/_html.js");
var cel = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_to-absolute-index.js"
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_to-integer.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************/
(module) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_to-iobject.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_to-length.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_to-object.js"
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_to-primitive.js"
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_uid.js"
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************/
(module) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ },

/***/ "./node_modules/core-js/library/modules/_user-agent.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_user-agent.js ***!
  \*************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ },

/***/ "./node_modules/core-js/library/modules/_wks.js"
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
var Symbol = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").Symbol);
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ },

/***/ "./node_modules/core-js/library/modules/core.get-iterator-method.js"
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \**************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
module.exports = (__webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js").getIteratorMethod) = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ },

/***/ "./node_modules/core-js/library/modules/es6.array.from.js"
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.from.js ***!
  \****************************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/library/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/library/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/library/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/library/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ },

/***/ "./node_modules/core-js/library/modules/es6.array.iterator.js"
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js"
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: (__webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f) });


/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.to-string.js"
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************/
() {



/***/ },

/***/ "./node_modules/core-js/library/modules/es6.promise.js"
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.promise.js ***!
  \*************************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/library/modules/_classof.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/library/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/library/modules/_for-of.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/library/modules/_species-constructor.js");
var task = (__webpack_require__(/*! ./_task */ "./node_modules/core-js/library/modules/_task.js").set);
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/library/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/library/modules/_perform.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/library/modules/_user-agent.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/library/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/library/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/library/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/library/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ },

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js"
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ },

/***/ "./node_modules/core-js/library/modules/es7.promise.finally.js"
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.promise.finally.js ***!
  \*********************************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/library/modules/_species-constructor.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/library/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ },

/***/ "./node_modules/core-js/library/modules/es7.promise.try.js"
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.promise.try.js ***!
  \*****************************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/library/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ },

/***/ "./node_modules/core-js/library/modules/web.dom.iterable.js"
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ },

/***/ "./node_modules/regenerator-runtime/runtime-module.js"
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ },

/***/ "./node_modules/regenerator-runtime/runtime.js"
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
(module) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = "object" === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ },

/***/ "./src/tool.ts"
/*!*********************!*\
  !*** ./src/tool.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getParentUrl: () => (/* binding */ getParentUrl),
/* harmony export */   simulateMouseMove: () => (/* binding */ simulateMouseMove)
/* harmony export */ });
/**
 * 模拟真实鼠标移动的函数
 * @param el 目标元素
 * @param targetPoint 可选的目标点坐标（相对于元素左上角），不指定则随机选择
 * @param options 配置选项
 */
function simulateMouseMove(el, options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve) {
        var _a = options.duration, duration = _a === void 0 ? 1500 : _a, _b = options.steps, steps = _b === void 0 ? 60 : _b, _c = options.humanLike, humanLike = _c === void 0 ? true : _c, _d = options.startRandom, startRandom = _d === void 0 ? true : _d;
        console.log("simulateMouseMove", "time: ".concat(duration));
        var rect = el.getBoundingClientRect();
        // 计算起始点和目标点
        var startX, startY;
        var endX, endY;
        if (startRandom) {
            // 从随机起点开始
            startX = Math.random() * rect.width;
            startY = Math.random() * rect.height;
        }
        else {
            // 从当前位置或元素中心开始
            startX = rect.width / 2;
            startY = rect.height / 2;
        }
        var targetPoint = options === null || options === void 0 ? void 0 : options.targetPoint;
        if (targetPoint) {
            endX = Math.max(0, Math.min(targetPoint.x, rect.width));
            endY = Math.max(0, Math.min(targetPoint.y, rect.height));
        }
        else {
            // 随机目标点
            endX = Math.random() * rect.width;
            endY = Math.random() * rect.height;
        }
        // 贝塞尔曲线控制点（用于模拟人类移动的不规则性）
        var controlPoints = humanLike ? [
            {
                x: startX + (endX - startX) * 0.3 + (Math.random() - 0.5) * rect.width * 0.2,
                y: startY + (endY - startY) * 0.3 + (Math.random() - 0.5) * rect.height * 0.2
            },
            {
                x: startX + (endX - startX) * 0.7 + (Math.random() - 0.5) * rect.width * 0.2,
                y: startY + (endY - startY) * 0.7 + (Math.random() - 0.5) * rect.height * 0.2
            }
        ] : null;
        var currentStep = 0;
        var stepDuration = duration / steps;
        function moveStep() {
            if (currentStep > steps) {
                resolve();
                return;
            }
            var progress = currentStep / steps;
            // 计算当前坐标
            var currentX, currentY;
            if (humanLike && controlPoints) {
                // 使用二次贝塞尔曲线创建更自然的移动轨迹
                var t = progress;
                var mt = 1 - t;
                currentX =
                    mt * mt * mt * startX +
                        3 * mt * mt * t * controlPoints[0].x +
                        3 * mt * t * t * controlPoints[1].x +
                        t * t * t * endX;
                currentY =
                    mt * mt * mt * startY +
                        3 * mt * mt * t * controlPoints[0].y +
                        3 * mt * t * t * controlPoints[1].y +
                        t * t * t * endY;
            }
            else {
                // 线性移动
                currentX = startX + (endX - startX) * progress;
                currentY = startY + (endY - startY) * progress;
            }
            // 添加一些随机抖动，使移动更真实
            if (humanLike) {
                var jitterX = (Math.random() - 0.5) * 3;
                var jitterY = (Math.random() - 0.5) * 3;
                currentX += jitterX;
                currentY += jitterY;
            }
            // 计算相对于视口的绝对坐标
            var clientX = rect.left + currentX;
            var clientY = rect.top + currentY;
            // 创建并触发鼠标移动事件
            var mouseMoveEvent = new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: clientX,
                clientY: clientY,
                movementX: 0,
                movementY: 0
            });
            el.dispatchEvent(mouseMoveEvent);
            // 如果是第一步，先触发一个鼠标进入事件
            if (currentStep === 0) {
                var mouseEnterEvent = new MouseEvent('mouseenter', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: rect.left + startX,
                    clientY: rect.top + startY
                });
                el.dispatchEvent(mouseEnterEvent);
            }
            // 如果是最后一步，触发鼠标悬停事件
            if (currentStep === steps) {
                var mouseOverEvent = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: clientX,
                    clientY: clientY
                });
                el.dispatchEvent(mouseOverEvent);
            }
            currentStep++;
            setTimeout(moveStep, stepDuration);
        }
        moveStep();
    });
}
function getParentUrl() {
    return new Promise(function (resolve) {
        var isResolved = false;
        var timer = setTimeout(function () {
            if (!isResolved) {
                isResolved = true;
                resolve('');
            }
        }, 2000);
        chrome.runtime.sendMessage({ action: 'queryCurrentUrl' }, function (response) {
            clearTimeout(timer);
            if (!isResolved) {
                isResolved = true;
                resolve(response || '');
            }
        });
    });
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*********************************!*\
  !*** ./src/content/captcha2.js ***!
  \*********************************/


var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _from = __webpack_require__(/*! babel-runtime/core-js/array/from */ "./node_modules/babel-runtime/core-js/array/from.js");

var _from2 = _interopRequireDefault(_from);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// 彩虹点击流程
var rainbow = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var _ref4, times, chrome;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _common.getconfig)();

          case 2:
            _ref4 = _context4.sent;
            times = _ref4.times;
            chrome = window.chrome;

            console.log(location.href, 'location.href');
            // await delay(3000)

          case 6:
            if (false) // removed by dead control flow
{}

            _context4.next = 9;
            return (0, _common.waitFor)('strong');

          case 9:
            if (!(document.querySelector('strong') && document.getElementById('enqueue-error').style.display !== 'none')) {
              _context4.next = 13;
              break;
            }

            console.log('找到了按钮');
            chrome.runtime.sendMessage({ action: 'gettabs' }, function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(tabs) {
                var totaltabs;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        totaltabs = tabs.length;

                        document.querySelector('strong').click();
                        _context3.next = 4;
                        return (0, _common.delay)(20 * times);

                      case 4:
                        chrome.runtime.sendMessage({ action: 'gettabs' }, function (tabs) {
                          if (totaltabs === tabs.length) {
                            console.log('点击失败');
                            return;
                          }
                          console.log('点击成功');
                          chrome.runtime.sendMessage({ action: 'removetab' });
                        });

                      case 5:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              return function (_x2) {
                return _ref5.apply(this, arguments);
              };
            }());

            return _context4.abrupt('break', 15);

          case 13:
            _context4.next = 6;
            break;

          case 15:
            return _context4.abrupt('return', true);

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function rainbow() {
    return _ref3.apply(this, arguments);
  };
}();

// 英文数字转文本流程


var imagetotext = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(config) {
    var DoOcr = function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var imgsrc, base64img, data, res;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // if (document.querySelector('#solution') && document.querySelector('#solution').value) {
                //   console.log('刷新页面')
                //   location.reload()
                // }
                console.log('等待加载图片');
                // await waitFor('#challenge-container > div > fieldset > div.botdetect-label > img')

              case 1:
                if (document.querySelector('#challenge-container > div > fieldset > div.botdetect-label > img')) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 4;
                return (0, _common.delay)(10 * times);

              case 4:
                _context5.next = 1;
                break;

              case 6:
                console.log('获取到图片');
                imgsrc = document.querySelector('#challenge-container > div > fieldset > div.botdetect-label > img').src;

                console.log('图片地址', imgsrc);

                // 重复识别验证

                if (!ImageCache[imgsrc]) {
                  _context5.next = 14;
                  break;
                }

                console.log('ocr: 图片已经识别过');
                return _context5.abrupt('return');

              case 14:
                ImageCache[imgsrc] = 1;

              case 15:
                _context5.next = 17;
                return (0, _common.src2base64)(imgsrc, 250, 50);

              case 17:
                base64img = _context5.sent;
                data = {
                  'clientKey': config.clientKey,
                  'task': {
                    'type': 'ImageToTextTaskTest',
                    'body': base64img
                  }
                };
                _context5.next = 21;
                return (0, _common.post)(new URL('createTask', config.host).href, data);

              case 21:
                res = _context5.sent;

                if (!res.errorDescription) {
                  _context5.next = 28;
                  break;
                }

                // 出错时显示出错信息然后跳过
                console.log('出错:', res.errorDescription);
                (0, _common.message)({ text: res.errorDescription, color: 'red' });

                if (!(0, _common.notneedcontinue)(res.errorCode)) {
                  _context5.next = 28;
                  break;
                }

                console.log('不需要继续,程序退出');
                return _context5.abrupt('return');

              case 28:
                console.log(res);

                if (!(res.solution && res.solution.text)) {
                  _context5.next = 37;
                  break;
                }

                _context5.next = 32;
                return (0, _common.delay)(10 * times);

              case 32:
                document.querySelector('#solution').value = res.solution.text;
                _context5.next = 35;
                return (0, _common.delay)(10 * times);

              case 35:
                document.querySelector('.botdetect-button') && document.querySelector('.botdetect-button').click();
                console.log('点击提交按钮');

              case 37:
                return _context5.abrupt('return');

              case 38:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function DoOcr() {
        return _ref8.apply(this, arguments);
      };
    }();

    var _ref7, times, ImageCache;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _common.getconfig)();

          case 2:
            _ref7 = _context6.sent;
            times = _ref7.times;
            ImageCache = [];

            // await delay(2000)

            console.log('英文数字转文本');

            // 监听页面变动
            document.addEventListener('DOMSubtreeModified', function (e) {
              // console.log(e.target)

              if (e.target == document.querySelector('#challenge-container')) {
                console.log("e.target", e.target);
                // console.log("visualViewport.width", visualViewport.width)
                DoOcr();
              }
            });

            DoOcr();

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function imagetotext(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

// 图像识别分类第四版


var imageclassification_v4 = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(config) {
    var _ref10, times, isAutoClickCheckBox, checkBoxClickDelayTime, isAutoSubmit, img11, img11Score, timeid, watchService, stuckCount, stuckRefreshTimes, ImageCache, isVerifyEnd, isBramePage, isAnchorPage, refresh, getquestion, clicktime, watchCheckbox, reTarget, rcImageselectTarget, errorSelectMore, errorDynamicMore, needMore, CheckforStuck, ImageToBase64, getindex, DoOcr, Clicks, domModifyCb;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            domModifyCb = function domModifyCb(e) {
              // 反馈变动的DOM
              // console.log("e.target:");
              // console.log(e.target);

              // 对DOM添加监听事件: 如果图片发生变化
              if (e.target == document.querySelector('#rc-imageselect-target') && document.querySelector('#rc-imageselect-target > table > tbody > tr> td>div>div>img')) {
                // 绑定每一张图片的加载事件，当加载就执行OCR
                document.querySelector('div.rc-image-tile-wrapper > img').onload = function () {
                  // 当图片加载时，对图片进行识别
                  DoOcr(document.querySelector('div.rc-image-tile-wrapper > img'));
                };

                // var lsurl = document.querySelector(
                //   '#rc-imageselect-target > table > tbody > tr> td>div>div>img').src;
                // if (ImageCache.indexOf(lsurl) == -1){
                // 直接执行OCR：不明白为什么要这么写
                DoOcr(document.querySelector('#rc-imageselect-target > table > tbody > tr> td>div>div>img'));
                // }
              } else {
                var image = e.target.querySelector(' div > div.rc-image-tile-wrapper > img');
                if (image) {
                  // 获取发生变化的位置
                  var index = getindex(image, '#rc-imageselect-target > table > tbody > tr> td> div > div.rc-image-tile-wrapper > img');
                  var imagecode = image.className.substring(image.className.length - 2);
                  if (imagecode * 1 == 11) {
                    clearTimeout(timeid);
                    img11['_' + index] = 'y';
                    // 图像识别
                    DoOcr(image, index);
                  }
                }
              }
            };

            getindex = function getindex(obj, objall) {
              var objall = document.querySelectorAll(objall);
              for (var i = 0; i < objall.length; i++) {
                if (obj == objall[i]) {
                  return i;
                }
              }
              return -1;
            };

            ImageToBase64 = function ImageToBase64(img) {
              var canvas = document.createElement('canvas');
              var widthx = img.naturalWidth;
              canvas.width = widthx;
              canvas.height = widthx;
              var ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, widthx, widthx);
              var dataURL = canvas.toDataURL('image/jpeg');
              var base = dataURL.replace('data:image/jpeg;base64,', '');
              if (base == 'data:,') {
                return;
              }
              return base;
            };

            CheckforStuck = function CheckforStuck() {
              if (needMore()) {
                stuckCount = stuckCount + 1;
              } else {
                // console.log('CheckforStuck: clear!')
                stuckCount = 0;
              }
              if (stuckCount >= stuckRefreshTimes) {
                console.log('CheckforStuck: 6 times for refresh()');
                refresh();
              }
            };

            clicktime = function clicktime() {
              // 如果有白屏，则等待3秒后再试
              if (document.querySelector('td.rc-imageselect-dynamic-selected')) {
                console.log('find selected image');
                // await delay(3000)
                clearTimeout(timeid);
                timeid = setTimeout(clicktime, 1000);
                return;
              }

              if (img11.length == 0) {

                if (isAutoSubmit) {
                  document.querySelector('#recaptcha-verify-button').click();
                }
              }
            };

            _context9.next = 7;
            return (0, _common.getconfig)();

          case 7:
            _ref10 = _context9.sent;
            times = _ref10.times;
            isAutoClickCheckBox = _ref10.isAutoClickCheckBox;
            checkBoxClickDelayTime = _ref10.checkBoxClickDelayTime;
            isAutoSubmit = _ref10.isAutoSubmit;
            img11 = [];
            img11Score = {};
            timeid = 0;
            watchService = 0;
            stuckCount = 0;
            stuckRefreshTimes = 5;
            ImageCache = [];
            isVerifyEnd = false;

            // 确定是九宫格页面

            isBramePage = window.self.location.href.match(/\/recaptcha\/(.*?)\/bframe\?/) != null;

            // 确定是勾选框页

            isAnchorPage = window.self.location.href.match(/\/recaptcha\/(.*?)\/anchor\?/) != null;

            // 刷新

            refresh = function refresh() {
              return document.querySelector('.rc-button-reload') && document.querySelector('.rc-button-reload').click();
            };
            // 获取问题


            getquestion = function getquestion() {
              return document.querySelector('strong').innerText.replace(/\s/g, '');
            };
            // 提交


            if (!isAnchorPage) {
              _context9.next = 31;
              break;
            }

            // 自动勾选识别框
            watchCheckbox = function watchCheckbox() {
              if (document.querySelector('#recaptcha-anchor')) {
                if (document.querySelector('#recaptcha-anchor').getAttribute('aria-checked') == 'false' && getComputedStyle(document.querySelector('#recaptcha-anchor > div.recaptcha-checkbox-border')).getPropertyValue('border') == '.125rem solid rgb(255, 0, 0)' && document.querySelector('#rc-anchor-container > div.rc-anchor-error-msg-container').style.display == 'none') {
                  location.reload();
                } else {
                  if (document.querySelector('#recaptcha-anchor').getAttribute('aria-checked') == 'false') {
                    isVerifyEnd = false;
                    getIsEnd().then(function (result) {
                      if (!result) {
                        document.querySelector('#recaptcha-anchor').click();
                      } else {
                        (0, _common.message)({ text: getWords('content_message_11'), color: 'green' });
                      }
                    });
                  } else {
                    if (!isVerifyEnd) {
                      window.parent.postMessage({ type: "yesCaptchaEndSuccess" }, "*");
                    }
                    isVerifyEnd = true;
                  }
                }
              }
            };

            if (isAutoClickCheckBox) {
              _context9.next = 28;
              break;
            }

            return _context9.abrupt('return');

          case 28:
            if (!watchService) {
              _context9.next = 30;
              break;
            }

            return _context9.abrupt('return');

          case 30:
            setTimeout(function () {
              watchService = setInterval(watchCheckbox, 2000);
            }, Number(checkBoxClickDelayTime));

          case 31:

            // 验证码图片框
            reTarget = function reTarget() {
              return document.querySelector('#rc-imageselect-target');
            };
            // 验证码图片对象： 返回九张图


            rcImageselectTarget = function rcImageselectTarget() {
              return document.querySelector('div.rc-image-tile-wrapper > img');
            };
            // 提示：请选择所有相符的图片。


            errorSelectMore = function errorSelectMore() {
              return document.querySelector('div.rc-imageselect-error-select-more');
            };
            // 提示：另外，您还需查看新显示的图片。


            errorDynamicMore = function errorDynamicMore() {
              return document.querySelector('div.rc-imageselect-error-dynamic-more');
            };
            // 需要选择更多


            needMore = function needMore() {
              return errorSelectMore() && errorSelectMore().style.display != 'none' || errorDynamicMore() && errorDynamicMore().style.display != 'none';
            };

            // 一个循环检测方法，防止卡住不动


            ;

            // 图片转BASE64
            ;

            // 获取对象的位置
            ;

            // 对图片进行识别

            DoOcr = function () {
              var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(image, index) {
                var isEnd, data, questionstr, res, _ref12, _ref12$recaptchaVerif, recaptchaVerifyFailDelay, _ref12$recaptchaVerif2, recaptchaVerifyTry;

                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return getIsEnd();

                      case 2:
                        isEnd = _context7.sent;

                        if (!isEnd) {
                          _context7.next = 6;
                          break;
                        }

                        (0, _common.message)({ text: getWords('content_message_11'), color: 'green' });
                        return _context7.abrupt('return');

                      case 6:
                        if (!(!image || !image.src)) {
                          _context7.next = 9;
                          break;
                        }

                        console.log('ocr: imgae src not found');
                        return _context7.abrupt('return');

                      case 9:
                        _context7.t0 = config.clientKey;
                        _context7.next = 12;
                        return (0, _tool.getParentUrl)();

                      case 12:
                        _context7.t1 = _context7.sent;
                        _context7.t2 = { 'type': 'ReCaptchaV2Classification', 'image': null, 'question': null };
                        data = {
                          'clientKey': _context7.t0,
                          callurl: _context7.t1,
                          'task': _context7.t2
                        };

                        data.task.image = ImageToBase64(image);

                        if (data.task.image) {
                          _context7.next = 25;
                          break;
                        }

                        console.log('ocr: error: image is null retry...');
                        stuckCount = 0;
                        // clearTimeout(timeid);
                        _context7.next = 21;
                        return (0, _common.delay)(20 * times);

                      case 21:
                        data.task.image = ImageToBase64(image);

                        if (data.task.image) {
                          _context7.next = 25;
                          break;
                        }

                        console.log('ocr: error: image not found');
                        return _context7.abrupt('return', false);

                      case 25:
                        if (!ImageCache[image.src]) {
                          _context7.next = 30;
                          break;
                        }

                        console.log('ocr: exist');
                        return _context7.abrupt('return');

                      case 30:
                        ImageCache[image.src] = 1;

                      case 31:

                        // 获取当前问题
                        questionstr = getquestion();

                        data.task.question = _jsonall.jsonall[questionstr] || questionstr;

                        if (data.task.question) {
                          _context7.next = 36;
                          break;
                        }

                        console.log('ocr: error: question not found');
                        return _context7.abrupt('return', false);

                      case 36:
                        // 如果是33或44图片，清空小图和提交按钮任务
                        if (!index) {
                          img11 = [], clearTimeout(timeid);
                        }
                        // 提交后端识别
                        console.log('ocr: index:', index || -1);
                        res = void 0;
                        _context7.prev = 39;
                        _ref12 = config.network || {}, _ref12$recaptchaVerif = _ref12.recaptchaVerifyFailDelay, recaptchaVerifyFailDelay = _ref12$recaptchaVerif === undefined ? 1000 : _ref12$recaptchaVerif, _ref12$recaptchaVerif2 = _ref12.recaptchaVerifyTry, recaptchaVerifyTry = _ref12$recaptchaVerif2 === undefined ? 1 : _ref12$recaptchaVerif2;
                        _context7.next = 43;
                        return (0, _common.post)(new URL('createTask', config.host).href, data, recaptchaVerifyFailDelay, recaptchaVerifyTry);

                      case 43:
                        res = _context7.sent;
                        _context7.next = 50;
                        break;

                      case 46:
                        _context7.prev = 46;
                        _context7.t3 = _context7['catch'](39);

                        (0, _common.message)({ text: getWords('content_message_9'), color: 'red' });
                        return _context7.abrupt('return');

                      case 50:
                        console.log('ocr: response:', res);

                        // 处理识别结果: 出错

                        if (!res.errorDescription) {
                          _context7.next = 64;
                          break;
                        }

                        console.log('ocr: errorDescription:', res.errorDescription);
                        (0, _common.message)({ text: res.errorDescription, color: 'green' });

                        if (!(0, _common.notneedcontinue)(res.errorCode)) {
                          _context7.next = 59;
                          break;
                        }

                        console.log('ocr: exit.');
                        return _context7.abrupt('return', false);

                      case 59:
                        // 点刷新按钮
                        console.log('ocr: refresh.');
                        _context7.next = 62;
                        return (0, _common.delay)(20 * times);

                      case 62:
                        refresh();
                        return _context7.abrupt('return', true);

                      case 64:
                        if (!res.solution) {
                          _context7.next = 68;
                          break;
                        }

                        _context7.next = 67;
                        return Clicks(image, res.solution, index);

                      case 67:
                        return _context7.abrupt('return', _context7.sent);

                      case 68:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, this, [[39, 46]]);
              }));

              return function DoOcr(_x5, _x6) {
                return _ref11.apply(this, arguments);
              };
            }();

            // 点击图片对象


            Clicks = function () {
              var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(image, solution, index) {
                var delayTime, resultlist, i;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        delayTime = times;

                        if (/44/.test(image.className)) {
                          console.log('44!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                          delayTime = times / 2;
                        }
                        console.log('click: index: ' + index);
                        // 增加延时，防止被识别为机器人
                        _context8.next = 5;
                        return (0, _common.delay)((0, _common.getClickTime)(Number(delayTime)));

                      case 5:
                        if (!(index && solution.hasObject)) {
                          _context8.next = 13;
                          break;
                        }

                        // 点击小图
                        console.log('click: 1x1: ' + index);
                        _context8.next = 9;
                        return (0, _common.delay)((0, _common.getClickTime)(Number(delayTime)));

                      case 9:
                        if (document.querySelectorAll('#rc-imageselect-target > table > tbody > tr> td>div>div>img')[index] && image.src == document.querySelectorAll('#rc-imageselect-target > table > tbody > tr> td>div>div>img')[index].src) {
                          document.querySelectorAll('#rc-imageselect-target > table > tbody > tr> td')[index].click();
                        }
                        return _context8.abrupt('return');

                      case 13:
                        if (!(index && !solution.hasObject)) {
                          _context8.next = 20;
                          break;
                        }

                        // 不点击返回
                        delete img11['_' + index];
                        // 记录分值
                        // console.log('click: score: ' + solution.confidence)
                        // img11Score['_' + index] = solution.confidence
                        // console.log('click: img11Score: ' + JSON.stringify(img11Score))
                        clearTimeout(timeid);
                        timeid = setTimeout(clicktime, 30 * times);
                        return _context8.abrupt('return');

                      case 20:
                        if (!(image.naturalWidth == 100 && !index)) {
                          _context8.next = 23;
                          break;
                        }

                        console.log('click: no index return');
                        return _context8.abrupt('return');

                      case 23:

                        // 列出所有图片
                        resultlist = (0, _from2.default)(document.querySelectorAll('#rc-imageselect-target > table > tbody > tr> td'));
                        i = 0;

                      case 25:
                        if (!(i < solution.objects.length)) {
                          _context8.next = 33;
                          break;
                        }

                        _context8.next = 28;
                        return (0, _common.delay)((0, _common.getClickTime)(Number(delayTime)));

                      case 28:
                        console.log('click: ojbects: ' + (solution.objects[i] + 1));
                        resultlist[solution.objects[i]].click();

                      case 30:
                        i++;
                        _context8.next = 25;
                        break;

                      case 33:
                        if (!(image.naturalWidth == 450)) {
                          _context8.next = 39;
                          break;
                        }

                        _context8.next = 36;
                        return (0, _common.delay)(10 * times);

                      case 36:
                        //这里
                        if (isAutoSubmit) {
                          document.querySelector('#recaptcha-verify-button').click();
                        }
                        // 300 的图片需要延迟3秒后检查1x1图片
                        _context8.next = 40;
                        break;

                      case 39:
                        if (image.naturalWidth == 300) {
                          clearTimeout(timeid);
                          timeid = setTimeout(clicktime, 3000);
                        }

                      case 40:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, this);
              }));

              return function Clicks(_x7, _x8, _x9) {
                return _ref13.apply(this, arguments);
              };
            }();

            // 九宫格页面进行点击
            if (isBramePage) {
              // 每秒检测一次是否未识别，6次以上自动刷新，防止卡住不动
              setInterval(CheckforStuck, 1000);
              document.addEventListener('DOMSubtreeModified', domModifyCb);
            }

            // 添加一个事件监听
            window.addEventListener('message', function (event) {
              if (event.data == 'doSomething') {
                console.log('doSomething');
              }
              if (event.data === 'DoOcr') {
                DoOcr(document.querySelector('#rc-imageselect-target > table > tbody > tr> td>div>div>img'));
              }
            });
            // 发送消息给父窗口
            window.parent.postMessage('ready', '*');

          case 44:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function imageclassification_v4(_x4) {
    return _ref9.apply(this, arguments);
  };
}();

// iframe 逻辑


var getIsEnd = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
    var promise;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            promise = new _promise2.default(function (resolve) {
              var cb = function cb(event) {
                var data = event.data;

                if (data.type === "isYesCaptchaEnd") {
                  resolve(data.isEnd);
                  window.removeEventListener("message", cb);
                }
              };
              var timer = setTimeout(function () {
                resolve(false);
                clearTimeout(timer);
              }, 300);
              window.addEventListener("message", cb);
            });

            window.parent.postMessage({ type: "isYesCaptchaEnd" }, "*");
            return _context10.abrupt('return', promise);

          case 3:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function getIsEnd() {
    return _ref14.apply(this, arguments);
  };
}();

var _common = __webpack_require__(/*! ../common */ "./src/common.js");

var _tool = __webpack_require__(/*! ../tool */ "./src/tool.ts");

var _jsonall = __webpack_require__(/*! ../jsonall */ "./src/jsonall.js");

var _config = __webpack_require__(/*! ../config */ "./src/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getWords = function getWords(key) {
  return chrome.i18n.getMessage(key);
};
if (!_config.config.develop) window.console.log = function () {}; // 清除调试代码
(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  var config, isBlackWhitePass, times, documentObj, f;
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(window.inject === true)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt('return');

        case 4:
          window.inject = true;

        case 5:
          _context2.next = 7;
          return (0, _common.getconfig)();

        case 7:
          config = _context2.sent;
          _context2.next = 10;
          return (0, _common.getIsBlackWhitePass)(config);

        case 10:
          isBlackWhitePass = _context2.sent;

          if (isBlackWhitePass) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt('return');

        case 13:
          times = config.times;
          // console.log(config)

          if (config.autorun) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt('return');

        case 16:
          _context2.next = 18;
          return (0, _common.captchaClassification)();

        case 18:
          documentObj = _context2.sent;

          if (config.clientKey) {
            _context2.next = 23;
            break;
          }

          console.log('请先配置clientKey');
          // alert('Please enter a client key')
          (0, _common.message)({ text: getWords('content_message_0'), color: 'red' });
          return _context2.abrupt('return');

        case 23:
          if (!(!documentObj || !config[documentObj['title']])) {
            _context2.next = 29;
            break;
          }

          _context2.next = 26;
          return (0, _common.waitFor)('iframe[src*="bframe"]');

        case 26:
          f = document.querySelector('iframe[src*="bframe"]');

          if (f) {
            window.addEventListener('message', function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
                var isHidden;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(event.data == 'ready')) {
                          _context.next = 12;
                          break;
                        }

                      case 1:
                        if (false) // removed by dead control flow
{}

                        _context.next = 4;
                        return (0, _common.delay)(times * 10);

                      case 4:
                        if (!(!f.parentElement || !f.parentElement.parentElement)) {
                          _context.next = 6;
                          break;
                        }

                        return _context.abrupt('return', false);

                      case 6:
                        isHidden = f.parentElement.parentElement.style.visibility == 'hidden';

                        if (!isHidden) {
                          f.contentWindow.postMessage('DoOcr', '*');
                        }
                        _context.next = 10;
                        return (0, _common.delay)(2000);

                      case 10:
                        _context.next = 1;
                        break;

                      case 12:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }() // 等待1秒
            );
          }

          return _context2.abrupt('return', false);

        case 29:
          // message({ text: getWords('content_message_2'), color: 'green' })
          console.log('documentObj', documentObj['title']);
          // 显示自动识别已经启动

          // reCapthca的点击勾选逻辑在其他地方
          // if (window.self.location.href.match(/\/recaptcha\/(.*?)\/anchor\?/) == null) {
          // // 点击我是人类
          // // 20220301  等待显示后才点击
          //   while (visualViewport.width === 0) {
          //     await delay(times * 10) // 等待1秒
          //   }
          //   document.getElementById('checkbox') && document.getElementById('checkbox').click()
          //   document.body.click()
          // }

          // var f = document.querySelector('iframe[src*="bframe"]')


          // 根据不同的页面类型，进行不同的操作
          _context2.t0 = documentObj['title'];
          _context2.next = _context2.t0 === 'imageclassification' ? 33 : _context2.t0 === 'imagetotext' ? 37 : _context2.t0 === 'rainbow' ? 40 : 44;
          break;

        case 33:
          if (!(!config.recaptchaConfig.isUseNewScript && config.recaptchaConfig.isOpen)) {
            _context2.next = 36;
            break;
          }

          _context2.next = 36;
          return imageclassification_v4(config);

        case 36:
          return _context2.abrupt('break', 44);

        case 37:
          _context2.next = 39;
          return imagetotext(config);

        case 39:
          return _context2.abrupt('break', 44);

        case 40:
          (0, _common.messageHide)();
          _context2.next = 43;
          return rainbow();

        case 43:
          return _context2.abrupt('break', 44);

        case 44:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
}))();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WEMsUUFBTSxVQTFNSztBQTJNWEMsTUFBSSxVQTNNTztBQTRNWEMsS0FBRyxVQTVNUTtBQTZNWEMsS0FBRyxVQTdNUTtBQThNWEMsS0FBRyxVQTlNUTtBQStNWEMsTUFBSSxXQS9NTztBQWdOWEMsTUFBSSxVQWhOTztBQWlOWEMsT0FBSyxVQWpOTTtBQWtOWEMsTUFBSSxVQWxOTztBQW1OWEMsS0FBRyxVQW5OUTtBQW9OWEMsS0FBRyxXQXBOUTtBQXFOWEMsTUFBSSxTQXJOTztBQXNOWEMsT0FBSyxTQXROTTtBQXVOWEMsS0FBRyxTQXZOUTtBQXdOWEMsT0FBSyxVQXhOTTtBQXlOWEMsU0FBTyxVQXpOSTtBQTBOWEMsY0FBWSxVQTFORDtBQTJOWEMsY0FBWSxXQTNORDtBQTROWEMsT0FBSyxVQTVOTTtBQTZOWEMsUUFBTSxXQTdOSztBQThOWEMsUUFBTSxVQTlOSztBQStOWEMsVUFBUSxXQS9ORztBQWdPWEMsTUFBSSxVQWhPTztBQWlPWEMsUUFBTSxXQWpPSztBQWtPWEMsTUFBSSxXQWxPTztBQW1PWEMsTUFBSSxZQW5PTztBQW9PWEMsS0FBRyxVQXBPUTtBQXFPWEMsTUFBSSxXQXJPTztBQXNPWEMsU0FBTyxVQXRPSTtBQXVPWEMsU0FBTyxVQXZPSTtBQXdPWEMsV0FBUyxXQXhPRTtBQXlPWEMsS0FBRyxVQXpPUTtBQTBPWEMsY0FBWSxXQTFPRDtBQTJPWEMsTUFBSSxVQTNPTztBQTRPWEMsV0FBUyxVQTVPRTtBQTZPWEMsTUFBSSxXQTdPTztBQThPWEMsT0FBSyxXQTlPTTtBQStPWEMsVUFBUSxXQS9PRztBQWdQWEMsTUFBSSxVQWhQTztBQWlQWEMsUUFBTSxXQWpQSztBQWtQWEMsT0FBSyxXQWxQTTtBQW1QWEMsT0FBSyxXQW5QTTtBQW9QWEMsVUFBUSxXQXBQRztBQXFQWEMsT0FBSyxXQXJQTTtBQXNQWEMsYUFBVyxXQXRQQTtBQXVQWEMsYUFBVyxXQXZQQTtBQXdQWEMsTUFBSSxXQXhQTztBQXlQWEMsTUFBSSxXQXpQTztBQTBQWEMsU0FBTyxXQTFQSTs7QUE0UFhDLE9BQUssVUE1UE07O0FBOFBYO0FBQ0FDLFFBQU0sV0EvUEs7QUFnUVhDLE1BQUksV0FoUU87QUFpUVhDLE1BQUksVUFqUU87QUFrUVhDLE1BQUksVUFsUU87QUFtUVhDLE9BQUssVUFuUU07QUFvUVhDLE9BQUssVUFwUU07QUFxUVhDLE1BQUksVUFyUU87QUFzUVhDLFNBQU8sVUF0UUk7QUF1UVhDLE1BQUksVUF2UU87QUF3UVhDLE1BQUksV0F4UU87QUF5UVhDLE1BQUksVUF6UU87QUEwUVhDLE1BQUksVUExUU87QUEyUVhDLE1BQUksVUEzUU87QUE0UVhDLE1BQUksV0E1UU87QUE2UVhDLE1BQUksU0E3UU87QUE4UVhDLE1BQUksU0E5UU87QUErUVhDLE9BQUssVUEvUU07QUFnUlhDLE9BQUssVUFoUk07QUFpUlhDLE1BQUksVUFqUk87QUFrUlhDLE9BQUssVUFsUk07QUFtUlhDLE9BQUssVUFuUk07QUFvUlhDLFFBQU0sV0FwUks7QUFxUlhDLEtBQUcsVUFyUlE7QUFzUlhDLFFBQU0sV0F0Uks7QUF1UlhDLE9BQUssVUF2Uk07QUF3UlhDLE1BQUksV0F4Uk87QUF5UlhDLE1BQUksVUF6Uk87QUEwUlhDLFFBQU0sVUExUks7QUEyUlhDLFFBQU0sV0EzUks7QUE0UlhDLE1BQUksV0E1Uk87QUE2UlhDLE1BQUksWUE3Uk87QUE4UlhDLE1BQUksVUE5Uk87QUErUlhDLE1BQUksV0EvUk87QUFnU1hDLFFBQU0sVUFoU0s7QUFpU1hDLFNBQU8sVUFqU0k7QUFrU1hDLFFBQU0sV0FsU0s7QUFtU1hDLE1BQUksVUFuU087QUFvU1hDLE9BQUssV0FwU007QUFxU1hDLE1BQUksVUFyU087QUFzU1hDLE9BQUssVUF0U007QUF1U1hDLE1BQUksV0F2U087QUF3U1hDLE9BQUssV0F4U007QUF5U1hDLE9BQUssV0F6U007QUEwU1hDLFNBQU8sV0ExU0k7QUEyU1hDLFFBQU0sV0EzU0s7QUE0U1hDLE9BQUssV0E1U007QUE2U1hDLE9BQUssV0E3U007QUE4U1hDLE9BQUssV0E5U007QUErU1hDLE9BQUssV0EvU007QUFnVFhDLFVBQVEsV0Fo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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixNQUFNO0FBQ04sZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLG1CQUFtQjtB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cGhCLE9BQU9taEIsZUFBUCxDQUF1QjNkLE1BMUYxRTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGlCQTJGYTJjLHVCQUF1Qm5nQixNQUF2QixDQTNGYjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxpQkErRldtYyxZQUFZbmMsTUFBWixDQS9GWDs7QUFBQTtBQUFBOztBQUFBO0FBa0dLO0FBbEdMO0FBQUEsaUJBbUdXd2IsU0FuR1g7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFELEsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9zcmMvY29tbW9uLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vc3JjL2pzb25hbGwuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwid2VicGFjazovL2V6YnV5X2Fzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9zcmMvdG9vbC50cyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXpidXlfYXNzaXN0YW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lemJ1eV9hc3Npc3RhbnQvLi9zcmMvY29udGVudC9jYXB0Y2hhMi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDkuLrmm7/mjaJwY+WuouaIt+err+WunueOsOS4gOS4quWQjOagt+eahOaOpeWPo+eahOWvueixoe+8jOi/meagt+WwseS4jeeUqOaUueS5i+WJjeeahGNhcHRjaGEuanPnmoTku6PnoIHkuoZcbi8vIOa1i+ivlWtleSAgYTIwMDBkYTk5NWVmOTM5NjJkZjhhNGY2ZDIwMDAwNGIxZmRkNGM5NDNcbi8vIOmcgOWunueOsOeahOaOpeWPo1xuLy8gMS5vbm9wZW4gIOWQr+WKqOaXtuiwg+eUqFxuLy8gMi5vbmNsb3NlIOWFs+mXreaXtuiwg+eUqFxuLy8gMy5vbm1lc3NhZ2Ug5o6l5pS25Yiw5raI5oGv5pe26LCD55SoXG4vLyA0LnNlbmQg5pa55rOV5Y+R6YCB5raI5oGvXG4vLyBvbm1lc3NhZ2UgIOaXtumcgOi/lOWbniBqc29u5a2X56ym5LiyK1wiIyNcIiDkvZzkuLrnu5PmnZ/moIflv5dcbi8vIOi/lOWbnuWvueixoemcgOimgeaciSB0eXBlIOWxnuaApyAxMCzooajnpLrmmK/lkKblvIDlkK/oh6rliqjor4bliKssMuihqOekuue7k+aenCxcbi8vIOacjeWKoeWZqOeJiOacrOS/oeaBr1xuXG5sZXQgY2hyb21lID0gd2luZG93LmNocm9tZVxuXG4vLyDorr7nva7pobXpnaLkv6Hmga/mmL7npLrlkozpmpDol49cbmV4cG9ydCBjb25zdCBtZXNzYWdlID0gKHsgdGV4dCA9ICcnLCBjb2xvciA9ICdyZWQnIH0pID0+IHtcbiAgbGV0IG1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXltZXNzYWdlJylcbiAgaWYgKCFtZXNzYWdlKSB7XG4gICAgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbWVzc2FnZS5pZCA9ICdteW1lc3NhZ2UnXG5cbiAgICAvLyBtZXNzYWdlLmNsYXNzTmFtZSA9ICdmYW5rdWknXG4gICAgbWVzc2FnZS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCdcbiAgICBtZXNzYWdlLnN0eWxlLnRvcCA9ICcwcHgnXG4gICAgbWVzc2FnZS5zdHlsZS5sZWZ0ID0gJzBweCdcblxuICAgIC8vIG1lc3NhZ2Uuc3R5bGUud2lkdGggPSAnMTAwJSdcbiAgICAvLyBtZXNzYWdlLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xuICAgIG1lc3NhZ2Uuc3R5bGUuekluZGV4ID0gJzk5OTk5OTk5J1xuICAgIC8vIC8vIG1lc3NhZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwwLDAsMC41KSdcbiAgICAvLyBtZXNzYWdlLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmVkJ1xuICAgIC8vIG1lc3NhZ2Uuc3R5bGUudGV4dEFsaWduID0gJ2xlZnQnXG4gICAgLy8gbWVzc2FnZS5zdHlsZS5saW5lSGVpZ2h0ID0gJzEwMCUnXG4gICAgLy8gbWVzc2FnZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4J1xuICAgIG1lc3NhZ2UuaW5uZXJUZXh0ID0gdGV4dFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWVzc2FnZSlcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlLmlubmVyVGV4dCA9IHRleHRcbiAgfVxuICBjb2xvciA9PT0gJ2dyZWVuJyA/IChtZXNzYWdlLmNsYXNzTmFtZSA9ICdmYW5rdWknKSA6IChtZXNzYWdlLmNsYXNzTmFtZSA9ICdmYW5rdWkyJylcbiAgbWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAvLyBtZXNzYWdlLnN0eWxlLmNvbG9yID0gY29sb3IgPT09ICdncmVlbicgPyAncmVkJyA6ICdncmVlbidcbn1cblxuLy8g6K6+572u6aG16Z2i5L+h5oGv5pi+56S65ZKM6ZqQ6JePXG5leHBvcnQgY29uc3QgbWVzc2FnZUhpZGUgPSAoKSA9PiB7XG4gIGxldCBtZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215bWVzc2FnZScpXG4gIGlmIChtZXNzYWdlKSB7XG4gICAgbWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbn1cblxuLy8g5a6a5LmJ6aG16Z2i6K+G5Yir5pa55rOVXG5leHBvcnQgY29uc3QgY2FwdGNoYUNsYXNzaWZpY2F0aW9uID0gYXN5bmMgKCkgPT4ge1xuICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAvLyB3aW5kb3cub25sb2FkID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgeyB0aW1lcyB9ID0gYXdhaXQgZ2V0Y29uZmlnKClcbiAgYXdhaXQgZGVsYXkodGltZXMgKiAxMClcbiAgbGV0IHJlc3VsdCA9IG51bGxcbiAgLy8g5a+55LiN5ZCM6aG16Z2i5Yik5pat55qE5a6a5LmJIHRpdGxlIOihqOekuuS9v+eUqOeahOaOpeWPo++8jHVybF9rZXl3b3JrIOS4unVybOS4reeahOWFs+mUruWtlyxkaXYg5Li65Yik5pat5piv5ZCm6L+Z5Liq6aG16Z2iXG4gIGxldCB0eXBlbGlzdCA9IFt7XG4gICAgdGl0bGU6ICdpbWFnZWNsYXNzaWZpY2F0aW9uJyxcbiAgICB1cmxfa2V5d29yZDogJ3JlY2FwdGNoYScsXG4gICAgZGl2OiAnI3JlY2FwdGNoYS1hbmNob3ItbGFiZWwnLFxuICAgIGltYWdlZGl2OiAnI3JlY2FwdGNoYS10b2tlbicgLy8g5Zu+54mH55qEZGl2IOWSjOeCueWHu+eahOahhuaetuS4uuS4pOS4quS4jeWQjOeahOahhuaetlxuXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ2hjYXB0Y2hhJyxcbiAgICB1cmxfa2V5d29yZDogJ2hjYXB0Y2hhLmNvbScsXG4gICAgZGl2OiAnI2FuY2hvci1zdGF0ZScsXG4gICAgaW1hZ2VkaXY6ICcuY2hhbGxlbmdlLWNvbnRhaW5lcicgLy8gaGNhcHRjaGEg5Zu+54mH55qEZGl2IOWSjOeCueWHu+eahOahhuaetuS4uuS4pOS4quS4jeWQjOeahOahhuaetlxuICB9LFxuICB7XG4gICAgdGl0bGU6ICdoY2FwdGNoYScsXG4gICAgdXJsX2tleXdvcmQ6ICdoY2FwdGNoYS1hc3NldHMuZWNvc2VjLm9uLmVwaWNnYW1lcy5jb20nLFxuICAgIGRpdjogJyNhbmNob3Itc3RhdGUnLFxuICAgIGltYWdlZGl2OiAnLmNoYWxsZW5nZS1jb250YWluZXInIC8vIGhjYXB0Y2hhIOWbvueJh+eahGRpdiDlkozngrnlh7vnmoTmoYbmnrbkuLrkuKTkuKrkuI3lkIznmoTmoYbmnrZcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAncmFpbmJvdycsXG4gICAgLy8gYXNzZXRzLXVzLXdlc3QtMi5xdWV1ZS1pdC5uZXRcbiAgICAvLyBhc3NldHMtdXMtd2VzdC0yLnF1ZXVlLWl0Lm5ldFxuICAgIHVybF9rZXl3b3JkOiAncXVldWUtaXQubmV0JyxcbiAgICBkaXY6ICcjZW5xdWV1ZS1lcnJvciA+IGE6bnRoLWNoaWxkKDMpID4gZGl2ID4gc3Ryb25nJ1xuICB9LFxuICB7XG4gICAgdGl0bGU6ICdpbWFnZXRvdGV4dCcsXG4gICAgdXJsX2tleXdvcmQ6ICdxdWV1ZScsXG4gICAgLy8gZGl2OiAnI2NoYWxsZW5nZS1jb250YWluZXIgPiBidXR0b24nXG4gICAgZGl2OiAnI2xiSGVhZGVyUCdcbiAgfVxuICBdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZWxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBjb25zb2xlLmxvZygnX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXycpXG4gICAgLy8gY29uc29sZS5sb2cod2luZG93LmxvY2F0aW9uLmhyZWYsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YodHlwZWxpc3RbaV0udXJsX2tleXdvcmQpID4gLTEpXG4gICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0eXBlbGlzdFtpXS5kaXYpKVxuICAgIC8vIGNvbnNvbGUubG9nKCh0eXBlbGlzdFtpXS5pbWFnZWRpdiAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHR5cGVsaXN0W2ldLmltYWdlZGl2KSkpXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YodHlwZWxpc3RbaV0udXJsX2tleXdvcmQpID4gLTEgJiZcbiAgICAgIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHR5cGVsaXN0W2ldLmRpdikgfHwgKHR5cGVsaXN0W2ldLmltYWdlZGl2ICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodHlwZWxpc3RbaV0uaW1hZ2VkaXYpKSkpIHtcbiAgICAgIHJlc3VsdCA9IHR5cGVsaXN0W2ldXG5cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIC8vIHJlc29sdmUocmVzdWx0KVxuICByZXR1cm4gcmVzdWx0XG4gIC8vIH1cbiAgLy8gfSlcbn1cblxuLy8g572R57uc5rWL6K+VXG5leHBvcnQgZnVuY3Rpb24gdGVzdG5ldHdvcmsodXJsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKHdpbmRvdy5zZWxmID09PSB3aW5kb3cudG9wKSB7XG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogJ3Rlc3RuZXR3b3JrJywgdXJsOiB1cmwgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7IHJlc29sdmUodHJ1ZSkgfVxuICB9KVxufVxuXG4vLyBwb3N0IOivt+axguS7o+eQhlxuZXhwb3J0IGZ1bmN0aW9uIHBvc3QodXJsLCBkYXRhLCBkZWxheSA9IDAsIHRyaWVzID0gMSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAncG9zdCcsIHVybCwgZGF0YSwgZGVsYXksIHRyaWVzIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlID09PSBcImZhaWxcIikge1xuICAgICAgICByZWplY3QoXCJmYWlsXCIpXG4gICAgICB9XG4gICAgICByZXNvbHZlKHJlc3BvbnNlKVxuICAgIH0pXG4gIH0pXG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0KHVybCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAnZ2V0JywgdXJsOiB1cmwgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICByZXNvbHZlKHJlc3BvbnNlKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluS9meminVxuZXhwb3J0IGZ1bmN0aW9uIGdldEJhbGFuY2UoeyBob3N0LCBjbGllbnRLZXkgfSkge1xuICByZXR1cm4gcG9zdChuZXcgVVJMKCdnZXRCYWxhbmNlJywgaG9zdCkuaHJlZiwge1xuICAgIGNsaWVudEtleVxuICB9KVxufVxuZXhwb3J0IGNvbnN0IGRlbGF5ID0gKHMpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgc2V0VGltZW91dChyZXNvbHZlLCBzKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Y29uZmlnKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAnZ2V0Y29uZmlnJyB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlLnRpbWVzID0gcmVzcG9uc2UudGltZXMgfHwgMTAwXG4gICAgICByZXNvbHZlKHJlc3BvbnNlKVxuICAgIH0pXG4gIH0pXG59XG5leHBvcnQgZnVuY3Rpb24gc2V0Y29uZmlnKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAnc2V0Y29uZmlnJywgY29uZmlnIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgcmVzb2x2ZShyZXNwb25zZSlcbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc3JjMmJhc2U2NCA9IChzcmMsIHdpZHRoID0gMTI4LCBoZWlnaHQgPSAxMjgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoIXNyYykgcmVzb2x2ZShudWxsKVxuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ0Fub255bW91cycpXG4gICAgaW1nLnNyYyA9IHNyY1xuICAgIGltZy53aWR0aCA9IHdpZHRoXG4gICAgaW1nLmhlaWdodCA9IGhlaWdodFxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGhcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodFxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7IC8vIOWbvueJh+WKoOi9veWujO+8jOWGjWRyYXcg5ZKMIHRvRGF0YVVSTFxuICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgbGV0IGJhc2U2NCA9IGNhbnZhcy50b0RhdGFVUkwoKVxuICAgICAgLy8gY29uc29sZS5sb2coJ2Jhc2U2NCcsIGJhc2U2NClcbiAgICAgIGxldCBvdXQgPSBiYXNlNjQucmVwbGFjZSgnZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcsICcnKVxuXG4gICAgICByZXNvbHZlKG91dClcbiAgICB9XG4gIH0pXG59XG5cbi8vIOaXoOmcgOi/lOWbnueahOmUmeivr+eggVxuZXhwb3J0IGNvbnN0IG5vdG5lZWRjb250aW51ZSA9IGVycm9yc3RyID0+IHtcbiAgcmV0dXJuIGVycm9yc3RyICYmIGBFUlJPUl9SRVFVSVJFRF9GSUVMRFNcbiAgRVJST1JfS0VZX0RPRVNfTk9UX0VYSVNUXG4gIEVSUk9SX1pFUk9fQkFMQU5DRVxuICBFUlJPUl9aRVJPX0NBUFRDSEFfRklMRVNJWkVcbiAgRVJST1JfRE9NQUlOX05PVF9BTExPV0VEXG4gIEVSUk9SX1RPT19CSUdfQ0FQVENIQV9GSUxFU0laRVxuICBFUlJPUl9JTExFR0FMX0lNQUdFXG4gIEVSUk9SX0lQX0JBTk5FRFxuICBFUlJPUl9JUF9CTE9DS0VEXzVNSU5cbiAgRVJST1JfQ0xJRU5US0VZX1VOQVVUSE9SSVpFRGAuaW5jbHVkZXMoZXJyb3JzdHIpXG59XG4vLyDnrYnlvoVkb23lhYPntKDlrZjlnKgs6LaF5pe2IOm7mOiupDEw56eSXG5leHBvcnQgY29uc3Qgd2FpdEZvciA9IChkaXZzdHIsIG91dHRpbWUgPSAxMCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRpdnN0cikpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgfVxuICAgIH0sIDEwMClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICByZXNvbHZlKHRydWUpXG4gICAgfSwgb3V0dGltZSAqIDEwMDApXG4gIH0pXG59XG4vLyDnrYnlvoXlm77lg4/liqDovb3lroxcbmV4cG9ydCBjb25zdCBpbWFnZXJlYWR5ID0gKGltZ3NyYykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgIGltZy5zcmMgPSBpbWdzcmNcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgIH1cbiAgfSlcbn1cbi8vIOetieW+heiDjOaZr+WbvueJh+WxnuaAp+WtmOWcqFxuZXhwb3J0IGNvbnN0IHdhaXRmb3JiYWNrZ3JvdW5kID0gZGl2ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoZGl2LnN0eWxlICYmIGRpdi5zdHlsZS5iYWNrZ3JvdW5kKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgIH1cbiAgICB9LCAxMDApXG4gIH0pXG59XG5cbi8vIOetieW+heiDjOaZr+WbvueJh+WxnuaAp+WtmOWcqFxuZXhwb3J0IGNvbnN0IHdhaXRmb3JiYWNrZ3JvdW5kV2l0aFRpbWVvdXQgPSBkaXYgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChkaXYuc3R5bGUuYmFja2dyb3VuZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICB9XG4gICAgfSwgMTAwKVxuICAgIGNvbnN0IHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICByZXNvbHZlKGZhbHNlKVxuICAgIH0sIDMwMDApO1xuICB9KVxufVxuXG4vLyDnrYnlvoVmdW5j6L+U5ZuedHJ1ZSzotoXml7bpu5jorqQxMOenklxuZXhwb3J0IGNvbnN0IHdhaXREbyA9IChmdW5jLCBvdXR0aW1lID0gMTApID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoZnVuYygpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmdW5jIHRydWUnKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICB9XG4gICAgfSwgMTAwKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2Z1bmMgZmFsc2UnKVxuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgIHJlc29sdmUoZmFsc2UpXG4gICAgfSwgb3V0dGltZSAqIDEwMDApXG4gIH0pXG59XG5cbi8vIOWuouaIt+err+iOt+WPlueJiOacrOWPt1xuXG5mdW5jdGlvbiBnZXRMb2NhbFZlcnNpb24oKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgIGdldExvY2FsVmVyc2lvbjogdHJ1ZVxuICAgIH0sIGZ1bmN0aW9uICh2ZXIpIHtcbiAgICAgIHJlc29sdmUodmVyKVxuICAgIH0pXG4gIH0pXG59XG5leHBvcnQgY29uc3QgZ2V0Q2xpY2tUaW1lID0gKGNvbmZpZ1RpbWUgPSAwLCByYXRlID0gMC4xKSA9PiB7XG5cbiAgY29uc3QgdGltZUZsb2F0TGltaXQgPSBjb25maWdUaW1lICogcmF0ZVxuXG4gIGNvbnN0IHRpbWVGbG9hdCA9IE1hdGgucmFuZG9tKCkgKiAyICogdGltZUZsb2F0TGltaXQgLSB0aW1lRmxvYXRMaW1pdFxuXG4gIHJldHVybiBNYXRoLmNlaWwodGltZUZsb2F0KSArIGNvbmZpZ1RpbWVcbn1cblxuXG5cbmV4cG9ydCBjb25zdCBnZXRJc0JsYWNrV2hpdGVQYXNzID0gYXN5bmMgKGNvbmZpZykgPT4ge1xuICBjb25zdCBpc0luVXJsTGlzdCA9ICh1cmxMaXN0LCB1cmwpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHVybExpc3QuZmluZEluZGV4KHBhdHRlcm4gPT5cbiAgICAgIHVybC5pbmRleE9mKHBhdHRlcm4pID4gLTFcbiAgICApXG4gICAgcmV0dXJuIGluZGV4ID4gLTE7XG4gIH1cbiAgY29uc3QganVkZ2VCbGFja1doaXRlID0gKGNvbmZpZywgdXJsKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGlzT3BlbkJsYWNrTGlzdCA9IGNvbmZpZy5ibGFja0xpc3RDb25maWcuaXNPcGVuO1xuICAgICAgY29uc3QgaXNPcGVuV2hpdGVMaXN0ID0gY29uZmlnLndoaXRlTGlzdENvbmZpZy5pc09wZW47XG4gICAgICBpZiAoaXNPcGVuV2hpdGVMaXN0KSB7XG4gICAgICAgIGNvbnN0IHdoaXRlUmVzdWx0ID0gaXNJblVybExpc3QoY29uZmlnLndoaXRlTGlzdENvbmZpZy51cmxMaXN0IHx8IFtdLCB1cmwpXG4gICAgICAgIGlmICh3aGl0ZVJlc3VsdCkgcmV0dXJuICdpbldoaXRlTGlzdCdcbiAgICAgICAgZWxzZSByZXR1cm4gJ25vdEluV2hpdGVMaXN0J1xuICAgICAgfVxuICAgICAgaWYgKGlzT3BlbkJsYWNrTGlzdCkge1xuICAgICAgICBjb25zdCBibGFja0xpc3RSZXN1bHQgPSBpc0luVXJsTGlzdChjb25maWcuYmxhY2tMaXN0Q29uZmlnLnVybExpc3QgfHwgW10sIHVybClcbiAgICAgICAgaWYgKGJsYWNrTGlzdFJlc3VsdCkgcmV0dXJuICdpbkJsYWNrTGlzdCdcbiAgICAgICAgZWxzZSByZXR1cm4gJ25vdEluQmxhY2tMaXN0J1xuICAgICAgfVxuICAgICAgZWxzZSByZXR1cm4gJ25vcm1hbCdcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gJ25vcm1hbCdcbiAgICB9XG4gIH1cblxuICBjb25zdCBxdWVyeUN1cnJlbnRVcmwgPSAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAncXVlcnlDdXJyZW50VXJsJyB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgIHJlc29sdmUocmVzcG9uc2UpXG4gICAgfSlcbiAgfSlcbiAgY29uc3QgY3VycmVudFRhYlVybCA9IGF3YWl0IHF1ZXJ5Q3VycmVudFVybCgpXG4gIGNvbnN0IGJsYWNrV2hpdGVSZXN1bHQgPSBqdWRnZUJsYWNrV2hpdGUoY29uZmlnLCBjdXJyZW50VGFiVXJsKVxuICBzd2l0Y2ggKGJsYWNrV2hpdGVSZXN1bHQpIHtcbiAgICBjYXNlICdpbldoaXRlTGlzdCc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIC8v5LiN5Zyo55m95ZCN5Y2VIOebtOaOpee7k+adn+S6hlxuICAgIGNhc2UgJ25vdEluV2hpdGVMaXN0JzpcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIC8v5Zyo6buR5ZCN5Y2V6YeMIOebtOaOpee7k+adn+S6hlxuICAgIGNhc2UgJ2luQmxhY2tMaXN0JzpcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIGNhc2UgJ25vdEluQmxhY2tMaXN0JzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgY2FzZSAnbm9ybWFsJzpcbiAgICAgIHJldHVybiB0cnVlXG4gIH1cblxufVxuXG4vLyDmnKzlnLDniYjmnKzkv6Hmga9cblxuZnVuY3Rpb24gbG9jYWxWZXJzaW9uKCkge1xuICByZXR1cm4gbG9jYWxTdG9yYWdlLnZlcnNpb24gPyBsb2NhbFN0b3JhZ2UudmVyc2lvbiA6IDFcbn1cbmV4cG9ydCB7XG4gIGxvY2FsVmVyc2lvbixcbiAgZ2V0TG9jYWxWZXJzaW9uXG59XG4iLCJleHBvcnQgY29uc3QgY29uZmlnID0ge2RldmVsb3A6IHRydWV9XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWR1cGUta2V5cyAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGhjYXB0Y2hhSXRlbWxpc3QgPSB7XHJcbiAgJ2FpcnBsYW5lJzogJ+mjnuacuicsXHJcbiAgJ3NlYXBsYW5lJzogJ+mjnuacuicsXHJcbiAgJ21vdG9yYnVzJzogJ+W3tOWjqycsXHJcbiAgJ2J1cyc6ICflt7Tlo6snLFxyXG4gICdib2F0JzogJ+iIuScsXHJcbiAgJ2J1cyc6ICflhazkuqTovaYnLFxyXG4gICd0cmFpbic6ICfngavovaYnLFxyXG4gICd0cnVjayc6ICfljaHovaYnLFxyXG4gICdtb3RvcmN5Y2xlJzogJ+aRqeaJmOi9picsXHJcbiAgJ2JpY3ljbGUnOiAn6Ieq6KGM6L2mJ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGpzb25hbGwgPSB7XHJcbiAgLy8g55m95L+E572X5pavXHJcbiAg0LPQvtGA0YvQsNCx0L7Qv9Cw0LPQvtGA0LrRljogJy9tLzA5ZF9yJyxcclxuICDQt9C90LDQutGW0L/RgNGL0L/Ri9C90LrRgzogJy9tLzAycHYxOScsXHJcbiAg0LLRg9C70ZbRh9C90YvRj9C30L3QsNC60ZY6ICcvbS8wMW1xZHQnLFxyXG4gINGA0LDRgdC70ZbQvdGLOiAnL20vMDVzMnMnLFxyXG4gINC00YDRjdCy0Ys6ICcvbS8wN2o3cicsXHJcbiAg0YLRgNCw0LLQsDogJy9tLzA4dDljXycsXHJcbiAg0YXQvNGL0LfQvdGP0LrQvtGeOiAnL20vMGdxYnQnLFxyXG4gINC60LDQutGC0YPRgTogJy9tLzAyNV92JyxcclxuICDQv9Cw0LvRjNC80Ys6ICcvbS8wY2RsMScsXHJcbiAg0L/RgNGL0YDQvtC00Ys6ICcvbS8wNWgwbicsXHJcbiAg0LLQsNC00LDRgdC/0LDQtNGLOiAnL20vMGoya3gnLFxyXG4gINCz0L7RgNGLOiAnL20vMDlkX3InLFxyXG4gINC/0LDQs9C+0YDQutGWOiAnL20vMDlkX3InLFxyXG4gINCy0LDQtNCw0ZHQvNGLOiAnL20vMDNrdG0xJyxcclxuICDRgNGN0LrRljogJy9tLzA2Y25wJyxcclxuICDQv9C70Y/QttGLOiAnL20vMGIzeXInLFxyXG4gINCh0L7QvdGG0LA6ICcvbS8wNm1fcCcsXHJcbiAg0JzQtdGB0Y/RhjogJy9tLzA0d3ZfJyxcclxuICDQvdC10LHQsDogJy9tLzAxYnF2cCcsXHJcbiAg0YLRgNCw0L3RgdC/0LDRgNGC0L3Ri9GF0YHRgNC+0LTQutCw0Z46ICcvbS8wazRqJyxcclxuICDQvNCw0YjRi9C90Ys6ICcvbS8wazRqJyxcclxuICDQstC10LvQsNGB0ZbQv9C10LTRizogJy9tLzAxOTlnJyxcclxuICDQvNCw0YLQsNGG0YvQutC70Ys6ICcvbS8wNF9zdicsXHJcbiAg0L/RltC60LDQv9GLOiAnL20vMGN2cTMnLFxyXG4gINC60LDQvNC10YDRhtGL0LnQvdGL0Y/Qs9GA0YPQt9Cw0LLRltC60ZY6ICcvbS8wZmt3amcnLFxyXG4gINC70L7QtNC60ZY6ICcvbS8wMTlqZCcsXHJcbiAg0LvRltC80YPQt9GW0L3RizogJy9tLzAxbGN3NCcsXHJcbiAg0YLQsNC60YHRljogJy9tLzBwZzUyJyxcclxuICDRiNC60L7Qu9GM0L3Ri9Cw0Z7RgtC+0LHRg9GBOiAnL20vMDJ5dmhqJyxcclxuICDQsNGe0YLQvtCx0YPRgTogJy9tLzAxYmp2JyxcclxuICDQsdGD0LTQsNGe0L3RltGH0LDRj9C80LDRiNGL0L3QsDogJy9tLzAyZ3gxNycsXHJcbiAg0YHRgtCw0YLRg9GWOiAnL20vMDEzXzFjJyxcclxuICDRhNCw0L3RgtCw0L3RizogJy9tLzBoOGxoa2cnLFxyXG4gINC80L7RgdGCOiAnL20vMDE1a3InLFxyXG4gINC/0YDRi9GB0YLQsNC90Yw6ICcvbS8wMXBocTQnLFxyXG4gINGF0LzQsNGA0LDRh9C+0YE6ICcvbS8wNzljbCcsXHJcbiAg0YHQu9GD0L/Ri9Cw0LHQvtC60LDQu9C+0L3RizogJy9tLzAxX203JyxcclxuICDQstGW0YLRgNCw0LbRizogJy9tLzAxMXkyMycsXHJcbiAg0LTQvtC8OiAnL20vMDNqbTUnLFxyXG4gINC20YvQu9GL0LTQvtC8OiAnL20vMDFuYmx0JyxcclxuICDRgdCy0LXRgtC70LDQstGL0LTQvtC8OiAnL20vMDRoN2gnLFxyXG4gINGH0YvQs9GD0L3QsNGH0L3QsNGP0YHRgtCw0L3RhtGL0Y86ICcvbS8wcHkyNycsXHJcbiAg0L/QvtC/0LXQu9Cw0Lw6ICcvbS8wMW42ZmQnLFxyXG4gINCy0L7Qs9C90LXQs9Cw0LTRgNCw0L3RgjogJy9tLzAxcG5zMCcsXHJcbiAg0YDRjdC60LvQsNC80L3Ri9GI0YfRi9GCOiAnL20vMDFrbmpiJyxcclxuICDQtNCw0YDQvtCz0ZY6ICcvbS8wNmdmaicsXHJcbiAg0L/QtdGI0LDRhdC+0LTQvdGL0Y/Qv9C10YDQsNGF0L7QtNGLOiAnL20vMDE0eGNzJyxcclxuICDRgdCy0Y/RgtC70LDRhNC+0YA6ICcvbS8wMTVxZmYnLFxyXG4gINCz0LDRgNCw0LbQvdGL0Y/QtNC30LLQtdGA0Ys6ICcvbS8wOGw5NDEnLFxyXG4gINCw0Z7RgtC+0LHRg9GB0L3Ri9GP0L/RgNGL0L/Ri9C90LrRljogJy9tLzAxandfMScsXHJcbiAg0YLRgNCw0YTRltC60YM6ICcvbS8wM3N5N3YnLFxyXG4gINC/0LDRgNC60L7QvNCw0YLQsNGA0Ys6ICcvbS8wMTVxYnAnLFxyXG4gINC70LXRgdCy0ZbRhtGLOiAnL20vMDFseW5oJyxcclxuICDQutC+0LzRltC90Ys6ICcvbS8wMWprXzQnLFxyXG4gINGC0YDQsNC60YLQsNGA0Ys6ICcvbS8wMTN4bG0nLFxyXG5cclxuICAvLyDms7Dor61cclxuICDguKDguLnguYDguILguLLguKvguKPguLfguK3guYDguJnguLTguJnguYDguILguLI6ICcvbS8wOWRfcicsXHJcbiAg4Lib4LmJ4Liy4Lii4Lir4Lii4Li44LiUOiAnL20vMDJwdjE5JyxcclxuICDguJvguYnguLLguKLguJbguJnguJk6ICcvbS8wMW1xZHQnLFxyXG4gIOC4nuC4t+C4ijogJy9tLzA1czJzJyxcclxuICDguJXguYnguJnguYTguKHguYk6ICcvbS8wN2o3cicsXHJcbiAg4Lir4LiN4LmJ4LiyOiAnL20vMDh0OWNfJyxcclxuICDguJ7guLjguYjguKHguYTguKHguYk6ICcvbS8wZ3FidCcsXHJcbiAg4LiB4Lij4Liw4Lia4Lit4LiH4LmA4Lie4LiK4LijOiAnL20vMDI1X3YnLFxyXG4gIOC4leC5ieC4meC4m+C4suC4peC5jOC4oTogJy9tLzBjZGwxJyxcclxuICDguJjguKPguKPguKHguIrguLLguJXguLQ6ICcvbS8wNWgwbicsXHJcbiAg4LiZ4LmJ4Liz4LiV4LiBOiAnL20vMGoya3gnLFxyXG4gIOC4oOC4ueC5gOC4guC4sjogJy9tLzA5ZF9yJyxcclxuICDguYDguJnguLTguJnguYDguILguLI6ICcvbS8wOWRfcicsXHJcbiAg4LmB4Lir4Lil4LmI4LiH4LiZ4LmJ4LizOiAnL20vMDNrdG0xJyxcclxuICDguYHguKHguYjguJnguYnguLM6ICcvbS8wNmNucCcsXHJcbiAg4LiK4Liy4Lii4Lir4Liy4LiUOiAnL20vMGIzeXInLFxyXG4gIOC4lOC4p+C4h+C4reC4suC4l+C4tOC4leC4ouC5jDogJy9tLzA2bV9wJyxcclxuICDguJTguKfguIfguIjguLHguJnguJfguKPguYw6ICcvbS8wNHd2XycsXHJcbiAg4LiX4LmJ4Lit4LiH4Lif4LmJ4LiyOiAnL20vMDFicXZwJyxcclxuICDguKLguLLguJnguJ7guLLguKvguJnguLA6ICcvbS8wazRqJyxcclxuICDguKPguJY6ICcvbS8wazRqJyxcclxuICDguIjguLHguIHguKPguKLguLLguJk6ICcvbS8wMTk5ZycsXHJcbiAg4Lij4LiW4LiI4Lix4LiB4Lij4Lii4Liy4LiZ4Lii4LiZ4LiV4LmMOiAnL20vMDRfc3YnLFxyXG4gIOC4o+C4luC4m+C4tOC4hOC4reC4seC4njogJy9tLzBjdnEzJyxcclxuICDguKPguJbguJrguKPguKPguJfguLjguIHguYDguIrguLTguIfguJ7guLLguJPguLTguIrguKLguYw6ICcvbS8wZmt3amcnLFxyXG4gIOC5gOC4o+C4t+C4rTogJy9tLzAxOWpkJyxcclxuICDguKPguJbguKXguLXguKHguLnguIvguLXguJk6ICcvbS8wMWxjdzQnLFxyXG4gIOC5geC4l+C5h+C4geC4i+C4teC5iDogJy9tLzBwZzUyJyxcclxuICDguKPguJbguYLguKPguIfguYDguKPguLXguKLguJk6ICcvbS8wMnl2aGonLFxyXG4gIOC4o+C4quC4muC4seC4qjogJy9tLzAxYmp2JyxcclxuICDguKPguJbguIHguYjguK3guKrguKPguYnguLLguIc6ICcvbS8wMmd4MTcnLFxyXG4gIOC4o+C4ueC4m+C4m+C4seC5ieC4mTogJy9tLzAxM18xYycsXHJcbiAg4LiZ4LmJ4Liz4Lie4Li4OiAnL20vMGg4bGhrZycsXHJcbiAg4Liq4Liw4Lie4Liy4LiZOiAnL20vMDE1a3InLFxyXG4gIOC4l+C5iOC4suC5gOC4o+C4t+C4rTogJy9tLzAxcGhxNCcsXHJcbiAg4LiV4Li24LiB4Lij4Liw4Lif4LmJ4LiyOiAnL20vMDc5Y2wnLFxyXG4gIOC5gOC4quC4suC5gOC4quC4sjogJy9tLzAxX203JyxcclxuICDguIHguKPguLDguIjguIHguKrguLU6ICcvbS8wMTF5MjMnLFxyXG4gIOC4muC5ieC4suC4mTogJy9tLzAzam01JyxcclxuICDguJXguLbguIHguK3guJ7guLLguKPguYzguJXguYDguKHguJnguJfguYw6ICcvbS8wMW5ibHQnLFxyXG4gIOC4m+C4o+C4sOC4oOC4suC4hOC4suC4ozogJy9tLzA0aDdoJyxcclxuICDguKrguJbguLLguJnguLXguKPguJbguYTguJ86ICcvbS8wcHkyNycsXHJcbiAg4LmA4LiW4LmJ4Liy4LiW4LmI4Liy4LiZOiAnL20vMDFuNmZkJyxcclxuICDguJTguLHguJrguYDguJ7guKXguLTguIc6ICcvbS8wMXBuczAnLFxyXG4gIOC4m+C5ieC4suC4ouC4muC4tOC4peC4muC4reC4o+C5jOC4lDogJy9tLzAxa25qYicsXHJcbiAg4LiW4LiZ4LiZOiAnL20vMDZnZmonLFxyXG4gIOC4l+C4suC4h+C4oeC5ieC4suC4peC4suC4ojogJy9tLzAxNHhjcycsXHJcbiAg4LmE4Lif4LiI4Lij4Liy4LiI4LijOiAnL20vMDE1cWZmJyxcclxuICDguJvguKPguLDguJXguLnguYLguKPguIfguKPguJY6ICcvbS8wOGw5NDEnLFxyXG4gIOC4m+C5ieC4suC4ouC4o+C4luC5gOC4oeC4peC5jDogJy9tLzAxandfMScsXHJcbiAg4LiB4Lij4Lin4Lii4LiI4Lij4Liy4LiI4LijOiAnL20vMDNzeTd2JyxcclxuICDguYDguKHguJXguKPguJfguLXguYjguIjguK3guJTguKPguJY6ICcvbS8wMTVxYnAnLFxyXG4gIOC4muC4seC4meC5hOC4lDogJy9tLzAxbHluaCcsXHJcbiAg4Lib4Lil4LmI4Lit4LiH4LmE4LifOiAnL20vMDFqa180JyxcclxuICDguKPguJbguYHguJfguKPguIHguYDguJXguK3guKPguYw6ICcvbS8wMTN4bG0nLFxyXG4gIOC4o+C4luC4muC4seC4qjogJy9tLzAxYmp2JyxcclxuICDguKPguJbguIjguLHguIHguKPguKLguLLguJk6ICcvbS8wMTk5ZycsXHJcbiAg4Lir4Lix4Lin4LiB4LmK4Lit4LiB4LiZ4LmJ4Liz4LiU4Lix4Lia4LmA4Lie4Lil4Li04LiHOiAnL20vMDFwbnMwJyxcclxuICDguKPguJbguKLguJnguJXguYw6ICcvbS8wazRqJyxcclxuXHJcbiAgLy8g5Zyf6ICz5YW2XHJcbiAgZGHEn2xhcnZleWF0ZXBlbGVyOiAnL20vMDlkX3InLFxyXG4gICdkdXJcImnFn2FyZXRsZXJpJzogJy9tLzAycHYxOScsXHJcbiAgc29rYWtpxZ9hcmV0bGVyaTogJy9tLzAxbXFkdCcsXHJcbiAgYml0a2lsZXI6ICcvbS8wNXMycycsXHJcbiAgYcSfYcOnbGFyOiAnL20vMDdqN3InLFxyXG4gIMOHaW1lbjogJy9tLzA4dDljXycsXHJcbiAgw6dhbMSxbGFyOiAnL20vMGdxYnQnLFxyXG4gIGtha3TDvHM6ICcvbS8wMjVfdicsXHJcbiAgUGFsbWl5ZWHEn2HDp2xhcsSxOiAnL20vMGNkbDEnLFxyXG4gIERvxJ9hOiAnL20vMDVoMG4nLFxyXG4gIMWfZWxhbGVsZXI6ICcvbS8wajJreCcsXHJcbiAgZGHEn2xhcjogJy9tLzA5ZF9yJyxcclxuICB0ZXBlbGVyOiAnL20vMDlkX3InLFxyXG4gIHN1eXVuYmVkZW5sZXJpOiAnL20vMDNrdG0xJyxcclxuICBuZWhpcmxlcjogJy9tLzA2Y25wJyxcclxuICBTYWhpbGxlcjogJy9tLzBiM3lyJyxcclxuICBHw7xuZcWfOiAnL20vMDZtX3AnLFxyXG4gIEF5OiAnL20vMDR3dl8nLFxyXG4gIGfDtmt5w7x6w7w6ICcvbS8wMWJxdnAnLFxyXG4gIEFyYcOnbGFyOiAnL20vMGs0aicsXHJcbiAgYXJhYmFsYXI6ICcvbS8wazRqJyxcclxuICBiaXNpa2xldGxlcjogJy9tLzAxOTlnJyxcclxuICBtb3Rvc2lrbGV0bGVyOiAnL20vMDRfc3YnLFxyXG4gIGthbXlvbmV0bGVyOiAnL20vMGN2cTMnLFxyXG4gIHRpY2FyaWthbXlvbmxhcjogJy9tLzBma3dqZycsXHJcbiAgdGVrbmVsZXI6ICcvbS8wMTlqZCcsXHJcbiAgbGltdXppbmxlcjogJy9tLzAxbGN3NCcsXHJcbiAgdGFrc2lsZXI6ICcvbS8wcGc1MicsXHJcbiAgb2t1bG90b2LDvHPDvDogJy9tLzAyeXZoaicsXHJcbiAgb3RvYsO8czogJy9tLzAxYmp2JyxcclxuICBpbsWfYWF0YXJhY8SxOiAnL20vMDJneDE3JyxcclxuICBoZXlrZWxsZXI6ICcvbS8wMTNfMWMnLFxyXG4gIMOnZcWfbWVsZXI6ICcvbS8waDhsaGtnJyxcclxuICBrw7ZwcsO8OiAnL20vMDE1a3InLFxyXG4gIGlza2VsZTogJy9tLzAxcGhxNCcsXHJcbiAgZ8O2a2RlbGVuOiAnL20vMDc5Y2wnLFxyXG4gIHPDvHR1bnPDvHR1bmxhcsSxOiAnL20vMDFfbTcnLFxyXG4gIHZpdHJheTogJy9tLzAxMXkyMycsXHJcbiAgZXY6ICcvbS8wM2ptNScsXHJcbiAgYXBhcnRtYW5iaW5hc8SxOiAnL20vMDFuYmx0JyxcclxuICBoYWZpZmV2OiAnL20vMDRoN2gnLFxyXG4gIHRyZW5pc3Rhc3lvbnU6ICcvbS8wcHkyNycsXHJcbiAga8O8bDogJy9tLzAxbjZmZCcsXHJcbiAgeWFuZ8Sxbm11c2x1xJ91OiAnL20vMDFwbnMwJyxcclxuICByZWtsYW1wYW5vc3U6ICcvbS8wMWtuamInLFxyXG4gIHlvbGxhcjogJy9tLzA2Z2ZqJyxcclxuICB5YXlhZ2XDp2l0bGVyaTogJy9tLzAxNHhjcycsXHJcbiAgdHJhZmlrxLHFn8Sxa2xhcsSxOiAnL20vMDE1cWZmJyxcclxuICBnYXJhamthcMSxbGFyxLE6ICcvbS8wOGw5NDEnLFxyXG4gIG90b2LDvHNkdXJha2xhcsSxOiAnL20vMDFqd18xJyxcclxuICB0cmFmaWtLb25pbGVyaTogJy9tLzAzc3k3dicsXHJcbiAgUGFya3NheWFjxLE6ICcvbS8wMTVxYnAnLFxyXG4gIG1lcmRpdmVubGVyOiAnL20vMDFseW5oJyxcclxuICBiYWNhbGFyOiAnL20vMDFqa180JyxcclxuICB0cmFrdMO2cmxlcjogJy9tLzAxM3hsbScsXHJcbiAgWWFuZ8Sxbm11c2x1xJ91OiAnL20vMDFwbnMwJyxcclxuXHJcbiAgVHJha3TDtnI6ICcvbS8wMTN4bG0nLFxyXG4gIFRyYWZpa2xhbWJhc8SxOiAnL20vMDE1cWZmJyxcclxuICBNb3Rvc2lrbGV0aW46ICcvbS8wNF9zdicsXHJcbiAgQmFjYTogJy9tLzAxamtfNCcsXHJcbiAgTWVyZGl2ZW46ICcvbS8wMWx5bmgnLFxyXG4gIERhxJ92ZXlhdGVwZTogJy9tLzA5ZF9yJyxcclxuICBQYWxtaXllYcSfYWPEsTogJy9tLzBjZGwxJyxcclxuICBZYXlhZ2XDp2lkaTogJy9tLzAxNHhjcycsXHJcbiAgS8O2cHLDvDogJy9tLzAxNWtyJyxcclxuICBUYWtzaTogJy9tLzBwZzUyJyxcclxuICBUZWtuZTogJy9tLzAxOWpkJyxcclxuICBPdG9iw7xzOiAnL20vMDFianYnLFxyXG4gIEJpc2lrbGV0OiAnL20vMDE5OWcnLFxyXG4gIE1vdG9zaWtsZXQ6ICcvbS8wNF9zdicsXHJcbiAgVGHFn8SxdDogJy9tLzBrNGonLFxyXG4gIEFyYWJhOiAnL20vMGs0aicsXHJcblxyXG4gIC8vIOaXpeivrVxyXG4gIOOCueODiOODg+ODl+OCteOCpOODszogJy9tLzAycHYxOScsXHJcbiAg6YGT6Lev5qiZ6K2YOiAnL20vMDFtcWR0JyxcclxuICDmpI3niak6ICcvbS8wNXMycycsXHJcbiAg5pyoOiAnL20vMDdqN3InLFxyXG4gIOiNiTogJy9tLzA4dDljXycsXHJcbiAg5L2O5pyoOiAnL20vMGdxYnQnLFxyXG4gIOOCq+OCr+OCv+OCuTogJy9tLzAyNV92JyxcclxuICDjg6Tjgrfjga7mnKg6ICcvbS8wY2RsMScsXHJcbiAg6Ieq54S2OiAnL20vMDVoMG4nLFxyXG4gIOa7nTogJy9tLzBqMmt4JyxcclxuICDlsbE6ICcvbS8wOWRfcicsXHJcbiAg5LiYOiAnL20vMDlkX3InLFxyXG4gIOawtOWfnzogJy9tLzAza3RtMScsXHJcbiAg5rKz5bedOiAnL20vMDZjbnAnLFxyXG4gIOODk+ODvOODgTogJy9tLzBiM3lyJyxcclxuICDlpKrpmb06ICcvbS8wNm1fcCcsXHJcbiAg5pyIOiAnL20vMDR3dl8nLFxyXG4gIOepujogJy9tLzAxYnF2cCcsXHJcbiAg6LuK5LihOiAnL20vMGs0aicsXHJcbiAg6Ieq5YuV6LuKOiAnL20vMGs0aicsXHJcbiAg6LuKOiAnL20vMGs0aicsXHJcbiAg6Ieq6Lui6LuKOiAnL20vMDE5OWcnLFxyXG4gIOOCquODvOODiOODkOOCpDogJy9tLzA0X3N2JyxcclxuICDjg5Tjg4Pjgq/jgqLjg4Pjg5fjg4jjg6njg4Pjgq86ICcvbS8wY3ZxMycsXHJcbiAg44Kz44Oe44O844K344Oj44Or44OI44Op44OD44KvOiAnL20vMGZrd2pnJyxcclxuICDjg5zjg7zjg4g6ICcvbS8wMTlqZCcsXHJcbiAg44Oq44Og44K444OzOiAnL20vMDFsY3c0JyxcclxuICDjgr/jgq/jgrfjg7w6ICcvbS8wcGc1MicsXHJcbiAg44K544Kv44O844Or44OQ44K5OiAnL20vMDJ5dmhqJyxcclxuICDjg5Djgrk6ICcvbS8wMWJqdicsXHJcbiAg5bu66Kit6LuK5LihOiAnL20vMDJneDE3JyxcclxuICDlvavlg486ICcvbS8wMTNfMWMnLFxyXG4gIOWZtOawtDogJy9tLzBoOGxoa2cnLFxyXG4gIOapizogJy9tLzAxNWtyJyxcclxuICDmqYvohJo6ICcvbS8wMXBocTQnLFxyXG4gIOi2hemrmOWxpOODk+ODqzogJy9tLzA3OWNsJyxcclxuICDmn7Hjgb7jgZ/jga/mn7E6ICcvbS8wMV9tNycsXHJcbiAg44K544OG44Oz44OJ44Kw44Op44K5OiAnL20vMDExeTIzJyxcclxuICDlrrY6ICcvbS8wM2ptNScsXHJcbiAg44Ki44OK44OR44O844OI44Oh44Oz44OI44OT44OrOiAnL20vMDFuYmx0JyxcclxuICDnga/lj7A6ICcvbS8wNGg3aCcsXHJcbiAg44Gn44KT44GX44KD44Gu44KK44GwOiAnL20vMHB5MjcnLFxyXG4gIOWwj+WxizogJy9tLzAxbjZmZCcsXHJcbiAg5raI54Gr5YmkOiAnL20vMDFwbnMwJyxcclxuICDjgqLjg5Pjg6vjg5zjg7zjg4k6ICcvbS8wMWtuamInLFxyXG4gIOmBk+i3rzogJy9tLzA2Z2ZqJyxcclxuICDmqKrmlq3mranpgZM6ICcvbS8wMTR4Y3MnLFxyXG4gIOS/oeWPt+apnzogJy9tLzAxNXFmZicsXHJcbiAg5Lqk6YCa54GvOiAnL20vMDE1cWZmJyxcclxuICDjgqzjg6zjg7zjgrjjg4njgqI6ICcvbS8wOGw5NDEnLFxyXG4gIOODkOOCueWBnDogJy9tLzAxandfMScsXHJcbiAg44OI44Op44OV44Kj44OD44Kv44Kz44O844OzOiAnL20vMDNzeTd2JyxcclxuICDjg5Hjg7zjgq3jg7PjgrDjg6Hjg7zjgr/jg7w6ICcvbS8wMTVxYnAnLFxyXG4gIOmajuautTogJy9tLzAxbHluaCcsXHJcbiAg54WZ56qBOiAnL20vMDFqa180JyxcclxuICDjg4jjg6njgq/jgr/jg7w6ICcvbS8wMTN4bG0nLFxyXG5cclxuICDlsbHjgoTkuJg6ICcvbS8wOWRfcicsXHJcblxyXG4gIC8vIOe5geS9k+S4reaWhzog5Y+w5rm+XHJcbiAg5YGc6LuK5qiZ6KqMOiAnL20vMDJwdjE5JyxcclxuICDot6/niYw6ICcvbS8wMW1xZHQnLFxyXG4gIOaoueacqDogJy9tLzA3ajdyJyxcclxuICDngYzmnKg6ICcvbS8wZ3FidCcsXHJcbiAg5LuZ5Lq65o6MOiAnL20vMDI1X3YnLFxyXG4gIOajlearmuaouTogJy9tLzBjZGwxJyxcclxuICDngJHluIM6ICcvbS8wajJreCcsXHJcbiAg6auY5bGx5oiW5bGx5LiYOiAnL20vMDlkX3InLFxyXG4gIOS4mOmZtTogJy9tLzA5ZF9yJyxcclxuICDmsLTpq5Q6ICcvbS8wM2t0bTEnLFxyXG4gIOays+a1gTogJy9tLzA2Y25wJyxcclxuICDmtbfngZg6ICcvbS8wYjN5cicsXHJcbiAg5pyI5LquOiAnL20vMDR3dl8nLFxyXG4gIOWkqeepujogJy9tLzAxYnF2cCcsXHJcbiAg6LuK6LybOiAnL20vMGs0aicsXHJcbiAg5rG96LuKOiAnL20vMGs0aicsXHJcbiAg6IWz6LiP6LuKOiAnL20vMDE5OWcnLFxyXG4gIOiHquihjOi7ijogJy9tLzAxOTlnJyxcclxuICDmqZ/ou4o6ICcvbS8wNF9zdicsXHJcbiAg5pGp5omY6LuKOiAnL20vMDRfc3YnLFxyXG4gIOearuWNoei7ijogJy9tLzBjdnEzJyxcclxuICDllYbnlKjljaHou4o6ICcvbS8wZmt3amcnLFxyXG4gIOiIuTogJy9tLzAxOWpkJyxcclxuICDosaroj6/ovY7ou4o6ICcvbS8wMWxjdzQnLFxyXG4gIOWHuuenn+i7ijogJy9tLzBwZzUyJyxcclxuICDmoKHou4o6ICcvbS8wMnl2aGonLFxyXG4gIOWFrOi7ijogJy9tLzAxYmp2JyxcclxuICDlhazlhbHmsb3ou4o6ICcvbS8wMWJqdicsXHJcbiAg5pa95bel6LuK6LybOiAnL20vMDJneDE3JyxcclxuICDpm5Xlg486ICcvbS8wMTNfMWMnLFxyXG4gIOWZtOaziTogJy9tLzBoOGxoa2cnLFxyXG4gIOapi+aigTogJy9tLzAxNWtyJyxcclxuICDnorzpoK06ICcvbS8wMXBocTQnLFxyXG4gIOaRqeWkqeWkp+aokzogJy9tLzA3OWNsJyxcclxuICDmn7HlrZDmiJbmn7HlrZA6ICcvbS8wMV9tNycsXHJcbiAg5b2p6Imy546755KDOiAnL20vMDExeTIzJyxcclxuICDmiL/lrZA6ICcvbS8wM2ptNScsXHJcbiAg5YWs5a+T5qiTOiAnL20vMDFuYmx0JyxcclxuICDnh4jloZQ6ICcvbS8wNGg3aCcsXHJcbiAg54Gr6LuK56uZOiAnL20vMHB5MjcnLFxyXG4gIOS4gOajmjogJy9tLzAxbjZmZCcsXHJcbiAg5raI6Ziy5qCTOiAnL20vMDFwbnMwJyxcclxuICDlu6PlkYrniYw6ICcvbS8wMWtuamInLFxyXG4gIOihjOS6uuepv+i2iumBkzogJy9tLzAxNHhjcycsXHJcbiAg5Lq66KGM5qmr6YGTOiAnL20vMDE0eGNzJyxcclxuICDntIXntqDnh4g6ICcvbS8wMTVxZmYnLFxyXG4gIOi7iuW6q+mWgDogJy9tLzA4bDk0MScsXHJcbiAg5be05aOr56uZOiAnL20vMDFqd18xJyxcclxuICDkuqTpgJrpjJA6ICcvbS8wM3N5N3YnLFxyXG4gIOWBnOi7iuWgtOioiOWDueihqDogJy9tLzAxNXFicCcsXHJcbiAg5qiT5qKvOiAnL20vMDFseW5oJyxcclxuICDnhZnlm6o6ICcvbS8wMWprXzQnLFxyXG4gIOaLluaLieapnzogJy9tLzAxM3hsbScsXHJcblxyXG4gIC8vIOe5geS9k+S4reaWh++8mummmea4r1xyXG4gIOmbu+WWrui7ijogJy9tLzA0X3N2JyxcclxuICDllq7ou4o6ICcvbS8wMTk5ZycsXHJcbiAg5be05aOrOiAnL20vMDFianYnLFxyXG4gIOWNgeWtl+i3r+WPozogJy9tLzAxNHhjcycsXHJcbiAg5Lqk6YCa54eIOiAnL20vMDE1cWZmJyxcclxuICDmlpHppqznt5o6ICcvbS8wMTR4Y3MnLFxyXG4gIOioiOeoi+i7ijogJy9tLzBwZzUyJyxcclxuICDnmoTlo6s6ICcvbS8wcGc1MicsXHJcbiAg6Ii56Zq7OiAnL20vMDE5amQnLFxyXG4gIOWxseWzsOaIluWxsTogJy9tLzA5ZF9yJyxcclxuICDmqYvmqJE6ICcvbS8wMTVrcicsXHJcblxyXG4gIC8vIOS/hOivrVxyXG4gICfRgdGC0L7Qvy3RgdC40LPQvdCw0LvRiyc6ICcvbS8wMnB2MTknLFxyXG4gICfQtNC+0YDQvtC20L3Ri9C1INC30L3QsNC60LgnOiAnL20vMDFtcWR0JyxcclxuICDRgNCw0YHRgtC10L3QuNGPOiAnL20vMDVzMnMnLFxyXG4gINC00LXRgNC10LLRjNGPOiAnL20vMDdqN3InLFxyXG4gINC60YPRgdGC0LDRgNC90LjQutC4OiAnL20vMGdxYnQnLFxyXG4gICfQv9Cw0LvRjNC80L7QstGL0LUg0LTQtdGA0LXQstGM0Y8nOiAnL20vMGNkbDEnLFxyXG4gINC/0YDQuNGA0L7QtNCwOiAnL20vMDVoMG4nLFxyXG4gINCy0L7QtNC+0L/QsNC00Ys6ICcvbS8wajJreCcsXHJcbiAg0YXQvtC70LzRizogJy9tLzA5ZF9yJyxcclxuICDQstC+0LTQvtC10LzRizogJy9tLzAza3RtMScsXHJcbiAg0YDQtdC60Lg6ICcvbS8wNmNucCcsXHJcbiAg0L/Qu9GP0LbQuDogJy9tLzBiM3lyJyxcclxuICDRgdC+0LvQvdGG0LU6ICcvbS8wNm1fcCcsXHJcbiAg0JvRg9C90LA6ICcvbS8wNHd2XycsXHJcbiAg0L3QtdCx0L46ICcvbS8wMWJxdnAnLFxyXG4gICfRgtGA0LDQvdGB0L/QvtGA0YLQvdGL0LUg0YHRgNC10LTRgdGC0LLQsCc6ICcvbS8wazRqJyxcclxuICDQvNCw0YjQuNC90Ys6ICcvbS8wazRqJyxcclxuICDQstC10LvQvtGB0LjQv9C10LTRizogJy9tLzAxOTlnJyxcclxuICDQvNC+0YLQvtGG0LjQutC70Ys6ICcvbS8wNF9zdicsXHJcbiAg0L/QuNC60LDQv9GLOiAnL20vMGN2cTMnLFxyXG4gICfQutC+0LzQvNC10YDRh9C10YHQutC40LUg0LPRgNGD0LfQvtCy0LjQutC4JzogJy9tLzBma3dqZycsXHJcbiAg0LvQvtC00LrQuDogJy9tLzAxOWpkJyxcclxuICDQu9C40LzRg9C30LjQvdGLOiAnL20vMDFsY3c0JyxcclxuICDQotCw0LrRgdC40YE6ICcvbS8wcGc1MicsXHJcbiAgJ9GI0LrQvtC70YzQvdGL0Lkg0LDQstGC0L7QsdGD0YEnOiAnL20vMDJ5dmhqJyxcclxuICDQsNCy0YLQvtCx0YPRgTogJy9tLzAxYmp2JyxcclxuICAn0YHRgtGA0L7QuNGC0LXQu9GM0L3QsNGPINC80LDRiNC40L3QsCc6ICcvbS8wMmd4MTcnLFxyXG4gINGB0YLQsNGC0YPQuDogJy9tLzAxM18xYycsXHJcbiAg0YTQvtC90YLQsNC90Ys6ICcvbS8waDhsaGtnJyxcclxuICDQv9C40YDRgTogJy9tLzAxcGhxNCcsXHJcbiAg0L3QtdCx0L7RgdC60YDQtdCxOiAnL20vMDc5Y2wnLFxyXG4gICfRgdGC0L7Qu9Cx0YvQuNC70Lgg0LrQvtC70L7QvdC90YsnOiAnL20vMDFfbTcnLFxyXG4gINCy0LjRgtGA0LDQtjogJy9tLzAxMXkyMycsXHJcbiAgJ9C80L3QvtCz0L7QutCy0LDRgNGC0LjRgNC90YvQuSDQtNC+0LwnOiAnL20vMDFuYmx0JyxcclxuICAn0YHQstC10YLQu9GL0Lkg0LTQvtC8JzogJy9tLzA0aDdoJyxcclxuICAn0LbQtdC70LXQt9C90L7QtNC+0YDQvtC20L3QsNGPINGB0YLQsNC90YbQuNGPJzogJy9tLzBweTI3JyxcclxuICDQv9C10L/QtdC70YzQvdGL0Lk6ICcvbS8wMW42ZmQnLFxyXG4gICfQv9C+0LbQsNGA0L3Ri9C5INCz0LjQtNGA0LDQvdGCJzogJy9tLzAxcG5zMCcsXHJcbiAgJ9GA0LXQutC70LDQvNC90YvQuSDRidC40YInOiAnL20vMDFrbmpiJyxcclxuICDQtNC+0YDQvtCz0Lg6ICcvbS8wNmdmaicsXHJcbiAgJ9C/0LXRiNC10YXQvtC00L3Ri9C1INC/0LXRgNC10YXQvtC00YsnOiAnL20vMDE0eGNzJyxcclxuICDRgdCy0LXRgtC+0YTQvtGAOiAnL20vMDE1cWZmJyxcclxuICAn0LPQsNGA0LDQttC90YvQtSDQstC+0YDQvtGC0LAnOiAnL20vMDhsOTQxJyxcclxuICAn0LDQstGC0L7QsdGD0YHQvdGL0LUg0L7RgdGC0LDQvdC+0LLQutC4JzogJy9tLzAxandfMScsXHJcbiAg0LrQvtC90YPRgdGLOiAnL20vMDNzeTd2JyxcclxuICAn0L/QsNGA0LrQvtCy0L7Rh9C90YvQtSDRgdGH0LXRgtGH0LjQutC4JzogJy9tLzAxNXFicCcsXHJcbiAg0LvQtdGB0YLQvdC40YbQsDogJy9tLzAxbHluaCcsXHJcbiAg0LTRi9C80L7RhdC+0LTRizogJy9tLzAxamtfNCcsXHJcbiAg0YLRgNCw0LrRgtC+0YDRizogJy9tLzAxM3hsbScsXHJcblxyXG4gINCw0LLRgtC+0LzQvtCx0LjQu9C4OiAnL20vMGs0aicsXHJcbiAg0LPQvtGA0YvQuNC70LjRhdC+0LvQvNGLOiAnL20vMDlkX3InLFxyXG4gINGB0LLQtdGC0L7RhNC+0YDRizogJy9tLzAxNXFmZicsXHJcbiAg0YLRgNCw0L3RgdC/0L7RgNGC0L3Ri9C10YHRgNC10LTRgdGC0LLQsDogJy9tLzBrNGonLFxyXG4gINC/0LXRiNC10YXQvtC00L3Ri9C10L/QtdGA0LXRhdC+0LTRizogJy9tLzAxNHhjcycsXHJcbiAg0L/QvtC20LDRgNC90YvQtdCz0LjQtNGA0LDQvdGC0Ys6ICcvbS8wMXBuczAnLFxyXG4gINC70LXRgdGC0L3QuNGG0Ys6ICcvbS8wMWx5bmgnLFxyXG4gINCz0LjQtNGA0LDQvdGC0LDQvNC4OiAnL20vMDFwbnMwJyxcclxuICDQsNCy0YLQvtCx0YPRgdGLOiAnL20vMDFianYnLFxyXG4gINC00YvQvNC+0LLRi9C10YLRgNGD0LHRizogJy9tLzAxamtfNCcsXHJcbiAg0YLRgNCw0LrRgtC+0YDQsDogJy9tLzAxM3hsbScsXHJcbiAg0YLQsNC60YHQuDogJy9tLzBwZzUyJyxcclxuICDQvNC+0YHRgtCw0LzQuDogJy9tLzAxNWtyJyxcclxuXHJcbiAgLy8g5LmM5YWL5YWw6K+tXHJcbiAg0LPQvtGA0LjRh9C40L/QsNCz0L7RgNCx0Lg6ICcvbS8wOWRfcicsXHJcbiAg0LfQvdCw0LrQuNC30YPQv9C40L3QutC4OiAnL20vMDJwdjE5JyxcclxuICDQtNC+0YDQvtC20L3RltC30L3QsNC60Lg6ICcvbS8wMW1xZHQnLFxyXG4gINGA0L7RgdC70LjQvdC4OiAnL20vMDVzMnMnLFxyXG4gINC00LXRgNC10LLQsDogJy9tLzA3ajdyJyxcclxuICDRh9Cw0LPQsNGA0L3QuNC60Lg6ICcvbS8wZ3FidCcsXHJcbiAg0L/QsNC70YzQvNC+0LLRltC00LXRgNC10LLQsDogJy9tLzBjZGwxJyxcclxuICDQstC+0LTQvtGB0L/QsNC00Lg6ICcvbS8wajJreCcsXHJcbiAg0LPQvtGA0Lg6ICcvbS8wOWRfcicsXHJcbiAg0L/QsNCz0L7RgNCx0Lg6ICcvbS8wOWRfcicsXHJcbiAg0LLQvtC00L7QudC80Lg6ICcvbS8wM2t0bTEnLFxyXG4gINGA0ZbRh9C60Lg6ICcvbS8wNmNucCcsXHJcbiAg0L/Qu9GP0LbRljogJy9tLzBiM3lyJyxcclxuICDRgdC+0L3RhtC1OiAnL20vMDZtX3AnLFxyXG4gINCc0ZbRgdGP0YbRjDogJy9tLzA0d3ZfJyxcclxuICDQvdC10LHQvjogJy9tLzAxYnF2cCcsXHJcbiAg0YLRgNCw0L3RgdC/0L7RgNGC0L3RltC30LDRgdC+0LHQuDogJy9tLzBrNGonLFxyXG4gINCw0LLRgtC+0LzQvtCx0ZbQu9GW0LI6ICcvbS8wazRqJyxcclxuICDQstC10LvQvtGB0LjQv9C10LTQuDogJy9tLzAxOTlnJyxcclxuICDQvNC+0YLQvtGG0LjQutC70Lg6ICcvbS8wNF9zdicsXHJcbiAg0L/RltC60LDQv9C4OiAnL20vMGN2cTMnLFxyXG4gINC60L7QvNC10YDRhtGW0LnQvdGW0LLQsNC90YLQsNC20ZbQstC60Lg6ICcvbS8wZmt3amcnLFxyXG4gINGH0L7QstC90Lg6ICcvbS8wMTlqZCcsXHJcbiAg0LvRltC80YPQt9C40L3QuDogJy9tLzAxbGN3NCcsXHJcbiAg0YLQsNC60YHRljogJy9tLzBwZzUyJyxcclxuICDRiNC60ZbQu9GM0L3QuNC50LDQstGC0L7QsdGD0YE6ICcvbS8wMnl2aGonLFxyXG4gINCw0LLRgtC+0LHRg9GBOiAnL20vMDFianYnLFxyXG4gINCx0YPQtNGW0LLQtdC70YzQvdC40LnQsNCy0YLQvtC80L7QsdGW0LvRjDogJy9tLzAyZ3gxNycsXHJcbiAg0YHRgtCw0YLRg9GXOiAnL20vMDEzXzFjJyxcclxuICDRhNC+0L3RgtCw0L3QuDogJy9tLzBoOGxoa2cnLFxyXG4gINC80ZbRgdGCOiAnL20vMDE1a3InLFxyXG4gINC/0YDQuNGB0YLQsNC90Yw6ICcvbS8wMXBocTQnLFxyXG4gINGF0LzQsNGA0L7Rh9C+0YE6ICcvbS8wNzljbCcsXHJcbiAg0YHRgtC+0LLQv9C40LDQsdC+0LrQvtC70L7QvdC4OiAnL20vMDFfbTcnLFxyXG4gINCy0ZbRgtGA0LDQttC90LXRgdC60LvQvjogJy9tLzAxMXkyMycsXHJcbiAg0LHRg9C00LjQvdC+0Lo6ICcvbS8wM2ptNScsXHJcbiAg0LHQsNCz0LDRgtC+0LrQstCw0YDRgtC40YDQvdC40LnQsdGD0LTQuNC90L7QujogJy9tLzAxbmJsdCcsXHJcbiAg0YHQstGW0YLQu9C40LnQsdGD0LTQuNC90L7QujogJy9tLzA0aDdoJyxcclxuICDQt9Cw0LvRltC30L3QuNGH0L3QsNGB0YLQsNC90YbRltGPOiAnL20vMHB5MjcnLFxyXG4gINC/0L7Qv9GW0Ls6ICcvbS8wMW42ZmQnLFxyXG4gINCy0L7Qs9C90LXQs9GW0LTRgNCw0L3RgjogJy9tLzAxcG5zMCcsXHJcbiAg0LHRltC70LHQvtGA0LQ6ICcvbS8wMWtuamInLFxyXG4gINC00L7RgNC+0LPQuDogJy9tLzA2Z2ZqJyxcclxuICDQv9GW0YjQvtGF0ZbQtNC90ZbQv9C10YDQtdGF0L7QtNC4OiAnL20vMDE0eGNzJyxcclxuICDRgdCy0ZbRgtC70L7RhNC+0YA6ICcvbS8wMTVxZmYnLFxyXG4gINCz0LDRgNCw0LbQvdGW0LTQstC10YDRljogJy9tLzA4bDk0MScsXHJcbiAg0LDQstGC0L7QsdGD0YHQvdGW0LfRg9C/0LjQvdC60Lg6ICcvbS8wMWp3XzEnLFxyXG4gINGC0YDQsNC90YHQv9C+0YDRgtC90ZbQutC+0L3Rg9GB0Lg6ICcvbS8wM3N5N3YnLFxyXG4gINC/0LDRgNC60L7QvNCw0YLQuDogJy9tLzAxNXFicCcsXHJcbiAg0YHRhdC+0LTQuDogJy9tLzAxbHluaCcsXHJcbiAg0LTQuNC80LDRgNGWOiAnL20vMDFqa180JyxcclxuICDRgtGA0LDQutGC0L7RgNC4OiAnL20vMDEzeGxtJyxcclxuXHJcbiAg0LDQstGC0L7QvNC+0LHRltC70ZY6ICcvbS8wazRqJyxcclxuICDQs9C+0YDQuNGH0LjQv9Cw0LPQvtGA0LHQuDogJy9tLzA5ZF9yJyxcclxuICDRgtGA0LDQvdGB0L/QvtGA0YLQvdGW0LfQsNGB0L7QsdC4OiAnL20vMGs0aicsXHJcbiAg0LrQvtC80LjQvdC4OiAnL20vMDFqa180JyxcclxuICDQv9GW0YjQvtGF0ZbQtNC90ZbQv9C10YDQtdGF0L7QtNC4OiAnL20vMDE0eGNzJyxcclxuICDRgdCy0ZbRgtC70L7RhNC+0YDQuDogJy9tLzAxNXFmZicsXHJcbiAg0LzQvtGB0YLQuDogJy9tLzAxNWtyJyxcclxuICDQv9C+0LbQtdC20L3QuNC50LPRltC00YDQsNC90YI6ICcvbS8wMXBuczAnLFxyXG4gINC/0LDQu9GM0LzQuDogJy9tLzBjZGwxJyxcclxuICDQsNCy0YLQvtCx0YPRgdC4OiAnL20vMDFianYnLFxyXG4gINGB0YPQtNC90LA6ICcvbS8wMTlqZCcsXHJcbiAg0L/QvtC20LXQttC90ZbQs9GW0LTRgNCw0L3RgtC4OiAnL20vMDFwbnMwJyxcclxuXHJcbiAgLy8g6KW/54+t54mZ6K+tXHJcbiAgbW9udGHDsWFzb2NvbGluYXM6ICcvbS8wOWRfcicsXHJcbiAgc2XDsWFsZXNkZWFsdG86ICcvbS8wMnB2MTknLFxyXG4gIFNlw7FhbGVzZGV0cmFuc2l0bzogJy9tLzAxbXFkdCcsXHJcbiAgcGxhbnRhczogJy9tLzA1czJzJyxcclxuICDDoXJib2xlczogJy9tLzA3ajdyJyxcclxuICBjw6lzcGVkOiAnL20vMDh0OWNfJyxcclxuICBhcmJ1c3RvczogJy9tLzBncWJ0JyxcclxuICBjYWN0dXM6ICcvbS8wMjVfdicsXHJcbiAgcGFsbWVyYXM6ICcvbS8wY2RsMScsXHJcbiAgbmF0dXJhbGV6YTogJy9tLzA1aDBuJyxcclxuICBjYXNjYWRhczogJy9tLzBqMmt4JyxcclxuICBtb250YcOxYXM6ICcvbS8wOWRfcicsXHJcbiAgc2llcnJhczogJy9tLzA5ZF9yJyxcclxuICBjdWVycG9zZGVhZ3VhOiAnL20vMDNrdG0xJyxcclxuICByw61vczogJy9tLzA2Y25wJyxcclxuICBwbGF5YXM6ICcvbS8wYjN5cicsXHJcbiAgc29sOiAnL20vMDZtX3AnLFxyXG4gIEx1bmE6ICcvbS8wNHd2XycsXHJcbiAgY2llbG86ICcvbS8wMWJxdnAnLFxyXG4gIHZlaMOtY3Vsb3M6ICcvbS8wazRqJyxcclxuICBjb2NoZXM6ICcvbS8wazRqJyxcclxuICBiaWNpY2xldGFzOiAnL20vMDE5OWcnLFxyXG4gIG1vdG9jaWNsZXRhczogJy9tLzA0X3N2JyxcclxuICBjYW1pb25ldGFzOiAnL20vMGN2cTMnLFxyXG4gIGNhbWlvbmVzY29tZXJjaWFsZXM6ICcvbS8wZmt3amcnLFxyXG4gIGJhcmNvczogJy9tLzAxOWpkJyxcclxuICBsaW11c2luYXM6ICcvbS8wMWxjdzQnLFxyXG4gIFRheGlzOiAnL20vMHBnNTInLFxyXG4gIGF1dG9iw7pzZXNjb2xhcjogJy9tLzAyeXZoaicsXHJcbiAgYXV0b2LDunM6ICcvbS8wMWJqdicsXHJcbiAgdmVow61jdWxvZGVjb25zdHJ1Y2Npw7NuOiAnL20vMDJneDE3JyxcclxuICBlc3RhdHVhczogJy9tLzAxM18xYycsXHJcbiAgZnVlbnRlczogJy9tLzBoOGxoa2cnLFxyXG4gIHB1ZW50ZTogJy9tLzAxNWtyJyxcclxuICBtdWVsbGU6ICcvbS8wMXBocTQnLFxyXG4gIHJhc2NhY2llbG9zOiAnL20vMDc5Y2wnLFxyXG4gIHBpbGFyZXNvY29sdW1uYXM6ICcvbS8wMV9tNycsXHJcbiAgVml0cmFsOiAnL20vMDExeTIzJyxcclxuICBjYXNhOiAnL20vMDNqbTUnLFxyXG4gIFVuZWRpZmljaW9kZWFwYXJ0YW1lbnRvczogJy9tLzAxbmJsdCcsXHJcbiAgY2FzYWxpZ2VyYTogJy9tLzA0aDdoJyxcclxuICBlc3RhY2nDs25kZXRyZW46ICcvbS8wcHkyNycsXHJcbiAgY2VuaXphczogJy9tLzAxbjZmZCcsXHJcbiAgdW5hYm9jYWRlaW5jZW5kaW9zOiAnL20vMDFwbnMwJyxcclxuICBjYXJ0ZWxlcmE6ICcvbS8wMWtuamInLFxyXG4gIGNhcnJldGVyYXM6ICcvbS8wNmdmaicsXHJcbiAgY3J1Y2VzZGVwZWF0b25lczogJy9tLzAxNHhjcycsXHJcbiAgc2Vtw6Fmb3JvczogJy9tLzAxNXFmZicsXHJcbiAgcHVlcnRhc2RlZ2FyYWplOiAnL20vMDhsOTQxJyxcclxuICBwYXJhZGFzZGVhdXRvYnVzOiAnL20vMDFqd18xJyxcclxuICBjb25vc2RldHLDoWZpY286ICcvbS8wM3N5N3YnLFxyXG4gIHBhcnF1w61tZXRyb3M6ICcvbS8wMTVxYnAnLFxyXG4gIGVzY2FsZXJhOiAnL20vMDFseW5oJyxcclxuICBjaGltZW5lYXM6ICcvbS8wMWprXzQnLFxyXG4gIHRyYWN0b3JlczogJy9tLzAxM3hsbScsXHJcblxyXG4gIHBhc29zZGVwZWF0b25lczogJy9tLzAxNHhjcycsXHJcbiAgYXV0b2J1c2VzOiAnL20vMDFianYnLFxyXG4gIHB1ZW50ZXM6ICcvbS8wMTVrcicsXHJcbiAgZXNjYWxlcmFzOiAnL20vMDFseW5oJyxcclxuICBib2Nhc2RlaW5jZW5kaW9zOiAnL20vMDFwbnMwJyxcclxuXHJcbiAgLy8g5rOV6K+tXHJcbiAgbW9udGFnbmVzb3Vjb2xsaW5lczogJy9tLzA5ZF9yJyxcclxuICBcInBhbm5lYXV4ZCdhcnLDqnRcIjogJy9tLzAycHYxOScsXHJcbiAgcGFubmVhdXhkZXNpZ25hbGlzYXRpb246ICcvbS8wMW1xZHQnLFxyXG4gIGxlc3BsYW50ZXM6ICcvbS8wNXMycycsXHJcbiAgZGVzYXJicmVzOiAnL20vMDdqN3InLFxyXG4gIGdhem9uOiAnL20vMDh0OWNfJyxcclxuICBhcmJ1c3RlczogJy9tLzBncWJ0JyxcclxuICBjYWN0dXM6ICcvbS8wMjVfdicsXHJcbiAgcGFsbWllcnM6ICcvbS8wY2RsMScsXHJcbiAgbGFuYXR1cmU6ICcvbS8wNWgwbicsXHJcbiAgY2FzY2FkZXM6ICcvbS8wajJreCcsXHJcbiAgbW9udGFnbmVzOiAnL20vMDlkX3InLFxyXG4gIGNvbGxpbmVzOiAnL20vMDlkX3InLFxyXG4gIFwiY29ycHNkJ2VhdVwiOiAnL20vMDNrdG0xJyxcclxuICByaXZpw6hyZXM6ICcvbS8wNmNucCcsXHJcbiAgZGVzcGxhZ2VzOiAnL20vMGIzeXInLFxyXG4gIHNvbGVpbDogJy9tLzA2bV9wJyxcclxuICBMdW5lOiAnL20vMDR3dl8nLFxyXG4gIGNpZWw6ICcvbS8wMWJxdnAnLFxyXG4gIFbDqWhpY3VsZXM6ICcvbS8wazRqJyxcclxuICB2b2l0dXJlczogJy9tLzBrNGonLFxyXG4gIFbDqWxvczogJy9tLzAxOTlnJyxcclxuICBtb3RvY3ljbGV0dGVzOiAnL20vMDRfc3YnLFxyXG4gIGNhbWlvbm5ldHRlczogJy9tLzBjdnEzJyxcclxuICBjYW1pb25zY29tbWVyY2lhdXg6ICcvbS8wZmt3amcnLFxyXG4gIGJhdGVhdXg6ICcvbS8wMTlqZCcsXHJcbiAgbGltb3VzaW5lczogJy9tLzAxbGN3NCcsXHJcbiAgVGF4aXM6ICcvbS8wcGc1MicsXHJcbiAgYnVzc2NvbGFpcmU6ICcvbS8wMnl2aGonLFxyXG4gIGJ1czogJy9tLzAxYmp2JyxcclxuICB2w6loaWN1bGVkZWNvbnN0cnVjdGlvbjogJy9tLzAyZ3gxNycsXHJcbiAgc3RhdHVlczogJy9tLzAxM18xYycsXHJcbiAgZm9udGFpbmVzOiAnL20vMGg4bGhrZycsXHJcbiAgcG9udDogJy9tLzAxNWtyJyxcclxuICBqZXTDqWU6ICcvbS8wMXBocTQnLFxyXG4gICdncmF0dGUtY2llbCc6ICcvbS8wNzljbCcsXHJcbiAgcGlsaWVyc291Y29sb25uZXM6ICcvbS8wMV9tNycsXHJcbiAgdml0cmFpbDogJy9tLzAxMXkyMycsXHJcbiAgbG9nZXI6ICcvbS8wM2ptNScsXHJcbiAgdW5pbW1ldWJsZTogJy9tLzAxbmJsdCcsXHJcbiAgbWFpc29ubHVtaW5ldXNlOiAnL20vMDRoN2gnLFxyXG4gIGdhcmU6ICcvbS8wcHkyNycsXHJcbiAgZW5jZW5kcmVzOiAnL20vMDFuNmZkJyxcclxuICBcInVuZWJvdWNoZWQnaW5jZW5kaWVcIjogJy9tLzAxcG5zMCcsXHJcbiAgXCJ1bnBhbm5lYXVkJ2FmZmljaGFnZVwiOiAnL20vMDFrbmpiJyxcclxuICByb3V0ZXM6ICcvbS8wNmdmaicsXHJcbiAgcGFzc2FnZXNwb3VycGnDqXRvbnM6ICcvbS8wMTR4Y3MnLFxyXG4gIGZldXhkZWNpcmN1bGF0aW9uOiAnL20vMDE1cWZmJyxcclxuICBwb3J0ZXNkZWdhcmFnZTogJy9tLzA4bDk0MScsXHJcbiAgXCJhcnLDqnRzZCdhdXRvYnVzXCI6ICcvbS8wMWp3XzEnLFxyXG4gIGPDtG5lc2Rlc2lnbmFsaXNhdGlvbjogJy9tLzAzc3k3dicsXHJcbiAgcGFyY29tw6h0cmVzOiAnL20vMDE1cWJwJyxcclxuICBlc2NhbGllcnM6ICcvbS8wMWx5bmgnLFxyXG4gIGNoZW1pbsOpZXM6ICcvbS8wMWprXzQnLFxyXG4gIHRyYWN0ZXVyczogJy9tLzAxM3hsbScsXHJcblxyXG4gIHbDqWhpY3VsZXM6ICcvbS8wazRqJyxcclxuICBcImJvdWNoZXNkJ2luY2VuZGllXCI6ICcvbS8wMXBuczAnLFxyXG4gIHbDqWxvczogJy9tLzAxOTlnJyxcclxuICBwb250czogJy9tLzAxNWtyJyxcclxuICBcImJvcm5lZCdpbmNlbmRpZVwiOiAnL20vMDFwbnMwJyxcclxuICBtb3RvczogJy9tLzA0X3N2JyxcclxuXHJcbiAgLy8g5b636K+tXHJcbiAgQmVyZ2VvZGVySMO8Z2VsOiAnL20vMDlkX3InLFxyXG4gIFN0b3BwU2NoaWxkZXI6ICcvbS8wMnB2MTknLFxyXG4gIFN0cmHDn2Vuc2NoaWxkZXI6ICcvbS8wMW1xZHQnLFxyXG4gIFBmbGFuemVuOiAnL20vMDVzMnMnLFxyXG4gIELDpHVtZTogJy9tLzA3ajdyJyxcclxuICBHcmFzOiAnL20vMDh0OWNfJyxcclxuICBTdHLDpHVjaGVyOiAnL20vMGdxYnQnLFxyXG4gIEtha3R1czogJy9tLzAyNV92JyxcclxuICBQYWxtZW46ICcvbS8wY2RsMScsXHJcbiAgTmF0dXI6ICcvbS8wNWgwbicsXHJcbiAgV2Fzc2VyZsOkbGxlOiAnL20vMGoya3gnLFxyXG4gIEJlcmdlOiAnL20vMDlkX3InLFxyXG4gIEjDvGdlbDogJy9tLzA5ZF9yJyxcclxuICBXYXNzZXJrw7ZycGVyOiAnL20vMDNrdG0xJyxcclxuICBGbMO8c3NlOiAnL20vMDZjbnAnLFxyXG4gIFN0csOkbmRlOiAnL20vMGIzeXInLFxyXG4gIFNvbm5lOiAnL20vMDZtX3AnLFxyXG4gIE1vbmQ6ICcvbS8wNHd2XycsXHJcbiAgSGltbWVsOiAnL20vMDFicXZwJyxcclxuICBGYWhyemV1Z2U6ICcvbS8wazRqJyxcclxuICBBdXRvczogJy9tLzBrNGonLFxyXG4gIEZhaHJyw6RkZXI6ICcvbS8wMTk5ZycsXHJcbiAgTW90b3Jyw6RkZXI6ICcvbS8wNF9zdicsXHJcbiAgUGlja3VwczogJy9tLzBjdnEzJyxcclxuICBOdXR6ZmFocnpldWdlOiAnL20vMGZrd2pnJyxcclxuICBCb290ZTogJy9tLzAxOWpkJyxcclxuICBMaW1vdXNpbmVuOiAnL20vMDFsY3c0JyxcclxuICBUYXhlbjogJy9tLzBwZzUyJyxcclxuICBTY2h1bGJ1czogJy9tLzAyeXZoaicsXHJcbiAgQnVzOiAnL20vMDFianYnLFxyXG4gIEJhdWZhaHJ6ZXVnOiAnL20vMDJneDE3JyxcclxuICBTdGF0dWVuOiAnL20vMDEzXzFjJyxcclxuICBCcnVubmVuOiAnL20vMGg4bGhrZycsXHJcbiAgQnLDvGNrZTogJy9tLzAxNWtyJyxcclxuICBTZWVicsO8Y2tlOiAnL20vMDFwaHE0JyxcclxuICBXb2xrZW5rcmF0emVyOiAnL20vMDc5Y2wnLFxyXG4gIFPDpHVsZW5vZGVyU8OkdWxlbjogJy9tLzAxX203JyxcclxuICBCdW50Z2xhczogJy9tLzAxMXkyMycsXHJcbiAgSGF1czogJy9tLzAzam01JyxcclxuICBlaW5Xb2huaGF1czogJy9tLzAxbmJsdCcsXHJcbiAgTGV1Y2h0dHVybTogJy9tLzA0aDdoJyxcclxuICBCYWhuaG9mOiAnL20vMHB5MjcnLFxyXG4gIGVpblNjaHVwcGVuOiAnL20vMDFuNmZkJyxcclxuICBlaW5IeWRyYW50OiAnL20vMDFwbnMwJyxcclxuICBlaW5lV2VyYmV0YWZlbDogJy9tLzAxa25qYicsXHJcbiAgU3RyYcOfZW46ICcvbS8wNmdmaicsXHJcbiAgWmVicmFzdHJlaWZlbjogJy9tLzAxNHhjcycsXHJcbiAgQW1wZWxuOiAnL20vMDE1cWZmJyxcclxuICBHYXJhZ2VudG9yZTogJy9tLzA4bDk0MScsXHJcbiAgQnVzaGFsdGVzdGVsbGVuOiAnL20vMDFqd18xJyxcclxuICBMZWl0a2VnZWw6ICcvbS8wM3N5N3YnLFxyXG4gIFBhcmt1aHJlbjogJy9tLzAxNXFicCcsXHJcbiAgVHJlcHBlOiAnL20vMDFseW5oJyxcclxuICBTY2hvcm5zdGVpbmU6ICcvbS8wMWprXzQnLFxyXG4gIFRyYWt0b3JlbjogJy9tLzAxM3hsbScsXHJcblxyXG4gICdUcmVwcGVuKHN0dWZlbiknOiAnL20vMDFseW5oJyxcclxuICBCZXJnZW5vZGVySMO8Z2VsbjogJy9tLzA5ZF9yJyxcclxuICBGYWhyemV1Z2VuOiAnL20vMGs0aicsXHJcbiAgSHlkcmFudGVuOiAnL20vMDFwbnMwJyxcclxuICBad2VpcsOkZGVybjogJy9tLzA0X3N2JyxcclxuICBGYWhycsOkZGVybjogJy9tLzAxOTlnJyxcclxuICBGdcOfZ8OkbmdlcsO8YmVyd2VnZW46ICcvbS8wMTR4Y3MnLFxyXG4gIFBrd3M6ICcvbS8wazRqJyxcclxuICBTY2hvcm5zdGVpbmVuOiAnL20vMDFqa180JyxcclxuICBNb3RvcnLDpGRlcm46ICcvbS8wNF9zdicsXHJcbiAgQnVzc2VuOiAnL20vMDFianYnLFxyXG4gIEJyw7xja2VuOiAnL20vMDE1a3InLFxyXG4gIEJvb3RlbjogJy9tLzAxOWpkJyxcclxuICBGZXVlcmh5ZHJhbnRlbjogJy9tLzAxcG5zMCcsXHJcblxyXG4gIC8vIOmYv+aLieS8r+ivrVxyXG4gINin2YTYrNio2KfZhNij2YjYp9mE2KrZhNin2YQ6ICcvbS8wOWRfcicsXHJcbiAg2LnZhNin2YXYp9iq2KfZhNiq2YjZgtmBOiAnL20vMDJwdjE5JyxcclxuICDZhNin2YHYqtin2KrYp9mE2LTZiNin2LHYuTogJy9tLzAxbXFkdCcsXHJcbiAg2KfZhNmG2KjYp9iq2KfYqjogJy9tLzA1czJzJyxcclxuICDYp9mE2KPYtNis2KfYsTogJy9tLzA3ajdyJyxcclxuICDYudi02Kg6ICcvbS8wOHQ5Y18nLFxyXG4gINin2YTYtNis2YrYsdin2Ko6ICcvbS8wZ3FidCcsXHJcbiAg2LXYqNin2LE6ICcvbS8wMjVfdicsXHJcbiAg2KPYtNis2KfYsdin2YTZhtiu2YrZhDogJy9tLzBjZGwxJyxcclxuICDYt9io2YrYudip2LPYrNmK2Kk6ICcvbS8wNWgwbicsXHJcbiAg2KfZhNi02YTYp9mE2KfYqjogJy9tLzBqMmt4JyxcclxuICDYp9mE2KzYqNin2YQ6ICcvbS8wOWRfcicsXHJcbiAg2KfZhNiq2YTYp9mEOiAnL20vMDlkX3InLFxyXG4gINin2YTZhdiz2LfYrdin2KrYp9mE2YXYp9im2YrYqTogJy9tLzAza3RtMScsXHJcbiAg2KfZhNij2YbZh9in2LE6ICcvbS8wNmNucCcsXHJcbiAg2KfZhNi02YjYp9i32KY6ICcvbS8wYjN5cicsXHJcbiAg2KfZhNi02YXYszogJy9tLzA2bV9wJyxcclxuICDYp9mE2YLZhdixOiAnL20vMDR3dl8nLFxyXG4gINiz2YXYp9ihOiAnL20vMDFicXZwJyxcclxuICDZhdix2YPYqNin2Ko6ICcvbS8wazRqJyxcclxuICDYs9mK2KfYsdin2Ko6ICcvbS8wazRqJyxcclxuICDYr9ix2KfYrNin2Ko6ICcvbS8wMTk5ZycsXHJcbiAg2K/Ysdin2KzYp9iq2YbYp9ix2YrYqTogJy9tLzA0X3N2JyxcclxuICDYtNin2K3Zhtin2KrYtdi62YrYsdipOiAnL20vMGN2cTMnLFxyXG4gINi02KfYrdmG2KfYqtiq2KzYp9ix2YrYqTogJy9tLzBma3dqZycsXHJcbiAg2KfZhNmC2YjYp9ix2Kg6ICcvbS8wMTlqZCcsXHJcbiAg2LPZitin2LHYp9iq2KfZhNmE2YrZhdmI2LLZitmGOiAnL20vMDFsY3c0JyxcclxuICDYs9mK2KfYsdin2KrYp9mE2KPYrNix2Kk6ICcvbS8wcGc1MicsXHJcbiAg2KjYp9i12KfZhNmF2K/Ysdiz2Kk6ICcvbS8wMnl2aGonLFxyXG4gINij2YjYqtmI2KjZitizOiAnL20vMDFianYnLFxyXG4gINmF2LHZg9io2KnYp9mE2KjZhtin2KE6ICcvbS8wMmd4MTcnLFxyXG4gINiq2YXYp9ir2YrZhDogJy9tLzAxM18xYycsXHJcbiAg2YbZiNin2YHZitixOiAnL20vMGg4bGhrZycsXHJcbiAg2YPZiNio2LHZijogJy9tLzAxNWtyJyxcclxuICDYsdi12YrZgdio2K3YsdmKOiAnL20vMDFwaHE0JyxcclxuICDZhtin2LfYrdip2LPYrdin2Kg6ICcvbS8wNzljbCcsXHJcbiAg2KPYudmF2K/Yqdin2YTYo9i52YXYr9ipOiAnL20vMDFfbTcnLFxyXG4gINiy2KzYp9is2YXZhNmI2YY6ICcvbS8wMTF5MjMnLFxyXG4gINio2YrYqjogJy9tLzAzam01JyxcclxuICDZhdio2YbZidiz2YPZhtmKOiAnL20vMDFuYmx0JyxcclxuICDZhdmG2KfYsdipOiAnL20vMDRoN2gnLFxyXG4gINmF2K3Yt9ip2KfZhNmC2LfYp9ixOiAnL20vMHB5MjcnLFxyXG4gINij2LTZitivOiAnL20vMDFuNmZkJyxcclxuICDYt9mB2KfZitip2K3YsdmK2YI6ICcvbS8wMXBuczAnLFxyXG4gIGFiaWxsYm9hcmQ6ICcvbS8wMWtuamInLFxyXG4gINin2YTYt9ix2YI6ICcvbS8wNmdmaicsXHJcbiAg2YXZhdix2KfYqtin2YTZhdi02KfYqTogJy9tLzAxNHhjcycsXHJcbiAg2KXYtNin2LHYp9iq2KfZhNmF2LHZiNixOiAnL20vMDE1cWZmJyxcclxuICDZhdix2KLYqDogJy9tLzA4bDk0MScsXHJcbiAg2YXYrdi32KfYqtin2YTYrdin2YHZhNin2Ko6ICcvbS8wMWp3XzEnLFxyXG4gINin2YTYo9mC2YXYp9i52KfZhNmF2LHZiNix2YrYqTogJy9tLzAzc3k3dicsXHJcbiAg2LnYr9in2K/Yp9iq2YXZiNin2YLZgdin2YTYs9mK2KfYsdin2Ko6ICcvbS8wMTVxYnAnLFxyXG4gINiv2LHYrDogJy9tLzAxbHluaCcsXHJcbiAg2YXYr9in2K7ZhjogJy9tLzAxamtfNCcsXHJcbiAg2KfZhNis2LHYp9ix2KfYqjogJy9tLzAxM3hsbScsXHJcblxyXG4gINi12YbYp9io2YrYsdil2LfZgdin2KHYrdix2KfYptmCOiAnL20vMDFwbnMwJyxcclxuICDYpdi02KfYsdin2KrZhdix2YjYsTogJy9tLzAxNXFmZicsXHJcbiAg2K3Yp9mB2YTYqTogJy9tLzAxYmp2JyxcclxuICDYr9ix2ZHYp9is2Kc6ICcvbS8wMTk5ZycsXHJcbiAg2K/YsdmR2KfYrNin2Ko6ICcvbS8wMTVrcicsXHJcbiAg2LPZitin2LHYp9iq2KPYrNix2Kk6ICcvbS8wcGc1MicsXHJcblxyXG4gINis2LPZiNixOiAnL20vMDE1a3InLFxyXG4gINiv2Y7YsdmO2Kw6ICcvbS8wMWx5bmgnLFxyXG4gINmF2K/Yp9iu2ZDZhjogJy9tLzAxamtfNCcsXHJcbiAg2K/Ysdin2KzYp9iq2YfZiNin2KbZitipOiAnL20vMDE5OWcnLFxyXG4gINmF2YXYsdmR2KfYqtmE2YTZhdi02KfYqTogJy9tLzAxNHhjcycsXHJcbiAg2YXYrdio2LPYpdi32YHYp9ih2K3YsdmK2YI6ICcvbS8wMXBuczAnLFxyXG4gINiz2YrYp9ix2KnYo9is2LHYqTogJy9tLzBwZzUyJyxcclxuICDZgtmI2KfYsdioOiAnL20vMDE5amQnLFxyXG4gINis2KjYp9mE2KPZiNiq2YTYp9mEOiAnL20vMDlkX3InLFxyXG4gINis2LHYp9ix2KfYqjogJy9tLzAxM3hsbScsXHJcbiAg2KPYtNis2KfYsdmG2K7ZitmEOiAnL20vMGNkbDEnLFxyXG4gINmF2YbYp9i32YLYudio2YjYsdmF2LTYp9ipOiAnL20vMDE0eGNzJyxcclxuICDYrdin2YHZhNin2Ko6ICcvbS8wMWJqdicsXHJcbiAg2K/YsdmR2KfYrNin2KrYqNiu2KfYsdmK2Kk6ICcvbS8wNF9zdicsXHJcbiAg2KzYsdmR2KfYsdin2Ko6ICcvbS8wMTN4bG0nLFxyXG5cclxuICAvLyDljbDlnLDor61cclxuICDgpKrgpLngpL7gpKHgpLzgpK/gpL7gpKrgpLngpL7gpKHgpLzgpL/gpK/gpL7gpIE6ICcvbS8wOWRfcicsXHJcbiAg4KS44KWN4KSf4KWJ4KSq4KS44KS+4KSH4KSo4KWN4KS4OiAnL20vMDJwdjE5JyxcclxuICDgpLjgpKHgpLzgpJXgpJXgpYfgpLjgpILgpJXgpYfgpKQ6ICcvbS8wMW1xZHQnLFxyXG4gIOCkquCljOCkp+Cli+CkgjogJy9tLzA1czJzJyxcclxuICDgpKrgpYfgpKHgpLw6ICcvbS8wN2o3cicsXHJcbiAg4KSY4KS+4KS4OiAnL20vMDh0OWNfJyxcclxuICDgpJ3gpL7gpKHgpLzgpL/gpK/gpL7gpII6ICcvbS8wZ3FidCcsXHJcbiAg4KSV4KWI4KSV4KWN4KSf4KS4OiAnL20vMDI1X3YnLFxyXG4gIOCkluCknOClguCksOCkleClh+CkquClh+CkoeCkvDogJy9tLzBjZGwxJyxcclxuICDgpKrgpY3gpLDgpJXgpYPgpKTgpL86ICcvbS8wNWgwbicsXHJcbiAg4KSd4KSw4KSo4KWHOiAnL20vMGoya3gnLFxyXG4gIOCkquCkueCkvuCkoeCkvOCli+CkgjogJy9tLzA5ZF9yJyxcclxuICDgpLngpL/gpLLgpY3gpLg6ICcvbS8wOWRfcicsXHJcbiAg4KSc4KSy4KSo4KS/4KSV4KS+4KSv4KWL4KSCOiAnL20vMDNrdG0xJyxcclxuICDgpKjgpKbgpL/gpK/gpYvgpII6ICcvbS8wNmNucCcsXHJcbiAg4KS44KSu4KWB4KSm4KWN4KSw4KSk4KSf4KWL4KSCOiAnL20vMGIzeXInLFxyXG4gIOCksOCkteCkvzogJy9tLzA2bV9wJyxcclxuICDgpJrgpILgpKbgpY3gpLDgpK7gpL46ICcvbS8wNHd2XycsXHJcbiAg4KSG4KSV4KS+4KS2OiAnL20vMDFicXZwJyxcclxuICDgpLXgpL7gpLngpKjgpYvgpII6ICcvbS8wazRqJyxcclxuICDgpJXgpL7gpLDgpYvgpII6ICcvbS8wazRqJyxcclxuICDgpLjgpL7gpIfgpJXgpL/gpLLgpYfgpII6ICcvbS8wMTk5ZycsXHJcbiAg4KSu4KWL4KSf4KSw4KS44KS+4KSH4KSV4KS/4KSy4KWH4KSCOiAnL20vMDRfc3YnLFxyXG4gIOCkouCli+CkqOClh+CkteCkvuCksuClh+Ckn+CljeCksOCkleCli+CkgjogJy9tLzBjdnEzJyxcclxuICDgpLXgpL7gpKPgpL/gpJzgpY3gpK/gpL/gpJXgpJ/gpY3gpLDgpJU6ICcvbS8wZmt3amcnLFxyXG4gIOCkqOCljOCkleCkvuCkk+CkgjogJy9tLzAxOWpkJyxcclxuICBsaW1vdXNpbmVzOiAnL20vMDFsY3c0JyxcclxuICDgpJ/gpYjgpJXgpY3gpLjgpYA6ICcvbS8wcGc1MicsXHJcbiAg4KS44KWN4KSV4KWC4KSy4KSs4KS4OiAnL20vMDJ5dmhqJyxcclxuICDgpKzgpLg6ICcvbS8wMWJqdicsXHJcbiAg4KSo4KS/4KSw4KWN4KSu4KS+4KSj4KS14KS+4KS54KSoOiAnL20vMDJneDE3JyxcclxuICDgpK7gpYLgpLDgpY3gpKTgpL/gpK/gpYvgpII6ICcvbS8wMTNfMWMnLFxyXG4gIOCkq+CkteCljeCkteCkvuCksOClhzogJy9tLzBoOGxoa2cnLFxyXG4gIOCkquClgeCksjogJy9tLzAxNWtyJyxcclxuICDgpJjgpL7gpJ86ICcvbS8wMXBocTQnLFxyXG4gIOCkl+Ckl+CkqOCkmuClgeCkguCkrOClgOCkh+CkruCkvuCksOCkpDogJy9tLzA3OWNsJyxcclxuICDgpLjgpY3gpKTgpILgpK3gpK/gpL7gpLjgpY3gpKTgpILgpK06ICcvbS8wMV9tNycsXHJcbiAg4KSw4KSC4KSX4KWA4KSo4KSV4KS+4KSC4KSaOiAnL20vMDExeTIzJyxcclxuICDgpK7gpJXgpL7gpKg6ICcvbS8wM2ptNScsXHJcbiAg4KSF4KSq4KS+4KSw4KWN4KSf4KSu4KWH4KSC4KSf4KSH4KSu4KS+4KSw4KSkOiAnL20vMDFuYmx0JyxcclxuICDgpLLgpL7gpIfgpJ/gpLngpL7gpIngpLg6ICcvbS8wNGg3aCcsXHJcbiAg4KSw4KWH4KSy4KS14KWH4KS44KWN4KSf4KWH4KS24KSoOiAnL20vMHB5MjcnLFxyXG4gIOCkj+CkleCkm+CkquCljeCkquCksDogJy9tLzAxbjZmZCcsXHJcbiAg4KSF4KSX4KWN4KSo4KS/4KS54KS+4KSH4KSh4KWN4KSw4KWH4KSC4KSfOiAnL20vMDFwbnMwJyxcclxuICDgpKzgpL/gpLLgpKzgpYvgpLDgpY3gpKE6ICcvbS8wMWtuamInLFxyXG4gIOCkuOCkoeCkvOCkleClh+CkgjogJy9tLzA2Z2ZqJyxcclxuICDgpJXgpY3gpLDgpYngpLjgpLXgpYngpJU6ICcvbS8wMTR4Y3MnLFxyXG4gIOCkr+CkvuCkpOCkvuCkr+CkvuCkpOCkrOCkpOCljeCkpOCkv+Ckr+CkvjogJy9tLzAxNXFmZicsXHJcbiAg4KSX4KWI4KSw4KWH4KSc4KSV4KWH4KSm4KSw4KS14KS+4KSc4KWHOiAnL20vMDhsOTQxJyxcclxuICDgpKzgpLjgpLDgpYLgpJXgpKjgpYfgpJXgpYDgpJzgpJfgpLk6ICcvbS8wMWp3XzEnLFxyXG4gIOCkn+CljeCksOCliOCkq+Ckv+CkleCkleCli+CkqOCkuDogJy9tLzAzc3k3dicsXHJcbiAg4KSq4KS+4KSw4KWN4KSV4KS/4KSC4KSX4KSu4KWA4KSf4KSwOiAnL20vMDE1cWJwJyxcclxuICDgpLjgpYDgpKLgpLzgpL/gpK/gpL7gpII6ICcvbS8wMWx5bmgnLFxyXG4gIOCkmuCkv+CkruCkqOCkv+Ckr+CkvuCkgjogJy9tLzAxamtfNCcsXHJcbiAg4KSf4KWN4KSw4KWI4KSV4KWN4KSf4KSwOiAnL20vMDEzeGxtJyxcclxuXHJcbiAg4KSF4KSX4KWN4KSo4KS/4KS24KS+4KSu4KSV4KS54KS+4KSI4KSh4KWN4KSw4KWH4KSC4KSfOiAnL20vMDFwbnMwJyxcclxuICDgpKrgpYjgpKbgpLLgpKrgpL7gpLDgpKrgpKU6ICcvbS8wMTR4Y3MnLFxyXG4gIOCkn+CljeCksOCliOCkq+CkvOCkv+CkleCksuCkvuCkh+CknzogJy9tLzAxNHhjcycsXHJcbiAg4KSq4KWB4KSy4KWL4KSCOiAnL20vMDE1a3InLFxyXG4gIOCkuOClgOClneCkv+Ckr+Cli+CkgjogJy9tLzAxbHluaCcsXHJcbiAg4KSq4KS54KS+4KSh4KS84KSv4KS+4KSq4KS54KS+4KSh4KS84KWAOiAnL20vMDlkX3InLFxyXG4gIOCkteCkvuCkueCkqDogJy9tLzBrNGonLFxyXG4gIOCkruCli+Ckn+CksOCkuOCkvuCkh+CkleCksjogJy9tLzA0X3N2JyxcclxuICDgpLjgpL7gpIfgpJXgpLI6ICcvbS8wMTk5ZycsXHJcbiAg4KSa4KS/4KSu4KSo4KWAOiAnL20vMDFqa180JyxcclxuICDgpLjgpL7gpIfgpJXgpLLgpYvgpII6ICcvbS8wMTk5ZycsXHJcblxyXG4gIC8vIOiNt+WFsOivrVxyXG4gIGJlcmdlbm9maGV1dmVsczogJy9tLzA5ZF9yJyxcclxuICBzdG9wdGVrZW5zOiAnL20vMDJwdjE5JyxcclxuICB2ZXJrZWVyc2JvcmRlbjogJy9tLzAxbXFkdCcsXHJcbiAgcGxhbnRlbjogJy9tLzA1czJzJyxcclxuICBib21lbjogJy9tLzA3ajdyJyxcclxuICBncmFzOiAnL20vMDh0OWNfJyxcclxuICBzdHJ1aWtlbjogJy9tLzBncWJ0JyxcclxuICBjYWN0dXM6ICcvbS8wMjVfdicsXHJcbiAgcGFsbWJvbWVuOiAnL20vMGNkbDEnLFxyXG4gIG5hdHV1cjogJy9tLzA1aDBuJyxcclxuICB3YXRlcnZhbGxlbjogJy9tLzBqMmt4JyxcclxuICBiZXJnZW46ICcvbS8wOWRfcicsXHJcbiAgaGV1dmVsczogJy9tLzA5ZF9yJyxcclxuICB3YXRlcmxpY2hhbWVuOiAnL20vMDNrdG0xJyxcclxuICByaXZpZXJlbjogJy9tLzA2Y25wJyxcclxuICBzdHJhbmRlbjogJy9tLzBiM3lyJyxcclxuICB6b246ICcvbS8wNm1fcCcsXHJcbiAgTWFhbjogJy9tLzA0d3ZfJyxcclxuICBsdWNodDogJy9tLzAxYnF2cCcsXHJcbiAgdm9lcnR1aWdlbjogJy9tLzBrNGonLFxyXG4gIFwiYXV0bydzXCI6ICcvbS8wazRqJyxcclxuICBmaWV0c2VuOiAnL20vMDE5OWcnLFxyXG4gIG1vdG9yZmlldHNlbjogJy9tLzA0X3N2JyxcclxuICAncGljay11cHRydWNrcyc6ICcvbS8wY3ZxMycsXHJcbiAgY29tbWVyY2nDq2xldnJhY2h0d2FnZW5zOiAnL20vMGZrd2pnJyxcclxuICBib3RlbjogJy9tLzAxOWpkJyxcclxuICBsaW1vdXNpbmVzOiAnL20vMDFsY3c0JyxcclxuICBcInRheGknc1wiOiAnL20vMHBnNTInLFxyXG4gIHNjaG9vbGJ1czogJy9tLzAyeXZoaicsXHJcbiAgYnVzOiAnL20vMDFianYnLFxyXG4gIGJvdXd2b2VydHVpZzogJy9tLzAyZ3gxNycsXHJcbiAgc3RhbmRiZWVsZGVuOiAnL20vMDEzXzFjJyxcclxuICBmb250ZWluZW46ICcvbS8waDhsaGtnJyxcclxuICBicnVnOiAnL20vMDE1a3InLFxyXG4gIHBpZXI6ICcvbS8wMXBocTQnLFxyXG4gIHdvbGtlbmtyYWJiZXI6ICcvbS8wNzljbCcsXHJcbiAgcGlqbGVyc29ma29sb21tZW46ICcvbS8wMV9tNycsXHJcbiAgJ2dsYXMtaW4tbG9vZCc6ICcvbS8wMTF5MjMnLFxyXG4gIGh1aXM6ICcvbS8wM2ptNScsXHJcbiAgZWVuYXBwYXJ0ZW1lbnRzZ2Vib3V3OiAnL20vMDFuYmx0JyxcclxuICB2dXVydG9yZW46ICcvbS8wNGg3aCcsXHJcbiAgdHJlaW5zdGF0aW9uOiAnL20vMHB5MjcnLFxyXG4gIGluZGVhc2dlbGVnZDogJy9tLzAxbjZmZCcsXHJcbiAgYnJhbmRrcmFhbjogJy9tLzAxcG5zMCcsXHJcbiAgcHJpa2JvcmQ6ICcvbS8wMWtuamInLFxyXG4gIHdlZ2VuOiAnL20vMDZnZmonLFxyXG4gIHplYnJhcGFkZW46ICcvbS8wMTR4Y3MnLFxyXG4gIHZlcmtlZXJzbGljaHRlbjogJy9tLzAxNXFmZicsXHJcbiAgZ2FyYWdlZGV1cmVuOiAnL20vMDhsOTQxJyxcclxuICBidXNzdG9wdDogJy9tLzAxandfMScsXHJcbiAgdmVya2VlcnNrZWdlbHM6ICcvbS8wM3N5N3YnLFxyXG4gIHBhcmtlZXJtZXRlcnM6ICcvbS8wMTVxYnAnLFxyXG4gIHRyYXA6ICcvbS8wMWx5bmgnLFxyXG4gIHNjaG9vcnN0ZW5lbjogJy9tLzAxamtfNCcsXHJcbiAgdHJhY3RvcmVuOiAnL20vMDEzeGxtJyxcclxuXHJcbiAgZWVuYnJhbmRrcmFhbjogJy9tLzAxcG5zMCcsXHJcbiAgdHJhcHBlbjogJy9tLzAxbHluaCcsXHJcbiAgZWVuYnJhbmRrcmFhbjogJy9tLzAxcG5zMCcsXHJcbiAgb3ZlcnN0ZWVrcGxhYXRzZW46ICcvbS8wMTR4Y3MnLFxyXG4gIGJ1c3NlbjogJy9tLzAxYmp2JyxcclxuICBidXNzZW46ICcvbS8wMWJqdicsXHJcbiAgYnJ1Z2dlbjogJy9tLzAxNWtyJyxcclxuXHJcbiAgLy8g5Y2w5bC86K+tXHJcbiAgZ3VudW5nYXRhdWJ1a2l0OiAnL20vMDlkX3InLFxyXG4gIHRhbmRhYmVyaGVudGk6ICcvbS8wMnB2MTknLFxyXG4gIHJhbWJ1amFsYW46ICcvbS8wMW1xZHQnLFxyXG4gIHRhbmFtYW46ICcvbS8wNXMycycsXHJcbiAgcG9ob246ICcvbS8wN2o3cicsXHJcbiAgcnVtcHV0OiAnL20vMDh0OWNfJyxcclxuICBzZW1ha2JlbHVrYXI6ICcvbS8wZ3FidCcsXHJcbiAga2FrdHVzOiAnL20vMDI1X3YnLFxyXG4gICdwb2hvbi1wb2hvbnBhbGVtJzogJy9tLzBjZGwxJyxcclxuICBhbGFtOiAnL20vMDVoMG4nLFxyXG4gIGFpcnRlcmp1bjogJy9tLzBqMmt4JyxcclxuICBwZWd1bnVuZ2FuOiAnL20vMDlkX3InLFxyXG4gIGJ1a2l0OiAnL20vMDlkX3InLFxyXG4gIGJhZGFuYWlyOiAnL20vMDNrdG0xJyxcclxuICBzdW5nYWk6ICcvbS8wNmNucCcsXHJcbiAgcGFudGFpOiAnL20vMGIzeXInLFxyXG4gIG1hdGFoYXJpOiAnL20vMDZtX3AnLFxyXG4gIEJ1bGFuOiAnL20vMDR3dl8nLFxyXG4gIGxhbmdpdDogJy9tLzAxYnF2cCcsXHJcbiAga2VuZGFyYWFuOiAnL20vMGs0aicsXHJcbiAgbW9iaWw6ICcvbS8wazRqJyxcclxuICBzZXBlZGE6ICcvbS8wMTk5ZycsXHJcbiAgc2VwZWRhbW90b3I6ICcvbS8wNF9zdicsXHJcbiAgdHJ1a3BpY2t1cDogJy9tLzBjdnEzJyxcclxuICB0cnVra29tZXJzaWFsOiAnL20vMGZrd2pnJyxcclxuICBwZXJhaHU6ICcvbS8wMTlqZCcsXHJcbiAgbGltdXNpbjogJy9tLzAxbGN3NCcsXHJcbiAgdGFrc2k6ICcvbS8wcGc1MicsXHJcbiAgYnVzc2Vrb2xhaDogJy9tLzAyeXZoaicsXHJcbiAgYmlzOiAnL20vMDFianYnLFxyXG4gIGtlbmRhcmFhbmtvbnN0cnVrc2k6ICcvbS8wMmd4MTcnLFxyXG4gIHBhdHVuZzogJy9tLzAxM18xYycsXHJcbiAgYWlybWFuY3VyOiAnL20vMGg4bGhrZycsXHJcbiAgbWVuamVtYmF0YW5pOiAnL20vMDE1a3InLFxyXG4gIGRlcm1hZ2E6ICcvbS8wMXBocTQnLFxyXG4gIGdlZHVuZ3BlbmNha2FybGFuZ2l0OiAnL20vMDc5Y2wnLFxyXG4gIHBpbGFyYXRhdWtvbG9tOiAnL20vMDFfbTcnLFxyXG4gIGthY2FiZXJ3YXJuYTogJy9tLzAxMXkyMycsXHJcbiAgcnVtYWg6ICcvbS8wM2ptNScsXHJcbiAgc2VidWFoZ2VkdW5nYXBhcnRlbWVuOiAnL20vMDFuYmx0JyxcclxuICBydW1haGNhaGF5YTogJy9tLzA0aDdoJyxcclxuICBTdGFzaXVua2VyZXRhOiAnL20vMHB5MjcnLFxyXG4gIHB1Y2F0OiAnL20vMDFuNmZkJyxcclxuICBwZW1hZGFta2ViYWthcmFuOiAnL20vMDFwbnMwJyxcclxuICBwYXBhbnJla2xhbWU6ICcvbS8wMWtuamInLFxyXG4gIGphbGFuOiAnL20vMDZnZmonLFxyXG4gIHBlbnllYmVyYW5nYW46ICcvbS8wMTR4Y3MnLFxyXG4gIGxhbXB1bGFsdWxpbnRhczogJy9tLzAxNXFmZicsXHJcbiAgcGludHVnYXJhc2k6ICcvbS8wOGw5NDEnLFxyXG4gIGhhbHRlYnVzOiAnL20vMDFqd18xJyxcclxuICBrZXJ1Y3V0bGFsdWxpbnRhczogJy9tLzAzc3k3dicsXHJcbiAgbWV0ZXJhbnBhcmtpcjogJy9tLzAxNXFicCcsXHJcbiAgdGFuZ2dhOiAnL20vMDFseW5oJyxcclxuICBjZXJvYm9uZzogJy9tLzAxamtfNCcsXHJcbiAgdHJha3RvcjogJy9tLzAxM3hsbScsXHJcblxyXG4gIGhpZHJhbmtlYmFrYXJhbjogJy9tLzAxcG5zMCcsXHJcbiAgamVtYmF0YW46ICcvbS8wMTVrcicsXHJcbiAgemVicmFjcm9zczogJy9tLzAxNHhjcycsXHJcbiAgbW90b3I6ICcvbS8wNF9zdicsXHJcbiAgY2Vyb2Jvbmdhc2FwOiAnL20vMDFqa180JyxcclxuICBwb2hvbnBhbGVtOiAnL20vMGNkbDEnLFxyXG5cclxuICAvLyDokaHokITniZnor61cclxuICBtb250YW5oYXNvdWNvbGluYXM6ICcvbS8wOWRfcicsXHJcbiAgc2luYWlzZGVwYXJhZGE6ICcvbS8wMnB2MTknLFxyXG4gIFNpbmFpc2RldHJhbnNpdG86ICcvbS8wMW1xZHQnLFxyXG4gIHBsYW50YXM6ICcvbS8wNXMycycsXHJcbiAgw6Fydm9yZXM6ICcvbS8wN2o3cicsXHJcbiAgUmVsdmE6ICcvbS8wOHQ5Y18nLFxyXG4gIGFyYnVzdG9zOiAnL20vMGdxYnQnLFxyXG4gIGNhY3RvOiAnL20vMDI1X3YnLFxyXG4gIFBhbG1laXJhczogJy9tLzBjZGwxJyxcclxuICBuYXR1cmV6YTogJy9tLzA1aDBuJyxcclxuICBjYWNob2VpcmFzOiAnL20vMGoya3gnLFxyXG4gIG1vbnRhbmhhczogJy9tLzA5ZF9yJyxcclxuICBDb2xpbmFzOiAnL20vMDlkX3InLFxyXG4gIGNvcnBvc2Rlw6FndWE6ICcvbS8wM2t0bTEnLFxyXG4gIHJpb3M6ICcvbS8wNmNucCcsXHJcbiAgcHJhaWFzOiAnL20vMGIzeXInLFxyXG4gIHNvbDogJy9tLzA2bV9wJyxcclxuICBMdWE6ICcvbS8wNHd2XycsXHJcbiAgY8OpdTogJy9tLzAxYnF2cCcsXHJcbiAgdmXDrWN1bG9zOiAnL20vMGs0aicsXHJcbiAgY2Fycm9zOiAnL20vMGs0aicsXHJcbiAgYmljaWNsZXRhczogJy9tLzAxOTlnJyxcclxuICBtb3RvY2ljbGV0YXM6ICcvbS8wNF9zdicsXHJcbiAgQ2FtaW5ow7VlczogJy9tLzBjdnEzJyxcclxuICBjYW1pbmjDtWVzY29tZXJjaWFpczogJy9tLzBma3dqZycsXHJcbiAgYmFyY29zOiAnL20vMDE5amQnLFxyXG4gIGxpbXVzaW5lczogJy9tLzAxbGN3NCcsXHJcbiAgVMOheGlzOiAnL20vMHBnNTInLFxyXG4gIMO0bmlidXNlc2NvbGFyOiAnL20vMDJ5dmhqJyxcclxuICDDtG5pYnVzOiAnL20vMDFianYnLFxyXG4gIHZlw61jdWxvZGVjb25zdHJ1w6fDo286ICcvbS8wMmd4MTcnLFxyXG4gIGVzdMOhdHVhczogJy9tLzAxM18xYycsXHJcbiAgZm9udGVzOiAnL20vMGg4bGhrZycsXHJcbiAgUG9udGU6ICcvbS8wMTVrcicsXHJcbiAgY2FpczogJy9tLzAxcGhxNCcsXHJcbiAgJ2FycmFuaGEtY8OpdSc6ICcvbS8wNzljbCcsXHJcbiAgcGlsYXJlc291Y29sdW5hczogJy9tLzAxX203JyxcclxuICB2aXRyYWlzOiAnL20vMDExeTIzJyxcclxuICBsYXI6ICcvbS8wM2ptNScsXHJcbiAgdW1wcsOpZGlvZGVhcGFydGFtZW50b3M6ICcvbS8wMW5ibHQnLFxyXG4gIGNhc2FkZWx1ejogJy9tLzA0aDdoJyxcclxuICBlc3Rhw6fDo29kZXRyZW06ICcvbS8wcHkyNycsXHJcbiAgY2luemE6ICcvbS8wMW42ZmQnLFxyXG4gIGhpZHJhbnRlOiAnL20vMDFwbnMwJyxcclxuICBxdWFkcm9kZWF2aXNvczogJy9tLzAxa25qYicsXHJcbiAgZXN0cmFkYXM6ICcvbS8wNmdmaicsXHJcbiAgZmFpeGFzZGVwZWRlc3RyZXM6ICcvbS8wMTR4Y3MnLFxyXG4gIGx1emVzZGV0csOibnNpdG86ICcvbS8wMTVxZmYnLFxyXG4gIHBvcnRhc2RlZ2FyYWdlbTogJy9tLzA4bDk0MScsXHJcbiAgcG9udG9kZcO0bmlidXM6ICcvbS8wMWp3XzEnLFxyXG4gIENvbmVzZGV0csOhZmVnbzogJy9tLzAzc3k3dicsXHJcbiAgcGFycXXDrW1ldHJvczogJy9tLzAxNXFicCcsXHJcbiAgZXNjYWRhcmlhOiAnL20vMDFseW5oJyxcclxuICBjaGFtaW7DqXM6ICcvbS8wMWprXzQnLFxyXG4gIHRyYXRvcmVzOiAnL20vMDEzeGxtJyxcclxuXHJcbiAgZXNjYWRhczogJy9tLzAxbHluaCcsXHJcbiAgZmFpeGFzZGVwZWRlc3RyZTogJy9tLzAxNHhjcycsXHJcbiAgcGFsbWVpcmFzOiAnL20vMGNkbDEnLFxyXG4gIHVtaGlkcmFudGU6ICcvbS8wMXBuczAnLFxyXG4gIHBvbnRlczogJy9tLzAxNWtyJyxcclxuICB0w6F4aXM6ICcvbS8wcGc1MicsXHJcbiAgaGlkcmFudGVzOiAnL20vMDFwbnMwJyxcclxuICBoaWRyYW50ZXM6ICcvbS8wMXBuczAnLFxyXG5cclxuICAvLyDotorljZfor61cclxuICBuw7ppaG/hurdjxJHhu5NpOiAnL20vMDlkX3InLFxyXG4gIMSRaeG7g21k4burbmc6ICcvbS8wMnB2MTknLFxyXG4gIMSRxrDhu51uZ3Bo4buROiAnL20vMDFtcWR0JyxcclxuICBjw6J5OiAnL20vMDdqN3InLFxyXG4gIGLDo2lj4buPOiAnL20vMDh0OWNfJyxcclxuICBjw6J5YuG7pWk6ICcvbS8wZ3FidCcsXHJcbiAgY8OieXjGsMahbmdy4buTbmc6ICcvbS8wMjVfdicsXHJcbiAgY8OieWPhu406ICcvbS8wY2RsMScsXHJcbiAgVGhpw6pubmhpw6puOiAnL20vMDVoMG4nLFxyXG4gIHRow6Fjbsaw4bubYzogJy9tLzBqMmt4JyxcclxuICBuw7ppbm9uOiAnL20vMDlkX3InLFxyXG4gIMSR4buTaW7Dumk6ICcvbS8wOWRfcicsXHJcbiAgbmd14buTbm7GsOG7m2M6ICcvbS8wM2t0bTEnLFxyXG4gIHPDtG5nOiAnL20vMDZjbnAnLFxyXG4gIGLDo2liaeG7g246ICcvbS8wYjN5cicsXHJcbiAgbeG6t3R0cuG7nWk6ICcvbS8wNm1fcCcsXHJcbiAgTeG6t3R0csSDbmc6ICcvbS8wNHd2XycsXHJcbiAgYuG6p3V0cuG7nWk6ICcvbS8wMWJxdnAnLFxyXG4gIHhlY+G7mTogJy9tLzBrNGonLFxyXG4gIMO0dMO0OiAnL20vMGs0aicsXHJcbiAgeGXEkeG6oXA6ICcvbS8wMTk5ZycsXHJcbiAgeGVtw6F5OiAnL20vMDRfc3YnLFxyXG4gIHhlYsOhbnThuqNpOiAnL20vMGN2cTMnLFxyXG4gIHhldOG6o2l0aMawxqFuZ23huqFpOiAnL20vMGZrd2pnJyxcclxuICB0aHV54buBbjogJy9tLzAxOWpkJyxcclxuICB4ZWxpbW91c2luZTogJy9tLzAxbGN3NCcsXHJcbiAgdGF4aTogJy9tLzBwZzUyJyxcclxuICB4ZWJ1w710Y+G7p2F0csaw4budbmc6ICcvbS8wMnl2aGonLFxyXG4gIHhlYnXDvXQ6ICcvbS8wMWJqdicsXHJcbiAgeGV4w6J5ZOG7sW5nOiAnL20vMDJneDE3JyxcclxuICBuaOG7r25nYuG7qWN0xrDhu6NuZzogJy9tLzAxM18xYycsXHJcbiAgxJHDoGlwaHVubsaw4bubYzogJy9tLzBoOGxoa2cnLFxyXG4gIGPhuqd1OiAnL20vMDE1a3InLFxyXG4gIMSRw6o6ICcvbS8wMXBocTQnLFxyXG4gIHTDsmFuaMOgY2jhu41jdHLhu51pOiAnL20vMDc5Y2wnLFxyXG4gIGPhu5l0dHLhu6U6ICcvbS8wMV9tNycsXHJcbiAga8Otbmhtw6B1OiAnL20vMDExeTIzJyxcclxuICBuaMOg4bufOiAnL20vMDNqbTUnLFxyXG4gIHTDsmFuaMOgY2h1bmdjxrA6ICcvbS8wMW5ibHQnLFxyXG4gIG5nw7RpbmjDoMOhbmhzw6FuZzogJy9tLzA0aDdoJyxcclxuICBnYXhlbOG7rWE6ICcvbS8wcHkyNycsXHJcbiAgdHJvdMOgbjogJy9tLzAxbjZmZCcsXHJcbiAgYWZpcmVoeWRyYW50OiAnL20vMDFwbnMwJyxcclxuICBhYmlsbGJvYXJkOiAnL20vMDFrbmpiJyxcclxuICBuaOG7r25nY29uxJHGsOG7nW5nOiAnL20vMDZnZmonLFxyXG4gIGLEg25ncXVhxJHGsOG7nW5nOiAnL20vMDE0eGNzJyxcclxuICDEkcOobmdpYW90aMO0bmc6ICcvbS8wMTVxZmYnLFxyXG4gIG5ow6DEkeG7g3hlOiAnL20vMDhsOTQxJyxcclxuICB0cuG6oW1k4burbmd4ZWJ1w710OiAnL20vMDFqd18xJyxcclxuICBnaWFvdGjDtG5nOiAnL20vMDNzeTd2JyxcclxuICDEkeG7k25naOG7k8SR4buXeGU6ICcvbS8wMTVxYnAnLFxyXG4gIGPhuqd1dGhhbmc6ICcvbS8wMWx5bmgnLFxyXG4gIOG7kW5na2jDs2k6ICcvbS8wMWprXzQnLFxyXG4gIG3DoXlrw6lvOiAnL20vMDEzeGxtJyxcclxuXHJcbiAgduG6oWNocXVhxJHGsOG7nW5nOiAnL20vMDE0eGNzJyxcclxuICB4ZWjGoWk6ICcvbS8wazRqJyxcclxuICB0cuG7pWPhuqVwbsaw4bubY2No4buvYWNow6F5OiAnL20vMDFwbnMwJyxcclxuICB2w7JpbOG6pXluxrDhu5tjY2jhu69hY2jDoXk6ICcvbS8wMXBuczAnLFxyXG4gIHhlZ+G6r25tw6F5OiAnL20vMDRfc3YnLFxyXG5cclxuICAvLyDoj7Llvovlrr7or61cclxuICBidW5kb2tvYnVyb2w6ICcvbS8wOWRfcicsXHJcbiAgc3RvcHNpZ25zOiAnL20vMDJwdjE5JyxcclxuICBUYW5kYW5nbWdha2FseWU6ICcvbS8wMW1xZHQnLFxyXG4gIGhhbGFtYW46ICcvbS8wNXMycycsXHJcbiAgbWdhcHVubzogJy9tLzA3ajdyJyxcclxuICBkYW1vOiAnL20vMDh0OWNfJyxcclxuICBtZ2FwYWx1bXBvbmc6ICcvbS8wZ3FidCcsXHJcbiAgY2FjdHVzOiAnL20vMDI1X3YnLFxyXG4gIG1nYXB1bm9uZ3BhbG1hOiAnL20vMGNkbDEnLFxyXG4gIGthbGlrYXNhbjogJy9tLzA1aDBuJyxcclxuICB0YWxvbjogJy9tLzBqMmt4JyxcclxuICBtZ2FidW5kb2s6ICcvbS8wOWRfcicsXHJcbiAgbWdhYnVyb2w6ICcvbS8wOWRfcicsXHJcbiAgYW55b25ndHViaWc6ICcvbS8wM2t0bTEnLFxyXG4gIG1nYWlsb2c6ICcvbS8wNmNucCcsXHJcbiAgbWdhYmVhY2g6ICcvbS8wYjN5cicsXHJcbiAgQXJhdzogJy9tLzA2bV9wJyxcclxuICBCdXdhbjogJy9tLzA0d3ZfJyxcclxuICBsYW5naXQ6ICcvbS8wMWJxdnAnLFxyXG4gIG1nYXNhc2FreWFuOiAnL20vMGs0aicsXHJcbiAgbWdhYmlzaWtsZXRhOiAnL20vMDE5OWcnLFxyXG4gIG1nYW1vdG9yc2lrbG86ICcvbS8wNF9zdicsXHJcbiAgbWdhcGlja3VwdHJ1Y2s6ICcvbS8wY3ZxMycsXHJcbiAgbWdha29tZXJzeWFsbmF0cmFrOiAnL20vMGZrd2pnJyxcclxuICBtZ2FiYW5na2E6ICcvbS8wMTlqZCcsXHJcbiAgbWdhbGltb3VzaW5lOiAnL20vMDFsY3c0JyxcclxuICBtZ2F0YXhpOiAnL20vMHBnNTInLFxyXG4gIGJ1c25nZXNrd2VsYWhhbjogJy9tLzAyeXZoaicsXHJcbiAgYnVzOiAnL20vMDFianYnLFxyXG4gICdzYXNha3lhbmdwYW5nLWtvbnN0cnVrc3lvbic6ICcvbS8wMmd4MTcnLFxyXG4gIG1nYWVzdGF0d2E6ICcvbS8wMTNfMWMnLFxyXG4gIG1nYWZvdW50YWluOiAnL20vMGg4bGhrZycsXHJcbiAgdHVsYXk6ICcvbS8wMTVrcicsXHJcbiAgcGllcjogJy9tLzAxcGhxNCcsXHJcbiAgbmFwYWthdGFhc25hZ3VzYWxpOiAnL20vMDc5Y2wnLFxyXG4gIG1nYWhhbGlnaW9oYWxpZ2k6ICcvbS8wMV9tNycsXHJcbiAgbWluYW50c2FoYW5nc2FsYW1pbjogJy9tLzAxMXkyMycsXHJcbiAgYmFoYXk6ICcvbS8wM2ptNScsXHJcbiAgZ3VzYWxpbmdpc2FuZ2FwYXJ0bWVudDogJy9tLzAxbmJsdCcsXHJcbiAgaWxhd25hYmFoYXk6ICcvbS8wNGg3aCcsXHJcbiAgaXN0YXN5b25uZ3RyZW46ICcvbS8wcHkyNycsXHJcbiAgYWJvOiAnL20vMDFuNmZkJyxcclxuICBhZmlyZWh5ZHJhbnQ6ICcvbS8wMXBuczAnLFxyXG4gIGFiaWxsYm9hcmQ6ICcvbS8wMWtuamInLFxyXG4gIG1nYWthbHNhZGE6ICcvbS8wNmdmaicsXHJcbiAgbWdhdGF3aXJhbjogJy9tLzAxNHhjcycsXHJcbiAgaWxhd3RyYXBpa286ICcvbS8wMTVxZmYnLFxyXG4gIG1nYWdhcmFnZWRkb29yOiAnL20vMDhsOTQxJyxcclxuICBoaW50dWFubmdidXM6ICcvbS8wMWp3XzEnLFxyXG4gIG1nYXRyYWZmaWNjb25lOiAnL20vMDNzeTd2JyxcclxuICBtZXRyb25ncGFyYWRhaGFuOiAnL20vMDE1cWJwJyxcclxuICBoYWdkYW46ICcvbS8wMWx5bmgnLFxyXG4gIG1nYXRzaW1lbmVhOiAnL20vMDFqa180JyxcclxuICBtZ2F0cmFrdG9yYTogJy9tLzAxM3hsbScsXHJcblxyXG4gIG1nYWNyb3Nzd2FsazogJy9tLzAxNHhjcycsXHJcbiAgJ21nYWlsYXctdHJhcGlrbyc6ICcvbS8wMTVxZmYnLFxyXG4gIGZpcmVoeWRyYW50OiAnL20vMDFwbnMwJyxcclxuICBtZ2Frb3RzZTogJy9tLzBrNGonLFxyXG4gIG1nYWNoaW1uZXk6ICcvbS8wMWprXzQnLFxyXG4gIG1nYXBhbG10cmVlOiAnL20vMGNkbDEnLFxyXG4gIG1nYWhhZ2RhbjogJy9tLzAxbHluaCcsXHJcbiAgbWdhYnVzOiAnL20vMDFianYnLFxyXG4gIG1nYWZpcmVoeWRyYW50OiAnL20vMDFwbnMwJyxcclxuICBtZ2F0dWxheTogJy9tLzAxNWtyJyxcclxuXHJcbiAgLy8g6ICB5oyd6K+tXHJcbiAg4Lqe4Lq54LuA4LqC4Lq74Lqy4Lqr4Lq84Lq34LuA4LqZ4Lq14LqZ4Lqe4Lq5OiAnL20vMDlkX3InLFxyXG4gIOC6m+C7ieC6suC6jeC6ouC6uOC6lDogJy9tLzAycHYxOScsXHJcbiAg4Lqb4LuJ4Lqy4LqN4LqW4Lqw4Luc4Lq74LqZOiAnL20vMDFtcWR0JyxcclxuICDgup7gurfgupQ6ICcvbS8wNXMycycsXHJcbiAg4LqV4Lq74LuJ4LqZ4LuE4Lqh4LuJOiAnL20vMDdqN3InLFxyXG4gIOC6q+C6jeC7ieC6sjogJy9tLzA4dDljXycsXHJcbiAg4LuE4Lqh4LuJ4Lqe4Lq44LuI4LqhOiAnL20vMGdxYnQnLFxyXG4gIOC6geC6sOC6l+C6veC6oTogJy9tLzAyNV92JyxcclxuICAn4LuE4Lqh4LuJXFx1MjAwYuC6ouC6t+C6mVxcdTIwMGLgupXgurvgu4nguplcXHUyMDBi4Lqb4Lqy4LqhJzogJy9tLzBjZGwxJyxcclxuICDgupfgu43gurLguqHgurDguorgurLgupQ6ICcvbS8wNWgwbicsXHJcbiAg4LqZ4LuJ4Lqz4LqV4Lq74LqB4LqV4Lqy4LqUOiAnL20vMGoya3gnLFxyXG4gIOC6nuC6ueC7gOC6guC6u+C6sjogJy9tLzA5ZF9yJyxcclxuICAn4LuA4LqZ4Lq14LqZXFx1MjAwYuC6nuC6uSc6ICcvbS8wOWRfcicsXHJcbiAg4Lqu4LuI4Lqy4LqH4LqB4Lqy4LqN4LqC4Lqt4LqH4LqZ4LuJ4LuN4LqyOiAnL20vMDNrdG0xJyxcclxuICDgu4HguqHgu4jgupngu4ngurM6ICcvbS8wNmNucCcsXHJcbiAg4Lqr4Lqy4LqU4LqK4Lqy4LqNOiAnL20vMGIzeXInLFxyXG4gIOC6leC6suC7gOC6p+C6seC6mTogJy9tLzA2bV9wJyxcclxuICDgupTguqfguofguojgurHgupk6ICcvbS8wNHd2XycsXHJcbiAg4LqX4Lqt4LqH4Lqf4LuJ4LqyOiAnL20vMDFicXZwJyxcclxuICDgup7gurLguqvgurDgupngurA6ICcvbS8wazRqJyxcclxuICDguqXgurvgupQ6ICcvbS8wazRqJyxcclxuICDguqXgurvgupTgupbgurXgupo6ICcvbS8wMTk5ZycsXHJcbiAg4Lql4Lq74LqU4LqI4Lqx4LqBOiAnL20vMDRfc3YnLFxyXG4gIOC6peC6u+C6lOC6geC6sOC6muC6sDogJy9tLzBjdnEzJyxcclxuICDguqXgurvgupTguprgurHgupngupfgurjguoHguoHgurLgupnguoTgu4ngurI6ICcvbS8wZmt3amcnLFxyXG4gIOC7gOC6ruC6t+C6rTogJy9tLzAxOWpkJyxcclxuICDguqXgurvgupTguqXgurXguqHgurnguorgurXgupk6ICcvbS8wMWxjdzQnLFxyXG4gIOC7geC6l+C6seC6geC6iuC6tTogJy9tLzBwZzUyJyxcclxuICAn4Lql4Lq74LqUXFx1MjAwYuC7gOC6oVxcdTIwMGLgu4Lguq7guodcXHUyMDBi4Lqu4Lq94LqZJzogJy9tLzAyeXZoaicsXHJcbiAg4Lql4Lq74LqU4LuA4LqhOiAnL20vMDFianYnLFxyXG4gIOC6nuC6suC6q+C6sOC6meC6sOC6geC7jeC7iOC6quC7ieC6suC6hzogJy9tLzAyZ3gxNycsXHJcbiAg4Lqu4Lq54Lqa4Lqb4Lqx4LuJ4LqZOiAnL20vMDEzXzFjJyxcclxuICDgupngu4ngurPgup7gurg6ICcvbS8waDhsaGtnJyxcclxuICDguoLgurvguqc6ICcvbS8wMTVrcicsXHJcbiAg4LqX4LuI4Lqy4LuA4Lqu4Lq34LqtOiAnL20vMDFwaHE0JyxcclxuICDgupXgurbguoHguqrgurnguoc6ICcvbS8wNzljbCcsXHJcbiAg4LqW4Lqx4LqZ4LuA4Lqq4Lq74LqyOiAnL20vMDFfbTcnLFxyXG4gIOC7geC6geC7ieC6p+C6quC6tTogJy9tLzAxMXkyMycsXHJcbiAg4LuA4Lqu4Lq34Lqt4LqZOiAnL20vMDNqbTUnLFxyXG4gIOC6leC6tuC6geC6reC6suC6nuC6suC6lOC7gOC6oeC6seC6mTogJy9tLzAxbmJsdCcsXHJcbiAg4LuA4Lqu4Lq34Lqt4LqZ4LuB4Lqq4LqH4Lqq4Lqw4Lqr4Lqn4LuI4Lqy4LqHOiAnL20vMDRoN2gnLFxyXG4gIOC6quC6sOC6luC6suC6meC6teC6peC6u+C6lOC7hOC6nzogJy9tLzBweTI3JyxcclxuICDguoLgurXgu4ngu4Dgupfgurvgu4jgurI6ICcvbS8wMW42ZmQnLFxyXG4gIOC6meC7jeC7ieC6suC6lOC6seC6muC7gOC6nuC6teC6hzogJy9tLzAxcG5zMCcsXHJcbiAg4Lqb4LuJ4Lqy4LqN4LuC4LqE4Lqq4Lqw4LqZ4LqyOiAnL20vMDFrbmpiJyxcclxuICDgupbgurDgu5zgurvgupnguqvgurvgupngupfgurLguoc6ICcvbS8wNmdmaicsXHJcbiAg4LqX4Lqy4LqH4LqC4LuJ4Lqy4LqhOiAnL20vMDE0eGNzJyxcclxuICAn4LuE4LqfXFx1MjAwYuC6reC7jeC6slxcdTIwMGLgupngurLgupQnOiAnL20vMDE1cWZmJyxcclxuICBnYXJhZ2Vkb29yczogJy9tLzA4bDk0MScsXHJcbiAg4Lqb4LuJ4Lqy4LqN4Lql4Lq74LqU4LuA4LqhOiAnL20vMDFqd18xJyxcclxuICDgu4LguoTgupnguoHgurLgupnguojgurDguqXgurLguojguq3gupk6ICcvbS8wM3N5N3YnLFxyXG4gIOC7geC6oeC6seC6lOC6muC7iOC6reC6meC6iOC6reC6lOC6peC6u+C6lDogJy9tLzAxNXFicCcsXHJcbiAg4LqC4Lqx4LuJ4LqZ4LuE4LqUOiAnL20vMDFseW5oJyxcclxuICDgupfgu43gu4jgu4Tgup86ICcvbS8wMWprXzQnLFxyXG4gIOC6peC6u+C6lOC7hOC6luC6meC6sjogJy9tLzAxM3hsbScsXHJcblxyXG4gIOC6peC6u+C6lOC7g+C6q+C6jeC7iDogJy9tLzBrNGonLFxyXG4gIOC6nuC6ueC6q+C6vOC6t+C6nOC6sjogJy9tLzA5ZF9yJyxcclxuICDguqXgurvgupTgu4Pguqvguo3gu4g6ICcvbS8wazRqJyxcclxuICDgu4Tgup/guojgurDguqXgurLguojguq3gupk6ICcvbS8wMTVxZmYnLFxyXG4gIOC6muC7iOC6reC6meC6guC7ieC6suC6oeC6l+C6suC6hzogJy9tLzAxNHhjcycsXHJcbiAgJ+C6q+C6u+C6p+KAi+C6quC6teC6lOKAi+C6meC7ieC6s+KAi+C6lOC6seC6muKAi+C7gOC6nuC6teC6hyc6ICcvbS8wMXBuczAnLFxyXG4gIOC6l+C6suC6h+C6oeC7ieC6suC6peC6suC6jTogJy9tLzAxNHhjcycsXHJcbiAg4LqV4Lq74LuJ4LqZ4Lqb4Lqy4LqhOiAnL20vMGNkbDEnLFxyXG4gIOC6m+C7iOC6reC6h+C6hOC6p+C6seC6meC7hOC6nzogJy9tLzAxamtfNCcsXHJcbiAg4Lql4Lq74LqU4LuB4LqX4Lqj4Lqx4LqB4LuA4LqV4Lq1OiAnL20vMDEzeGxtJyxcclxuICDguqvgurvguqfgupTgurHguprgu4Dgup7gurXguoc6ICcvbS8wMXBuczAnLFxyXG4gIOC6q+C6u+C6p+C6lOC6seC6muC7gOC6nuC6teC6hzogJy9tLzAxcG5zMCcsXHJcblxyXG4gIC8vIOe8heeUuOivrVxyXG4gIOGAkOGAseGArOGAhOGAuuGAmeGAu+GArOGAuOGAnuGAreGAr+GAt+GAmeGAn+GAr+GAkOGAuuGAkOGAseGArOGAhOGAuuGAmeGAu+GArOGAuDogJy9tLzA5ZF9yJyxcclxuICDhgJnhgL7hgJDhgLrhgJDhgK3hgK/hgIThgLrhgJnhgLvhgKzhgLg6ICcvbS8wMnB2MTknLFxyXG4gIOGAnOGAmeGAuuGAuOGAhuGAreGAr+GAhOGAuuGAuOGAmOGAr+GAkOGAuuGAmeGAu+GArOGAuDogJy9tLzAxbXFkdCcsXHJcbiAg4YCh4YCV4YCE4YC64YCZ4YC74YCs4YC4OiAnL20vMDVzMnMnLFxyXG4gIOGAnuGAheGAuuGAleGAhOGAuuGAmeGAu+GArOGAuDogJy9tLzA3ajdyJyxcclxuICDhgJnhgLzhgIDhgLo6ICcvbS8wOHQ5Y18nLFxyXG4gIOGAleGAseGAq+GAgOGAuuGAleGAhOGAuuGAmeGAu+GArOGAuDogJy9tLzBncWJ0JyxcclxuICDhgJvhgL7hgKzhgLjhgIXhgLHhgKzhgIThgLrhgLg6ICcvbS8wMjVfdicsXHJcbiAg4YCR4YCU4YC64YC44YCV4YCE4YC64YCZ4YC74YCs4YC4OiAnL20vMGNkbDEnLFxyXG4gIOGAnuGAmOGArOGAnTogJy9tLzA1aDBuJyxcclxuICDhgJvhgLHhgJDhgLbhgIHhgL3hgJThgLrhgJnhgLvhgKzhgLg6ICcvbS8wajJreCcsXHJcbiAg4YCQ4YCx4YCs4YCE4YC64YCZ4YC74YCs4YC4OiAnL20vMDlkX3InLFxyXG4gIOGAkOGAseGArOGAhOGAuuGAkOGAveGAsTogJy9tLzA5ZF9yJyxcclxuICDhgJvhgLHhgJDhgL3hgIThgLrhgLg6ICcvbS8wM2t0bTEnLFxyXG4gIOGAmeGAvOGAheGAuuGAmeGAu+GArOGAuDogJy9tLzA2Y25wJyxcclxuICDhgIDhgJnhgLrhgLjhgIHhgLzhgLHhgJnhgLvhgKzhgLg6ICcvbS8wYjN5cicsXHJcbiAg4YCU4YCx4YCZ4YCE4YC64YC4OiAnL20vMDZtX3AnLFxyXG4gIOGAmeGAveGAlOGAuuGAuDogJy9tLzA0d3ZfJyxcclxuICDhgIDhgLHhgKzhgIThgLrhgLjhgIDhgIThgLo6ICcvbS8wMWJxdnAnLFxyXG4gIOGAmuGArOGAieGAuuGAmeGAu+GArOGAuDogJy9tLzBrNGonLFxyXG4gIOGAgOGArOGAuOGAmeGAu+GArOGAuDogJy9tLzBrNGonLFxyXG4gIOGAheGAgOGAuuGAmOGAruGAuDogJy9tLzAxOTlnJyxcclxuICDhgIbhgK3hgK/hgIThgLrhgIDhgJrhgLrhgJnhgLvhgKzhgLg6ICcvbS8wNF9zdicsXHJcbiAg4YCV4YCF4YC64YCA4YCV4YC64YCA4YCs4YC44YCZ4YC74YCs4YC4OiAnL20vMGN2cTMnLFxyXG4gIOGAgOGAr+GAlOGAuuGAkOGAhOGAuuGAgOGArOGAuOGAmeGAu+GArOGAuDogJy9tLzBma3dqZycsXHJcbiAg4YCc4YC+4YCx4YCZ4YC74YCs4YC4OiAnL20vMDE5amQnLFxyXG4gIOGAh+GAreGAmeGAuuGAgeGAtuGAgOGArOGAuOGAmeGAu+GArOGAuDogJy9tLzAxbGN3NCcsXHJcbiAg4YCh4YCE4YC+4YCs4YC44YCa4YCs4YCJ4YC64YCZ4YC74YCs4YC4OiAnL20vMHBnNTInLFxyXG4gIOGAgOGAu+GAseGArOGAhOGAuuGAuOGAgOGArOGAuDogJy9tLzAyeXZoaicsXHJcbiAg4YCY4YCQ4YC64YCF4YC64YCA4YCs4YC4OiAnL20vMDFianYnLFxyXG4gIOGAhuGAseGArOGAgOGAuuGAnOGAr+GAleGAuuGAm+GAseGAuOGAmuGArOGAieGAujogJy9tLzAyZ3gxNycsXHJcbiAg4YCb4YCv4YCV4YC64YCV4YC94YCs4YC44YCQ4YCx4YCs4YC64YCZ4YC74YCs4YC4OiAnL20vMDEzXzFjJyxcclxuICDhgIXhgJnhgLrhgLjhgJvhgLE6ICcvbS8waDhsaGtnJyxcclxuICDhgJDhgLbhgJDhgKzhgLg6ICcvbS8wMTVrcicsXHJcbiAg4YCG4YCt4YCV4YC64YCB4YC2OiAnL20vMDFwaHE0JyxcclxuICDhgJnhgK3hgK/hgLjhgJnhgLvhgL7hgLHhgKzhgLrhgJDhgK3hgK/hgIDhgLo6ICcvbS8wNzljbCcsXHJcbiAg4YCQ4YCt4YCv4YCE4YC64YCZ4YC74YCs4YC4OiAnL20vMDFfbTcnLFxyXG4gIOGAm+GAseGArOGAhOGAuuGAheGAr+GAtuGAmeGAvuGAlOGAujogJy9tLzAxMXkyMycsXHJcbiAg4YCh4YCt4YCZ4YC6OiAnL20vMDNqbTUnLFxyXG4gIOGAkOGAreGAr+GAgOGAuuGAgeGAlOGAuuGAuOGAoeGAhuGAseGArOGAgOGAuuGAoeGApjogJy9tLzAxbmJsdCcsXHJcbiAg4YCZ4YCu4YC44YCh4YCt4YCZ4YC6OiAnL20vMDRoN2gnLFxyXG4gIOGAmOGAsOGAkOGArOGAm+GAr+GAtjogJy9tLzBweTI3JyxcclxuICDhgJXhgLzhgKw6ICcvbS8wMW42ZmQnLFxyXG4gIOGAmeGAruGAuOGAnuGAkOGAuuGAhuGAseGAuOGAmOGAsOGAuDogJy9tLzAxcG5zMCcsXHJcbiAg4YCA4YC84YCx4YCs4YC64YCE4YC84YCs4YCY4YCv4YCQ4YC6OiAnL20vMDFrbmpiJyxcclxuICDhgJzhgJnhgLrhgLjhgJnhgLvhgKzhgLg6ICcvbS8wNmdmaicsXHJcbiAg4YCc4YCw4YCA4YCw4YC44YCZ4YC74YCJ4YC64YC44YCA4YC84YCs4YC44YCZ4YC74YCs4YC4OiAnL20vMDE0eGNzJyxcclxuICDhgJnhgK7hgLjhgJXhgL3hgK3hgK/hgIThgLfhgLo6ICcvbS8wMTVxZmYnLFxyXG4gIOGAgOGArOGAuOGAguGAreGAr+GAkuGAseGAq+GAhOGAuuGAmeGAu+GArOGAuDogJy9tLzA4bDk0MScsXHJcbiAg4YCY4YCQ4YC64YCF4YC64YCA4YCs4YC44YCZ4YC+4YCQ4YC64YCQ4YCt4YCv4YCE4YC64YCZ4YC74YCs4YC4OiAnL20vMDFqd18xJyxcclxuICB0cmFmZmljY29uZXM6ICcvbS8wM3N5N3YnLFxyXG4gIOGAgOGArOGAuOGAleGAq+GAgOGAhOGAuuGAmeGAruGAkOGArDogJy9tLzAxNXFicCcsXHJcbiAg4YCc4YC+4YCx4YCA4YCs4YC4OiAnL20vMDFseW5oJyxcclxuICDhgJnhgK7hgLjhgIHhgK3hgK/hgLjhgIHhgLHhgKvhgIThgLrhgLjhgJDhgK3hgK/hgIThgLrhgJnhgLvhgKzhgLg6ICcvbS8wMWprXzQnLFxyXG4gIOGAkeGAveGAlOGAuuGAheGAgOGAuuGAmeGAu+GArOGAuDogJy9tLzAxM3hsbScsXHJcblxyXG4gIGZpcmVoeWRyYW50czogJy9tLzAxcG5zMCcsXHJcbiAgYnVzZXM6ICcvbS8wMWJqdicsXHJcbiAgdMOgdXRodXnhu4FuOiAnL20vMDE5amQnLFxyXG5cclxuICAvLyDpqazmnaXor61cclxuICBndW51bmdhdGF1YnVraXQ6ICcvbS8wOWRfcicsXHJcbiAgdGFuZGFiZXJoZW50aTogJy9tLzAycHYxOScsXHJcbiAgdGFuZGFqYWxhbjogJy9tLzAxbXFkdCcsXHJcbiAgdHVtYnVoYW46ICcvbS8wNXMycycsXHJcbiAgcG9rb2s6ICcvbS8wN2o3cicsXHJcbiAgcnVtcHV0OiAnL20vMDh0OWNfJyxcclxuICBwb2tva3JlbmVrOiAnL20vMGdxYnQnLFxyXG4gIGtha3R1czogJy9tLzAyNV92JyxcclxuICBwb2tva3BhbG1hOiAnL20vMGNkbDEnLFxyXG4gIGFsYW1zZW11bGFqYWRpOiAnL20vMDVoMG4nLFxyXG4gIGFpcnRlcmp1bjogJy9tLzBqMmt4JyxcclxuICBwZXJndW51bmdhbjogJy9tLzA5ZF9yJyxcclxuICBidWtpdGJ1a2F1OiAnL20vMDlkX3InLFxyXG4gIGJhZGFuYWlyOiAnL20vMDNrdG0xJyxcclxuICAnc3VuZ2FpLXN1bmdhaSc6ICcvbS8wNmNucCcsXHJcbiAgcGFudGFpOiAnL20vMGIzeXInLFxyXG4gIG1hdGFoYXJpOiAnL20vMDZtX3AnLFxyXG4gIEJ1bGFuOiAnL20vMDR3dl8nLFxyXG4gIGxhbmdpdDogJy9tLzAxYnF2cCcsXHJcbiAga2VuZGVyYWFuOiAnL20vMGs0aicsXHJcbiAga2VyZXRhOiAnL20vMGs0aicsXHJcbiAgYmFzaWthbDogJy9tLzAxOTlnJyxcclxuICBtb3Rvc2lrYWw6ICcvbS8wNF9zdicsXHJcbiAgdHJha3Bpa2FwOiAnL20vMGN2cTMnLFxyXG4gIHRyYWtrb21lcnNpYWw6ICcvbS8wZmt3amcnLFxyXG4gIGJvdDogJy9tLzAxOWpkJyxcclxuICBsaW1vc2luOiAnL20vMDFsY3c0JyxcclxuICB0ZWtzaTogJy9tLzBwZzUyJyxcclxuICBiYXNzZWtvbGFoOiAnL20vMDJ5dmhqJyxcclxuICBiYXM6ICcvbS8wMWJqdicsXHJcbiAga2VuZGVyYWFucGVtYmluYWFuOiAnL20vMDJneDE3JyxcclxuICAncGF0dW5nLXBhdHVuZyc6ICcvbS8wMTNfMWMnLFxyXG4gIGFpcnBhbmN1dDogJy9tLzBoOGxoa2cnLFxyXG4gIGphbWJhdGFuOiAnL20vMDE1a3InLFxyXG4gIGpldGk6ICcvbS8wMXBocTQnLFxyXG4gIGJhbmd1bmFucGVuY2FrYXJsYW5naXQ6ICcvbS8wNzljbCcsXHJcbiAgdGlhbmdhdGF1dGlhbmc6ICcvbS8wMV9tNycsXHJcbiAga2FjYWJlcndhcm5hOiAnL20vMDExeTIzJyxcclxuICBydW1haDogJy9tLzAzam01JyxcclxuICBiYW5ndW5hbmFuYXBhcnRtZW46ICcvbS8wMW5ibHQnLFxyXG4gIHJ1bWFoY2FoYXlhOiAnL20vMDRoN2gnLFxyXG4gIHN0ZXNlbktlcmV0YXBpOiAnL20vMHB5MjcnLFxyXG4gIGFidTogJy9tLzAxbjZmZCcsXHJcbiAgYWZpcmVoeWRyYW50OiAnL20vMDFwbnMwJyxcclxuICBwYXBhbmlrbGFuOiAnL20vMDFrbmpiJyxcclxuICBqYWxhbnJheWE6ICcvbS8wNmdmaicsXHJcbiAgbGludGFzYW5wZWphbGFua2FraTogJy9tLzAxNHhjcycsXHJcbiAgbGFtcHVpc3lhcmF0OiAnL20vMDE1cWZmJyxcclxuICBwaW50dWdhcmFnZWQ6ICcvbS8wOGw5NDEnLFxyXG4gIHBlcmhlbnRpYW5iYXM6ICcvbS8wMWp3XzEnLFxyXG4gIEtvbnRyYWZpazogJy9tLzAzc3k3dicsXHJcbiAgbWV0ZXJ0ZW1wYXRsZXRha2tlcmV0YTogJy9tLzAxNXFicCcsXHJcbiAgdGFuZ2dhOiAnL20vMDFseW5oJyxcclxuICBjZXJvYm9uZ2FzYXA6ICcvbS8wMWprXzQnLFxyXG4gIHRyYWt0b3I6ICcvbS8wMTN4bG0nLFxyXG5cclxuICBwaWxpYm9tYmE6ICcvbS8wMXBuczAnLFxyXG4gIHNlcm9tYm9uZ2FzYXA6ICcvbS8wMWprXzQnLFxyXG5cclxuICBzdG9wc2lnbnM6ICcvbS8wMnB2MTknLFxyXG4gIHN0cmVldHNpZ25zOiAnL20vMDFtcWR0JyxcclxuICBwbGFudHM6ICcvbS8wNXMycycsXHJcbiAgdHJlZXM6ICcvbS8wN2o3cicsXHJcbiAgZ3Jhc3M6ICcvbS8wOHQ5Y18nLFxyXG4gIHNocnViczogJy9tLzBncWJ0JyxcclxuICBjYWN0dXM6ICcvbS8wMjVfdicsXHJcbiAgcGFsbXRyZWVzOiAnL20vMGNkbDEnLFxyXG4gIG5hdHVyZTogJy9tLzA1aDBuJyxcclxuICB3YXRlcmZhbGxzOiAnL20vMGoya3gnLFxyXG4gIG1vdW50YWluc29yaGlsbHM6ICcvbS8wOWRfcicsXHJcbiAgYm9kaWVzb2Z3YXRlcjogJy9tLzAza3RtMScsXHJcbiAgcml2ZXJzOiAnL20vMDZjbnAnLFxyXG4gIGJlYWNoZXM6ICcvbS8wYjN5cicsXHJcbiAgdGhlU3VuOiAnL20vMDZtX3AnLFxyXG4gIHRoZU1vb246ICcvbS8wNHd2XycsXHJcbiAgdGhlc2t5OiAnL20vMDFicXZwJyxcclxuICB2ZWhpY2xlczogJy9tLzBrNGonLFxyXG4gIGNhcnM6ICcvbS8wazRqJyxcclxuICBiaWN5Y2xlczogJy9tLzAxOTlnJyxcclxuICBtb3RvcmN5Y2xlczogJy9tLzA0X3N2JyxcclxuICBwaWNrdXB0cnVja3M6ICcvbS8wY3ZxMycsXHJcbiAgY29tbWVyY2lhbHRydWNrczogJy9tLzBma3dqZycsXHJcbiAgYm9hdHM6ICcvbS8wMTlqZCcsXHJcbiAgbGltb3VzaW5lczogJy9tLzAxbGN3NCcsXHJcbiAgdGF4aXM6ICcvbS8wcGc1MicsXHJcbiAgc2Nob29sYnVzOiAnL20vMDJ5dmhqJyxcclxuICBidXM6ICcvbS8wMWJqdicsXHJcbiAgY29uc3RydWN0aW9udmVoaWNsZTogJy9tLzAyZ3gxNycsXHJcbiAgc3RhdHVlczogJy9tLzAxM18xYycsXHJcbiAgZm91bnRhaW5zOiAnL20vMGg4bGhrZycsXHJcbiAgYnJpZGdlczogJy9tLzAxNWtyJyxcclxuICBwaWVyOiAnL20vMDFwaHE0JyxcclxuICBza3lzY3JhcGVyOiAnL20vMDc5Y2wnLFxyXG4gIHBpbGxhcnNvcmNvbHVtbnM6ICcvbS8wMV9tNycsXHJcbiAgc3RhaW5lZGdsYXNzOiAnL20vMDExeTIzJyxcclxuICBhaG91c2U6ICcvbS8wM2ptNScsXHJcbiAgYW5hcGFydG1lbnRidWlsZGluZzogJy9tLzAxbmJsdCcsXHJcbiAgYWxpZ2h0aG91c2U6ICcvbS8wNGg3aCcsXHJcbiAgYXRyYWluc3RhdGlvbjogJy9tLzBweTI3JyxcclxuICBhc2hlZDogJy9tLzAxbjZmZCcsXHJcbiAgYWZpcmVoeWRyYW50OiAnL20vMDFwbnMwJyxcclxuICBhYmlsbGJvYXJkOiAnL20vMDFrbmpiJyxcclxuICByb2FkczogJy9tLzA2Z2ZqJyxcclxuICBjcm9zc3dhbGtzOiAnL20vMDE0eGNzJyxcclxuICB0cmFmZmljbGlnaHRzOiAnL20vMDE1cWZmJyxcclxuICBnYXJhZ2Vkb29yczogJy9tLzA4bDk0MScsXHJcbiAgYnVzc3RvcHM6ICcvbS8wMWp3XzEnLFxyXG4gIHRyYWZmaWNjb25lczogJy9tLzAzc3k3dicsXHJcbiAgcGFya2luZ21ldGVyczogJy9tLzAxNXFicCcsXHJcbiAgc3RhaXJzOiAnL20vMDFseW5oJyxcclxuICBjaGltbmV5czogJy9tLzAxamtfNCcsXHJcbiAgdHJhY3RvcnM6ICcvbS8wMTN4bG0nLFxyXG5cclxuICDot6/moIc6ICcvbS8wMW1xZHQnLFxyXG4gIOiKsTogJy9tLzBjOXBoNScsXHJcbiAg5qCR5pyoOiAnL20vMDdqN3InLFxyXG5cclxuICDmo5XmpojmoJE6ICcvbS8wY2RsMScsXHJcblxyXG4gIOeAkeW4gzogJy9tLzBqMmt4JyxcclxuICDlsbE6ICcvbS8wOWRfcicsXHJcbiAg5rC05Z+fOiAnL20vMDNrdG0xJyxcclxuICDmsrPmtYE6ICcvbS8wNmNucCcsXHJcbiAg5rW35rupOiAnL20vMGIzeXInLFxyXG4gIOWkqumYszogJy9tLzA2bV9wJyxcclxuICDmnIjkuq46ICcvbS8wNHd2XycsXHJcbiAg5aSp56m6OiAnL20vMDFicXZwJyxcclxuICDkuqTpgJrlt6Xlhbc6ICcvbS8wazRqJyxcclxuICAvLyBcIuS6pOmAmuW3peWFt1wiOiBcIi9tLzA3eXY5XCIsXHJcbiAg5bCP6L2/6L2mOiAnL20vMGs0aicsXHJcbiAg5py65Yqo6L2mOiAnL20vMGs0aicsXHJcbiAg6Ieq6KGM6L2mOiAnL20vMDE5OWcnLFxyXG4gIOaRqeaJmOi9pjogJy9tLzA0X3N2JyxcclxuICDnmq7ljaHovaY6ICcvbS8wY3ZxMycsXHJcbiAg5ZWG55So5Y2h6L2mOiAnL20vMGZrd2pnJyxcclxuICDoiLk6ICcvbS8wMTlqZCcsXHJcbiAg6LGq5Y2O6L2/6L2mOiAnL20vMDFsY3c0JyxcclxuICDlh7rnp5/ovaY6ICcvbS8wcGc1MicsXHJcbiAg5qCh6L2mOiAnL20vMDJ5dmhqJyxcclxuICDlhazkuqTovaY6ICcvbS8wMWJqdicsXHJcbiAg54Gr6L2mOiAnL20vMDdqZHInLFxyXG4gIOaWveW3pei9pui+hjogJy9tLzAyZ3gxNycsXHJcbiAg6ZuV5YOPOiAnL20vMDEzXzFjJyxcclxuICDllrfms4k6ICcvbS8waDhsaGtnJyxcclxuICDmoaU6ICcvbS8wMTVrcicsXHJcbiAg56CB5aS0OiAnL20vMDFwaHE0JyxcclxuICDmkanlpKnlpKfmpbw6ICcvbS8wNzljbCcsXHJcbiAg5p+x5a2QOiAnL20vMDFfbTcnLFxyXG4gIOW9qeiJsueOu+eSgzogJy9tLzAxMXkyMycsXHJcbiAg5oi/5bGLOiAnL20vMDNqbTUnLFxyXG4gIOWFrOWvk+alvDogJy9tLzAxbmJsdCcsXHJcbiAg54Gv5aGUOiAnL20vMDRoN2gnLFxyXG4gIOeBq+i9puermTogJy9tLzBweTI3JyxcclxuICDpga7mo5o6ICcvbS8wMW42ZmQnLFxyXG4gIOa2iOmYsuagkzogJy9tLzAxcG5zMCcsXHJcbiAg5raI54Gr5qCTOiAnL20vMDFwbnMwJyxcclxuICDlub/lkYrniYw6ICcvbS8wMWtuamInLFxyXG4gIOmBk+i3rzogJy9tLzA2Z2ZqJyxcclxuICDkurrooYzmqKrpgZM6ICcvbS8wMTR4Y3MnLFxyXG4gIOi/h+ihl+S6uuihjOmBkzogJy9tLzAxNHhjcycsXHJcbiAg57qi57u/54GvOiAnL20vMDE1cWZmJyxcclxuICDovablupPpl6g6ICcvbS8wOGw5NDEnLFxyXG4gIOWFrOS6pOermTogJy9tLzAxandfMScsXHJcbiAg6ZSl5b2i5Lqk6YCa6Lev5qCHOiAnL20vMDNzeTd2JyxcclxuICDlgZzovaborqHml7blmag6ICcvbS8wMTVxYnAnLFxyXG4gIOWBnOi9puiuoeS7t+ihqDogJy9tLzAxNXFicCcsXHJcbiAg5qW85qKvOiAnL20vMDFseW5oJyxcclxuICDng5/lm7E6ICcvbS8wMWprXzQnLFxyXG4gIOaLluaLieacujogJy9tLzAxM3hsbScsXHJcblxyXG4gIOWBnOi9puagh+W/lzogJy9tLzAycHYxOScsXHJcbiAg6Lev54mMOiAnL20vMDFtcWR0JyxcclxuICDmpI3niak6ICcvbS8wNXMycycsXHJcbiAg5qCROiAnL20vMDdqN3InLFxyXG4gIOiNiTogJy9tLzA4dDljXycsXHJcbiAg5qOV5qaI5qCROiAnL20vMGNkbDEnLFxyXG4gIOiHqueEtjogJy9tLzA1aDBuJyxcclxuICDkuJjpmbU6ICcvbS8wOWRfcicsXHJcbiAg5rC05L2TOiAnL20vMDNrdG0xJyxcclxuICDmtbfmu6k6ICcvbS8wYjN5cicsXHJcbiAg5aSp56m6OiAnL20vMDFicXZwJyxcclxuICDovabovoY6ICcvbS8wazRqJyxcclxuICDmsb3ovaY6ICcvbS8wazRqJyxcclxuICDmkanmiZjovaY6ICcvbS8wNF9zdicsXHJcbiAg5ZWG5Lia5Y2h6L2mOiAnL20vMGZrd2pnJyxcclxuICDosarljY7ovb/ovaY6ICcvbS8wMWxjdzQnLFxyXG4gIOWFrOWFseaxvei9pjogJy9tLzAxYmp2JyxcclxuICDlu7rnrZHovabovoY6ICcvbS8wMmd4MTcnLFxyXG4gIOmbleWDjzogJy9tLzAxM18xYycsXHJcbiAg5pSv5p+x5p+xOiAnL20vMDFfbTcnLFxyXG4gIOW9qeiJsueOu+eSgzogJy9tLzAxMXkyMycsXHJcbiAg5oi/5a2QOiAnL20vMDNqbTUnLFxyXG4gIOeBsOeDrDogJy9tLzAxbjZmZCcsXHJcbiAg5raI54Gr5qCTOiAnL20vMDFwbnMwJyxcclxuICDpgZPot686ICcvbS8wNmdmaicsXHJcbiAg5Lq66KGM5qiq6YGTOiAnL20vMDE0eGNzJyxcclxuICDkuqTpgJrnga86ICcvbS8wMTVxZmYnLFxyXG4gIOi9puW6k+mXqDogJy9tLzA4bDk0MScsXHJcbiAg5be05aOr56uZOiAnL20vMDFqd18xJyxcclxuICDkuqTpgJrplKU6ICcvbS8wM3N5N3YnLFxyXG4gIOWBnOi9puWSquihqDogJy9tLzAxNXFicCcsXHJcbiAg5qW85qKvOiAnL20vMDFseW5oJyxcclxuICDng5/lm7E6ICcvbS8wMWprXzQnLFxyXG5cclxuICDtmqHri6jrs7Trj4Q6ICcvbS8wMTR4Y3MnLFxyXG4gIOyekOuPmeywqDogJy9tLzBrNGonLFxyXG4gIOyekOyghOqxsDogJy9tLzAxOTlnJyxcclxuICDrsoTsiqQ6ICcvbS8wMWJqdicsXHJcbiAg7Iug7Zi465OxOiAnL20vMDE1cWZmJyxcclxuICDqs4Tri6g6ICcvbS8wMWx5bmgnLFxyXG4gIOyGjO2ZlOyghDogJy9tLzAxcG5zMCcsXHJcbiAg6rW065qdOiAnL20vMDFqa180JyxcclxuICDsmKTthqDrsJTsnbQ6ICcvbS8wNF9zdicsXHJcbiAg7LCo65+JOiAnL20vMGs0aicsXHJcbiAg6rWQ6rCBOiAnL20vMDFwaHE0J1xyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3Byb21pc2UgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9wcm9taXNlXCIpO1xuXG52YXIgX3Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvbWlzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgX3Byb21pc2UyLmRlZmF1bHQoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gc3RlcChrZXksIGFyZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcHJvbWlzZTIuZGVmYXVsdC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RlcChcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHN0ZXAoXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGVwKFwibmV4dFwiKTtcbiAgICB9KTtcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjYuMTInIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBoYXMoZXhwb3J0cywga2V5KSkgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG4iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiBjb3JlLnZlcnNpb24sXG4gIG1vZGU6IHJlcXVpcmUoJy4vX2xpYnJhcnknKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDIwIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIEQpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbmF2aWdhdG9yID0gZ2xvYmFsLm5hdmlnYXRvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnJztcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4vX3VzZXItYWdlbnQnKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52OCB8fCAnJztcbnZhciAkUHJvbWlzZSA9IGdsb2JhbFtQUk9NSVNFXTtcbnZhciBpc05vZGUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBlbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBJbnRlcm5hbCwgbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmY7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHZhciBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgICB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpXG4gICAgICAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2VcbiAgICAgIC8vIHY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgICAgLy8gd2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICAgICYmIHY4LmluZGV4T2YoJzYuNicpICE9PSAwXG4gICAgICAmJiB1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lLzY2JykgPT09IC0xO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuLCBleGl0ZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIG1heSB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaSkgcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKSBvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIHVuaGFuZGxlZCA9IGlzVW5oYW5kbGVkKHByb21pc2UpO1xuICAgIHZhciByZXN1bHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYgKHVuaGFuZGxlZCkge1xuICAgICAgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKSB7XG4gICAgICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodW5oYW5kbGVkICYmIHJlc3VsdC5lKSB0aHJvdyByZXN1bHQudjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgcmV0dXJuIHByb21pc2UuX2ggIT09IDEgJiYgKHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYykubGVuZ3RoID09PSAwO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtdHJ5XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUHJvbWlzZScsIHsgJ3RyeSc6IGZ1bmN0aW9uIChjYWxsYmFja2ZuKSB7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYodGhpcyk7XG4gIHZhciByZXN1bHQgPSBwZXJmb3JtKGNhbGxiYWNrZm4pO1xuICAocmVzdWx0LmUgPyBwcm9taXNlQ2FwYWJpbGl0eS5yZWplY3QgOiBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlKShyZXN1bHQudik7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufSB9KTtcbiIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9IChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG5cbi8vIFVzZSBgZ2V0T3duUHJvcGVydHlOYW1lc2AgYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgY2FsbGluZ1xuLy8gYGhhc093blByb3BlcnR5YCBvbiB0aGUgZ2xvYmFsIGBzZWxmYCBvYmplY3QgaW4gYSB3b3JrZXIuIFNlZSAjMTgzLlxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJlxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7XG5cbi8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cbnZhciBvbGRSdW50aW1lID0gaGFkUnVudGltZSAmJiBnLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuLy8gRm9yY2UgcmVldmFsdXRhdGlvbiBvZiBydW50aW1lLmpzLlxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcblxuaWYgKGhhZFJ1bnRpbWUpIHtcbiAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcnVudGltZS5cbiAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBvbGRSdW50aW1lO1xufSBlbHNlIHtcbiAgLy8gUmVtb3ZlIHRoZSBnbG9iYWwgcHJvcGVydHkgYWRkZWQgYnkgcnVudGltZS5qcy5cbiAgdHJ5IHtcbiAgICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIH0gY2F0Y2goZSkge1xuICAgIGcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi4gSWYgdGhlIFByb21pc2UgaXMgcmVqZWN0ZWQsIGhvd2V2ZXIsIHRoZVxuICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgICAvLyB0aHJvd24gYmFjayBpbnRvIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIGFzIGlzIHRoZSBjYXNlXG4gICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAgIC8vIGFsbG93cyB0aGUgY29uc3VtZXIgdG8gZGVjaWRlIHdoYXQgdG8gZG8gd2l0aCB0aGUgeWllbGRlZFxuICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgICAgLy8gYXdhaXQsIGJ5IGNvbnRyYXN0LCB0aGVyZSBpcyBubyBvcHBvcnR1bml0eSB0byBleGFtaW5lIHRoZVxuICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgICAvLyBsZXQgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiBoYW5kbGUgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpXG4pO1xuIiwiLyoqXG4gKiDmqKHmi5/nnJ/lrp7pvKDmoIfnp7vliqjnmoTlh73mlbBcbiAqIEBwYXJhbSBlbCDnm67moIflhYPntKBcbiAqIEBwYXJhbSB0YXJnZXRQb2ludCDlj6/pgInnmoTnm67moIfngrnlnZDmoIfvvIjnm7jlr7nkuo7lhYPntKDlt6bkuIrop5LvvInvvIzkuI3mjIflrprliJnpmo/mnLrpgInmi6lcbiAqIEBwYXJhbSBvcHRpb25zIOmFjee9rumAiemhuVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2ltdWxhdGVNb3VzZU1vdmUoXG4gICAgZWw6IEhUTUxFbGVtZW50LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgdGFyZ2V0UG9pbnQ/OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0sXG4gICAgICAgIGR1cmF0aW9uPzogbnVtYmVyOyAgICAgIC8vIOenu+WKqOaAu+aXtumVv++8iOavq+enku+8iVxuICAgICAgICBzdGVwcz86IG51bWJlcjsgICAgICAgICAvLyDnp7vliqjmraXmlbBcbiAgICAgICAgaHVtYW5MaWtlPzogYm9vbGVhbjsgICAgLy8g5piv5ZCm5qih5ouf5Lq657G755qE5LiN6KeE5YiZ56e75YqoXG4gICAgICAgIHN0YXJ0UmFuZG9tPzogYm9vbGVhbjsgIC8vIOaYr+WQpuS7jumaj+acuui1t+eCueW8gOWni1xuICAgIH0gPSB7fVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gMTUwMCxcbiAgICAgICAgICAgIHN0ZXBzID0gNjAsXG4gICAgICAgICAgICBodW1hbkxpa2UgPSB0cnVlLFxuICAgICAgICAgICAgc3RhcnRSYW5kb20gPSB0cnVlXG4gICAgICAgIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNpbXVsYXRlTW91c2VNb3ZlXCIsIGB0aW1lOiAke2R1cmF0aW9ufWApXG4gICAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAvLyDorqHnrpfotbflp4vngrnlkoznm67moIfngrlcbiAgICAgICAgbGV0IHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlcjtcbiAgICAgICAgbGV0IGVuZFg6IG51bWJlciwgZW5kWTogbnVtYmVyO1xuXG4gICAgICAgIGlmIChzdGFydFJhbmRvbSkge1xuICAgICAgICAgICAgLy8g5LuO6ZqP5py66LW354K55byA5aeLXG4gICAgICAgICAgICBzdGFydFggPSBNYXRoLnJhbmRvbSgpICogcmVjdC53aWR0aDtcbiAgICAgICAgICAgIHN0YXJ0WSA9IE1hdGgucmFuZG9tKCkgKiByZWN0LmhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOS7juW9k+WJjeS9jee9ruaIluWFg+e0oOS4reW/g+W8gOWni1xuICAgICAgICAgICAgc3RhcnRYID0gcmVjdC53aWR0aCAvIDI7XG4gICAgICAgICAgICBzdGFydFkgPSByZWN0LmhlaWdodCAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFyZ2V0UG9pbnQgPSBvcHRpb25zPy50YXJnZXRQb2ludFxuICAgICAgICBpZiAodGFyZ2V0UG9pbnQpIHtcbiAgICAgICAgICAgIGVuZFggPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0YXJnZXRQb2ludC54LCByZWN0LndpZHRoKSk7XG4gICAgICAgICAgICBlbmRZID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGFyZ2V0UG9pbnQueSwgcmVjdC5oZWlnaHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOmaj+acuuebruagh+eCuVxuICAgICAgICAgICAgZW5kWCA9IE1hdGgucmFuZG9tKCkgKiByZWN0LndpZHRoO1xuICAgICAgICAgICAgZW5kWSA9IE1hdGgucmFuZG9tKCkgKiByZWN0LmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOi0neWhnuWwlOabsue6v+aOp+WItueCue+8iOeUqOS6juaooeaLn+S6uuexu+enu+WKqOeahOS4jeinhOWImeaAp++8iVxuICAgICAgICBjb25zdCBjb250cm9sUG9pbnRzID0gaHVtYW5MaWtlID8gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IHN0YXJ0WCArIChlbmRYIC0gc3RhcnRYKSAqIDAuMyArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIHJlY3Qud2lkdGggKiAwLjIsXG4gICAgICAgICAgICAgICAgeTogc3RhcnRZICsgKGVuZFkgLSBzdGFydFkpICogMC4zICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogcmVjdC5oZWlnaHQgKiAwLjJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogc3RhcnRYICsgKGVuZFggLSBzdGFydFgpICogMC43ICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogcmVjdC53aWR0aCAqIDAuMixcbiAgICAgICAgICAgICAgICB5OiBzdGFydFkgKyAoZW5kWSAtIHN0YXJ0WSkgKiAwLjcgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiByZWN0LmhlaWdodCAqIDAuMlxuICAgICAgICAgICAgfVxuICAgICAgICBdIDogbnVsbDtcblxuICAgICAgICBsZXQgY3VycmVudFN0ZXAgPSAwO1xuICAgICAgICBjb25zdCBzdGVwRHVyYXRpb24gPSBkdXJhdGlvbiAvIHN0ZXBzO1xuXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVTdGVwKCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGVwID4gc3RlcHMpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IGN1cnJlbnRTdGVwIC8gc3RlcHM7XG5cbiAgICAgICAgICAgIC8vIOiuoeeul+W9k+WJjeWdkOagh1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRYOiBudW1iZXIsIGN1cnJlbnRZOiBudW1iZXI7XG5cbiAgICAgICAgICAgIGlmIChodW1hbkxpa2UgJiYgY29udHJvbFBvaW50cykge1xuICAgICAgICAgICAgICAgIC8vIOS9v+eUqOS6jOasoei0neWhnuWwlOabsue6v+WIm+W7uuabtOiHqueEtueahOenu+WKqOi9qOi/uVxuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBwcm9ncmVzcztcbiAgICAgICAgICAgICAgICBjb25zdCBtdCA9IDEgLSB0O1xuICAgICAgICAgICAgICAgIGN1cnJlbnRYID1cbiAgICAgICAgICAgICAgICAgICAgbXQgKiBtdCAqIG10ICogc3RhcnRYICtcbiAgICAgICAgICAgICAgICAgICAgMyAqIG10ICogbXQgKiB0ICogY29udHJvbFBvaW50c1swXS54ICtcbiAgICAgICAgICAgICAgICAgICAgMyAqIG10ICogdCAqIHQgKiBjb250cm9sUG9pbnRzWzFdLnggK1xuICAgICAgICAgICAgICAgICAgICB0ICogdCAqIHQgKiBlbmRYO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFkgPVxuICAgICAgICAgICAgICAgICAgICBtdCAqIG10ICogbXQgKiBzdGFydFkgK1xuICAgICAgICAgICAgICAgICAgICAzICogbXQgKiBtdCAqIHQgKiBjb250cm9sUG9pbnRzWzBdLnkgK1xuICAgICAgICAgICAgICAgICAgICAzICogbXQgKiB0ICogdCAqIGNvbnRyb2xQb2ludHNbMV0ueSArXG4gICAgICAgICAgICAgICAgICAgIHQgKiB0ICogdCAqIGVuZFk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOe6v+aAp+enu+WKqFxuICAgICAgICAgICAgICAgIGN1cnJlbnRYID0gc3RhcnRYICsgKGVuZFggLSBzdGFydFgpICogcHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgY3VycmVudFkgPSBzdGFydFkgKyAoZW5kWSAtIHN0YXJ0WSkgKiBwcm9ncmVzcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5re75Yqg5LiA5Lqb6ZqP5py65oqW5Yqo77yM5L2/56e75Yqo5pu055yf5a6eXG4gICAgICAgICAgICBpZiAoaHVtYW5MaWtlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgaml0dGVyWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDM7XG4gICAgICAgICAgICAgICAgY29uc3Qgaml0dGVyWSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDM7XG4gICAgICAgICAgICAgICAgY3VycmVudFggKz0gaml0dGVyWDtcbiAgICAgICAgICAgICAgICBjdXJyZW50WSArPSBqaXR0ZXJZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDorqHnrpfnm7jlr7nkuo7op4blj6PnmoTnu53lr7nlnZDmoIdcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudFggPSByZWN0LmxlZnQgKyBjdXJyZW50WDtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudFkgPSByZWN0LnRvcCArIGN1cnJlbnRZO1xuXG4gICAgICAgICAgICAvLyDliJvlu7rlubbop6blj5HpvKDmoIfnp7vliqjkuovku7ZcbiAgICAgICAgICAgIGNvbnN0IG1vdXNlTW92ZUV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNlbW92ZScsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogd2luZG93LFxuICAgICAgICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgICAgICAgY2xpZW50WSxcbiAgICAgICAgICAgICAgICBtb3ZlbWVudFg6IDAsXG4gICAgICAgICAgICAgICAgbW92ZW1lbnRZOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChtb3VzZU1vdmVFdmVudCk7XG5cbiAgICAgICAgICAgIC8vIOWmguaenOaYr+esrOS4gOatpe+8jOWFiOinpuWPkeS4gOS4qum8oOagh+i/m+WFpeS6i+S7tlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGVwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW91c2VFbnRlckV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNlZW50ZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IHdpbmRvdyxcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WDogcmVjdC5sZWZ0ICsgc3RhcnRYLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRZOiByZWN0LnRvcCArIHN0YXJ0WVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobW91c2VFbnRlckV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5aaC5p6c5piv5pyA5ZCO5LiA5q2l77yM6Kem5Y+R6byg5qCH5oKs5YGc5LqL5Lu2XG4gICAgICAgICAgICBpZiAoY3VycmVudFN0ZXAgPT09IHN0ZXBzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW91c2VPdmVyRXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2VvdmVyJywge1xuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiB3aW5kb3csXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG1vdXNlT3ZlckV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3VycmVudFN0ZXArKztcbiAgICAgICAgICAgIHNldFRpbWVvdXQobW92ZVN0ZXAsIHN0ZXBEdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBtb3ZlU3RlcCgpO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgbGV0IGlzUmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghaXNSZXNvbHZlZCkge1xuICAgICAgICAgICAgICAgIGlzUmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogJ3F1ZXJ5Q3VycmVudFVybCcgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgaWYgKCFpc1Jlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuaW1wb3J0IHtcbiAgZ2V0QmFsYW5jZSxcbiAgd2FpdERvLFxuICB3YWl0Zm9yYmFja2dyb3VuZCxcbiAgaW1hZ2VyZWFkeSxcbiAgd2FpdEZvcixcbiAgbm90bmVlZGNvbnRpbnVlLFxuICBkZWxheSxcbiAgc3JjMmJhc2U2NCxcbiAgZ2V0Y29uZmlnLFxuICBwb3N0LFxuICBnZXQsXG4gIGNhcHRjaGFDbGFzc2lmaWNhdGlvbixcbiAgbWVzc2FnZSxcbiAgbWVzc2FnZUhpZGUsXG4gIGdldENsaWNrVGltZSxcbiAgZ2V0SXNCbGFja1doaXRlUGFzc1xufSBmcm9tICcuLi9jb21tb24nXG5pbXBvcnQgeyBnZXRQYXJlbnRVcmwgfSBmcm9tICcuLi90b29sJ1xuaW1wb3J0IHsganNvbmFsbCB9IGZyb20gJy4uL2pzb25hbGwnXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnXG5jb25zdCBnZXRXb3JkcyA9IChrZXkpID0+IGNocm9tZS5pMThuLmdldE1lc3NhZ2Uoa2V5KVxuaWYgKCFjb25maWcuZGV2ZWxvcCkgd2luZG93LmNvbnNvbGUubG9nID0gZnVuY3Rpb24gKCkgeyB9Oy8vIOa4hemZpOiwg+ivleS7o+eggVxuKGFzeW5jICgpID0+IHtcbiAgaWYgKHdpbmRvdy5pbmplY3QgPT09IHRydWUpIHsgLy8g5aaC5p6c5bey57uP5rOo5YWl6L+H5LqG5bCx5LiN5YaN5rOo5YWlXG4gICAgcmV0dXJuXG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmluamVjdCA9IHRydWVcbiAgfVxuICBjb25zdCBjb25maWcgPSBhd2FpdCBnZXRjb25maWcoKVxuICBjb25zdCBpc0JsYWNrV2hpdGVQYXNzID0gYXdhaXQgZ2V0SXNCbGFja1doaXRlUGFzcyhjb25maWcpXG4gIGlmICghaXNCbGFja1doaXRlUGFzcykgcmV0dXJuXG4gIGxldCB0aW1lcyA9IGNvbmZpZy50aW1lc1xuICAvLyBjb25zb2xlLmxvZyhjb25maWcpXG4gIGlmICghY29uZmlnLmF1dG9ydW4pIHJldHVyblxuXG4gIGxldCBkb2N1bWVudE9iaiA9IGF3YWl0IGNhcHRjaGFDbGFzc2lmaWNhdGlvbigpIC8vIOmhtemdouexu+Wei+WvueixoVxuICAvLyBtZXNzYWdlKHsgdGV4dDogJ+iHquWKqOivhuWIq+W3sue7j+WQr+WKqCcsIGNvbG9yOiAnZ3JlZW4nIH0pXG4gIGlmICghY29uZmlnLmNsaWVudEtleSkge1xuICAgIGNvbnNvbGUubG9nKCfor7flhYjphY3nva5jbGllbnRLZXknKVxuICAgIC8vIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYSBjbGllbnQga2V5JylcbiAgICBtZXNzYWdlKHsgdGV4dDogZ2V0V29yZHMoJ2NvbnRlbnRfbWVzc2FnZV8wJyksIGNvbG9yOiAncmVkJyB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQubG9jYXRpb24pXG5cbiAgaWYgKCFkb2N1bWVudE9iaiB8fCAhY29uZmlnW2RvY3VtZW50T2JqWyd0aXRsZSddXSkge1xuICAgIC8vIG1lc3NhZ2VIaWRlKClcblxuICAgIC8vIHZhciBpZnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJylcbiAgICAvLyBpZnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGlmcmFtZSkge1xuICAgIC8vIOehruWumuaYr2hjYXB0Y2hh5qih5byPXG4gICAgLy8gaWYgKGlmcmFtZS5zcmMuaW5kZXhPZignaGNhcHRjaGEuY29tJykgPiAtMSkge1xuXG4gICAgLy8gICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGFzeW5jIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAvLyAgICAgaWYoZXZlbnQuZGF0YT09J3N0YXJ0Jyl7XG5cbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG5cbiAgICAvLyB9KVxuXG5cbiAgICAvLyByZWNhcHRjaGHnmoRpbnZpc2libGXmqKHlvI9cbiAgICBhd2FpdCB3YWl0Rm9yKCdpZnJhbWVbc3JjKj1cImJmcmFtZVwiXScpXG4gICAgdmFyIGYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWVbc3JjKj1cImJmcmFtZVwiXScpXG4gICAgaWYgKGYpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYXN5bmMgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5kYXRhID09ICdyZWFkeScpIHtcblxuICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBhd2FpdCBkZWxheSh0aW1lcyAqIDEwKVxuICAgICAgICAgICAgaWYgKCFmLnBhcmVudEVsZW1lbnQgfHwgIWYucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGlzSGlkZGVuID0gZi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9PSAnaGlkZGVuJ1xuICAgICAgICAgICAgaWYgKCFpc0hpZGRlbikge1xuICAgICAgICAgICAgICBmLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoJ0RvT2NyJywgJyonKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IGRlbGF5KDIwMDApIC8vIOetieW+hTHnp5JcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIC8vIG1lc3NhZ2UoeyB0ZXh0OiBnZXRXb3JkcygnY29udGVudF9tZXNzYWdlXzInKSwgY29sb3I6ICdncmVlbicgfSlcbiAgY29uc29sZS5sb2coJ2RvY3VtZW50T2JqJywgZG9jdW1lbnRPYmpbJ3RpdGxlJ10pXG4gIC8vIOaYvuekuuiHquWKqOivhuWIq+W3sue7j+WQr+WKqFxuXG4gIC8vIHJlQ2FwdGhjYeeahOeCueWHu+WLvumAiemAu+i+keWcqOWFtuS7luWcsOaWuVxuICAvLyBpZiAod2luZG93LnNlbGYubG9jYXRpb24uaHJlZi5tYXRjaCgvXFwvcmVjYXB0Y2hhXFwvKC4qPylcXC9hbmNob3JcXD8vKSA9PSBudWxsKSB7XG4gIC8vIC8vIOeCueWHu+aIkeaYr+S6uuexu1xuICAvLyAvLyAyMDIyMDMwMSAg562J5b6F5pi+56S65ZCO5omN54K55Ye7XG4gIC8vICAgd2hpbGUgKHZpc3VhbFZpZXdwb3J0LndpZHRoID09PSAwKSB7XG4gIC8vICAgICBhd2FpdCBkZWxheSh0aW1lcyAqIDEwKSAvLyDnrYnlvoUx56eSXG4gIC8vICAgfVxuICAvLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVja2JveCcpICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVja2JveCcpLmNsaWNrKClcbiAgLy8gICBkb2N1bWVudC5ib2R5LmNsaWNrKClcbiAgLy8gfVxuXG4gIC8vIHZhciBmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaWZyYW1lW3NyYyo9XCJiZnJhbWVcIl0nKVxuXG5cblxuICAvLyDmoLnmja7kuI3lkIznmoTpobXpnaLnsbvlnovvvIzov5vooYzkuI3lkIznmoTmk43kvZxcbiAgc3dpdGNoIChkb2N1bWVudE9ialsndGl0bGUnXSkge1xuICAgIGNhc2UgJ2ltYWdlY2xhc3NpZmljYXRpb24nOlxuICAgICAgaWYgKCFjb25maWcucmVjYXB0Y2hhQ29uZmlnLmlzVXNlTmV3U2NyaXB0ICYmIGNvbmZpZy5yZWNhcHRjaGFDb25maWcuaXNPcGVuKSB7XG4gICAgICAgIGF3YWl0IGltYWdlY2xhc3NpZmljYXRpb25fdjQoY29uZmlnKVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdpbWFnZXRvdGV4dCc6XG4gICAgICBhd2FpdCBpbWFnZXRvdGV4dChjb25maWcpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3JhaW5ib3cnOlxuICAgICAgbWVzc2FnZUhpZGUoKVxuICAgICAgYXdhaXQgcmFpbmJvdygpXG4gICAgICBicmVha1xuICB9XG5cbiAgLy8gbWVzc2FnZSh7IHRleHQ6ICfoh6rliqjor4bliKvlt7Lnu4/lrozmiJAnLCBjb2xvcjogJ2dyZWVuJyB9KVxufSkoKVxuXG4vLyDlvanombnngrnlh7vmtYHnqItcbmFzeW5jIGZ1bmN0aW9uIHJhaW5ib3coKSB7XG4gIGxldCB7IHRpbWVzIH0gPSBhd2FpdCBnZXRjb25maWcoKVxuICBsZXQgY2hyb21lID0gd2luZG93LmNocm9tZVxuICBjb25zb2xlLmxvZyhsb2NhdGlvbi5ocmVmLCAnbG9jYXRpb24uaHJlZicpXG4gIC8vIGF3YWl0IGRlbGF5KDMwMDApXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgLy8gYXdhaXQgZGVsYXkoMTAwMClcbiAgICAvLyBjb25zb2xlLmxvZygn562J5b6FMeenkicpXG4gICAgYXdhaXQgd2FpdEZvcignc3Ryb25nJylcblxuICAgIGlmIChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0cm9uZycpICYmXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5xdWV1ZS1lcnJvcicpLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJ1xuICAgICkge1xuICAgICAgY29uc29sZS5sb2coJ+aJvuWIsOS6huaMiemSricpXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShcbiAgICAgICAgeyBhY3Rpb246ICdnZXR0YWJzJyB9LFxuICAgICAgICBhc3luYyBmdW5jdGlvbiAodGFicykge1xuICAgICAgICAgIGxldCB0b3RhbHRhYnMgPSB0YWJzLmxlbmd0aFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0cm9uZycpLmNsaWNrKClcbiAgICAgICAgICBhd2FpdCBkZWxheSgyMCAqIHRpbWVzKVxuICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgeyBhY3Rpb246ICdnZXR0YWJzJyB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgICAgaWYgKHRvdGFsdGFicyA9PT0gdGFicy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye75aSx6LSlJylcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye75oiQ5YqfJylcbiAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246ICdyZW1vdmV0YWInIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIOiLseaWh+aVsOWtl+i9rOaWh+acrOa1geeoi1xuYXN5bmMgZnVuY3Rpb24gaW1hZ2V0b3RleHQoY29uZmlnKSB7XG4gIGxldCB7IHRpbWVzIH0gPSBhd2FpdCBnZXRjb25maWcoKVxuICB2YXIgSW1hZ2VDYWNoZSA9IFtdXG5cbiAgLy8gYXdhaXQgZGVsYXkoMjAwMClcbiAgY29uc29sZS5sb2coJ+iLseaWh+aVsOWtl+i9rOaWh+acrCcpXG5cbiAgLy8g55uR5ZCs6aG16Z2i5Y+Y5YqoXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQpXG5cbiAgICBpZiAoZS50YXJnZXQgPT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYWxsZW5nZS1jb250YWluZXInKSkge1xuICAgICAgY29uc29sZS5sb2coXCJlLnRhcmdldFwiLCBlLnRhcmdldClcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwidmlzdWFsVmlld3BvcnQud2lkdGhcIiwgdmlzdWFsVmlld3BvcnQud2lkdGgpXG4gICAgICBEb09jcigpXG4gICAgfVxuXG4gIH0pXG5cbiAgRG9PY3IoKVxuXG5cbiAgYXN5bmMgZnVuY3Rpb24gRG9PY3IoKSB7XG4gICAgLy8gaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb2x1dGlvbicpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb2x1dGlvbicpLnZhbHVlKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZygn5Yi35paw6aG16Z2iJylcbiAgICAvLyAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgLy8gfVxuICAgIGNvbnNvbGUubG9nKCfnrYnlvoXliqDovb3lm77niYcnKVxuICAgIC8vIGF3YWl0IHdhaXRGb3IoJyNjaGFsbGVuZ2UtY29udGFpbmVyID4gZGl2ID4gZmllbGRzZXQgPiBkaXYuYm90ZGV0ZWN0LWxhYmVsID4gaW1nJylcbiAgICB3aGlsZSAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFsbGVuZ2UtY29udGFpbmVyID4gZGl2ID4gZmllbGRzZXQgPiBkaXYuYm90ZGV0ZWN0LWxhYmVsID4gaW1nJykpIHtcbiAgICAgIGF3YWl0IGRlbGF5KDEwICogdGltZXMpXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCfojrflj5bliLDlm77niYcnKVxuICAgIGxldCBpbWdzcmMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbGxlbmdlLWNvbnRhaW5lciA+IGRpdiA+IGZpZWxkc2V0ID4gZGl2LmJvdGRldGVjdC1sYWJlbCA+IGltZycpLnNyY1xuICAgIGNvbnNvbGUubG9nKCflm77niYflnLDlnYAnLCBpbWdzcmMpXG5cbiAgICAvLyDph43lpI3or4bliKvpqozor4FcbiAgICBpZiAoSW1hZ2VDYWNoZVtpbWdzcmNdKSB7XG4gICAgICBjb25zb2xlLmxvZygnb2NyOiDlm77niYflt7Lnu4/or4bliKvov4cnKVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIEltYWdlQ2FjaGVbaW1nc3JjXSA9IDFcbiAgICB9XG5cblxuICAgIGxldCBiYXNlNjRpbWcgPSBhd2FpdCBzcmMyYmFzZTY0KGltZ3NyYywgMjUwLCA1MClcbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgICdjbGllbnRLZXknOiBjb25maWcuY2xpZW50S2V5LFxuICAgICAgJ3Rhc2snOiB7XG4gICAgICAgICd0eXBlJzogJ0ltYWdlVG9UZXh0VGFza1Rlc3QnLFxuICAgICAgICAnYm9keSc6IGJhc2U2NGltZ1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgcmVzID0gYXdhaXQgcG9zdChuZXcgVVJMKCdjcmVhdGVUYXNrJywgY29uZmlnLmhvc3QpLmhyZWYsIGRhdGEpXG4gICAgaWYgKHJlcy5lcnJvckRlc2NyaXB0aW9uKSB7IC8vIOWHuumUmeaXtuaYvuekuuWHuumUmeS/oeaBr+eEtuWQjui3s+i/h1xuICAgICAgY29uc29sZS5sb2coJ+WHuumUmTonLCByZXMuZXJyb3JEZXNjcmlwdGlvbilcbiAgICAgIG1lc3NhZ2UoeyB0ZXh0OiByZXMuZXJyb3JEZXNjcmlwdGlvbiwgY29sb3I6ICdyZWQnIH0pXG4gICAgICBpZiAobm90bmVlZGNvbnRpbnVlKHJlcy5lcnJvckNvZGUpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfkuI3pnIDopoHnu6fnu60s56iL5bqP6YCA5Ye6JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IC8vIOWmguaenOS4jemcgOimgee7p+e7reWImemAgOWHulxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgaWYgKHJlcy5zb2x1dGlvbiAmJiByZXMuc29sdXRpb24udGV4dCkge1xuICAgICAgYXdhaXQgZGVsYXkoMTAgKiB0aW1lcylcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb2x1dGlvbicpLnZhbHVlID0gcmVzLnNvbHV0aW9uLnRleHRcbiAgICAgIGF3YWl0IGRlbGF5KDEwICogdGltZXMpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm90ZGV0ZWN0LWJ1dHRvbicpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib3RkZXRlY3QtYnV0dG9uJykuY2xpY2soKVxuICAgICAgY29uc29sZS5sb2coJ+eCueWHu+aPkOS6pOaMiemSricpXG4gICAgfVxuICAgIC8vIGF3YWl0IGRlbGF5KDcwICogdGltZXMpXG4gICAgcmV0dXJuXG4gIH1cbn1cblxuXG4vLyDlm77lg4/or4bliKvliIbnsbvnrKzlm5vniYhcbmFzeW5jIGZ1bmN0aW9uIGltYWdlY2xhc3NpZmljYXRpb25fdjQoY29uZmlnKSB7XG5cbiAgbGV0IHsgdGltZXMsIGlzQXV0b0NsaWNrQ2hlY2tCb3gsIGNoZWNrQm94Q2xpY2tEZWxheVRpbWUsIGlzQXV0b1N1Ym1pdCB9ID0gYXdhaXQgZ2V0Y29uZmlnKClcbiAgdmFyIGltZzExID0gW11cbiAgbGV0IGltZzExU2NvcmUgPSB7fVxuICB2YXIgdGltZWlkID0gMFxuICB2YXIgd2F0Y2hTZXJ2aWNlID0gMFxuICB2YXIgc3R1Y2tDb3VudCA9IDBcbiAgdmFyIHN0dWNrUmVmcmVzaFRpbWVzID0gNVxuICB2YXIgSW1hZ2VDYWNoZSA9IFtdXG4gIGxldCBpc1ZlcmlmeUVuZCA9IGZhbHNlXG5cbiAgLy8g56Gu5a6a5piv5Lmd5a6r5qC86aG16Z2iXG4gIGNvbnN0IGlzQnJhbWVQYWdlID0gd2luZG93LnNlbGYubG9jYXRpb24uaHJlZi5tYXRjaCgvXFwvcmVjYXB0Y2hhXFwvKC4qPylcXC9iZnJhbWVcXD8vKSAhPSBudWxsXG5cbiAgLy8g56Gu5a6a5piv5Yu+6YCJ5qGG6aG1XG4gIGNvbnN0IGlzQW5jaG9yUGFnZSA9IHdpbmRvdy5zZWxmLmxvY2F0aW9uLmhyZWYubWF0Y2goL1xcL3JlY2FwdGNoYVxcLyguKj8pXFwvYW5jaG9yXFw/LykgIT0gbnVsbFxuXG4gIC8vIOWIt+aWsFxuICBjb25zdCByZWZyZXNoID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJjLWJ1dHRvbi1yZWxvYWQnKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmMtYnV0dG9uLXJlbG9hZCcpLmNsaWNrKClcbiAgLy8g6I635Y+W6Zeu6aKYXG4gIGNvbnN0IGdldHF1ZXN0aW9uID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3Ryb25nJykuaW5uZXJUZXh0LnJlcGxhY2UoL1xccy9nLCAnJylcbiAgLy8g5o+Q5LqkXG4gIGZ1bmN0aW9uIGNsaWNrdGltZSgpIHtcbiAgICAvLyDlpoLmnpzmnInnmb3lsY/vvIzliJnnrYnlvoUz56eS5ZCO5YaN6K+VXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RkLnJjLWltYWdlc2VsZWN0LWR5bmFtaWMtc2VsZWN0ZWQnKSkge1xuICAgICAgY29uc29sZS5sb2coJ2ZpbmQgc2VsZWN0ZWQgaW1hZ2UnKVxuICAgICAgLy8gYXdhaXQgZGVsYXkoMzAwMClcbiAgICAgIGNsZWFyVGltZW91dCh0aW1laWQpXG4gICAgICB0aW1laWQgPSBzZXRUaW1lb3V0KGNsaWNrdGltZSwgMTAwMClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChpbWcxMS5sZW5ndGggPT0gMCkge1xuXG4gICAgICBpZiAoaXNBdXRvU3VibWl0KSB7IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNhcHRjaGEtdmVyaWZ5LWJ1dHRvbicpLmNsaWNrKCkgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOiHquWKqOaJk+WLvuW8gOWni+ivhuWIq1xuICBpZiAoaXNBbmNob3JQYWdlKSB7XG4gICAgaWYgKCFpc0F1dG9DbGlja0NoZWNrQm94KSByZXR1cm5cbiAgICAvLyDoh6rliqjli77pgInor4bliKvmoYZcbiAgICBmdW5jdGlvbiB3YXRjaENoZWNrYm94KCkge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNhcHRjaGEtYW5jaG9yJykpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNhcHRjaGEtYW5jaG9yJykuZ2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnKSA9PSAnZmFsc2UnICYmXG4gICAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJyNyZWNhcHRjaGEtYW5jaG9yID4gZGl2LnJlY2FwdGNoYS1jaGVja2JveC1ib3JkZXInKSkuZ2V0UHJvcGVydHlWYWx1ZSgnYm9yZGVyJykgPT1cbiAgICAgICAgICAnLjEyNXJlbSBzb2xpZCByZ2IoMjU1LCAwLCAwKScgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICcjcmMtYW5jaG9yLWNvbnRhaW5lciA+IGRpdi5yYy1hbmNob3ItZXJyb3ItbXNnLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnXG4gICAgICAgICkge1xuICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNhcHRjaGEtYW5jaG9yJykuZ2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnKSA9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICBpc1ZlcmlmeUVuZCA9IGZhbHNlXG4gICAgICAgICAgICBnZXRJc0VuZCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNhcHRjaGEtYW5jaG9yJykuY2xpY2soKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UoeyB0ZXh0OiBnZXRXb3JkcygnY29udGVudF9tZXNzYWdlXzExJyksIGNvbG9yOiAnZ3JlZW4nIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaXNWZXJpZnlFbmQpIHtcbiAgICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7IHR5cGU6IFwieWVzQ2FwdGNoYUVuZFN1Y2Nlc3NcIiB9LCBcIipcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzVmVyaWZ5RW5kID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh3YXRjaFNlcnZpY2UpIHJldHVyblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgd2F0Y2hTZXJ2aWNlID0gc2V0SW50ZXJ2YWwod2F0Y2hDaGVja2JveCwgMjAwMClcbiAgICB9LCBOdW1iZXIoY2hlY2tCb3hDbGlja0RlbGF5VGltZSkpO1xuICB9XG5cbiAgLy8g6aqM6K+B56CB5Zu+54mH5qGGXG4gIGNvbnN0IHJlVGFyZ2V0ID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JjLWltYWdlc2VsZWN0LXRhcmdldCcpXG4gIC8vIOmqjOivgeeggeWbvueJh+Wvueixoe+8miDov5Tlm57kuZ3lvKDlm75cbiAgY29uc3QgcmNJbWFnZXNlbGVjdFRhcmdldCA9ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5yYy1pbWFnZS10aWxlLXdyYXBwZXIgPiBpbWcnKVxuICAvLyDmj5DnpLrvvJror7fpgInmi6nmiYDmnInnm7jnrKbnmoTlm77niYfjgIJcbiAgY29uc3QgZXJyb3JTZWxlY3RNb3JlID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LnJjLWltYWdlc2VsZWN0LWVycm9yLXNlbGVjdC1tb3JlJylcbiAgLy8g5o+Q56S677ya5Y+m5aSW77yM5oKo6L+Y6ZyA5p+l55yL5paw5pi+56S655qE5Zu+54mH44CCXG4gIGNvbnN0IGVycm9yRHluYW1pY01vcmUgPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYucmMtaW1hZ2VzZWxlY3QtZXJyb3ItZHluYW1pYy1tb3JlJylcbiAgLy8g6ZyA6KaB6YCJ5oup5pu05aSaXG4gIGNvbnN0IG5lZWRNb3JlID0gKCkgPT4gZXJyb3JTZWxlY3RNb3JlKCkgJiYgZXJyb3JTZWxlY3RNb3JlKCkuc3R5bGUuZGlzcGxheSAhPSAnbm9uZScgfHwgZXJyb3JEeW5hbWljTW9yZSgpICYmIGVycm9yRHluYW1pY01vcmUoKS5zdHlsZS5kaXNwbGF5ICE9ICdub25lJ1xuXG4gIC8vIOS4gOS4quW+queOr+ajgOa1i+aWueazle+8jOmYsuatouWNoeS9j+S4jeWKqFxuICBmdW5jdGlvbiBDaGVja2ZvclN0dWNrKCkge1xuICAgIGlmIChuZWVkTW9yZSgpKSB7XG4gICAgICBzdHVja0NvdW50ID0gc3R1Y2tDb3VudCArIDFcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coJ0NoZWNrZm9yU3R1Y2s6IGNsZWFyIScpXG4gICAgICBzdHVja0NvdW50ID0gMFxuICAgIH1cbiAgICBpZiAoc3R1Y2tDb3VudCA+PSBzdHVja1JlZnJlc2hUaW1lcykge1xuICAgICAgY29uc29sZS5sb2coJ0NoZWNrZm9yU3R1Y2s6IDYgdGltZXMgZm9yIHJlZnJlc2goKScpXG4gICAgICByZWZyZXNoKClcbiAgICB9XG4gIH07XG5cbiAgLy8g5Zu+54mH6L2sQkFTRTY0XG4gIGZ1bmN0aW9uIEltYWdlVG9CYXNlNjQoaW1nKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgdmFyIHdpZHRoeCA9IGltZy5uYXR1cmFsV2lkdGhcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aHhcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2lkdGh4XG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHdpZHRoeCwgd2lkdGh4KVxuICAgIHZhciBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpXG4gICAgdmFyIGJhc2UgPSBkYXRhVVJMLnJlcGxhY2UoJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJywgJycpXG4gICAgaWYgKGJhc2UgPT0gJ2RhdGE6LCcpIHsgcmV0dXJuIH1cbiAgICByZXR1cm4gYmFzZVxuICB9O1xuXG4gIC8vIOiOt+WPluWvueixoeeahOS9jee9rlxuICBmdW5jdGlvbiBnZXRpbmRleChvYmosIG9iamFsbCkge1xuICAgIHZhciBvYmphbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9iamFsbClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamFsbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9iaiA9PSBvYmphbGxbaV0pIHtcbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH07XG5cbiAgLy8g5a+55Zu+54mH6L+b6KGM6K+G5YirXG4gIGNvbnN0IERvT2NyID0gYXN5bmMgZnVuY3Rpb24gKGltYWdlLCBpbmRleCkge1xuICAgIGNvbnN0IGlzRW5kID0gYXdhaXQgZ2V0SXNFbmQoKVxuICAgIGlmIChpc0VuZCkge1xuICAgICAgbWVzc2FnZSh7IHRleHQ6IGdldFdvcmRzKCdjb250ZW50X21lc3NhZ2VfMTEnKSwgY29sb3I6ICdncmVlbicgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyDml6DlnLDlnYDov5Tlm55cbiAgICBpZiAoIWltYWdlIHx8ICFpbWFnZS5zcmMpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdvY3I6IGltZ2FlIHNyYyBub3QgZm91bmQnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8g5Zu+5YOP6K+G5Yir5Y+C5pWwXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICAnY2xpZW50S2V5JzogY29uZmlnLmNsaWVudEtleSwgY2FsbHVybDogYXdhaXQgZ2V0UGFyZW50VXJsKCksXG4gICAgICAndGFzayc6IHsgJ3R5cGUnOiAnUmVDYXB0Y2hhVjJDbGFzc2lmaWNhdGlvbicsICdpbWFnZSc6IG51bGwsICdxdWVzdGlvbic6IG51bGwgfVxuICAgIH1cbiAgICAvLyDovazmjaLlm77niYdcbiAgICBkYXRhLnRhc2suaW1hZ2UgPSBJbWFnZVRvQmFzZTY0KGltYWdlKVxuICAgIGlmICghZGF0YS50YXNrLmltYWdlKSB7XG4gICAgICBjb25zb2xlLmxvZygnb2NyOiBlcnJvcjogaW1hZ2UgaXMgbnVsbCByZXRyeS4uLicpXG4gICAgICBzdHVja0NvdW50ID0gMFxuICAgICAgLy8gY2xlYXJUaW1lb3V0KHRpbWVpZCk7XG4gICAgICBhd2FpdCBkZWxheSgyMCAqIHRpbWVzKVxuICAgICAgZGF0YS50YXNrLmltYWdlID0gSW1hZ2VUb0Jhc2U2NChpbWFnZSlcbiAgICAgIGlmICghZGF0YS50YXNrLmltYWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvY3I6IGVycm9yOiBpbWFnZSBub3QgZm91bmQnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDph43lpI3or4bliKvpqozor4FcbiAgICBpZiAoSW1hZ2VDYWNoZVtpbWFnZS5zcmNdKSB7XG4gICAgICBjb25zb2xlLmxvZygnb2NyOiBleGlzdCcpXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgSW1hZ2VDYWNoZVtpbWFnZS5zcmNdID0gMVxuICAgIH1cblxuICAgIC8vIOiOt+WPluW9k+WJjemXrumimFxuICAgIGxldCBxdWVzdGlvbnN0ciA9IGdldHF1ZXN0aW9uKClcbiAgICBkYXRhLnRhc2sucXVlc3Rpb24gPSBqc29uYWxsW3F1ZXN0aW9uc3RyXSB8fCBxdWVzdGlvbnN0clxuICAgIGlmICghZGF0YS50YXNrLnF1ZXN0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZygnb2NyOiBlcnJvcjogcXVlc3Rpb24gbm90IGZvdW5kJylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvLyDlpoLmnpzmmK8zM+aIljQ05Zu+54mH77yM5riF56m65bCP5Zu+5ZKM5o+Q5Lqk5oyJ6ZKu5Lu75YqhXG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgaW1nMTEgPSBbXSwgY2xlYXJUaW1lb3V0KHRpbWVpZClcbiAgICB9XG4gICAgLy8g5o+Q5Lqk5ZCO56uv6K+G5YirXG4gICAgY29uc29sZS5sb2coJ29jcjogaW5kZXg6JywgaW5kZXggfHwgLTEpXG4gICAgbGV0IHJlc1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJlY2FwdGNoYVZlcmlmeUZhaWxEZWxheSA9IDEwMDAsIHJlY2FwdGNoYVZlcmlmeVRyeSA9IDEgfSA9IGNvbmZpZy5uZXR3b3JrIHx8IHt9XG4gICAgICByZXMgPSBhd2FpdCBwb3N0KG5ldyBVUkwoJ2NyZWF0ZVRhc2snLCBjb25maWcuaG9zdCkuaHJlZiwgZGF0YSwgcmVjYXB0Y2hhVmVyaWZ5RmFpbERlbGF5LCByZWNhcHRjaGFWZXJpZnlUcnkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbWVzc2FnZSh7IHRleHQ6IGdldFdvcmRzKCdjb250ZW50X21lc3NhZ2VfOScpLCBjb2xvcjogJ3JlZCcgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zb2xlLmxvZygnb2NyOiByZXNwb25zZTonLCByZXMpXG5cbiAgICAvLyDlpITnkIbor4bliKvnu5Pmnpw6IOWHuumUmVxuICAgIGlmIChyZXMuZXJyb3JEZXNjcmlwdGlvbikge1xuICAgICAgY29uc29sZS5sb2coJ29jcjogZXJyb3JEZXNjcmlwdGlvbjonLCByZXMuZXJyb3JEZXNjcmlwdGlvbilcbiAgICAgIG1lc3NhZ2UoeyB0ZXh0OiByZXMuZXJyb3JEZXNjcmlwdGlvbiwgY29sb3I6ICdncmVlbicgfSlcbiAgICAgIGlmIChub3RuZWVkY29udGludWUocmVzLmVycm9yQ29kZSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29jcjogZXhpdC4nKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOeCueWIt+aWsOaMiemSrlxuICAgICAgICBjb25zb2xlLmxvZygnb2NyOiByZWZyZXNoLicpXG4gICAgICAgIGF3YWl0IGRlbGF5KDIwICogdGltZXMpXG4gICAgICAgIHJlZnJlc2goKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOeCueWHu+WbvueJh+WvueixoVxuICAgIGlmIChyZXMuc29sdXRpb24pIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvY3I6IGdvdG8gY2xpY2tzLicpXG4gICAgICByZXR1cm4gYXdhaXQgQ2xpY2tzKGltYWdlLCByZXMuc29sdXRpb24sIGluZGV4KVxuICAgIH1cbiAgfVxuXG4gIC8vIOeCueWHu+WbvueJh+WvueixoVxuICBjb25zdCBDbGlja3MgPSBhc3luYyBmdW5jdGlvbiAoaW1hZ2UsIHNvbHV0aW9uLCBpbmRleCkge1xuXG4gICAgbGV0IGRlbGF5VGltZSA9IHRpbWVzXG4gICAgaWYgKC80NC8udGVzdChpbWFnZS5jbGFzc05hbWUpKSB7XG4gICAgICBjb25zb2xlLmxvZygnNDQhISEhISEhISEhISEhISEhISEhISEhISEhISEnKVxuICAgICAgZGVsYXlUaW1lID0gdGltZXMgLyAyXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdjbGljazogaW5kZXg6ICcgKyBpbmRleClcbiAgICAvLyDlop7liqDlu7bml7bvvIzpmLLmraLooqvor4bliKvkuLrmnLrlmajkurpcbiAgICBhd2FpdCBkZWxheShnZXRDbGlja1RpbWUoTnVtYmVyKGRlbGF5VGltZSkpKVxuICAgIC8vIGNvbnNvbGUubG9nKCdjbGljazogd2lkdGg6ICcgKyBpbWFnZS5uYXR1cmFsV2lkdGgpXG4gICAgLy8gY29uc29sZS5sb2coJ2NsaWNrOiBvYmplY3RzOiAnICsgSlNPTi5zdHJpbmdpZnkoc29sdXRpb24pKVxuXG4gICAgLy8g5aSE55CGMXgx5Zu+54mH55qE54K55Ye7XG4gICAgaWYgKGluZGV4ICYmIHNvbHV0aW9uLmhhc09iamVjdCkge1xuICAgICAgLy8g54K55Ye75bCP5Zu+XG4gICAgICBjb25zb2xlLmxvZygnY2xpY2s6IDF4MTogJyArIGluZGV4KVxuICAgICAgYXdhaXQgZGVsYXkoZ2V0Q2xpY2tUaW1lKE51bWJlcihkZWxheVRpbWUpKSlcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcmMtaW1hZ2VzZWxlY3QtdGFyZ2V0ID4gdGFibGUgPiB0Ym9keSA+IHRyPiB0ZD5kaXY+ZGl2PmltZycpW2luZGV4XSAmJlxuICAgICAgICBpbWFnZS5zcmMgPT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3JjLWltYWdlc2VsZWN0LXRhcmdldCA+IHRhYmxlID4gdGJvZHkgPiB0cj4gdGQ+ZGl2PmRpdj5pbWcnKVtpbmRleF1cbiAgICAgICAgICAuc3JjKSB7IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNyYy1pbWFnZXNlbGVjdC10YXJnZXQgPiB0YWJsZSA+IHRib2R5ID4gdHI+IHRkJylbaW5kZXhdLmNsaWNrKCkgfVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChpbmRleCAmJiAhc29sdXRpb24uaGFzT2JqZWN0KSB7XG4gICAgICAvLyDkuI3ngrnlh7vov5Tlm55cbiAgICAgIGRlbGV0ZSBpbWcxMVsnXycgKyBpbmRleF1cbiAgICAgIC8vIOiusOW9leWIhuWAvFxuICAgICAgLy8gY29uc29sZS5sb2coJ2NsaWNrOiBzY29yZTogJyArIHNvbHV0aW9uLmNvbmZpZGVuY2UpXG4gICAgICAvLyBpbWcxMVNjb3JlWydfJyArIGluZGV4XSA9IHNvbHV0aW9uLmNvbmZpZGVuY2VcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdjbGljazogaW1nMTFTY29yZTogJyArIEpTT04uc3RyaW5naWZ5KGltZzExU2NvcmUpKVxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVpZClcbiAgICAgIHRpbWVpZCA9IHNldFRpbWVvdXQoY2xpY2t0aW1lLCAzMCAqIHRpbWVzKVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChpbWFnZS5uYXR1cmFsV2lkdGggPT0gMTAwICYmICFpbmRleCkge1xuICAgICAgY29uc29sZS5sb2coJ2NsaWNrOiBubyBpbmRleCByZXR1cm4nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8g5YiX5Ye65omA5pyJ5Zu+54mHXG4gICAgbGV0IHJlc3VsdGxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNyYy1pbWFnZXNlbGVjdC10YXJnZXQgPiB0YWJsZSA+IHRib2R5ID4gdHI+IHRkJykpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb2x1dGlvbi5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhd2FpdCBkZWxheShnZXRDbGlja1RpbWUoTnVtYmVyKGRlbGF5VGltZSkpKVxuICAgICAgY29uc29sZS5sb2coJ2NsaWNrOiBvamJlY3RzOiAnICsgKHNvbHV0aW9uLm9iamVjdHNbaV0gKyAxKSlcbiAgICAgIHJlc3VsdGxpc3Rbc29sdXRpb24ub2JqZWN0c1tpXV0uY2xpY2soKVxuICAgIH1cblxuICAgIC8vIDQ1MCDnmoTlm77niYfnq4vljbPnoa7orqRcbiAgICBpZiAoaW1hZ2UubmF0dXJhbFdpZHRoID09IDQ1MCkge1xuICAgICAgYXdhaXQgZGVsYXkoMTAgKiB0aW1lcylcbiAgICAgIC8v6L+Z6YeMXG4gICAgICBpZiAoaXNBdXRvU3VibWl0KSB7IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWNhcHRjaGEtdmVyaWZ5LWJ1dHRvbicpLmNsaWNrKCkgfVxuICAgICAgLy8gMzAwIOeahOWbvueJh+mcgOimgeW7tui/nzPnp5LlkI7mo4Dmn6UxeDHlm77niYdcbiAgICB9IGVsc2UgaWYgKGltYWdlLm5hdHVyYWxXaWR0aCA9PSAzMDApIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1laWQpXG4gICAgICB0aW1laWQgPSBzZXRUaW1lb3V0KGNsaWNrdGltZSwgMzAwMClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkb21Nb2RpZnlDYihlKSB7XG4gICAgLy8g5Y+N6aaI5Y+Y5Yqo55qERE9NXG4gICAgLy8gY29uc29sZS5sb2coXCJlLnRhcmdldDpcIik7XG4gICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQpO1xuXG4gICAgLy8g5a+5RE9N5re75Yqg55uR5ZCs5LqL5Lu2OiDlpoLmnpzlm77niYflj5HnlJ/lj5jljJZcbiAgICBpZiAoZS50YXJnZXQgPT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JjLWltYWdlc2VsZWN0LXRhcmdldCcpXG4gICAgICAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmMtaW1hZ2VzZWxlY3QtdGFyZ2V0ID4gdGFibGUgPiB0Ym9keSA+IHRyPiB0ZD5kaXY+ZGl2PmltZycpKSB7XG4gICAgICAvLyDnu5Hlrprmr4/kuIDlvKDlm77niYfnmoTliqDovb3kuovku7bvvIzlvZPliqDovb3lsLHmiafooYxPQ1JcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5yYy1pbWFnZS10aWxlLXdyYXBwZXIgPiBpbWcnKS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIOW9k+WbvueJh+WKoOi9veaXtu+8jOWvueWbvueJh+i/m+ihjOivhuWIq1xuICAgICAgICBEb09jcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYucmMtaW1hZ2UtdGlsZS13cmFwcGVyID4gaW1nJykpXG4gICAgICB9XG5cbiAgICAgIC8vIHZhciBsc3VybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAvLyAgICcjcmMtaW1hZ2VzZWxlY3QtdGFyZ2V0ID4gdGFibGUgPiB0Ym9keSA+IHRyPiB0ZD5kaXY+ZGl2PmltZycpLnNyYztcbiAgICAgIC8vIGlmIChJbWFnZUNhY2hlLmluZGV4T2YobHN1cmwpID09IC0xKXtcbiAgICAgIC8vIOebtOaOpeaJp+ihjE9DUu+8muS4jeaYjueZveS4uuS7gOS5iOimgei/meS5iOWGmVxuICAgICAgRG9PY3IoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JjLWltYWdlc2VsZWN0LXRhcmdldCA+IHRhYmxlID4gdGJvZHkgPiB0cj4gdGQ+ZGl2PmRpdj5pbWcnKSlcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGltYWdlID0gZS50YXJnZXQucXVlcnlTZWxlY3RvcignIGRpdiA+IGRpdi5yYy1pbWFnZS10aWxlLXdyYXBwZXIgPiBpbWcnKVxuICAgICAgaWYgKGltYWdlKSB7XG4gICAgICAgIC8vIOiOt+WPluWPkeeUn+WPmOWMlueahOS9jee9rlxuICAgICAgICB2YXIgaW5kZXggPSBnZXRpbmRleChpbWFnZSwgJyNyYy1pbWFnZXNlbGVjdC10YXJnZXQgPiB0YWJsZSA+IHRib2R5ID4gdHI+IHRkPiBkaXYgPiBkaXYucmMtaW1hZ2UtdGlsZS13cmFwcGVyID4gaW1nJylcbiAgICAgICAgdmFyIGltYWdlY29kZSA9IGltYWdlLmNsYXNzTmFtZS5zdWJzdHJpbmcoaW1hZ2UuY2xhc3NOYW1lLmxlbmd0aCAtIDIpXG4gICAgICAgIGlmIChpbWFnZWNvZGUgKiAxID09IDExKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVpZClcbiAgICAgICAgICBpbWcxMVsnXycgKyBpbmRleF0gPSAneSdcbiAgICAgICAgICAvLyDlm77lg4/or4bliKtcbiAgICAgICAgICBEb09jcihpbWFnZSwgaW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDkuZ3lrqvmoLzpobXpnaLov5vooYzngrnlh7tcbiAgaWYgKGlzQnJhbWVQYWdlKSB7XG4gICAgLy8g5q+P56eS5qOA5rWL5LiA5qyh5piv5ZCm5pyq6K+G5Yir77yMNuasoeS7peS4iuiHquWKqOWIt+aWsO+8jOmYsuatouWNoeS9j+S4jeWKqFxuICAgIHNldEludGVydmFsKENoZWNrZm9yU3R1Y2ssIDEwMDApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgZG9tTW9kaWZ5Q2IpXG4gIH1cblxuICAvLyDmt7vliqDkuIDkuKrkuovku7bnm5HlkKxcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGF0YSA9PSAnZG9Tb21ldGhpbmcnKSB7XG4gICAgICBjb25zb2xlLmxvZygnZG9Tb21ldGhpbmcnKVxuICAgIH1cbiAgICBpZiAoZXZlbnQuZGF0YSA9PT0gJ0RvT2NyJykge1xuICAgICAgRG9PY3IoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JjLWltYWdlc2VsZWN0LXRhcmdldCA+IHRhYmxlID4gdGJvZHkgPiB0cj4gdGQ+ZGl2PmRpdj5pbWcnKSlcbiAgICB9XG4gIH0pXG4gIC8vIOWPkemAgea2iOaBr+e7meeItueql+WPo1xuICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKCdyZWFkeScsICcqJylcbn1cblxuLy8gaWZyYW1lIOmAu+i+kVxuYXN5bmMgZnVuY3Rpb24gZ2V0SXNFbmQoKSB7XG4gIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGNiID0gZXZlbnQgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhIH0gPSBldmVudFxuICAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJpc1llc0NhcHRjaGFFbmRcIikge1xuICAgICAgICByZXNvbHZlKGRhdGEuaXNFbmQpXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBjYilcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlc29sdmUoZmFsc2UpXG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgfSwgMzAwKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBjYilcbiAgfSlcbiAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiaXNZZXNDYXB0Y2hhRW5kXCIgfSwgXCIqXCIpXG4gIHJldHVybiBwcm9taXNlXG59XG5cbiJdLCJuYW1lcyI6WyJ0ZXN0bmV0d29yayIsInBvc3QiLCJnZXQiLCJnZXRCYWxhbmNlIiwiZ2V0Y29uZmlnIiwic2V0Y29uZmlnIiwiY2hyb21lIiwid2luZG93IiwibWVzc2FnZSIsInRleHQiLCJjb2xvciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsInpJbmRleCIsImlubmVyVGV4dCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsImRpc3BsYXkiLCJtZXNzYWdlSGlkZSIsImNhcHRjaGFDbGFzc2lmaWNhdGlvbiIsInRpbWVzIiwiZGVsYXkiLCJyZXN1bHQiLCJ0eXBlbGlzdCIsInRpdGxlIiwidXJsX2tleXdvcmQiLCJkaXYiLCJpbWFnZWRpdiIsImkiLCJsZW5ndGgiLCJsb2NhdGlvbiIsImhyZWYiLCJpbmRleE9mIiwicXVlcnlTZWxlY3RvciIsInVybCIsInJlc29sdmUiLCJyZWplY3QiLCJzZWxmIiwicnVudGltZSIsInNlbmRNZXNzYWdlIiwiYWN0aW9uIiwicmVzcG9uc2UiLCJkYXRhIiwidHJpZXMiLCJob3N0IiwiY2xpZW50S2V5IiwiVVJMIiwicyIsInNldFRpbWVvdXQiLCJjb25maWciLCJzcmMyYmFzZTY0Iiwic3JjIiwid2lkdGgiLCJoZWlnaHQiLCJpbWciLCJJbWFnZSIsInNldEF0dHJpYnV0ZSIsImNhbnZhcyIsImNvbnRleHQiLCJnZXRDb250ZXh0Iiwib25sb2FkIiwiZHJhd0ltYWdlIiwiYmFzZTY0IiwidG9EYXRhVVJMIiwib3V0IiwicmVwbGFjZSIsIm5vdG5lZWRjb250aW51ZSIsImVycm9yc3RyIiwiaW5jbHVkZXMiLCJ3YWl0Rm9yIiwiZGl2c3RyIiwib3V0dGltZSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiaW1hZ2VyZWFkeSIsImltZ3NyYyIsIndhaXRmb3JiYWNrZ3JvdW5kIiwiYmFja2dyb3VuZCIsIndhaXRmb3JiYWNrZ3JvdW5kV2l0aFRpbWVvdXQiLCJ0aW1lb3V0VGltZXIiLCJjbGVhclRpbWVvdXQiLCJ3YWl0RG8iLCJmdW5jIiwiY29uc29sZSIsImxvZyIsImdldExvY2FsVmVyc2lvbiIsInZlciIsImdldENsaWNrVGltZSIsImNvbmZpZ1RpbWUiLCJyYXRlIiwidGltZUZsb2F0TGltaXQiLCJ0aW1lRmxvYXQiLCJNYXRoIiwicmFuZG9tIiwiY2VpbCIsImdldElzQmxhY2tXaGl0ZVBhc3MiLCJpc0luVXJsTGlzdCIsInVybExpc3QiLCJpbmRleCIsImZpbmRJbmRleCIsInBhdHRlcm4iLCJqdWRnZUJsYWNrV2hpdGUiLCJpc09wZW5CbGFja0xpc3QiLCJibGFja0xpc3RDb25maWciLCJpc09wZW4iLCJpc09wZW5XaGl0ZUxpc3QiLCJ3aGl0ZUxpc3RDb25maWciLCJ3aGl0ZVJlc3VsdCIsImJsYWNrTGlzdFJlc3VsdCIsImUiLCJxdWVyeUN1cnJlbnRVcmwiLCJjdXJyZW50VGFiVXJsIiwiYmxhY2tXaGl0ZVJlc3VsdCIsImxvY2FsVmVyc2lvbiIsImxvY2FsU3RvcmFnZSIsInZlcnNpb24iLCJkZXZlbG9wIiwiaGNhcHRjaGFJdGVtbGlzdCIsImpzb25hbGwiLCLQs9C+0YDRi9Cw0LHQvtC/0LDQs9C+0YDQutGWIiwi0LfQvdCw0LrRltC/0YDRi9C/0YvQvdC60YMiLCLQstGD0LvRltGH0L3Ri9GP0LfQvdCw0LrRliIsItGA0LDRgdC70ZbQvdGLIiwi0LTRgNGN0LLRiyIsItGC0YDQsNCy0LAiLCLRhdC80YvQt9C90Y/QutC+0Z4iLCLQutCw0LrRgtGD0YEiLCLQv9Cw0LvRjNC80YsiLCLQv9GA0YvRgNC+0LTRiyIsItCy0LDQtNCw0YHQv9Cw0LTRiyIsItCz0L7RgNGLIiwi0L/QsNCz0L7RgNC60ZYiLCLQstCw0LTQsNGR0LzRiyIsItGA0Y3QutGWIiwi0L/Qu9GP0LbRiyIsItCh0L7QvdGG0LAiLCLQnNC10YHRj9GGIiwi0L3QtdCx0LAiLCLRgtGA0LDQvdGB0L/QsNGA0YLQvdGL0YXRgdGA0L7QtNC60LDRniIsItC80LDRiNGL0L3RiyIsItCy0LXQu9Cw0YHRltC/0LXQtNGLIiwi0LzQsNGC0LDRhtGL0LrQu9GLIiwi0L/RltC60LDQv9GLIiwi0LrQsNC80LXRgNGG0YvQudC90YvRj9Cz0YDRg9C30LDQstGW0LrRliIsItC70L7QtNC60ZYiLCLQu9GW0LzRg9C30ZbQvdGLIiwi0YLQsNC60YHRliIsItGI0LrQvtC70YzQvdGL0LDRntGC0L7QsdGD0YEiLCLQsNGe0YLQvtCx0YPRgSIsItCx0YPQtNCw0Z7QvdGW0YfQsNGP0LzQsNGI0YvQvdCwIiwi0YHRgtCw0YLRg9GWIiwi0YTQsNC90YLQsNC90YsiLCLQvNC+0YHRgiIsItC/0YDRi9GB0YLQsNC90YwiLCLRhdC80LDRgNCw0YfQvtGBIiwi0YHQu9GD0L/Ri9Cw0LHQvtC60LDQu9C+0L3RiyIsItCy0ZbRgtGA0LDQttGLIiwi0LTQvtC8Iiwi0LbRi9C70YvQtNC+0LwiLCLRgdCy0LXRgtC70LDQstGL0LTQvtC8Iiwi0YfRi9Cz0YPQvdCw0YfQvdCw0Y/RgdGC0LDQvdGG0YvRjyIsItC/0L7Qv9C10LvQsNC8Iiwi0LLQvtCz0L3QtdCz0LDQtNGA0LDQvdGCIiwi0YDRjdC60LvQsNC80L3Ri9GI0YfRi9GCIiwi0LTQsNGA0L7Qs9GWIiwi0L/QtdGI0LDRhdC+0LTQvdGL0Y/Qv9C10YDQsNGF0L7QtNGLIiwi0YHQstGP0YLQu9Cw0YTQvtGAIiwi0LPQsNGA0LDQttC90YvRj9C00LfQstC10YDRiyIsItCw0Z7RgtC+0LHRg9GB0L3Ri9GP0L/RgNGL0L/Ri9C90LrRliIsItGC0YDQsNGE0ZbQutGDIiwi0L/QsNGA0LrQvtC80LDRgtCw0YDRiyIsItC70LXRgdCy0ZbRhtGLIiwi0LrQvtC80ZbQvdGLIiwi0YLRgNCw0LrRgtCw0YDRiyIsIuC4oOC4ueC5gOC4guC4suC4q+C4o+C4t+C4reC5gOC4meC4tOC4meC5gOC4guC4siIsIuC4m+C5ieC4suC4ouC4q+C4ouC4uOC4lCIsIuC4m+C5ieC4suC4ouC4luC4meC4mSIsIuC4nuC4t+C4iiIsIuC4leC5ieC4meC5hOC4oeC5iSIsIuC4q+C4jeC5ieC4siIsIuC4nuC4uOC5iOC4oeC5hOC4oeC5iSIsIuC4geC4o+C4sOC4muC4reC4h+C5gOC4nuC4iuC4oyIsIuC4leC5ieC4meC4m+C4suC4peC5jOC4oSIsIuC4mOC4o+C4o+C4oeC4iuC4suC4leC4tCIsIuC4meC5ieC4s+C4leC4gSIsIuC4oOC4ueC5gOC4guC4siIsIuC5gOC4meC4tOC4meC5gOC4guC4siIsIuC5geC4q+C4peC5iOC4h+C4meC5ieC4syIsIuC5geC4oeC5iOC4meC5ieC4syIsIuC4iuC4suC4ouC4q+C4suC4lCIsIuC4lOC4p+C4h+C4reC4suC4l+C4tOC4leC4ouC5jCIsIuC4lOC4p+C4h+C4iOC4seC4meC4l+C4o+C5jCIsIuC4l+C5ieC4reC4h+C4n+C5ieC4siIsIuC4ouC4suC4meC4nuC4suC4q+C4meC4sCIsIuC4o+C4liIsIuC4iOC4seC4geC4o+C4ouC4suC4mSIsIuC4o+C4luC4iOC4seC4geC4o+C4ouC4suC4meC4ouC4meC4leC5jCIsIuC4o+C4luC4m+C4tOC4hOC4reC4seC4niIsIuC4o+C4luC4muC4o+C4o+C4l+C4uOC4geC5gOC4iuC4tOC4h+C4nuC4suC4k+C4tOC4iuC4ouC5jCIsIuC5gOC4o+C4t+C4rSIsIuC4o+C4luC4peC4teC4oeC4ueC4i+C4teC4mSIsIuC5geC4l+C5h+C4geC4i+C4teC5iCIsIuC4o+C4luC5guC4o+C4h+C5gOC4o+C4teC4ouC4mSIsIuC4o+C4quC4muC4seC4qiIsIuC4o+C4luC4geC5iOC4reC4quC4o+C5ieC4suC4hyIsIuC4o+C4ueC4m+C4m+C4seC5ieC4mSIsIuC4meC5ieC4s+C4nuC4uCIsIuC4quC4sOC4nuC4suC4mSIsIuC4l+C5iOC4suC5gOC4o+C4t+C4rSIsIuC4leC4tuC4geC4o+C4sOC4n+C5ieC4siIsIuC5gOC4quC4suC5gOC4quC4siIsIuC4geC4o+C4sOC4iOC4geC4quC4tSIsIuC4muC5ieC4suC4mSIsIuC4leC4tuC4geC4reC4nuC4suC4o+C5jOC4leC5gOC4oeC4meC4l+C5jCIsIuC4m+C4o+C4sOC4oOC4suC4hOC4suC4oyIsIuC4quC4luC4suC4meC4teC4o+C4luC5hOC4nyIsIuC5gOC4luC5ieC4suC4luC5iOC4suC4mSIsIuC4lOC4seC4muC5gOC4nuC4peC4tOC4hyIsIuC4m+C5ieC4suC4ouC4muC4tOC4peC4muC4reC4o+C5jOC4lCIsIuC4luC4meC4mSIsIuC4l+C4suC4h+C4oeC5ieC4suC4peC4suC4oiIsIuC5hOC4n+C4iOC4o+C4suC4iOC4oyIsIuC4m+C4o+C4sOC4leC4ueC5guC4o+C4h+C4o+C4liIsIuC4m+C5ieC4suC4ouC4o+C4luC5gOC4oeC4peC5jCIsIuC4geC4o+C4p+C4ouC4iOC4o+C4suC4iOC4oyIsIuC5gOC4oeC4leC4o+C4l+C4teC5iOC4iOC4reC4lOC4o+C4liIsIuC4muC4seC4meC5hOC4lCIsIuC4m+C4peC5iOC4reC4h+C5hOC4nyIsIuC4o+C4luC5geC4l+C4o+C4geC5gOC4leC4reC4o+C5jCIsIuC4o+C4luC4muC4seC4qiIsIuC4o+C4luC4iOC4seC4geC4o+C4ouC4suC4mSIsIuC4q+C4seC4p+C4geC5iuC4reC4geC4meC5ieC4s+C4lOC4seC4muC5gOC4nuC4peC4tOC4hyIsIuC4o+C4luC4ouC4meC4leC5jCIsImRhxJ9sYXJ2ZXlhdGVwZWxlciIsInNva2FracWfYXJldGxlcmkiLCJiaXRraWxlciIsImHEn2HDp2xhciIsIsOHaW1lbiIsIsOnYWzEsWxhciIsImtha3TDvHMiLCJQYWxtaXllYcSfYcOnbGFyxLEiLCJEb8SfYSIsIsWfZWxhbGVsZXIiLCJkYcSfbGFyIiwidGVwZWxlciIsInN1eXVuYmVkZW5sZXJpIiwibmVoaXJsZXIiLCJTYWhpbGxlciIsIkfDvG5lxZ8iLCJBeSIsImfDtmt5w7x6w7wiLCJBcmHDp2xhciIsImFyYWJhbGFyIiwiYmlzaWtsZXRsZXIiLCJtb3Rvc2lrbGV0bGVyIiwia2FteW9uZXRsZXIiLCJ0aWNhcmlrYW15b25sYXIiLCJ0ZWtuZWxlciIsImxpbXV6aW5sZXIiLCJ0YWtzaWxlciIsIm9rdWxvdG9iw7xzw7wiLCJvdG9iw7xzIiwiaW7Fn2FhdGFyYWPEsSIsImhleWtlbGxlciIsIsOnZcWfbWVsZXIiLCJrw7ZwcsO8IiwiaXNrZWxlIiwiZ8O2a2RlbGVuIiwic8O8dHVuc8O8dHVubGFyxLEiLCJ2aXRyYXkiLCJldiIsImFwYXJ0bWFuYmluYXPEsSIsImhhZmlmZXYiLCJ0cmVuaXN0YXN5b251Iiwia8O8bCIsInlhbmfEsW5tdXNsdcSfdSIsInJla2xhbXBhbm9zdSIsInlvbGxhciIsInlheWFnZcOnaXRsZXJpIiwidHJhZmlrxLHFn8Sxa2xhcsSxIiwiZ2FyYWprYXDEsWxhcsSxIiwib3RvYsO8c2R1cmFrbGFyxLEiLCJ0cmFmaWtLb25pbGVyaSIsIlBhcmtzYXlhY8SxIiwibWVyZGl2ZW5sZXIiLCJiYWNhbGFyIiwidHJha3TDtnJsZXIiLCJZYW5nxLFubXVzbHXEn3UiLCJUcmFrdMO2ciIsIlRyYWZpa2xhbWJhc8SxIiwiTW90b3Npa2xldGluIiwiQmFjYSIsIk1lcmRpdmVuIiwiRGHEn3ZleWF0ZXBlIiwiUGFsbWl5ZWHEn2FjxLEiLCJZYXlhZ2XDp2lkaSIsIkvDtnByw7wiLCJUYWtzaSIsIlRla25lIiwiT3RvYsO8cyIsIkJpc2lrbGV0IiwiTW90b3Npa2xldCIsIlRhxZ/EsXQiLCJBcmFiYSIsIuOCueODiOODg+ODl+OCteOCpOODsyIsIumBk+i3r+aomeitmCIsIuakjeeJqSIsIuacqCIsIuiNiSIsIuS9juacqCIsIuOCq+OCr+OCv+OCuSIsIuODpOOCt+OBruacqCIsIuiHqueEtiIsIua7nSIsIuWxsSIsIuS4mCIsIuawtOWfnyIsIuays+W3nSIsIuODk+ODvOODgSIsIuWkqumZvSIsIuaciCIsIuepuiIsIui7iuS4oSIsIuiHquWLlei7iiIsIui7iiIsIuiHqui7oui7iiIsIuOCquODvOODiOODkOOCpCIsIuODlOODg+OCr+OCouODg+ODl+ODiOODqeODg+OCryIsIuOCs+ODnuODvOOCt+ODo+ODq+ODiOODqeODg+OCryIsIuODnOODvOODiCIsIuODquODoOOCuOODsyIsIuOCv+OCr+OCt+ODvCIsIuOCueOCr+ODvOODq+ODkOOCuSIsIuODkOOCuSIsIuW7uuiorei7iuS4oSIsIuW9q+WDjyIsIuWZtOawtCIsIuapiyIsIuapi+iEmiIsIui2hemrmOWxpOODk+ODqyIsIuafseOBvuOBn+OBr+afsSIsIuOCueODhuODs+ODieOCsOODqeOCuSIsIuWutiIsIuOCouODiuODkeODvOODiOODoeODs+ODiOODk+ODqyIsIueBr+WPsCIsIuOBp+OCk+OBl+OCg+OBruOCiuOBsCIsIuWwj+WxiyIsIua2iOeBq+WJpCIsIuOCouODk+ODq+ODnOODvOODiSIsIumBk+i3ryIsIuaoquaWreatqemBkyIsIuS/oeWPt+apnyIsIuS6pOmAmueBryIsIuOCrOODrOODvOOCuOODieOCoiIsIuODkOOCueWBnCIsIuODiOODqeODleOCo+ODg+OCr+OCs+ODvOODsyIsIuODkeODvOOCreODs+OCsOODoeODvOOCv+ODvCIsIumajuautSIsIueFmeeqgSIsIuODiOODqeOCr+OCv+ODvCIsIuWxseOChOS4mCIsIuWBnOi7iuaomeiqjCIsIui3r+eJjCIsIuaoueacqCIsIueBjOacqCIsIuS7meS6uuaOjCIsIuajlearmuaouSIsIueAkeW4gyIsIumrmOWxseaIluWxseS4mCIsIuS4mOmZtSIsIuawtOmrlCIsIuays+a1gSIsIua1t+eBmCIsIuaciOS6riIsIuWkqeepuiIsIui7iui8myIsIuaxvei7iiIsIuiFs+i4j+i7iiIsIuiHquihjOi7iiIsIuapn+i7iiIsIuaRqeaJmOi7iiIsIuearuWNoei7iiIsIuWVhueUqOWNoei7iiIsIuiIuSIsIuixquiPr+i9jui7iiIsIuWHuuenn+i7iiIsIuagoei7iiIsIuWFrOi7iiIsIuWFrOWFseaxvei7iiIsIuaWveW3pei7iui8myIsIumbleWDjyIsIuWZtOaziSIsIuapi+aigSIsIueivOmgrSIsIuaRqeWkqeWkp+aokyIsIuafseWtkOaIluafseWtkCIsIuW9qeiJsueOu+eSgyIsIuaIv+WtkCIsIuWFrOWvk+aokyIsIueHiOWhlCIsIueBq+i7iuermSIsIuS4gOajmiIsIua2iOmYsuagkyIsIuW7o+WRiueJjCIsIuihjOS6uuepv+i2iumBkyIsIuS6uuihjOapq+mBkyIsIue0hee2oOeHiCIsIui7iuW6q+mWgCIsIuW3tOWjq+ermSIsIuS6pOmAmumMkCIsIuWBnOi7iuWgtOioiOWDueihqCIsIuaok+airyIsIueFmeWbqiIsIuaLluaLieapnyIsIumbu+WWrui7iiIsIuWWrui7iiIsIuW3tOWjqyIsIuWNgeWtl+i3r+WPoyIsIuS6pOmAmueHiCIsIuaWkemmrOe3miIsIuioiOeoi+i7iiIsIueahOWjqyIsIuiIuemauyIsIuWxseWzsOaIluWxsSIsIuapi+aokSIsItGA0LDRgdGC0LXQvdC40Y8iLCLQtNC10YDQtdCy0YzRjyIsItC60YPRgdGC0LDRgNC90LjQutC4Iiwi0L/RgNC40YDQvtC00LAiLCLQstC+0LTQvtC/0LDQtNGLIiwi0YXQvtC70LzRiyIsItCy0L7QtNC+0LXQvNGLIiwi0YDQtdC60LgiLCLQv9C70Y/QttC4Iiwi0YHQvtC70L3RhtC1Iiwi0JvRg9C90LAiLCLQvdC10LHQviIsItC80LDRiNC40L3RiyIsItCy0LXQu9C+0YHQuNC/0LXQtNGLIiwi0LzQvtGC0L7RhtC40LrQu9GLIiwi0L/QuNC60LDQv9GLIiwi0LvQvtC00LrQuCIsItC70LjQvNGD0LfQuNC90YsiLCLQotCw0LrRgdC40YEiLCLQsNCy0YLQvtCx0YPRgSIsItGB0YLQsNGC0YPQuCIsItGE0L7QvdGC0LDQvdGLIiwi0L/QuNGA0YEiLCLQvdC10LHQvtGB0LrRgNC10LEiLCLQstC40YLRgNCw0LYiLCLQv9C10L/QtdC70YzQvdGL0LkiLCLQtNC+0YDQvtCz0LgiLCLRgdCy0LXRgtC+0YTQvtGAIiwi0LrQvtC90YPRgdGLIiwi0LvQtdGB0YLQvdC40YbQsCIsItC00YvQvNC+0YXQvtC00YsiLCLRgtGA0LDQutGC0L7RgNGLIiwi0LDQstGC0L7QvNC+0LHQuNC70LgiLCLQs9C+0YDRi9C40LvQuNGF0L7Qu9C80YsiLCLRgdCy0LXRgtC+0YTQvtGA0YsiLCLRgtGA0LDQvdGB0L/QvtGA0YLQvdGL0LXRgdGA0LXQtNGB0YLQstCwIiwi0L/QtdGI0LXRhdC+0LTQvdGL0LXQv9C10YDQtdGF0L7QtNGLIiwi0L/QvtC20LDRgNC90YvQtdCz0LjQtNGA0LDQvdGC0YsiLCLQu9C10YHRgtC90LjRhtGLIiwi0LPQuNC00YDQsNC90YLQsNC80LgiLCLQsNCy0YLQvtCx0YPRgdGLIiwi0LTRi9C80L7QstGL0LXRgtGA0YPQsdGLIiwi0YLRgNCw0LrRgtC+0YDQsCIsItGC0LDQutGB0LgiLCLQvNC+0YHRgtCw0LzQuCIsItCz0L7RgNC40YfQuNC/0LDQs9C+0YDQsdC4Iiwi0LfQvdCw0LrQuNC30YPQv9C40L3QutC4Iiwi0LTQvtGA0L7QttC90ZbQt9C90LDQutC4Iiwi0YDQvtGB0LvQuNC90LgiLCLQtNC10YDQtdCy0LAiLCLRh9Cw0LPQsNGA0L3QuNC60LgiLCLQv9Cw0LvRjNC80L7QstGW0LTQtdGA0LXQstCwIiwi0LLQvtC00L7RgdC/0LDQtNC4Iiwi0LPQvtGA0LgiLCLQv9Cw0LPQvtGA0LHQuCIsItCy0L7QtNC+0LnQvNC4Iiwi0YDRltGH0LrQuCIsItC/0LvRj9C20ZYiLCLRgdC+0L3RhtC1Iiwi0JzRltGB0Y/RhtGMIiwidGFicyIsInRvdGFsdGFicyIsImNsaWNrIiwicmFpbmJvdyIsIkltYWdlQ2FjaGUiLCJiYXNlNjRpbWciLCJyZXMiLCJlcnJvckRlc2NyaXB0aW9uIiwiZXJyb3JDb2RlIiwic29sdXRpb24iLCJ2YWx1ZSIsIkRvT2NyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImltYWdldG90ZXh0IiwiY2xpY2t0aW1lIiwiQ2hlY2tmb3JTdHVjayIsIkltYWdlVG9CYXNlNjQiLCJnZXRpbmRleCIsImRvbU1vZGlmeUNiIiwiaW1hZ2UiLCJpbWFnZWNvZGUiLCJzdWJzdHJpbmciLCJ0aW1laWQiLCJpbWcxMSIsIm9iaiIsIm9iamFsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ3aWR0aHgiLCJuYXR1cmFsV2lkdGgiLCJjdHgiLCJkYXRhVVJMIiwiYmFzZSIsIm5lZWRNb3JlIiwic3R1Y2tDb3VudCIsInN0dWNrUmVmcmVzaFRpbWVzIiwicmVmcmVzaCIsImlzQXV0b1N1Ym1pdCIsImlzQXV0b0NsaWNrQ2hlY2tCb3giLCJjaGVja0JveENsaWNrRGVsYXlUaW1lIiwiaW1nMTFTY29yZSIsIndhdGNoU2VydmljZSIsImlzVmVyaWZ5RW5kIiwiaXNCcmFtZVBhZ2UiLCJtYXRjaCIsImlzQW5jaG9yUGFnZSIsImdldHF1ZXN0aW9uIiwid2F0Y2hDaGVja2JveCIsImdldEF0dHJpYnV0ZSIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwicmVsb2FkIiwiZ2V0SXNFbmQiLCJ0aGVuIiwiZ2V0V29yZHMiLCJwYXJlbnQiLCJwb3N0TWVzc2FnZSIsInR5cGUiLCJOdW1iZXIiLCJyZVRhcmdldCIsInJjSW1hZ2VzZWxlY3RUYXJnZXQiLCJlcnJvclNlbGVjdE1vcmUiLCJlcnJvckR5bmFtaWNNb3JlIiwiaXNFbmQiLCJjYWxsdXJsIiwidGFzayIsInF1ZXN0aW9uc3RyIiwicXVlc3Rpb24iLCJuZXR3b3JrIiwicmVjYXB0Y2hhVmVyaWZ5RmFpbERlbGF5IiwicmVjYXB0Y2hhVmVyaWZ5VHJ5IiwiQ2xpY2tzIiwiZGVsYXlUaW1lIiwidGVzdCIsImhhc09iamVjdCIsInJlc3VsdGxpc3QiLCJvYmplY3RzIiwiZXZlbnQiLCJpbWFnZWNsYXNzaWZpY2F0aW9uX3Y0IiwicHJvbWlzZSIsImNiIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImtleSIsImkxOG4iLCJnZXRNZXNzYWdlIiwiaW5qZWN0IiwiaXNCbGFja1doaXRlUGFzcyIsImF1dG9ydW4iLCJkb2N1bWVudE9iaiIsImYiLCJwYXJlbnRFbGVtZW50IiwiaXNIaWRkZW4iLCJ2aXNpYmlsaXR5IiwiY29udGVudFdpbmRvdyIsInJlY2FwdGNoYUNvbmZpZyIsImlzVXNlTmV3U2NyaXB0Il0sInNvdXJjZVJvb3QiOiIifQ==