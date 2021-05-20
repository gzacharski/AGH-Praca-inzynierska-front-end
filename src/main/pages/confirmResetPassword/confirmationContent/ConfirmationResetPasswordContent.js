import React from 'react';
import {
   ActivateAccountRefreshButton,
   LoginButton,
} from 'src/main/components/buttons';
import { ConfirmResetPasswordForm } from 'src/main/components/forms';

const ConfirmationResetPasswordContent = (props) => {
   const { status, setMessage, setOnRequest, setStatus } = props;

   if (status === 200) return <LoginButton />;
   if (status === 401 || status === 404)
      return (
         <ActivateAccountRefreshButton
            setMessage={setMessage}
            setOnRequest={setOnRequest}
            setStatus={setStatus}
         />
      );
   if (status === 500) return null;
   return (
      <ConfirmResetPasswordForm
         setMessage={setMessage}
         setOnRequest={setOnRequest}
         setStatus={setStatus}
      />
   );
};

export default ConfirmationResetPasswordContent;
