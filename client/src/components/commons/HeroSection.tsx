import {Hero} from "@/components/ui/hero.tsx";
import {FaMagnifyingGlass} from "react-icons/fa6";

const HeroSection = () => {
    return (
        <div className="ml-50 mr-50 mt-20">
            <Hero heading="ClearCart" description="Your go to marketplace for buying, selling and renting" button={
                {
                    text: "Browse Items",
                    icon: <FaMagnifyingGlass />,
                    url: "/browse/all"
                }
            } />
        </div>
    );
};
export default HeroSection;
