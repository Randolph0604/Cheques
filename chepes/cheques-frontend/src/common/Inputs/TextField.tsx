import React from "react";
import { OutlinedInputProps, TextField as TextField1 } from "@material-ui/core";
import { convertirTextoAFecha, FormatearFecha } from "../funciones/funciones";

export function TextField({
  name,
  label,
  onChange,
  onKeyDown,
  modificando = true,
  value,
  type = "text",
  placeholder = "",
  required = false,
  autoFocus = false,
  error,
  helperText,
  rows,
  InputProps,
  disabled = false,
  params,
  justifyContent = "left",
  visible = true,
  maxLength,
  forceUpperCase = false,
  style,
}: {
  name: string;
  label?: string;
  onChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  modificando?: boolean;
  value?: number | string;
  type?:
    | "text"
    | "number"
    | "date"
    | "time"
    | "month"
    | "color"
    | "checkbox"
    | "week"
    | "currency"
    | "email"
    | "password";
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  error?: string;
  helperText?: string;
  rows?: number;
  InputProps?: Partial<OutlinedInputProps>;
  disabled?: boolean;
  params?: any;
  justifyContent?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  visible?: boolean;
  maxLength?: number;
  forceUpperCase?: boolean;
  style?: React.CSSProperties;
}) {
  let nvalue = value;

  const placeholdervalue =
    type === "number" ? "0" : type === "currency" ? "0.00" : placeholder;

  if (typeof nvalue === "string") {
    if (forceUpperCase) {
      nvalue = nvalue.toLocaleUpperCase();
    }

    if (type === "date") {
      nvalue = FormatearFecha(convertirTextoAFecha(nvalue), "YYYY-MM-DD");
    }
  }

  return visible ? (
    modificando ? (
      <TextField1
        InputProps={InputProps}
        {...params}
        fullWidth
        disabled={disabled}
        autoFocus={autoFocus}
        required={required}
        name={name}
        label={label}
        placeholder={placeholdervalue}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        margin="normal"
        onChange={(e) => {
          if (onChange && (!maxLength || e.target.value.length <= maxLength))
            onChange(e);
        }}
        onKeyDown={onKeyDown}
        error={error ? true : false}
        helperText={helperText || error}
        value={nvalue === undefined ? nvalue : nvalue || ""}
        type={type === "currency" ? "number" : type}
        multiline={rows ? true : false}
        rows={rows}
        style={style}
      />
    ) : (
      <div>
        <div
          style={{ textAlign: type === "currency" ? "right" : justifyContent }}
        >
          <strong>{label}</strong>
        </div>
        <div
          style={{ textAlign: type === "currency" ? "right" : justifyContent }}
        >
          {type === "currency"
            ? (+(value || 0)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : nvalue || ""}
        </div>
      </div>
    )
  ) : null;
}
