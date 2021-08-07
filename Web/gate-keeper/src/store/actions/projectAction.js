export const showMsg = () => {
    return (dispatch, getState) =>{
        // make async call to datase
        desphatch({
            type:'SHOW_MESSAGE' , id : id
        })
    }
}