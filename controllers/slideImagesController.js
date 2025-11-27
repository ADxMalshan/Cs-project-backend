import slideImage from "../models/slideImages.js";

export function getSlideImages(req, res) {

    slideImage.find().then(
        (slideImages) => {
            res.json(slideImages)
        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "slideImages not found"
            })
        }
    )

}


export async function addSlideImages(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        })
        return;
    }
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
        res.status(403).json({
            message: "You are not authorized to add slide images"
        })
        return;
    }

    const body = req.body
    const slideData = {
        sldId: "",
        email: req.user.email,
        imageUrl: body.imageUrl
    }
    slideImage.find().sort({
        sldId: -1
    }).limit(1).then(
        async (slideImages) => {
            if (slideImages.length == 0) {
                slideData.sldId = "SLD0001"
            }
            else {

                const lastSlide = slideImages[0]
                const lastSlideId = lastSlide.sldId
                console.log(lastSlideId)
                const lastSlideIdNumber = lastSlideId.replace("SLD", "")
                const lastSlideNumberInt = parseInt(lastSlideIdNumber)
                const newSlideNumber = lastSlideNumberInt + 1
                const newSlideNumberString = newSlideNumber.toString().padStart(4, "0")
                slideData.sldId = "SLD" + newSlideNumberString
            }
            const slideImagesJson = new slideImage(slideData)
            slideImagesJson.save().then(
                () => {
                    res.json({
                        message: "slideImages added successfully"
                    })
                }
            )

        }
    )





}
export async function deleteSlideImages(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        })
        return;
    }
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
        res.status(403).json({
            message: "You are not authorized to delete slide images"
        })
        return;
    }

    try {
        await slideImage.findOneAndDelete({
            sldId: req.params.id
        })
        res.json({
            message: "slideImages deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "slideImages not found"
        })
    }
}