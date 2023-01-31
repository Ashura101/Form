import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

const checkGalleryPermission = () => {
    check((Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE))
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request((Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE))
              .then((result) => {
                switch (result) {
                  case RESULTS.GRANTED:
                    return true;
                     break;
                }
              })
            break;
          case RESULTS.GRANTED:
            return true;
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const checkCameraPermission = () => {
    check((Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA))
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request((Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA))
              .then((result) => {
                switch (result) {
                  case RESULTS.GRANTED:
                    return true;
                    break;
                }
              })
            break;
          case RESULTS.GRANTED:
            return true;
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  export {
    checkGalleryPermission,
    checkCameraPermission
  }