const MailBoxStatus = () => {

        return(
            <div className='mainCard green lighten-3 z-depth-3'>
                <a href="#mail-box" className="white-text">
                    <i className="material-icons z-depth-1">markunread_mailbox</i>
                    <span>MailBox</span>
                    <h5 className='z-depth-1'> { true ? "Closed" : "OPENED" }</h5>
                    
                    
                </a>
            </div>
        )
    
}

export default MailBoxStatus
