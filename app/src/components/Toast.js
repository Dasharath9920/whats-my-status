import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Toast() {

    const myState = useSelector(state => state.updateProperties);

    useEffect(() => {
        if(myState.toastMessage.length){
            document.getElementById('toast-message').style.display = 'block';

            setTimeout(() => {
                document.getElementById('toast-message').style.display = 'none';
            },3000);
        }
    },[myState.toastMessage]);

  return (
    <div className="toast_container">
        <p id='toast-message'>{myState.toastMessage}</p>
    </div>
  )
}

export default Toast;