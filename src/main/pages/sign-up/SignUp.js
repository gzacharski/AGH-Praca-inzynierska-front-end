import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from "./SignUp.styles";

export default function SignUp() {
   const classes = useStyles();
   return (
      <>
         <TextField
            id="text-id"
            label="Filled"
            className={classes.root}
         />
         <div>Sing Up form</div>
      </>
   );
}
