import { Meteor } from "meteor/meteor";
import { MongoInternals } from "meteor/mongo";
import { FilesCollection } from "meteor/ostrio:files";
import Grid from "gridfs-stream";
import fs from "fs";

let gfs;
if (Meteor.isServer) {
  gfs = Grid(
    MongoInternals.defaultRemoteCollectionDriver().mongo.db,
    MongoInternals.NpmModule
  );
}

export const ProductFiles = new FilesCollection({
  collectionName: "ProductFiles",
  allowClientCode: false,
  debug: process.env.NODE_ENV === "development",
  onAfterUpload(file) {
    Object.keys(file.versions).forEach(versionName => {
      const metadata = { versionName, fileId: file._id, storedAt: new Date() };
      const writeStream = gfs.createWriteStream({ filename: file.name, metadata });

      fs.createReadStream(file.versions[versionName].path).pipe(writeStream);

      writeStream.on("close", Meteor.bindEnvironment(uploadedFile => {
        const property = `versions.${versionName}.meta.gridFsFileId`;
        this.collection.update(file._id.toString(), {
          $set: {
            [property]: uploadedFile._id.toString()
          }
        });
        this.unlink(this.collection.findOne(file._id.toString()), versionName);
      }));
    });
  },
  interceptDownload(http, file, versionName) {
    const _id = (file.versions[versionName].meta || {}).gridFsFileId;

    if (_id) {
      http.response.setHeader("Content-Type", file.type);
      http.response.setHeader("Content-Disposition", `attachment;filename=${file.name}`);

      const readStream = gfs.createReadStream({ _id });
      readStream.on("error", err => { throw err; });
      readStream.pipe(http.response);
    }
    return Boolean(_id);
  },
  onAfterRemove(files) {
    files.forEach(file => {
      Object.keys(file.versions).forEach(versionName => {
        const _id = (file.versions[versionName].meta || {}).gridFsFileId;
        if (_id) {
          gfs.remove({ _id }, err => {
            if (err) {
              throw err;
            }
          });
        }
      });
    });
  }
});

if (Meteor.isServer) {
  ProductFiles.denyClient();
}

export default ProductFiles;
