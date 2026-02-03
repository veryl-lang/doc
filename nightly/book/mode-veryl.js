ace.define("ace/mode/veryl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var VerylHighlightRules = function () {
    var keywords = "case|default|else|if_reset|if|inside|outside|switch|converse|inout|input|output|same|false|lsb|msb|true|for|in|repeat|rev|step|alias|always_comb|always_ff|assign|as|bind|block|connect|const|final|import|initial|inst|let|param|return|break|type|var|embed|enum|function|include|interface|modport|module|package|proto|pub|struct|union|unsafe|bit|bbool|lbool|clock|clock_posedge|clock_negedge|f32|f64|i8|i16|i32|i64|logic|reset|reset_async_high|reset_async_low|reset_sync_high|reset_sync_low|signed|string|tri|u8|u16|u32|u64";
    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
    }, "identifier", false);
    this.$rules = {
        "start": [{
                token: "comment",
                regex: "//.*$"
            }, {
                token: "comment.start",
                regex: "/\\*",
                next: [
                    { token: "comment.end", regex: "\\*/", next: "start" },
                    { defaultToken: "comment" }
                ]
            }, {
                token: "string.start",
                regex: '"',
                next: [
                    { token: "constant.language.escape", regex: /\\(?:[ntvfa\\"]|[0-7]{1,3}|\x[a-fA-F\d]{1,2}|)/, consumeLineEnd: true },
                    { token: "string.end", regex: '"|$', next: "start" },
                    { defaultToken: "string" }
                ]
            }, {
                token: "string",
                regex: "'^[']'"
            }, {
                token: "constant.numeric", // float
                regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token: keywordMapper,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token: "keyword.operator",
                regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
            }, {
                token: "paren.lparen",
                regex: "[\\(]"
            }, {
                token: "paren.rparen",
                regex: "[\\)]"
            }, {
                token: "text",
                regex: "\\s+"
            }]
    };
    this.normalizeRules();
};
oop.inherits(VerylHighlightRules, TextHighlightRules);
exports.VerylHighlightRules = VerylHighlightRules;

});

ace.define("ace/mode/veryl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/veryl_highlight_rules","ace/range"], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var VerylHighlightRules = require("./veryl_highlight_rules").VerylHighlightRules;
var Range = require("../range").Range;
var Mode = function () {
    this.HighlightRules = VerylHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);
(function () {
    this.lineCommentStart = "//";
    this.blockComment = { start: "/*", end: "*/" };
    this.$quotes = { '"': '"' };
    this.$id = "ace/mode/veryl";
}).call(Mode.prototype);
exports.Mode = Mode;

});                (function() {
                    ace.require(["ace/mode/veryl"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
