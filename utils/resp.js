const errResponse = (err, res) => {
    const status = (err.status)?err.status:500;
    const reason = (err.reason)?err.reason:err;
    res.status(status).json({
        "reason":reason
    });
}

const jsonResponse = (data, res) => {
    res.status(200).json(data);
}

module.exports = {
    errResponse,
    jsonResponse
}
