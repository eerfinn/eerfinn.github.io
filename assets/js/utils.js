/**
 * Utility functions for DOM manipulation
 */

/**
 * Select element with error handling
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
export function $(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
  }
  return element;
}

/**
 * Select all elements with error handling
 * @param {string} selector - CSS selector
 * @returns {Element[]}
 */
export function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

/**
 * Add event listener with error handling
 * @param {Element} element - DOM element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 */
export function addEvent(element, event, handler) {
  if (!element) {
    console.warn('Cannot add event to null element');
    return;
  }
  element.addEventListener(event, handler);
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @returns {Element}
 */
export function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
export function debounce(func, wait = 250) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Smooth scroll to element
 * @param {string} selector - Element selector
 */
export function scrollTo(selector) {
  const element = $(selector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}