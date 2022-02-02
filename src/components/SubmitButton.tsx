import React from "react";
import { Loader } from "rsuite";

type Props = {
  text: string;
  loading: boolean;
  onClick: Function;
  disabled?: boolean;
  classArray?: string[];
};

// button component that shows a spinner when submitting

const SubmitButton = ({
  text,
  loading,
  onClick,
  disabled,
  classArray = [],
}: Props) => {
  return (
    <button
      className={`${classArray?.join(" ")} ${disabled ? "disabled" : ""}`}
      onClick={() => onClick()}
    >
      {text}
      {loading && (
        <span>
          <Loader size="xs"></Loader>
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
