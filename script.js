/*jshint globalstrict: true */
/*jslint node: true */

var $ = function (id) {
        "use strict";
        return document.getElementById(id);
    },
    inp_fld = $("input"),
    enc_div = $("enc"),
    dec_div = $("dec"),
    whl_1 = $("wheel-1"),
    whl_2 = $("wheel-2"),
    whl_3 = $("wheel-3"),
    whlf_1 = $("wheelf-1"),
    whlf_2 = $("wheelf-2"),
    whlf_3 = $("wheelf-3"),
    cipher_string = "\nABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890!@#$%^&*()`~-_=+[]{}\\|;:'\",<.>/?",
    cipher = cipher_string.split(""),
    wheel1 = 0,
    wheel2 = 0,
    wheel3 = 0;

whl_1.max = String(cipher.length - 1);
whl_2.max = String(cipher.length - 1);
whl_3.max = String(cipher.length - 1);

function wheel_constrain(n) {
    "use strict";
    var SDO = $("wheel-" + n);
    if (SDO.value < 0) { SDO.value = 0; }
    if (SDO.value > cipher.length - 1) { SDO.value = cipher.length - 1; }
}

function update_wheels() {
    "use strict";
    wheel1 += 1;
    wheel2 += 3;
    if (wheel1 >= cipher.length) { wheel1 = 0; wheel2 += 3; wheel3 += 7; }
    if (wheel2 >= cipher.length) { wheel2 = 0; wheel1 += 2; wheel3 += 3; }
    if (wheel3 >= cipher.length) { wheel3 = 0; }

    if (wheel1 >= cipher.length || wheel2 >= cipher.length || wheel3 >= cipher.length) {
        update_wheels();
    }
}

function find_cipher(c) {
    "use strict";
    var i = 0;
    for (i = 0; i < cipher.length; i += 1) {
        if (cipher[i] === c) { return i; }
    }
    return 0;
}

function encode_text(t) {
    "use strict";
    t = t.toUpperCase();
    var R = "", i = 0;
    for (i; i < t.length; i += 1) {
        update_wheels();
        R += cipher[(wheel1 * (wheel2 + 1) + wheel2 + wheel3 + find_cipher(t[i])) % cipher.length];
    }
    return R;
}


function randomize_wheels() {
    "use strict";
    whl_1.value = Math.round(Math.random() * cipher.length);
    whl_2.value = Math.round(Math.random() * cipher.length);
    whl_3.value = Math.round(Math.random() * cipher.length);
}

function submit_data() {
    "use strict";
    wheel1 = Number(whl_1.value);
    wheel2 = Number(whl_2.value);
    wheel3 = Number(whl_3.value);

    enc_div.innerText = encode_text(inp_fld.value);
    dec_div.innerText = (inp_fld.value).toUpperCase();

    whlf_1.innerText = wheel1;
    whlf_2.innerText = wheel2;
    whlf_3.innerText = wheel3;
}

