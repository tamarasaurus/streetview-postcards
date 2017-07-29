'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('next/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layout = require('../components/Layout.js');

var _Layout2 = _interopRequireDefault(_Layout);

var _isomorphicUnfetch = require('isomorphic-unfetch');

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostcardLink = function PostcardLink(props) {
  return _react2.default.createElement('li', null, _react2.default.createElement(_link2.default, { as: '/p/' + props.id, href: '/postcards?id=' + props.id }, _react2.default.createElement('a', null, props.title)));
};

var Index = function Index(props) {
  return _react2.default.createElement(_Layout2.default, null, _react2.default.createElement('h1', {
    'data-jsx': 864050010
  }, 'Street view postcards'), _react2.default.createElement('ul', {
    'data-jsx': 864050010
  }, props.postcards.map(function (_ref) {
    var show = _ref.show;
    return _react2.default.createElement(PostcardLink, { key: show.id, id: show.id, title: show.name });
  })), _react2.default.createElement(_style2.default, {
    styleId: 864050010,
    css: 'h1[data-jsx="864050010"],a[data-jsx="864050010"]{font-family:"Arial"}ul[data-jsx="864050010"]{padding:10px}li[data-jsx="864050010"]{list-style:none;margin:5px 0}a[data-jsx="864050010"]{-webkit-text-decoration:none;text-decoration:none;color:blue}a[data-jsx="864050010"]:hover{opacity:0.6}'
  }));
};

Index.getInitialProps = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var res, data;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _isomorphicUnfetch2.default)('https://api.tvmaze.com/search/shows?q=batman');

        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();

        case 5:
          data = _context.sent;

          console.log('Show data fetched. Count: ' + data.length);

          return _context.abrupt('return', {
            postcards: data
          });

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

exports.default = Index;