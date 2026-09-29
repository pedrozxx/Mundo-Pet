const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..');

function abrir(t, registros) {
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'https://agenda.example.test', runScripts: 'outside-only'
  });
  t.after(() => dom.window.close());
  dom.window.matchMedia = () => ({ matches: false });
  dom.window.localStorage.setItem('pet-schedule-appointments', JSON.stringify(registros));
  dom.window.eval(fs.readFileSync(path.join(root, 'script.js'), 'utf8'));
  return dom.window;
}

function consulta(overrides = {}) {
  const now = new Date();
  const date = new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  return { id: 'exemplo', date, time: '08:00', pet: 'Mel', tutor: 'Tutor fictício',
    phone: '(00) 00000-0000', service: 'Banho', ...overrides };
}

test('dados persistidos não podem injetar atributos no botão', t => {
  const w = abrir(t, [consulta({ id: 'x" onmouseover="alert(1)' })]);
  assert.equal(w.document.querySelector('[onmouseover]'), null);
  assert.equal(w.document.querySelector('.delete-btn').dataset.id, 'x" onmouseover="alert(1)');
});

test('descarta horário malformado vindo do armazenamento', t => {
  const w = abrir(t, [consulta({ time: '08:00<img src=x onerror=alert(1)>' })]);
  assert.equal(w.document.querySelector('.appointment img'), null);
  assert.equal(w.document.querySelectorAll('.appointment').length, 0);
});

test('um registro inválido não impede a renderização dos válidos', t => {
  const w = abrir(t, [null, consulta(), consulta({ pet: 123 })]);
  assert.equal(w.document.querySelectorAll('.appointment').length, 1);
  assert.equal(w.document.querySelector('.appointment-main strong').textContent, 'Mel');
});

test('remove somente a consulta escolhida e persiste o resultado', t => {
  const w = abrir(t, [consulta(), consulta({ id: 'segunda', time: '14:00' })]);
  w.document.querySelector('.delete-btn').click();
  const salvas = JSON.parse(w.localStorage.getItem('pet-schedule-appointments'));
  assert.deepEqual(salvas.map(item => item.id), ['segunda']);
  assert.equal(w.document.querySelectorAll('.appointment').length, 1);
});
