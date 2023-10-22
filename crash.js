const crypto = require('node:crypto');

const e = 2 ** 52;
const salt = '0000000000000000000fa3b65e43e4240d71762a5bf397d5304b2596d116859c';
let game_hash = '100af1b49f5e9f87efc81f838bf9b1f5e38293e5b4cf6d0b366c004e0a8d9987';

function get_result(game_hash) {
    let hm = crypto.createHmac('sha256', game_hash);
    hm.update(salt);
    let h = hm.digest('hex');
    if (parseInt(h, 16) % 33 === 0) {
        return 1;
    }
    h = parseInt(h.slice(0, 13), 16);
    let e = 2 ** 52;
    return Math.ceil((((100 * e - h) / (e - h)))) / 100.0;
}

function get_prev_game(hash_code) {
    let m = crypto.createHash('sha256');
    m.update(hash_code);
    return m.digest('hex');
}

game_hash = '100af1b49f5e9f87efc81f838bf9b1f5e38293e5b4cf6d0b366c004e0a8d9987'; // Update to latest game's hash for more results
let first_game = '77b271fe12fca03c618f63dfb79d4105726ba9d4a25bb3f1964e435ccf9cb209';

let results = [];
let count = 0;
while (game_hash !== first_game) {
    count += 1;
    results.push(get_result(game_hash));
    game_hash = get_prev_game(game_hash);
}

results = results.map(Number);
