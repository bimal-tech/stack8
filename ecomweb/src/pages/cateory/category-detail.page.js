import { useParams, useSearchParams } from "react-router-dom";

const CategoryDetail = () => {
    let params = useParams();

    let [query, setQuery] = useSearchParams()

    

    return (<>
        {params.slug}
        {query.get('id')}
    </>)
}

export default CategoryDetail;