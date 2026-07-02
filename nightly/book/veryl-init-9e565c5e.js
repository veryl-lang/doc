"use strict";

(async () => {
    const url = "https://doc.veryl-lang.org/nightly/playground/pkg/veryl_wasm.js";
    const mod = await import(url);
    await mod.default();
    window.build = mod.build;
    window.format = mod.format;
})();

function wrapInPlaygroundPre(codeEl) {
    const parent = codeEl.parentNode;
    if (parent.tagName === "PRE") {
        parent.classList.add("playground");
        codeEl.classList.remove("playground");
        return parent;
    }
    const wrapper = document.createElement("pre");
    wrapper.className = "playground";
    codeEl.classList.remove("playground");
    parent.replaceChild(wrapper, codeEl);
    wrapper.appendChild(codeEl);
    return wrapper;
}

function ensureResultBlock(preBlock) {
    let next = preBlock.nextElementSibling;
    if (!(next && next.classList.contains("veryl-result"))) {
        next = document.createElement("pre");
        next.className = "veryl-result";
        const code = document.createElement("code");
        next.appendChild(code);
        preBlock.insertAdjacentElement("afterend", next);
    }
    return next.querySelector("code");
}

function paintResult(codeEl, text, isError) {
    codeEl.className = isError ? "language-text" : "language-verilog";
    codeEl.removeAttribute("data-highlighted");
    codeEl.textContent = text;
    if (window.hljs && !isError) {
        try {
            const highlight = window.hljs.highlightElement || window.hljs.highlightBlock;
            if (highlight) {
                highlight.call(window.hljs, codeEl);
            }
        } catch (_) {
        }
    }
}

function unpackBuild(out) {
    if (out == null) {
        return { text: "(empty output)", err: false };
    }
    if (typeof out === "string") {
        return { text: out, err: false };
    }
    const isErr = typeof out.err === "function" && out.err();
    if (isErr) {
        const diag = typeof out.diagnostics === "function" ? out.diagnostics() : "";
        const content = typeof out.content === "function" ? out.content() : "";
        return { text: content || diag || "(error)", err: true };
    }
    if (typeof out.content === "function") {
        return { text: out.content() || "(empty output)", err: false };
    }
    return { text: String(out), err: false };
}

function readSource(codeEl, editor) {
    if (editor) {
        return editor.getValue();
    }
    return codeEl.textContent;
}

function runVeryl(preBlock, codeEl, editor) {
    const resultCode = ensureResultBlock(preBlock);
    if (typeof window.build !== "function") {
        paintResult(resultCode, "Compiler is still loading. Please retry shortly.", true);
        return;
    }
    paintResult(resultCode, "Running...", true);
    try {
        const output = window.build(readSource(codeEl, editor));
        Promise.resolve(output)
            .then((value) => {
                const { text, err } = unpackBuild(value);
                paintResult(resultCode, text, err);
            })
            .catch((err) => {
                paintResult(resultCode, `Error: ${err}`, true);
            });
    } catch (err) {
        paintResult(resultCode, `Error: ${err}`, true);
    }
}

function iconHTML(id, fallback) {
    const tpl = document.getElementById(id);
    return tpl ? tpl.innerHTML : fallback;
}

function addPlaygroundButtons(preBlock, codeEl, editor) {
    if (preBlock.querySelector(":scope > .buttons > .play-button")) {
        return;
    }
    let buttons = preBlock.querySelector(":scope > .buttons");
    if (!buttons) {
        buttons = document.createElement("div");
        buttons.className = "buttons";
        preBlock.insertBefore(buttons, preBlock.firstChild);
    }

    const playButton = document.createElement("button");
    playButton.className = "play-button";
    playButton.type = "button";
    playButton.title = "Run this code";
    playButton.setAttribute("aria-label", "Run this code");
    playButton.innerHTML = iconHTML("fa-play", "&#9658;");
    playButton.addEventListener("click", () => runVeryl(preBlock, codeEl, editor));
    buttons.insertBefore(playButton, buttons.firstChild);

    if (editor) {
        const resetButton = document.createElement("button");
        resetButton.className = "reset-button";
        resetButton.type = "button";
        resetButton.title = "Undo changes";
        resetButton.setAttribute("aria-label", "Undo changes");
        resetButton.innerHTML = iconHTML("fa-clock-rotate-left", "&#8634;");
        resetButton.addEventListener("click", () => {
            editor.setValue(editor.originalCode);
            editor.clearSelection();
        });
        buttons.insertBefore(resetButton, playButton.nextSibling);
    }
}

function editorFor(codeEl) {
    if (!window.editors) {
        return null;
    }
    return window.editors.find((e) => e.container === codeEl) || null;
}

window.addEventListener("load", () => {
    const candidates = Array.from(document.querySelectorAll(".playground"));
    for (const codeEl of candidates) {
        if (codeEl.tagName === "PRE") {
            continue;
        }
        const editor = editorFor(codeEl);
        if (editor) {
            editor.getSession().setMode("ace/mode/veryl");
        }
        const preBlock = wrapInPlaygroundPre(codeEl);
        addPlaygroundButtons(preBlock, codeEl, editor);
    }
});
