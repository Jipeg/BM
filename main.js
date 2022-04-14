"use strict";
exports.__esModule = true;
exports.boyerMooreSearch = void 0;
/**
 * Returns the index of the first occurence of given string in the phrase
 * In case of no match, returns -1
 *
 * @param text string to be searched
 * @param pattern string to be found in the text
 */
function boyerMooreSearch(text, pattern) {
    // Handle edge case
    if (pattern.length === 0) {
        return -1;
    }
    var charTable = makeCharTable(pattern);
    var offsetTable = makeOffsetTable(pattern);
    for (var i = pattern.length - 1, j = void 0; i < text.length;) {
        for (j = pattern.length - 1; pattern[j] == text[i]; i--, j--) {
            if (j === 0) {
                return i;
            }
        }
        var charCode = text.charCodeAt(i);
        i += Math.max(offsetTable[pattern.length - 1 - j], charTable[charCode]);
    }
    return -1;
}
exports.boyerMooreSearch = boyerMooreSearch;
/**
 * Creates jump table, based on mismatched character information
 */
function makeCharTable(pattern) {
    var table = [];
    // 65536 being the max value of char + 1
    for (var i = 0; i < 65536; i++) {
        table.push(pattern.length);
    }
    for (var i = 0; i < pattern.length - 1; i++) {
        var charCode = pattern.charCodeAt(i);
        table[charCode] = pattern.length - 1 - i;
    }
    return table;
}
function makeOffsetTable(pattern) {
    var table = [];
    table.length = pattern.length;
    var lastPrefixPosition = pattern.length;
    for (var i = pattern.length; i > 0; i--) {
        if (isPrefix(pattern, i)) {
            lastPrefixPosition = i;
        }
        table[pattern.length - i] = lastPrefixPosition - 1 + pattern.length;
    }
    for (var i = 0; i < pattern.length - 1; i++) {
        var slen = suffixLength(pattern, i);
        table[slen] = pattern.length - 1 - i + slen;
    }
    return table;
}
function isPrefix(pattern, p) {
    for (var i = p, j = 0; i < pattern.length; i++, j++) {
        if (pattern[i] != pattern[j]) {
            return false;
        }
        return true;
    }
}
function suffixLength(pattern, p) {
    var len = 0;
    for (var i = p, j = pattern.length - 1; i >= 0 && pattern[i] == pattern[j]; i--, j--) {
        len += 1;
    }
    return len;
}
