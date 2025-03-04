import { Card, CardHeader, CardTitle, CardContent } from "../ui/button";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";


const StatCard = ({
  title,
  value,
  icon: Icon,
  buttonText,
  buttonLink,
  onClick,
  additionalInfo,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className="flex flex-col gap-2 max-sm:p-2 p-4 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-0 flex items-center flex-row justify-between">
        <CardTitle className="text-sm md:text-lg text-gray-700">
          {title}
        </CardTitle>
        {Icon && <Icon size={30} className="text-violet-700 rotate-180" />}
      </CardHeader>
      <CardContent className="flex flex-col gap-1 h-[-webkit-fill-available] justify-between items-end p-0">
        <h2 className="text-2xl max-md:text-md max-sm:text-[14px] font-bold w-full text-start">
          {value}
        </h2>
        {additionalInfo}
        {buttonText && buttonLink && (
          <Button
            className="bg-[#64439A] text-white text-[10px] px-[10px] py-[5px] h-fit rounded-md md:rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
              navigate(buttonLink);
            }}
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
