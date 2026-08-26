(function () {
'use strict';

function $(sel, root) {
return (root || document).querySelector(sel);
}
function $all(sel, root) {
return Array.prototype.slice.call((root || document).querySelectorAll(sel));
}

/* ---------------- status bar ---------------- */
function initStatusbar() {
var root = $('#statusbar');
var text = $('#statusbar-text');
if (!root || !text) return;
var block = 312441882;
function tick() {
block += 1;
var executors = 128 + Math.floor(Math.random() * 7) - 3;
var p50 = (1.0 + Math.random() * 0.5).toFixed(1);
text.textContent =
'network: alive · executors: ' + executors +
' · P50 ' + p50 + 's · block ' + block.toLocaleString('en-US');
}
tick();
setInterval(tick, 3000);
}

/* ---------------- nav ---------------- */
function initNav() {
var toggle = $('#nav-toggle');
var links = $('#nav-links');
if (!toggle || !links) return;
function setOpen(open) {
links.setAttribute('data-open', open ? 'true' : 'false');
toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}
toggle.addEventListener('click', function () {
setOpen(links.getAttribute('data-open') !== 'true');
});
links.addEventListener('click', function (e) {
if (e.target && e.target.closest && e.target.closest('a')) setOpen(false);
});
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape' && links.getAttribute('data-open') === 'true') setOpen(false);
});
}

/* ---------------- command palette ---------------- */
var PALETTE_ITEMS = [
{ name: 'Home', desc: 'index.html', href: 'index.html', kind: 'page' },
{ name: 'Commands', desc: 'commands.html', href: 'commands.html', kind: 'page' },
{ name: 'Guard', desc: 'guard.html', href: 'guard.html', kind: 'page' },
{ name: 'Security', desc: 'security.html', href: 'security.html', kind: 'page' },
{ name: 'Scripts', desc: 'scripts.html', href: 'scripts.html', kind: 'page' },
{ name: 'Pricing', desc: 'pricing.html', href: 'pricing.html', kind: 'page' },
{ name: 'Docs', desc: 'docs.html', href: 'docs.html', kind: 'page' },
{ name: 'Changelog', desc: 'changelog.html', href: 'changelog.html', kind: 'page' },
{ name: 'Token', desc: 'token.html', href: 'token.html', kind: 'page' },
{ name: 'dog', desc: 'show any object', href: 'commands.html#cmd-dog' },
{ name: 'ls', desc: 'list objects', href: 'commands.html#cmd-ls' },
{ name: 'grep', desc: 'filter a stream', href: 'commands.html#cmd-grep' },
{ name: 'sort', desc: 'order by a field', href: 'commands.html#cmd-sort' },
{ name: 'diff', desc: 'compare two states', href: 'commands.html#cmd-diff' },
{ name: 'scan', desc: 'walk state', href: 'commands.html#cmd-scan' },
{ name: 'sweep', desc: 'close dust, recover rent', href: 'commands.html#cmd-sweep' },
{ name: 'hiss', desc: 'surface risk', href: 'commands.html#cmd-hiss' },
{ name: 'nine', desc: 'roll back last action', href: 'commands.html#cmd-nine' },
{ name: 'nap', desc: 'defer a task', href: 'commands.html#cmd-nap' },
{ name: 'wake', desc: 'execute on a condition', href: 'commands.html#cmd-wake' },
{ name: 'watch', desc: 'monitor and notify', href: 'commands.html#cmd-watch' },
{ name: 'purr', desc: 'status of armed tasks', href: 'commands.html#cmd-purr' },
{ name: 'paw', desc: 'save a pipe as a script', href: 'commands.html#cmd-paw' },
{ name: 'fetch', desc: "load someone else's script", href: 'commands.html#cmd-fetch' },
{ name: 'chart', desc: 'render a stream', href: 'commands.html#cmd-chart' },
{ name: 'export', desc: 'dump a stream', href: 'commands.html#cmd-export' },
{ name: 'pspsps', desc: 'link a wallet', href: 'commands.html#cmd-pspsps' }
];

function initPalette() {
var hint = $('#palette-hint');
var overlay = $('#palette');
var input = $('#palette-input');
var results = $('#palette-results');
if (!overlay || !input || !results) return;

var activeIndex = -1;
var lastFocus = null;

function matches() {
var q = input.value.trim().toLowerCase();
if (!q) return PALETTE_ITEMS.slice();
return PALETTE_ITEMS.filter(function (it) {
return (it.name + ' ' + it.desc).toLowerCase().indexOf(q) !== -1;
});
}

function setActive(i, scroll) {
var items = $all('.palette-item', results);
if (!items.length) return;
activeIndex = Math.max(0, Math.min(i, items.length - 1));
items.forEach(function (el, idx) {
var on = idx === activeIndex;
el.classList.toggle('active', on);
el.setAttribute('aria-selected', on ? 'true' : 'false');
});
if (scroll !== false && items[activeIndex]) {
items[activeIndex].scrollIntoView({ block: 'nearest' });
}
}

function render() {
var list = matches();
results.innerHTML = '';
if (!list.length) {
var empty = document.createElement('div');
empty.className = 'palette-empty';
empty.textContent = 'No matches';
results.appendChild(empty);
activeIndex = -1;
return;
}
list.forEach(function (it) {
var btn = document.createElement('button');
btn.type = 'button';
btn.className = 'palette-item';
btn.setAttribute('role', 'option');
btn.innerHTML =
'<span class="palette-name"></span><span class="palette-desc"></span>';
$('.palette-name', btn).textContent = it.name;
$('.palette-desc', btn).textContent = it.desc;
btn.addEventListener('click', function () {
go(it.href);
});
results.appendChild(btn);
});
setActive(0);
}

function go(href) {
close();
window.location.href = href;
}

function open() {
lastFocus = document.activeElement;
overlay.hidden = false;
input.value = '';
render();
input.focus();
}

function close() {
overlay.hidden = true;
if (lastFocus && lastFocus.focus) lastFocus.focus();
}

function isOpen() {
return !overlay.hidden;
}

if (hint) hint.addEventListener('click', open);
overlay.addEventListener('click', function (e) {
if (e.target === overlay) close();
});

input.addEventListener('input', render);

overlay.addEventListener('keydown', function (e) {
if (e.key === 'Escape') {
e.preventDefault();
close();
return;
}
if (e.key === 'ArrowDown') {
e.preventDefault();
setActive(activeIndex + 1);
return;
}
if (e.key === 'ArrowUp') {
e.preventDefault();
setActive(activeIndex - 1);
return;
}
if (e.key === 'Enter') {
e.preventDefault();
var items = $all('.palette-item', results);
if (activeIndex >= 0 && items[activeIndex]) {
items[activeIndex].click();
} else {
var list = matches();
if (list.length) go(list[0].href);
}
return;
}
if (e.key === 'Tab') {
var focusables = [input].concat($all('.palette-item:not([hidden])', results));
if (!focusables.length) return;
var idx = focusables.indexOf(document.activeElement);
e.preventDefault();
var next = e.shiftKey
? (idx <= 0 ? focusables.length - 1 : idx - 1)
: (idx === -1 || idx === focusables.length - 1 ? 0 : idx + 1);
focusables[next].focus();
}
});

document.addEventListener('keydown', function (e) {
if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
e.preventDefault();
if (isOpen()) close();
else open();
}
});

render();
}

/* ---------------- copy buttons ---------------- */
function copyText(text) {
if (navigator.clipboard && navigator.clipboard.writeText) {
return navigator.clipboard.writeText(text).then(function () { return true; }, function () {
return legacyCopy(text);
});
}
return Promise.resolve(legacyCopy(text));
}
function legacyCopy(text) {
try {
var ta = document.createElement('textarea');
ta.value = text;
ta.style.position = 'fixed';
ta.style.opacity = '0';
document.body.appendChild(ta);
ta.select();
var ok = document.execCommand('copy');
document.body.removeChild(ta);
return ok;
} catch (err) {
return false;
}
}
function initCopy() {
document.addEventListener('click', function (e) {
var btn = e.target && e.target.closest ? e.target.closest('.copy-btn[data-copy]') : null;
if (!btn) return;
e.preventDefault();
copyText(btn.getAttribute('data-copy')).then(function () {
if (!btn.getAttribute('data-original-label')) {
btn.setAttribute('data-original-label', btn.textContent);
}
var original = btn.getAttribute('data-original-label');
btn.textContent = 'copied!';
btn.classList.add('copied');
setTimeout(function () {
btn.textContent = original;
btn.classList.remove('copied');
}, 1500);
});
});
}

/* ---------------- reveal on scroll ---------------- */
function initReveal() {
var els = $all('[data-reveal]');
if (!els.length) return;
var reduced = false;
try {
reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
} catch (err) { /* no matchMedia */ }
var hasIO = typeof IntersectionObserver === 'function';
if (reduced || !hasIO) {
els.forEach(function (el) { el.classList.add('revealed'); });
return;
}
var io = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add('revealed');
io.unobserve(entry.target);
}
});
}, { threshold: 0.15 });
els.forEach(function (el) { io.observe(el); });
}

/* ---------------- terminal (index.html only) ---------------- */
function makeLine(className, content) {
var div = document.createElement('div');
div.className = 'tline ' + className;
div.textContent = content == null ? '' : content;
return div;
}

function initTerminal() {
var root = $('#terminal');
var win = $('#terminal-window');
var body = $('#terminal-body');
if (!root || !win || !body) return;

var interactive = false;
var autoTimer = null;
var stopped = false;

function trimLines() {
while (body.children.length > 80) {
body.removeChild(body.firstChild);
}
}

function appendLine(el) {
body.appendChild(el);
trimLines();
body.scrollTop = body.scrollHeight;
return el;
}

function newCmdLine(cmdText, withCursor) {
var div = document.createElement('div');
div.className = 'tline tline-cmd';
var prompt = document.createElement('span');
prompt.className = 'prompt';
prompt.textContent = 'dog@cli $ ';
var txt = document.createElement('span');
txt.className = 'cmd-text';
txt.textContent = cmdText || '';
div.appendChild(prompt);
div.appendChild(txt);
if (withCursor !== false) {
var cur = document.createElement('span');
cur.className = 'cursor';
div.appendChild(cur);
}
appendLine(div);
return txt;
}

function printOut(lines) {
lines.forEach(function (l) {
appendLine(makeLine(l.cls || 'tline-out', l.text != null ? l.text : l));
});
}

function sleep(ms) {
return new Promise(function (res) { autoTimer = setTimeout(res, ms); });
}

function typeCommand(cmd) {
return new Promise(function (resolve) {
var txtSpan = newCmdLine('', true);
var i = 0;
function step() {
if (stopped || interactive) { resolve(null); return; }
if (i >= cmd.length) { resolve(txtSpan); return; }
txtSpan.textContent += cmd.charAt(i);
i += 1;
body.scrollTop = body.scrollHeight;
setTimeout(step, 35 + Math.floor(Math.random() * 36));
}
step();
});
}

function removeCursor() {
var cur = $('.tline-cmd .cursor', body);
if (cur && cur.parentNode) cur.parentNode.removeChild(cur);
}

var SCRIPTS = [
{
cmd: 'dog wallet',
out: ['7xKp…4mNq   read-only', 'balance       12.418 SOL', 'accounts      63']
},
{ cmd: 'dog wallet | grep dust', out: ['47 accounts, 0.094 SOL held as rent'] },
{
cmd: 'dog wallet | grep dust | sweep',
out: [
{ text: 'closed 47 accounts', cls: 'tline-out' },
{ text: 'recovered 0.094 SOL', cls: 'tline-ok' }
]
},
{
cmd: 'hiss',
out: [
{ text: '12 open approvals', cls: 'tline-err' },
{ text: '3 unlimited', cls: 'tline-err' },
{ text: 'oldest granted 214 days ago', cls: 'tline-out' }
]
},
{
cmd: 'guard "dog positions | grep MNGO | close" --below 0.92',
out: [{ text: 'armed. runs without you.', cls: 'tline-ok' }]
},
{
cmd: 'purr',
out: [
'guard   MNGO/USDC below 0.92   armed',
'nap     rent-check            in 30d',
'balance covers 94 days'
]
}
];

async function runAutoDemo() {
var sIdx = 0;
for (;;) {
if (stopped || interactive) return;
var script = SCRIPTS[sIdx % SCRIPTS.length];
sIdx += 1;
var typed = await typeCommand(script.cmd);
if (!typed) return;
await sleep(250);
removeCursor();
for (var i = 0; i < script.out.length; i++) {
if (stopped || interactive) return;
var l = script.out[i];
appendLine(makeLine(typeof l === 'string' ? 'tline-out' : (l.cls || 'tline-out'), typeof l === 'string' ? l : l.text));
await sleep(250);
if (stopped || interactive) return;
}
await sleep(2500);
}
}

function showHint() {
var hintEl = $('.terminal-hint', root);
if (hintEl) hintEl.textContent = "interactive — type 'help'";
}

function startInteractive() {
if (interactive) return;
interactive = true;
stopped = true;
if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
removeCursor();
showHint();
newCmdLine(buffer, true);
if (win.focus) win.focus();
}

var buffer = '';

function renderBuffer() {
var span = $('.tline-cmd:last-child .cmd-text', body);
if (span) span.textContent = buffer;
body.scrollTop = body.scrollHeight;
}

function execCommand(raw) {
var cmd = raw.trim();
newCmdLine(cmd, false);
if (!cmd) return;
var lower = cmd.toLowerCase();

function out(lines) {
printOut(lines.map(function (t) {
return typeof t === 'string' ? { text: t, cls: 'tline-out' } : t;
}));
}

if (lower === 'help') {
out([
'commands:',
'  dog wallet            show wallet summary',
'  grep dust             filter dust accounts',
'  sweep                 close dust, recover rent',
'  hiss                  surface risk',
'  guard <cmd> --below N arm a task that runs without you',
'  purr                  status of armed tasks',
'  nine                  roll back last action',
'  pspsps                link a wallet',
'  clear                 clear the screen'
]);
} else if (lower === 'wallet' || lower === 'dog wallet') {
out(['7xKp…4mNq   read-only', 'balance       12.418 SOL', 'accounts      63']);
} else if (lower === 'grep dust' || lower === 'dog wallet | grep dust') {
out(['47 accounts, 0.094 SOL held as rent']);
} else if (lower === 'sweep' || lower.indexOf('sweep') !== -1) {
out([{ text: 'closed 47 accounts', cls: 'tline-out' }, { text: 'recovered 0.094 SOL', cls: 'tline-ok' }]);
} else if (lower === 'hiss') {
out([
{ text: '12 open approvals', cls: 'tline-err' },
{ text: '3 unlimited', cls: 'tline-err' },
{ text: 'oldest granted 214 days ago', cls: 'tline-out' }
]);
} else if (lower === 'nine') {
out([{ text: 'reverted: approval revoke', cls: 'tline-out' }, { text: 'cannot undo: settled swap', cls: 'tline-err' }]);
} else if (lower.indexOf('guard') === 0) {
out([{ text: 'armed. runs without you.', cls: 'tline-ok' }]);
} else if (lower === 'purr') {
out([
'guard   MNGO/USDC below 0.92   armed',
'nap     rent-check            in 30d',
'balance covers 94 days'
]);
} else if (lower === 'pspsps') {
out(['woof. wallet linked (demo)']);
} else if (lower === 'clear') {
body.innerHTML = '';
} else {
out([{ text: "dog did not do this. try 'help'", cls: 'tline-err' }]);
}
}

win.addEventListener('click', startInteractive);
win.addEventListener('focus', startInteractive);
win.addEventListener('keydown', function (e) {
startInteractive();
if (e.key === 'Enter') {
e.preventDefault();
var cmd = buffer;
buffer = '';
execCommand(cmd);
} else if (e.key === 'Backspace') {
e.preventDefault();
buffer = buffer.slice(0, -1);
renderBuffer();
} else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
e.preventDefault();
buffer += e.key;
renderBuffer();
}
});

// deep link: index.html#terminal=<encoded command>
var m = /^#terminal=(.+)$/.exec(window.location.hash || '');
if (m) {
var cmd = '';
try { cmd = decodeURIComponent(m[1]); } catch (err) { cmd = m[1]; }
stopped = true;
showHint();
setTimeout(function () {
execCommand(cmd);
try { root.scrollIntoView({ behavior: 'smooth' }); } catch (err) { root.scrollIntoView(); }
}, 400);
return;
}

runAutoDemo();
}

/* ---------------- pricing calculator (pricing.html only) ---------------- */
function initPricing() {
var days = $('#calc-days');
var daysOut = $('#calc-days-out');
var result = $('#calc-result');
var explain = $('#calc-explain');
if (!days || !daysOut || !result || !explain) return;

function update() {
var d = parseInt(days.value, 10) || 1;
var months = Math.ceil(d / 30);
var usd = months * 30;
var sol = Math.round((usd / 180) * 1000) / 1000;
daysOut.textContent = d + ' days';
result.textContent = sol.toFixed(3).replace(/\.?0+$/, '') + ' SOL held';
explain.textContent =
'ceil(' + d + '/30) months × $30 × (1 / $180 example SOL rate) — example rate, not advice';
}
days.addEventListener('input', update);
update();
}

/* ---------------- commands page filter (commands.html only) ---------------- */
function initCommandsFilter() {
var input = $('#cmd-filter');
if (!input) return;
var cards = $all('.cmd-card');
var sections = $all('.cmd-section');

function update() {
var q = input.value.trim().toLowerCase();
cards.forEach(function (card) {
var match = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
if (match) card.removeAttribute('hidden');
else card.setAttribute('hidden', '');
});
sections.forEach(function (section) {
var title = $('.cmd-group-title', section);
var any = $all('.cmd-card', section).some(function (c) { return !c.hasAttribute('hidden'); });
if (title) {
if (any) title.removeAttribute('hidden');
else title.setAttribute('hidden', '');
}
});
}
input.addEventListener('input', update);
update();
}

/* ---------------- scripts page (scripts.html only) ---------------- */
function initScripts() {
var input = $('#scripts-filter');
var sortSel = $('#scripts-sort');
var grid = $('#scripts-grid');
if (!grid) return;
var cards = $all('.script-card', grid);

function applyFilter() {
var q = input && input.value ? input.value.trim().toLowerCase() : '';
cards.forEach(function (card) {
var match = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
if (match) card.removeAttribute('hidden');
else card.setAttribute('hidden', '');
});
}

function applySort() {
var mode = sortSel ? sortSel.value : 'stars';
var sorted = cards.slice().sort(function (a, b) {
if (mode === 'name') {
var an = (a.getAttribute('data-name') || a.textContent).trim().toLowerCase();
var bn = (b.getAttribute('data-name') || b.textContent).trim().toLowerCase();
return an < bn ? -1 : an > bn ? 1 : 0;
}
var as = parseFloat(a.getAttribute('data-stars')) || 0;
var bs = parseFloat(b.getAttribute('data-stars')) || 0;
return bs - as;
});
sorted.forEach(function (card) { grid.appendChild(card); });
}

if (input) input.addEventListener('input', applyFilter);
if (sortSel) sortSel.addEventListener('change', applySort);
applyFilter();
}

/* ---------------- guard page arm demo (guard.html only) ---------------- */
function initGuardDemo() {
var root = $('#arm-demo');
if (!root) return;
var cmdSel = $('#arm-cmd');
var priceInput = $('#arm-price');
var output = $('#arm-demo-output');
if (!output) return;

function update() {
var price = parseFloat(priceInput && priceInput.value);
if (isNaN(price)) price = 0.92;
var obj = {
intent: 'close',
filter: 'positions | grep MNGO',
condition: { field: 'price', below: price },
expires: '72h'
};
var kind = cmdSel ? cmdSel.value : 'watch';
if (kind === 'watch') {
obj.mode = 'notify-only';
} else {
obj.signed = 'locally';
}
output.textContent = JSON.stringify(obj, null, 2);
}

if (cmdSel) cmdSel.addEventListener('change', update);
if (priceInput) priceInput.addEventListener('input', update);
update();
}

/* ---------------- boot ---------------- */
function init() {
initStatusbar();
initNav();
initPalette();
initCopy();
initReveal();
initTerminal();
initPricing();
initCommandsFilter();
initScripts();
initGuardDemo();
}

if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init);
} else {
init();
}
})();
