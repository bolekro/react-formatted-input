"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Presets = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _format = require("./format.js");

var PatternPresets = _interopRequireWildcard(require("./presets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NOOP = () => {};

const Presets = PatternPresets;
exports.Presets = Presets;
const PROPS_TO_EXCLUDE = ["element", "value", "onChange"];

class FormattedInput extends _react.Component {
  constructor(props, ...rest) {
    super(props, ...rest); // format the provided value immediately

    const {
      formatted,
      raw
    } = (0, _format.formatValue)(props.value, this.getFormat(props));
    this.state = {
      rawValue: raw,
      formattedValue: formatted
    };
  }

  get inputType() {
    if (this.props.type === "password") {
      return "password";
    }

    return "text";
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      const {
        formatted: formattedValue,
        raw: rawValue
      } = (0, _format.formatValue)(this.props.value, this.getFormat(this.props));
      this.setState({
        formattedValue,
        rawValue
      });
    } else if (prevState.formattedValue !== this.state.formattedValue) {
      // only fire callback if the value changes
      this.props.onChange(this.state.formattedValue, this.state.rawValue);
    }
  }

  getFormat(props = this.props) {
    return this.inputType === "password" ? [] : props.format;
  }
  /**
   * Fetch optional pass-through props for the underlying input
   * @returns {Object} A props object to be spread onto the input
   */


  getOptionalProps() {
    return Object.keys(this.props).reduce((props, propName) => {
      if (PROPS_TO_EXCLUDE.indexOf(propName) === -1) {
        return _objectSpread({}, props, {
          [propName]: this.props[propName]
        });
      }

      return props;
    }, {});
  }
  /**
   * Handle value changes
   * @param {Object} event An input change event
   */


  onValueChange(event) {
    const inputValue = event.target.value;
    const {
      formatted,
      raw
    } = (0, _format.formatValue)(inputValue, this.getFormat());
    this.setState({
      rawValue: raw,
      formattedValue: formatted
    });
  }

  render() {
    const {
      element: Element
    } = this.props;
    return _react.default.createElement(Element, _extends({
      type: this.inputType,
      ref: this.getOptionalProps().inputref
    }, this.getOptionalProps(), {
      value: this.state.formattedValue,
      onChange: e => this.onValueChange(e)
    }));
  }

}

exports.default = FormattedInput;

_defineProperty(FormattedInput, "propTypes", {
  element: _propTypes.default.elementType.isRequired,
  format: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  onChange: _propTypes.default.func.isRequired,
  type: _propTypes.default.string.isRequired,
  value: _propTypes.default.string.isRequired,
  inputref: _propTypes.default.any
});

_defineProperty(FormattedInput, "defaultProps", {
  element: "input",
  format: [],
  onChange: NOOP,
  type: "text",
  value: ""
});