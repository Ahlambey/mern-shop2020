import React, {useEffect, useState} from 'react';
import ImageGellery from 'react-image-gallery';
export default function ProductImages({details}) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if(details.images && details.images.length>0){
            let images = [];
            details.images.map(item=>{
                images.push({
                    original:`${item}`,
                    thumbnail:`${item}`

                })

            })

            setImages(images)
        }

    }, [details])





    return (
        <div>
            <ImageGellery items={Images}/>
        </div>
    )
}
