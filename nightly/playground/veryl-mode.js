// Veryl language mode for CodeMirror 6 (StreamLanguage)
// This file is auto-generated from the Veryl language specification.
// Do not edit manually.

const verylKeywords = new Set([
  "case", "default", "else", "if_reset", "if", "inside", "outside", "switch", "converse",
  "inout", "input", "output", "same", "false", "lsb", "msb", "true",
  "for", "in", "repeat", "rev", "step",
  "alias", "always_comb", "always_ff", "assign", "as", "bind", "block", "connect",
  "const", "final", "import", "initial", "inst", "let", "param", "return", "break",
  "type", "var", "embed", "enum", "function", "include", "interface", "modport",
  "module", "package", "proto", "pub", "struct", "union", "unsafe"
]);

const verylTypes = new Set([
  "bit", "bbool", "lbool", "clock", "clock_posedge", "clock_negedge",
  "f32", "f64", "i8", "i16", "i32", "i64", "logic",
  "reset", "reset_async_high", "reset_async_low", "reset_sync_high", "reset_sync_low",
  "signed", "string", "tri", "u8", "u16", "u32", "u64"
]);

export const verylMode = {
  startState() { return { inBlockComment: false }; },
  token(stream, state) {
    if (state.inBlockComment) {
      if (stream.match("*/")) { state.inBlockComment = false; return "comment"; }
      stream.next();
      return "comment";
    }
    if (stream.match("//")) { stream.skipToEnd(); return "comment"; }
    if (stream.match("/*")) { state.inBlockComment = true; return "comment"; }
    if (stream.match(/"(?:[^"\\]|\\.)*"/)) return "string";
    if (stream.match(/(?:32'h|16'h|8'h|64'h)?[0-9][0-9a-fA-F_]*(?:\.[0-9_]+)?(?:[eE][+-]?[0-9]+)?/)) return "number";
    if (stream.match(/[a-zA-Z_]\w*/)) {
      const w = stream.current();
      if (verylKeywords.has(w)) return "keyword";
      if (verylTypes.has(w)) return "typeName";
      return null;
    }
    stream.next();
    return null;
  }
};
