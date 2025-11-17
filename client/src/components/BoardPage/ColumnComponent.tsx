import { MoreIcon } from "../../assets/icons";
import type { Column } from "../../utils/types";

interface ColumnComponentProps {
    column: Column;
}

export const ColumnComponent = ({ column }: ColumnComponentProps) => {
    return (
        <div className="column">
            <div className="columnHeader flex-between">
                <span className="columnName">{column.name}</span>
                <button className="moreButton"><MoreIcon /></button>
            </div>
        </div>
    )
}