import { NavigateNext } from "@mui/icons-material";
import { Link, Breadcrumbs } from "@mui/material";
import { Stack } from "@mui/system";
import { routes } from "../../../module/routes";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = () => {
    const breadcrumbs = useBreadcrumbs(routes);
    const navigate = useNavigate();
    const handleClick = (path) => {
        const newPath = path;
        if (newPath.charAt(newPath.length - 1).match(/(\d+)/)) {

        } else {
            navigate(path);
        }
    };
    let breadcrumbsLength = breadcrumbs.length;
    return < Stack direction="row" spacing={1} sx={{ m: 2 }}>
        <Breadcrumbs sx={{ borderBottom: "none" }} separator={<NavigateNext fontSize="small" />}>
            {breadcrumbs?.map(({ match, breadcrumb }, index) => {
                const { route: { icon = null } = {}, pathname = "/", params } = match;
                let newpathName = pathname;
                let pathLength = _.size(params);
                return pathLength ? <Link underline="none" size="small" icon={icon} key={pathname} onClick={() => {
                    breadcrumbsLength - 1 > index && handleClick(newpathName);
                }}
                    sx={{ cursor: "pointer", fontSize: "14px", color: "white" }}>{breadcrumb}</Link> : (breadcrumbsLength === 7 ? <Link underline="none" size="small" icon={icon} key={pathname} onClick={() => {
                        breadcrumbsLength - 3 > index && handleClick(newpathName);
                    }}
                        sx={{ cursor: "pointer", fontSize: "14px", color: "white" }}>{breadcrumb}</Link> : <Link underline="none" size="small" icon={icon} key={pathname}
                            onClick={() => {
                                breadcrumbsLength - 1 > index && handleClick(newpathName);
                            }}
                            sx={{ cursor: "pointer", fontSize: "14px", color: "white" }}>{breadcrumb}</Link>);
            })}
        </Breadcrumbs>
    </Stack >;
};

export default Breadcrumb;
