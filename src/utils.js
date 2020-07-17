export function runInSeries(tasks) {
  return (...initialArgs) => {
    return tasks.reduce((memo, task) => memo = [...[task(...memo)]], initialArgs || []);
  }
}

export function elementIsVisible(element) {
  let computedStyle = document.defaultView.getComputedStyle(element, null);

  return computedStyle.getPropertyValue('display') !== 'none' && computedStyle.getPropertyValue('visibility') !== 'hidden';
}

// A list of selectors to select all known focusable elements
export const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
];


