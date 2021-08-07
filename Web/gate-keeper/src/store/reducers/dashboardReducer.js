const initState = {
    messages:[
        {id: '1' , from : 'Sampath' , to:'Node' , dataType :'image' , time : '22/45/2021'},
        {id: '2' , from : 'Sam' , to:'Node1' , dataType :'image' , time : '22/45/2021'},
        {id: '3' , from : 'Janaka' , to:'Node2' , dataType :'Voice' , time : '22/45/2021'},
        {id: '4' , from : 'Jkal' , to:'Node3' , dataType :'Voice' , time : '22/45/2021'},
        {id: '5' , from : 'Sam' , to:'Node1' , dataType :'image' , time : '22/45/2021'},
        {id: '6' , from : 'Janaka' , to:'Node2' , dataType :'Voice' , time : '22/45/2021'},
        {id: '7' , from : 'Jkal' , to:'Node3' , dataType :'Voice' , time : '22/45/2021'}
    ]
}
const dashboardReducer = (state = initState , action) =>{
    return state 
}



export default dashboardReducer; 