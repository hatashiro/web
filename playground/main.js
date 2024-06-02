import * as dom from '../utility/dom.js';
import * as math from '../utility/math.js';
import * as object from '../utility/object.js';
import * as random from '../utility/random.js';
import * as set from '../utility/set.js';
import * as string from '../utility/string.js';

function testDom() {
  const $app = dom.select('#app');

  // Using methods.
  $app.innerHTML = '';
  let clicked = false;
  $app.appendChild(
    dom.create('div', {id: 'hello', style: {fontSize: 20, color: 'blue'}}, [
      dom.create('span', {className: 'text hello'}, 'hello, '),
      dom.create('span', {classList: ['text', 'world']}, 'world!'),
      dom.create('button', {
        onclick(evt) {
          clicked = true;
          evt.preventDefault();
        }
      }),
    ])
  );

  let $hello = dom.select('#hello');
  console.assert($hello.id === 'hello');
  console.assert($hello.style.fontSize === '20px');
  console.assert($hello.style.color === 'blue');
  console.assert($hello.textContent === 'hello, world!');
  let $$text = dom.selectAll('.text', $hello);
  console.assert($$text[0].className === 'text hello');
  console.assert($$text[0].textContent === 'hello, ');
  console.assert($$text[1].className === 'text world');
  console.assert($$text[1].textContent === 'world!');
  let $button = dom.select('button', $hello);
  $button.click();
  console.assert(clicked);

  // Using proxy utility.
  $app.innerHTML = '';
  const $ = dom.$;
  clicked = false;
  $app.appendChild(
    $.div({id: 'hello', style: {fontSize: 20, color: 'blue'}}, [
      $.span({className: 'text hello'}, 'hello, '),
      $.span({classList: ['text', 'world']}, 'world!'),
      $.button({
        onclick(evt) {
          clicked = true;
          evt.preventDefault();
        }
      }),
    ])
  );

  $hello = $('#hello');
  console.assert($hello.id === 'hello');
  console.assert($hello.style.fontSize === '20px');
  console.assert($hello.style.color === 'blue');
  console.assert($hello.textContent === 'hello, world!');
  $$text = $.all('.text', $hello);
  console.assert($$text[0].className === 'text hello');
  console.assert($$text[0].textContent === 'hello, ');
  console.assert($$text[1].className === 'text world');
  console.assert($$text[1].textContent === 'world!');
  $button = $('button', $hello);
  $button.click();
  console.assert(clicked);

  // Clean up.
  $app.innerHTML = '';
}

function testString() {
  console.assert(string.isString('hello'));
  console.assert(string.isString(''));
  console.assert(string.isString(new String('hello')));
  console.assert(string.isString(new String()));
  console.assert(!string.isString(123));
  console.assert(!string.isString(null));
}


function testSet() {
  // equals
  console.assert(set.equals(new Set([1, 2, 3, 4]), new Set([1, 2, 3, 4])));
  console.assert(set.equals(new Set([1, 2, 3, 4]), new Set([4, 3, 2, 1])));
  console.assert(!set.equals(new Set([1, 2, 3, 4, 5]), new Set([1, 2, 3, 4])));
  console.assert(!set.equals(new Set([1, 2, 3, 4]), new Set([1, 2, 3, 4, 5])));
  console.assert(!set.equals(new Set([1, 2, 3, 4, 5]), new Set([1, 2, 3, 4, 0])));
}

function testObject() {
  // arrayEquals
  console.assert(object.arrayEquals([1, 2, 3, 4], [1, 2, 3, 4]));
  console.assert(object.arrayEquals([[1, 2], [3, 4, [5]]], [[1, 2], [3, 4, [5]]], true));
  console.assert(!object.arrayEquals([1, 2, 3, 4, 5], [1, 2, 3, 4]));
  console.assert(!object.arrayEquals([1, 2, 3, 4], [1, 2, 3, 4, 5]));
  console.assert(!object.arrayEquals([1, 2, 3, 4, 5], [1, 2, 3, 4, 0]));

  // mapEquals
  console.assert(object.mapEquals(new Map([[1, 2], [3, 4]]), new Map([[1, 2], [3, 4]])));
  console.assert(object.mapEquals(new Map([[1, 2], [3, 4]]), new Map([[3, 4], [1, 2]])));
  console.assert(!object.mapEquals(new Map([[1, 2], [3, 4]]), new Map([[3, 0], [1, 2]])));

  // objectEquals
  console.assert(object.objectEquals({1: 2, 3: 4}, {1: 2, 3: 4}));
  console.assert(object.objectEquals({1: 2, 3: {4: 5, 6: {7: 8}}},
                                     {1: 2, 3: {4: 5, 6: {7: 8}}}, true));
  console.assert(object.objectEquals({1: 2, 3: 4}, {3: 4, 1: 2}));
  console.assert(!object.objectEquals({1: 2, 3: 4}, {3: 0, 1: 2}));
  console.assert(!object.objectEquals({1: 2, 3: 4}, {1: 2, 3: 4, 5: 6}));

  // equals
  console.assert(object.equals([1, 2, 3, 4], [1, 2, 3, 4]));
  console.assert(object.equals([[1, 2], [3, 4, [5]]], [[1, 2], [3, 4, [5]]], true));
  console.assert(!object.equals([1, 2, 3, 4, 5], [1, 2, 3, 4]));
  console.assert(!object.equals([1, 2, 3, 4], [1, 2, 3, 4, 5]));
  console.assert(!object.equals([1, 2, 3, 4, 5], [1, 2, 3, 4, 0]));
  console.assert(object.equals(new Set([1, 2, 3, 4]), new Set([1, 2, 3, 4])));
  console.assert(object.equals(new Set([1, 2, 3, 4]), new Set([4, 3, 2, 1])));
  console.assert(!object.equals(new Set([1, 2, 3, 4, 5]), new Set([1, 2, 3, 4])));
  console.assert(!object.equals(new Set([1, 2, 3, 4]), new Set([1, 2, 3, 4, 5])));
  console.assert(!object.equals(new Set([1, 2, 3, 4, 5]), new Set([1, 2, 3, 4, 0])));
  console.assert(object.equals(new Map([[1, 2], [3, 4]]), new Map([[1, 2], [3, 4]])));
  console.assert(object.equals(new Map([[1, 2], [3, 4]]), new Map([[3, 4], [1, 2]])));
  console.assert(!object.equals(new Map([[1, 2], [3, 4]]), new Map([[3, 0], [1, 2]])));
  console.assert(object.equals({1: 2, 3: 4}, {1: 2, 3: 4}));
  console.assert(object.equals({1: 2, 3: {4: 5, 6: {7: 8}}},
                               {1: 2, 3: {4: 5, 6: {7: 8}}}, true));
  console.assert(object.equals({1: 2, 3: 4}, {3: 4, 1: 2}));
  console.assert(!object.equals({1: 2, 3: 4}, {3: 0, 1: 2}));
  console.assert(!object.equals({1: 2, 3: 4}, {1: 2, 3: 4, 5: 6}));
  console.assert(object.equals({1: 2, 3: [4, 5, {6: [7], 8: 9}]},
                               {1: 2, 3: [4, 5, {6: [7], 8: 9}]}, true));
}

function testMath() {
  console.assert(math.sum([1, 2, 3, 4]) == 10);
  console.assert(math.mean([1, 2, 3, 4]) == 2.5);
  console.assert(math.average([1, 2, 3, 4]) == 2.5);
  console.assert(math.variance([1, 2, 3, 4]) == 1.25);
  console.assert(math.std([1, 2, 3, 4]) == 1.118033988749895);
  console.assert(object.equals(math.rescale([1, 2, 3, 4, 5]), [0, 0.25, 0.5, 0.75, 1]));
  console.assert(object.equals(math.rescale([2, 3, 4, 5, 6], [1, 3]), [1, 1.5, 2, 2.5, 3]));
  console.assert(
    object.equals(math.standardize([1, 2, 3, 4]),
                  [-1.3416407864998738,
                   -0.4472135954999579,
                    0.4472135954999579,
                    1.3416407864998738]));
}

async function main() {
  const testFunctions = [
    testDom,
    testString,
    testSet,
    testObject,
    testMath,
  ];

  for (const fn of testFunctions) {
    console.log('Testing:', fn.name);
    await fn();
  }
}

main();
