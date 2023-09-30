const checkSize = (req, res, next) => {
    const validSizes = ["small", "medium", "large"]
    if (!validSizes.includes(req.body.size)){
        return res.status(406).json({
            message :" Invalid size, use small, meduim or large"
        })
    }
    next()
}

module.exports = {
    checkSize
}