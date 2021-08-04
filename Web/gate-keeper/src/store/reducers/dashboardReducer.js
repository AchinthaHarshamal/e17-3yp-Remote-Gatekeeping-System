const initState = {
    messages:[
        {id: '1' , from : 'Sampath' , to:'Node' , dataType :'image'},
        {id: '2' , from : 'Sam' , to:'Node1' , dataType :'image'},
        {id: '3' , from : 'Janaka' , to:'Node2' , dataType :'Voice'},
        {id: '4' , from : 'Jkal' , to:'Node3' , dataType :'Voice'}

    ]
}
const dashboardReducer = (state = initState , action) =>{
    return state 
}


export default dashboardReducer;