import {toSvgFile} from "../../../../../utils/FileHelper";

const Hex = ({hexSrc}) => {
    return (
        <div style={{position: "relative", width: 120, height: 120}}>
            <img
                width={120}
                height={120}
                src={toSvgFile(hexSrc)}
            />
        </div>
    );
};

export default Hex;
