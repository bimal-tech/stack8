import { Carousel } from "react-bootstrap"
import image3 from "../../../assets/img/ecom-banner-3.png";

export const BannerComponent = (props) => {

    return (
        <>
            <Carousel className="">

                {
                    props.data && props.data.map((banner, index) => (
                        <Carousel.Item interval={1000} key={index}>
                            <img
                                className="d-block w-100"
                                src={process.env.REACT_APP_IMAGE_URL+banner.image}
                                alt={banner.title}
                            />
                        </Carousel.Item>
                    ))
                }

            </Carousel>
        </>
    )
}