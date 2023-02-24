import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Toast() {

    const myState = useSelector(state => state.updateProperties);

    useEffect(() => {
        if(myState.toastMessage.length){
            document.getElementById('toast-container').style.display = 'block';

            setTimeout(() => {
                document.getElementById('toast-container').style.display = 'none';
            },3000);
        }
    },[myState.toastMessage]);

  return (
    <div id="toast-container">
        <p className='toast-message'>{myState.toastMessage}</p>
    </div>
  )
}

export default Toast;