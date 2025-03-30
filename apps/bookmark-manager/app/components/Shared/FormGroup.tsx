import React, { ReactNode } from "react";

const FormGroup = ({ children, label }: {children: ReactNode, label: string}) => {
  return (
    <div
        className={`mx-4 my-2 flex flex-col space-y-2 ${label === "" ? "justify-end" : ""}`}
    >
      {children}
    </div>
  );
};

export default FormGroup;
