const si = require('systeminformation');

async function getUsedMemory() {
    try {
        let data = await si.mem();
        return Math.floor((data.used / data.total) * 100);
    } catch (err) {
        return 0;
    }
}

async function getUsedCpu() {
    try {
        let data = await si.currentLoad();
        return data.currentload;
    } catch (err) {
        return 0;
    }
}

module.exports = {
    getUsedMemory,
    getUsedCpu,
};