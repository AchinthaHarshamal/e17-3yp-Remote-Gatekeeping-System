const initState = {
    messages:[
        {id: '1' , from : 'Sampath' , to:'Node' , dataType :'Image' , time : '22/45/2021'},
        {id: '2' , from : 'Sam' , to:'Node1' , dataType :'Image' , time : '22/45/2021'}
       
    ]
}
const dashboardReducer = (state = initState , action) =>{

    switch (action.type){
        case 'DOWNLOAD_MESSAGE':
             //console.log('Request messages : ' , action.id)
             return state
        default : 
            return state

    }
   
}



export default dashboardReducer; 