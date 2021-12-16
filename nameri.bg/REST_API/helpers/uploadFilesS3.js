const fs = require("fs-extra")
const uid = require("uniqid")
const AWS = require("aws-sdk")

AWS.config.update({
	region: "eu-central-1",
})

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID_SINEASTRA,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SINEASTRA,
	region: "eu-central-1",
})

const uploadImages = async imageFiles => {
	const files = await Promise.all(imageFiles.map(async image => fs.readFile(image.filepath)))
	const filesWithImgType = files.map((file, i) => {
		return {
			file,
			imgType: imageFiles[i].mimetype.split('/')[1] || 'jpeg',
			mimeType: imageFiles[i].mimetype,
		}
	})

	const binaryFilesObjects = filesWithImgType.map(fileObj => {
		return {
			binaryFile: new Buffer.from(fileObj.file, "binary"),
			...fileObj,
		}
	})

	const filesParams = binaryFilesObjects.map(file => {
		return {
			Bucket: "nameri.bg/listings",
			Key: `${ uid() }.${ file.imgType }`, // File name you want to save as in S3
			Body: file.binaryFile,
			ContentType: file.mimeType,
			ACL: "public-read",
		}
	})

	const promises = filesParams.map(params => {
		return new Promise((res, rej) => {
			s3.upload(params, (err, data) =>
				err ? rej("Error while uploading: " + err.message) : res(data))
		})
	})

	return await Promise.all(promises)
}

module.exports = uploadImages