import { CrossIcon } from "../../../assets/icons";

interface ColumnDropDownMenuProps {
    onClose: () => void;
    onDelete: () => void;
}

export const ColumnDropDownMenu = ({onClose, onDelete}: ColumnDropDownMenuProps) => {
    return (
        <div className="columnDropDownMenu flex-column g12">
            <div className="columnDropDownMenuHeader flex-between">
                <span>Действия со столбцом</span>
                <button className="closeMenu flex-center" onClick={() => onClose()}><CrossIcon /></button>
            </div>
            <nav className="columnDropDownMenuNavigation flex-column g8">
                <button className="add">Добавить задачу</button>
                <button className="">Архивировать список</button>
                <button className="">Архивировать все задачи из списка</button>
                <button className="deleteButton" onClick={onDelete}>Удалить список</button>
            </nav>
        </div>
    )
}