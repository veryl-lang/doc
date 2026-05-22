#!/bin/sh
# mdbook preprocessor that fetches the Veryl grammar file as a side effect.
# Order matters: consume stdin first to unblock mdbook's writer, then fetch,
# then emit the captured book JSON unchanged.
set -eu

if [ "${1:-}" = "supports" ]; then
    [ "${2:-}" = "html" ] && exit 0 || exit 1
fi

input=$(mktemp)
trap 'rm -f "$input"' EXIT
cat > "$input"
curl -sSL -o veryl.par https://raw.githubusercontent.com/veryl-lang/veryl/master/crates/parser/veryl.par >&2
# mdbook sends [context, book] on stdin and expects the modified book on stdout.
python3 -c 'import sys, json; json.dump(json.load(sys.stdin)[1], sys.stdout)' < "$input"
