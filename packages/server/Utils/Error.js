const Error = (msg) => {
    console.log("[ERROR] " + msg);
}

const Warning = (msg) => {
    console.log("[WARNING] " + msg);
}

const Info = (msg) => {
    console.log("[INFO] " + msg);
}

module.exports.Error = Error;
module.exports.Warning = Warning;
module.exports.Info = Info;