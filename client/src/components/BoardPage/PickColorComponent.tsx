import { useState } from "react";

interface PickColorProps {
    onSelect: (color: string) => void;
}

export const PickColor = ({onSelect}: PickColorProps) => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null)

    const colors: string[] = [
        '#164b35', '#533f04', '#693200', '#5d1f1a', '#48245d',
        '#216e4e', '#7f5f01', '#9e4c00', '#ae2e24', '#803fa5',
        '#4bce97', '#ddb30e', '#fca700', '#f87168', '#c97cf4',
        '#123263', '#164555', '#37471f', '#50253f', '#4b4d51',
        '#1558bc', '#206a83', '#4c6b1f', '#943d73', '#63666b',
        '#669df1', '#6cc3e0', '#94c748', '#e774bb', '#96999e'
    ]

    const handleSelectColor = (color: string) => {
        onSelect(color)
        setSelectedColor(color)
    }

    return (
        <div className="colorsList">
            {colors.map((color) => (
                <div
                    key={color}
                    className={`color ${selectedColor === color ? "selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSelectColor(color)}
                ></div>
            ))}
        </div>
    )
}