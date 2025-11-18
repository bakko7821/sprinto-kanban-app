import type { Tag } from "../../utils/types";

interface TagComponentProps {
    tag: Tag
}

export const TagComponent = ({tag}: TagComponentProps) => {
    return (
        <div 
            className="tagComponent" 
            style={{ backgroundColor: tag.color }}></div>
    )
}