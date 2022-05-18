import React, { useRef } from "react";
import CurrencyInput from "react-currency-input-field";
import "./style.scss";

export default function CustomTextField({ label, ...args }) {
  const labelRef = useRef(null);
  const fieldSetRef = useRef(null);

  function handleFocus() {
    labelRef.current.querySelector("label").classList.add("custom-focused");
    fieldSetRef.current.classList.add("fieldset-focused");
  }
  function handleBlur(e) {
    if (e.target.value === "") {
      labelRef.current.querySelector("label").classList.remove("custom-focused");
      fieldSetRef.current.classList.remove("fieldset-focused");
    }
  }
  return (
    <div
      className="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
      style={{ borderRadius: 4 }}
      ref={labelRef}
    >
      <label
        style={{ transition: "200ms" }}
        className="MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-root MuiFormLabel-colorPrimary css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root"
        data-shrink="false"
      >
        {label}
      </label>
      <CurrencyInput
        onBlur={handleBlur}
        onFocus={handleFocus}
        prefix="R$ "
        decimalSeparator=","
        groupSeparator="."
        decimalsLimit={2}
        className="MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
        {...args}
      />
      <fieldset
        aria-hidden="true"
        ref={fieldSetRef}
        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
      >
        <legend className="css-1ftyaf0">
          <span>{label}</span>
        </legend>
      </fieldset>
    </div>
  );
}
