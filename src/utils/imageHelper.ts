import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import Resizer from "react-image-file-resizer";
const QUALITY = 70;
const MAX_HEIGHT = 1000;
const MAX_WIDTH = 1000;

export const toBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      Resizer.imageFileResizer(
        file,
        MAX_WIDTH,
        MAX_HEIGHT,
        "JPEG",
        QUALITY,
        0,
        //@ts-ignore
        (uri: string) => resolve(uri),
        "base64"
      );
    };
    reader.onerror = (error) => reject(error);
  });
};

export const takePhotoInBase64 = async () => {
  const cameraPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera,
    quality: 100,
  });

  return cameraPhoto.base64String;
};
