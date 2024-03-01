// This functionality if pending to implement. as here file is not getting in binary form and not getting store in DataBase


// This is the middleware 
import multer from 'multer';   //multer is used to upload the file on the mongoDB
import { GridFsStorage } from 'multer-gridfs-storage'; // GridFsStorage is used to store the file on mongodb

const storage = new GridFsStorage({ 
    url: `mongodb+srv://shubhamrajput252000:Shubham252000%40@shubhamkamnaye.ajvpajx.mongodb.net/?retryWrites=true&w=majority`,
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        //checking the type of File. file.memeType will return the type of File.
        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage: storage}); 