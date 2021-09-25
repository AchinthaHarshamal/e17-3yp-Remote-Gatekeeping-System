const MailBoxStatus = () => {

        return(
            <div className='mainCard grey darken-2'>
                <a href="#" className="white-text">
                    <i class="material-icons ">markunread_mailbox</i>
                    <span> { true ? "Closed" : "Open" }</span>
                </a>
            </div>
        )
    
}

export default MailBoxStatus
