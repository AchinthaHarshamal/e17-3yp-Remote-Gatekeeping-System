import React , {useEffect} from 'react'
import M from 'materialize-css'

const Faq = () => {

    const questions = [
        'How do I buy this ?',
        'How to Start?',
        'How to Download Mobile App',
        'How to set a password to the device?',
        'Do we have mony back gurantee?'

    ]
    const answers = [
        'Any GE Center',
        'Follow "Starting" section in the user manual given',
        'Visit our Website ? there, your can find the download link',
        'Follow the "Device Configure" section in  uer mannual',
        'Yes, you have.'

    ]

    const lists = []
    
    for(let i = 0 ; i< questions.length ; i++){
        lists.push(
            <li key={i}>
                <div className="collapsible-header"><i className="material-icons">question_answer</i>
                    {questions[i]}
                </div>
                <div className="collapsible-body">
                    <span>
                     {answers[i]}
                    </span>
                </div>
            </li>
        )
    }
    
    
    useEffect(() => {
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems);
    })
    return (
    <div className='faq'>
        <div className='container'>
            <ul className="collapsible popout">
                {lists}
            </ul>
        </div>
    </div>
   
   
      
    )
}

export default Faq
