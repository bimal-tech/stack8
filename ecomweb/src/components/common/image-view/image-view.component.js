export const SingleImageView = (props) => {
    return (<>
        <img src={process.env.REACT_APP_IMAGE_URL+props.image}
            className="img img-fluid"
            style={{
                "width": props.width+"px"
            }}
            alt=""
        />
    </>)
}