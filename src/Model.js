import React, { useState } from "react";
import { storage } from "./FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Model() {
  const [file, setFile] = useState({

  });
  const [image,setImage]=useState(null);

  const handleSubmit = (e) => {
    setFile(e.target.files[0]);
  };

  // const storage = getStorage();
  // getDownloadURL(ref(storage, "file.name"))
  // .then((url) => {
  //    console.log(url);
  //})
  //.catch((error) => {
  //console.log(error);
  //});

  const handleFileChange = async () => {
    var Imageurl = null;
    if (file) {
      const storageRef = ref(storage, file.name);
      console.log(file);
      console.log(storageRef);
      await uploadBytes(storageRef, file)
        .then((res) => {
          getDownloadURL(ref(storage, file.name))
            .then((url) => {
              setImage(url)
              
            })
            .catch((error) => {
              console.log(error);
            });
          console.log("Uploaded a blob or file!");
          console.log(res);
        })
        .catch((error) => {
          console.log("ok" + error);
        });
    } else {
      console.log("else");
      console.log("No file selected");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center p-4 bg-red-300 bg-sky-500 hover:bg-sky-700">
        <input
          type="file"
          name="file"
          placeholder="file"
          onChange={handleSubmit}
        />
        <button
          onClick={handleFileChange}
          className="ml-4 p-2 bg-blue-500 text-white hover:bg-blue-700"
        >
          Upload
        </button>
        <div>
          <img src={image}></img>
        </div>
      </div>
    </div>
  );
}

export default Model;
