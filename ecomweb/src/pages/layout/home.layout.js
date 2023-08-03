import { HomeMenu } from "../../components/home/menu.component";
import { HomeFooter } from "../../components/home/footer.component";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (<>
        <HomeMenu/>
            <Outlet /> 
        <HomeFooter />
    </>)
}

export default HomeLayout;