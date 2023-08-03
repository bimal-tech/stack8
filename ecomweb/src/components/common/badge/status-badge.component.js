import {Badge} from "react-bootstrap";
import { ucFirst } from "../../../helpers/functions";
export const StatusBadge = (props) => {
    return (<>
        <Badge bg={props.value === 'active' ? 'success' : 'danger'} >
            {ucFirst(props.value)}
        </Badge>
    </>)
}