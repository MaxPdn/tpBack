export function me(req,res) {
    return res.status(200).json({data:{auth:req.auth}})
}