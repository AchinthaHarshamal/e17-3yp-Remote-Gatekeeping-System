export const downloadMsg = (id) => {
    return (dispatch, getState) =>{
        // make async call to datase
        dispatch({
            type:'DOWNLOAD_MESSAGE',
            id : id
        })
    }
}