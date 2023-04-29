if (!Array.prototype.reduce) {
    Object.defineProperty(Array.prototype, 'reduce', {
        value: function (callback /*, initialValue*/) {
            if (this === null) {
                throw new TypeError(
                    'Array.prototype.reduce ' + 'called on null or undefined'
                );
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // Steps 3, 4, 5, 6, 7
            var k = 0;
            var value;

            if (arguments.length >= 2) {
                value = arguments[1];
            } else {
                while (k < len && !(k in o)) {
                    k++;
                }

                // 3. If len is 0 and initialValue is not present,
                //    throw a TypeError exception.
                if (k >= len) {
                    throw new TypeError(
                        'Reduce of empty array ' + 'with no initial value'
                    );
                }
                value = o[k++];
            }

            // 8. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kPresent be ? HasProperty(O, Pk).
                // c. If kPresent is true, then
                //    i.  Let kValue be ? Get(O, Pk).
                //    ii. Let accumulator be ? Call(
                //          callbackfn, undefined,
                //          « accumulator, kValue, k, O »).
                if (k in o) {
                    value = callback(value, o[k], k, o);
                }

                // d. Increase k by 1.
                k++;
            }

            // 9. Return accumulator.
            return value;
        },
    });
}

// main function
function serializeJson(form, protected = false) {
    var data = {},
        form_arr = [];
    // export to array
    if (
        typeof HTMLFormElement === 'function' &&
        form instanceof HTMLFormElement
    ) {
        for (var i in form.elements) {
            if (
                form.elements[i] instanceof HTMLInputElement ||
                form.elements[i] instanceof HTMLSelectElement ||
                form.elements[i] instanceof HTMLTextAreaElement
            )
                form_arr.push({
                    name: form.elements[i].name,
                    value: form.elements[i].value,
                });
        }
    } else if (Array.isArray(form)) {
        form_arr = form;
    }

    // serialize to json
    data = form_arr.reduce(function (r, o) {
        var s = r,
            arr = o.name.split('.');
        arr.forEach((n, k) => {
            var ck = n.replace(/\[[0-9]*\]$/, '');
            if (!s.hasOwnProperty(ck))
                s[ck] = new RegExp('[[0-9]*]$').test(n) ? [] : {};
            if (s[ck] instanceof Array) {
                var i = parseInt((n.match(new RegExp('([0-9]+)]$')) || []).pop(), 10);
                i = isNaN(i) ? s[ck].length : i;
                s[ck][i] = s[ck][i] || {};
                if (k === arr.length - 1) {
                    if (protected && JSON.stringify({}) !== JSON.stringify(s[ck][i])) {
                        while (s[ck][i] !== undefined) {
                            var tmp = s[ck][i];
                            s[ck][i] = o.value;
                            o.value = tmp;
                            i++;
                        }
                    }
                    return (s[ck][i] = o.value);
                } else {
                    return (s = s[ck][i]);
                }
            } else {
                return k === arr.length - 1 ? (s[ck] = o.value) : (s = s[ck]);
            }
        });
        return r;
    }, {});
    return data;
}

// for jquery
if (typeof jQuery !== 'undefined') {
    jQuery.fn.extend({
        serializeJson: function () {
            return serializeJson(this.serializeArray());
        },
    });
}

// for nodejs
if (typeof module !== 'undefined') {
    module.exports = serializeJson;
}