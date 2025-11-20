import { useState } from "react";
import { ArrowDownIcon, EyeIcon, LockIcon } from "../../../assets/icons";

interface VisibilitySelectProps {
  value: string;
  onChange: (val: string) => void;
}

export const VisibilitySelect = ({ value, onChange }: VisibilitySelectProps) => {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "private", label: "Приватная", icon: <LockIcon /> },
    { value: "public", label: "Публичная", icon: <EyeIcon /> },
  ];

  return (
    <div className="visibilitySelect flex-column g4">
      <div className="selected flex-between" onClick={() => setOpen(!open)}>
        <div className="leftBox flex-center g8">
            {
            options.find((o) => o.value === value)?.icon
            }
            {options.find((o) => o.value === value)?.label}
        </div>
        <ArrowDownIcon />
      </div>

      {open && (
        <ul className="dropdown flex-column g4">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="flex-center g8"
            >
              {opt.icon} {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
