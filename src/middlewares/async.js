export default ({dispatch}) => next => action => {
    // check to see if it is a action or has property promise
   //if it does, wait to resolve
   //if it doesnt then send action to the next middleware
    if(!action.payload || !action.payload.then){
       return next(action)
   }         
   // waot to resolve promise and then create a new action with that data and dispatch it
   action.payload.then(function(response){
    const newAction = { ...action,payload:response }
    dispatch(newAction)
   });
}
    
