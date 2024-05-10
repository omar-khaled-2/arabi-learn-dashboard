const getObjectUrl = (key: string) => {
    return `https://${process.env.BUCKET_NAME!}.s3.${process.env.REGION!}.amazonaws.com/${key}`
}

export default getObjectUrl