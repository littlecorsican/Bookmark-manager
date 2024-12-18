import React, { ReactNode } from "react";

const FormGroup = ({ children }: {children: ReactNode}) => {
  return (
    <div
        className="mx-4 my-2 flex flex-col space-y-2"
    >
      {children}
    </div>
  );
};

export default FormGroup;
