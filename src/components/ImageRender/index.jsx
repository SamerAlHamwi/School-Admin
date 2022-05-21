import React, { useEffect, useState } from "react"
import { getImageOnServer } from "../../helpers/fakebackend_helper"

const ImageRender = props => {
  // const [image, setImage] = useState("")
  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const response = await getImageOnServer(props?.image)
  //     setImage(response)
  //   }
  //   fetchImage()
  // })
  return <img src={getImageOnServer(props?.image)} alt="" className="avatar-md h-auto d-block rounded" />
}

export default ImageRender
