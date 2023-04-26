import Mousetrap from 'mousetrap';
import {
  runInSeries, 
  elementIsVisible, 
  FOCUSABLE_ELEMENTS, 
} from './utils.js';

export function focusTrap(node) {
  const keyboardShortcuts = {
    'alt+tab': previous,
    'end': focusLastItem,
    'home': focusFirstItem,
    'shift+tab': previous,
    down: next,
    tab: next,
    up: previous,
  };

  Object.entries(keyboardShortcuts).forEach(([keys, handler]) => {
    Mousetrap.bind(keys, runInSeries([
      (event) => ({ event }),
      preventDefault,
      stopPropagation,
      getAllFocusableChildren,
      getCurrentlyFocusedItem,
      handler,
    ]));
  });

  function preventDefault(context) {
    context.event.preventDefault();
    return context;
  }

  function stopPropagation(context) {
    context.event.stopPropagation();
    return context;
  }

  function getAllFocusableChildren(context) {
    let focusables = [...node.querySelectorAll(FOCUSABLE_ELEMENTS)]; // NodeList to Array
    return {
      ...context,
      allFocusableItems: focusables.filter(elementIsVisible),
    };
  }

  function getCurrentlyFocusedItem(context) {
    let currentlyFocusedItem = document.activeElement;

    if (currentlyFocusedItem && !node.contains(currentlyFocusedItem)) {
      return context;
    }

    return {
      ...context,
      currentlyFocusedItem,
    };
  }

  function next({ allFocusableItems, currentlyFocusedItem }) {
    // if focus is not within the focuables, focus the first one.
    if (!currentlyFocusedItem) {
      allFocusableItems[0] && allFocusableItems[0].focus();
      return;
    }

    let currentlyFocusedIndex = allFocusableItems.indexOf(currentlyFocusedItem);

    // If we have focus on the last one, give focus on the first.
    if ((allFocusableItems.length - 1) === currentlyFocusedIndex) {
      allFocusableItems[0] && allFocusableItems[0].focus();
      return;
    }

    // Focus the next one.
    allFocusableItems[currentlyFocusedIndex + 1] && allFocusableItems[currentlyFocusedIndex + 1].focus();
  }

  function previous({ allFocusableItems, currentlyFocusedItem }) {
    // If focus is not within the focusables, focus the last one
    if (!currentlyFocusedItem) {
      allFocusableItems[allFocusableItems.length - 1].focus();
      return;
    }

    let currentlyFocusedIndex = allFocusableItems.indexOf(currentlyFocusedItem);

    // If we have focus on the first one, wrap to the end one.
    if (currentlyFocusedIndex === 0) {
      allFocusableItems[allFocusableItems.length - 1] && allFocusableItems[allFocusableItems.length - 1].focus();
      return;
    }

    // Focus the previous one.
    allFocusableItems[currentlyFocusedIndex - 1] && allFocusableItems[currentlyFocusedIndex - 1].focus();
  }

  function focusFirstItem({ allFocusableItems }) {
    allFocusableItems[0] && allFocusableItems[0].focus();
  }

  function focusLastItem({ allFocusableItems }) {
    allFocusableItems[allFocusableItems.length - 1].focus();
  } 

  return {
    destroy() {
      Object.keys(keyboardShortcuts).forEach((key) => Mousetrap.unbind(key));
    }
  };
}