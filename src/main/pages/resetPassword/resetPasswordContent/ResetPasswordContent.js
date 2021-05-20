import React from 'react';
import { ResetPasswordForm } from 'src/main/components/forms';

const ResetPasswordContent = (props) => {
   const { status, setMessage, setOnRequest, setStatus } = props;

   if (status) return null;
   return (
      <ResetPasswordForm
         setMessage={setMessage}
         setOnRequest={setOnRequest}
         setStatus={setStatus}
      />
   );
};

export default ResetPasswordContent;
