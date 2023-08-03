let slugify = require("slugify");

let successResponse = (result, msg) => {
    return {
        msg: msg,
        status: true,
        result: result
    }
}

let errorResponse = (msg) => {
    return {
        msg: JSON.stringify(msg),
        status: false,
        result: null
    }
}

const createSlug = (str) => {
    let slug = slugify(str, {
        lower: true
    });
    return slug;
}

const randomStr = (len) => {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let char_len = chars.length;
    let random = "";
    for(let i = 0; i < len; i++) {
        let posn = Math.floor(Math.random() * char_len);    // 0-62
        random += chars[posn];
    }
    return random;
}

module.exports = {successResponse, errorResponse, createSlug, randomStr}