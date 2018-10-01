/**
 * 
 * @param {function} func Function to be executed
 * @param {number} wait Time windown between func execution
 * @param {boolean} immediate Incicate if should run immediate or at timeout end
 * @returns {function} The debounced function
 */
export default function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}