import {openUploadWidget} from "../../utils/cloudinaryService";

const CloudinaryUpload = ({setUrl, setName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dgtydwf1v",
                uploadPreset: 'DTUNES',
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
           style={{backgroundColor: '#EA445A'}} className="text-white mx-[2vw] rounded-full text-[1.3vw] p-[1vw] my-[1.5vw] font-bold"
            onClick={uploadImageWidget}
        >
            Select Track
        </button>
    );
};

export default CloudinaryUpload;
