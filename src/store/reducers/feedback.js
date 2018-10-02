// Feedback actions
export const newFeedback = feed => ({ type: 'NEW_FEEDBACK', payload: { ...feed, time: new Date() } })
// Feedback reducer
function feedback(state = { variant: 'success', message: 'Success'}, action) {
  switch (action.type) {
    case 'NEW_FEEDBACK':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
export default feedback
