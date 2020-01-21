"use strict";

System.register(["cc"], function (_export, _context) {
  "use strict";

  var _decorator, Component, Vec3, v3, systemEvent, SystemEvent, AnimationComponent, _dec, _dec2, _class, _class2, _descriptor, _temp, ccclass, property, PlayerCtr;

  _export({
    _dec: void 0,
    _dec2: void 0,
    _class: void 0,
    _class2: void 0,
    _descriptor: void 0,
    _temp: void 0
  });

  return {
    setters: [function (_cc) {
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      v3 = _cc.v3;
      systemEvent = _cc.systemEvent;
      SystemEvent = _cc.SystemEvent;
      AnimationComponent = _cc.AnimationComponent;
    }],
    execute: function () {
      cc._RF.push(window.module || {}, "2386dUj661BkYDGxRorDtCV", "PlayerCtr"); // begin PlayerCtr


      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("PlayerCtr", PlayerCtr = (_dec = ccclass("PlayerCtr"), _dec2 = property({
        type: AnimationComponent
      }), _dec(_class = (_class2 = (_temp =
      /*#__PURE__*/
      function (_Component) {
        babelHelpers.inherits(PlayerCtr, _Component);

        function PlayerCtr() {
          var _babelHelpers$getProt;

          var _this;

          babelHelpers.classCallCheck(this, PlayerCtr);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = babelHelpers.possibleConstructorReturn(this, (_babelHelpers$getProt = babelHelpers.getPrototypeOf(PlayerCtr)).call.apply(_babelHelpers$getProt, [this].concat(args)));
          babelHelpers.initializerDefineProperty(_this, "BodyAnim", _descriptor, babelHelpers.assertThisInitialized(_this));
          _this._startJump = false;
          _this._jumpStep = 0;
          _this._curJumpTime = 0;
          _this._jumpTime = 0.1;
          _this._curJumpSpeed = 0;
          _this._curPos = v3();
          _this._deltaPos = v3(0, 0, 0);
          _this._targetPos = v3();
          _this._isMoving = false;
          return _this;
        }

        babelHelpers.createClass(PlayerCtr, [{
          key: "start",
          value: function start() {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
          }
        }, {
          key: "update",
          value: function update(dt) {
            if (this._startJump) {
              this._curJumpTime += dt;

              if (this._curJumpTime > this._jumpTime) {
                // this.node.setPosition(this._targetPos);
                this._startJump = false;
                this.onOnceJumpEnd();
              } else {
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * dt;
                Vec3.add(this._curPos, this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
              }
            }
          }
        }, {
          key: "onMouseUp",
          value: function onMouseUp(event) {
            if (event.getButton() === 0) {
              this.jumpByStep(1);
            } else if (event.getButton() === 2) {
              this.jumpByStep(2);
            }
          }
        }, {
          key: "jumpByStep",
          value: function jumpByStep(step) {
            if (this._isMoving) return;
            this._startJump = true;
            this._jumpStep = step;
            this._curJumpTime = 0;
            this._curJumpSpeed = this._jumpStep / this._jumpTime;
            this.node.getPosition(this._curPos);
            Vec3.add(this._targetPos, this._curPos, v3(this._jumpStep, 0, 0));
            this._isMoving = true;

            if (step === 1) {
              this.BodyAnim.play('oneStep');
            } else if (step === 2) {
              this.BodyAnim.play('twoStep');
            }
          }
        }, {
          key: "onOnceJumpEnd",
          value: function onOnceJumpEnd() {
            this._isMoving = false;
          }
        }]);
        return PlayerCtr;
      }(Component), _temp), (_descriptor = babelHelpers.applyDecoratedDescriptor(_class2.prototype, "BodyAnim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cc._RF.pop(); // end PlayerCtr

    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Q6Ly8vYXNzZXRzL1NjcmlwdHMvUGxheWVyQ3RyLnRzIl0sIm5hbWVzIjpbIl9kZWNvcmF0b3IiLCJDb21wb25lbnQiLCJWZWMzIiwidjMiLCJzeXN0ZW1FdmVudCIsIlN5c3RlbUV2ZW50IiwiQW5pbWF0aW9uQ29tcG9uZW50IiwiY2NjbGFzcyIsInByb3BlcnR5IiwiUGxheWVyQ3RyIiwidHlwZSIsIl9zdGFydEp1bXAiLCJfanVtcFN0ZXAiLCJfY3VySnVtcFRpbWUiLCJfanVtcFRpbWUiLCJfY3VySnVtcFNwZWVkIiwiX2N1clBvcyIsIl9kZWx0YVBvcyIsIl90YXJnZXRQb3MiLCJfaXNNb3ZpbmciLCJvbiIsIkV2ZW50VHlwZSIsIk1PVVNFX1VQIiwib25Nb3VzZVVwIiwiZHQiLCJvbk9uY2VKdW1wRW5kIiwibm9kZSIsImdldFBvc2l0aW9uIiwieCIsImFkZCIsInNldFBvc2l0aW9uIiwiZXZlbnQiLCJnZXRCdXR0b24iLCJqdW1wQnlTdGVwIiwic3RlcCIsIkJvZHlBbmltIiwicGxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVNBLE1BQUFBLFUsT0FBQUEsVTtBQUFZQyxNQUFBQSxTLE9BQUFBLFM7QUFBaUJDLE1BQUFBLEksT0FBQUEsSTtBQUFNQyxNQUFBQSxFLE9BQUFBLEU7QUFBSUMsTUFBQUEsVyxPQUFBQSxXO0FBQXlCQyxNQUFBQSxXLE9BQUFBLFc7QUFBYUMsTUFBQUEsa0IsT0FBQUEsa0I7OztnRkFFYjs7O0FBRGpFQyxNQUFBQSxPLEdBQXNCUCxVLENBQXRCTyxPO0FBQVNDLE1BQUFBLFEsR0FBYVIsVSxDQUFiUSxROzsyQkFHSkMsUyxXQURaRixPQUFPLENBQUMsV0FBRCxDLFVBRUhDLFFBQVEsQ0FBQztBQUFFRSxRQUFBQSxJQUFJLEVBQUVKO0FBQVIsT0FBRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBR0RLLFUsR0FBc0IsSztnQkFDdEJDLFMsR0FBb0IsQztnQkFDcEJDLFksR0FBdUIsQztnQkFDdkJDLFMsR0FBb0IsRztnQkFDcEJDLGEsR0FBd0IsQztnQkFDeEJDLE8sR0FBZ0JiLEVBQUUsRTtnQkFDbEJjLFMsR0FBa0JkLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQztnQkFDcEJlLFUsR0FBbUJmLEVBQUUsRTtnQkFDckJnQixTLEdBQVksSzs7Ozs7O2tDQUVaO0FBQ0pmLFlBQUFBLFdBQVcsQ0FBQ2dCLEVBQVosQ0FBZWYsV0FBVyxDQUFDZ0IsU0FBWixDQUFzQkMsUUFBckMsRUFBK0MsS0FBS0MsU0FBcEQsRUFBK0QsSUFBL0Q7QUFDSDs7O2lDQUVNQyxFLEVBQUk7QUFDUCxnQkFBSSxLQUFLYixVQUFULEVBQXFCO0FBQ2pCLG1CQUFLRSxZQUFMLElBQXFCVyxFQUFyQjs7QUFDQSxrQkFBSSxLQUFLWCxZQUFMLEdBQW9CLEtBQUtDLFNBQTdCLEVBQXdDO0FBQ3BDO0FBQ0EscUJBQUtILFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxxQkFBS2MsYUFBTDtBQUNILGVBSkQsTUFJTztBQUNILHFCQUFLQyxJQUFMLENBQVVDLFdBQVYsQ0FBc0IsS0FBS1gsT0FBM0I7QUFDQSxxQkFBS0MsU0FBTCxDQUFlVyxDQUFmLEdBQW1CLEtBQUtiLGFBQUwsR0FBcUJTLEVBQXhDO0FBQ0F0QixnQkFBQUEsSUFBSSxDQUFDMkIsR0FBTCxDQUFTLEtBQUtiLE9BQWQsRUFBdUIsS0FBS0EsT0FBNUIsRUFBcUMsS0FBS0MsU0FBMUM7QUFDQSxxQkFBS1MsSUFBTCxDQUFVSSxXQUFWLENBQXNCLEtBQUtkLE9BQTNCO0FBQ0g7QUFDSjtBQUNKOzs7b0NBRVNlLEssRUFBbUI7QUFDekIsZ0JBQUlBLEtBQUssQ0FBQ0MsU0FBTixPQUFzQixDQUExQixFQUE2QjtBQUN6QixtQkFBS0MsVUFBTCxDQUFnQixDQUFoQjtBQUNILGFBRkQsTUFFTyxJQUFJRixLQUFLLENBQUNDLFNBQU4sT0FBc0IsQ0FBMUIsRUFBNkI7QUFDaEMsbUJBQUtDLFVBQUwsQ0FBZ0IsQ0FBaEI7QUFDSDtBQUNKOzs7cUNBRVVDLEksRUFBYztBQUNyQixnQkFBSSxLQUFLZixTQUFULEVBQW9CO0FBQ3BCLGlCQUFLUixVQUFMLEdBQWtCLElBQWxCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUJzQixJQUFqQjtBQUNBLGlCQUFLckIsWUFBTCxHQUFvQixDQUFwQjtBQUNBLGlCQUFLRSxhQUFMLEdBQXFCLEtBQUtILFNBQUwsR0FBaUIsS0FBS0UsU0FBM0M7QUFDQSxpQkFBS1ksSUFBTCxDQUFVQyxXQUFWLENBQXNCLEtBQUtYLE9BQTNCO0FBQ0FkLFlBQUFBLElBQUksQ0FBQzJCLEdBQUwsQ0FBUyxLQUFLWCxVQUFkLEVBQTBCLEtBQUtGLE9BQS9CLEVBQXdDYixFQUFFLENBQUMsS0FBS1MsU0FBTixFQUFpQixDQUFqQixFQUFvQixDQUFwQixDQUExQztBQUNBLGlCQUFLTyxTQUFMLEdBQWlCLElBQWpCOztBQUVBLGdCQUFJZSxJQUFJLEtBQUssQ0FBYixFQUFnQjtBQUNaLG1CQUFLQyxRQUFMLENBQWNDLElBQWQsQ0FBbUIsU0FBbkI7QUFDSCxhQUZELE1BRU8sSUFBSUYsSUFBSSxLQUFLLENBQWIsRUFBZ0I7QUFDbkIsbUJBQUtDLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixTQUFuQjtBQUNIO0FBQ0o7OzswQ0FFZTtBQUNaLGlCQUFLakIsU0FBTCxHQUFpQixLQUFqQjtBQUNIOzs7UUE3RDBCbEIsUzs7Ozs7aUJBRUksSTs7OztvQkFKakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIE5vZGUsIFZlYzMsIHYzLCBzeXN0ZW1FdmVudCwgRXZlbnRNb3VzZSwgU3lzdGVtRXZlbnQsIEFuaW1hdGlvbkNvbXBvbmVudCB9IGZyb20gXCJjY1wiO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3MoXCJQbGF5ZXJDdHJcIilcclxuZXhwb3J0IGNsYXNzIFBsYXllckN0ciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBBbmltYXRpb25Db21wb25lbnQgfSlcclxuICAgIEJvZHlBbmltOiBBbmltYXRpb25Db21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3N0YXJ0SnVtcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfanVtcFN0ZXA6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9jdXJKdW1wVGltZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2p1bXBUaW1lOiBudW1iZXIgPSAwLjE7XHJcbiAgICBwcml2YXRlIF9jdXJKdW1wU3BlZWQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9jdXJQb3M6IFZlYzMgPSB2MygpO1xyXG4gICAgcHJpdmF0ZSBfZGVsdGFQb3M6IFZlYzMgPSB2MygwLCAwLCAwKTtcclxuICAgIHByaXZhdGUgX3RhcmdldFBvczogVmVjMyA9IHYzKCk7XHJcbiAgICBwcml2YXRlIF9pc01vdmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHN5c3RlbUV2ZW50Lm9uKFN5c3RlbUV2ZW50LkV2ZW50VHlwZS5NT1VTRV9VUCwgdGhpcy5vbk1vdXNlVXAsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGFydEp1bXApIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VySnVtcFRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJKdW1wVGltZSA+IHRoaXMuX2p1bXBUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5fdGFyZ2V0UG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0SnVtcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk9uY2VKdW1wRW5kKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0UG9zaXRpb24odGhpcy5fY3VyUG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlbHRhUG9zLnggPSB0aGlzLl9jdXJKdW1wU3BlZWQgKiBkdDtcclxuICAgICAgICAgICAgICAgIFZlYzMuYWRkKHRoaXMuX2N1clBvcywgdGhpcy5fY3VyUG9zLCB0aGlzLl9kZWx0YVBvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5fY3VyUG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk1vdXNlVXAoZXZlbnQ6IEV2ZW50TW91c2UpIHtcclxuICAgICAgICBpZiAoZXZlbnQuZ2V0QnV0dG9uKCkgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5qdW1wQnlTdGVwKDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZ2V0QnV0dG9uKCkgPT09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5qdW1wQnlTdGVwKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBqdW1wQnlTdGVwKHN0ZXA6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc01vdmluZykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0SnVtcCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fanVtcFN0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMuX2N1ckp1bXBUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJKdW1wU3BlZWQgPSB0aGlzLl9qdW1wU3RlcCAvIHRoaXMuX2p1bXBUaW1lO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRQb3NpdGlvbih0aGlzLl9jdXJQb3MpO1xyXG4gICAgICAgIFZlYzMuYWRkKHRoaXMuX3RhcmdldFBvcywgdGhpcy5fY3VyUG9zLCB2Myh0aGlzLl9qdW1wU3RlcCwgMCwgMCkpO1xyXG4gICAgICAgIHRoaXMuX2lzTW92aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHN0ZXAgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5Cb2R5QW5pbS5wbGF5KCdvbmVTdGVwJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGVwID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQm9keUFuaW0ucGxheSgndHdvU3RlcCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk9uY2VKdW1wRW5kKCkge1xyXG4gICAgICAgIHRoaXMuX2lzTW92aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19