const initState = {
    messages:[
        {id: '1' , from : 'Sampath' , to:'Node' , dataType :'Image' , time : '22/45/2021'},
        {id: '2' , from : 'Sam' , to:'Node1' , dataType :'Image' , time : '22/45/2021'},
        {id: '3' , from : 'Janaka' , to:'Node2' , dataType :'Voice' , time : '22/45/2021'},
        {id: '4' , from : 'Jkal' , to:'Node3' , dataType :'Voice' , time : '22/45/2021'},
        {id: '5' , from : 'Sam' , to:'Node1' , dataType :'Image' , time : '22/45/2021'},
        {id: '6' , from : 'Janaka' , to:'Node2' , dataType :'Voice' , time : '22/45/2021'},
        {id: '7' , from : 'Jkal' , to:'Node3' , dataType :'Voice' , time : '22/45/2021'}
    ]
}
const dashboardReducer = (state = initState , action) =>{

    switch (action.type){
        case 'DOWNLOAD_MESSAGE':
             console.log('Request messages : ' , action.id)
             return state
        default : 
            return state

    }
   
}



export default dashboardReducer; 