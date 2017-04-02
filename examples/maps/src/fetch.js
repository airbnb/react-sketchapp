/* globals NSHTTPURLResponse NSString NSASCIIStringEncoding NSUTF8StringEncoding MOPointer NSJSONSerialization coscript NSURL NSMutableURLRequest NSMutableData NSURLConnection */

var _ObjCClass = require('cocoascript-class');

var ObjCClass = _ObjCClass.default;

function response(httpResponse, data) {
  var keys = [];
  var all = [];
  var headers = {};
  var header;

  for (var i = 0; i < httpResponse.allHeaderFields().allKeys().length; i++) {
    var key = httpResponse.allHeaderFields().allKeys()[i].toLowerCase();
    var value = httpResponse.allHeaderFields()[key];
    keys.push(key);
    all.push([key, value]);
    header = headers[key];
    headers[key] = header ? `${header},${value}` : value;
  }

  return {
    ok: (httpResponse.statusCode() / 200 | 0) == 1, // 200-399
    status: httpResponse.statusCode(),
    statusText: NSHTTPURLResponse.localizedStringForStatusCode(httpResponse.statusCode()),
    url: httpResponse.URL(),
    clone: response.bind(this, httpResponse, data),
    text() {
      return new Promise((resolve, reject) => {
        var str = NSString.alloc().initWithData_encoding(data, NSASCIIStringEncoding);
        if (str) {
          resolve(str);
        } else {
          reject(new Error("Couldn't parse body"));
        }
      });
    },
    json() {
      return new Promise((resolve, reject) => {
        var str = NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding);
        if (str) {
          // parse errors are turned into exceptions, which cause promise to be rejected
          var obj = JSON.parse(str);
          resolve(obj);
        } else {
          reject(new Error('Could not parse JSON because it is not valid UTF-8 data.'));
        }
      });
    },
    blob() {
      return Promise.resolve(data);
    },
    headers: {
      keys: () => keys,
      entries: () => all,
      get: n => headers[n.toLowerCase()],
      has: n => n.toLowerCase() in headers,
    },
  };
}

// We create one ObjC class for ourselves here
var DelegateClass;

function fetch(urlString, options) {
  options = options || {};
  coscript.setShouldKeepAround(true);
  return new Promise((resolve, reject) => {
    var url = NSURL.alloc().initWithString_(urlString);
    var request = NSMutableURLRequest.requestWithURL_(url);
    request.setHTTPMethod(options.method || 'GET');

    for (var i in options.headers) {
      request.setValue_forHTTPHeaderField(options.headers[i], i);
    }

    if (options.body) {
      request.setHTTPBody(data);
    }

    if (!DelegateClass) {
      DelegateClass = ObjCClass({
        classname: 'FetchPolyfillDelegate',
        data: null,
        httpResponse: null,
        callbacks: null,

        'connectionDidFinishLoading:': function (connection) {
          coscript.setShouldKeepAround(false);
          return this.callbacks.resolve(response(this.httpResponse, this.data));
        },
        'connection:didReceiveResponse:': function (connection, httpResponse) {
          this.httpResponse = httpResponse;
          this.data = NSMutableData.alloc().init();
        },
        'connection:didFailWithError:': function (connection, error) {
          coscript.setShouldKeepAround(false);
          return this.callbacks.reject(error);
        },
        'connection:didReceiveData:': function (connection, data) {
          this.data.appendData(data);
        },
      });
    }

    var connectionDelegate = DelegateClass.new();
    connectionDelegate.callbacks = NSDictionary.dictionaryWithDictionary({
      resolve,
      reject,
    });

    NSURLConnection.alloc().initWithRequest_delegate(request, connectionDelegate);
  });
}

// polyfill the global object
var commonjsGlobal = typeof global !== 'undefined' ? global : this;

commonjsGlobal.fetch = commonjsGlobal.fetch || fetch;

module.exports = fetch;
