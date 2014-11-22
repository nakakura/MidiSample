/// <reference path="midi.d.ts" />
/// <reference path="es6-promise.d.ts" />
var MidiSample;
(function (_MidiSample) {
    var MidiSample = (function () {
        function MidiSample() {
            var _this = this;
            this._onSuccessCallback = function (item) {
                _this._midiPort = item;
                item.onconnect = function (event) {
                    console.log("onconnect");
                    console.log(event);
                };
                item.ondisconnect = function (event) {
                    console.log("ondisconnect");
                    console.log(event);
                };
                console.log("sysexenabled");
                console.log(item.sysexEnabled);
                /*
                console.log(item.inputs.get("701435409"));
                console.log(item.inputs.has("701435409"));
                console.log(item.inputs.keys());
                console.log(item.inputs.keys().next());
                console.log(item.inputs.values());
                var inputs = this._midiPort.inputs.values();
                console.log(this._midiPort.inputs.entries().next());
                console.log(this._midiPort.inputs.entries().next().done);
                */
                var inputs = _this._midiPort.inputs.values();
                for (var o = inputs.next(); !o.done; o = inputs.next()) {
                    _this._inputs.push(o.value);
                    console.log(o.value);
                }
                var outputs = item.outputs.values();
                for (var op = outputs.next(); !op.done; op = outputs.next()) {
                    _this._outputs.push(op.value);
                    op.value.send([0x90, 0x45, 0x7f]);
                }
                for (var cnt = 0; cnt < _this._inputs.length; cnt++) {
                    _this._inputs[cnt].onmidimessage = function (event) {
                        _this.onMidiMessage(event.data);
                    };
                }
            };
            this.onErrorCallback = function (access) {
            };
            this.onMidiMessage = function (event) {
                console.log(event);
            };
            this._inputs = [];
            this._outputs = [];
            this._setupMidi();
        }
        MidiSample.prototype._setupMidi = function () {
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('chrome') != -1) {
                if (navigator.requestMIDIAccess !== undefined) {
                    navigator.requestMIDIAccess().then(this._onSuccessCallback, this.onErrorCallback);
                }
            }
        };
        return MidiSample;
    })();
    _MidiSample.MidiSample = MidiSample;
})(MidiSample || (MidiSample = {}));
//# sourceMappingURL=midi.js.map