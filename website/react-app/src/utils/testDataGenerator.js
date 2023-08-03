export const generateAdTimeData = () => {
    const data = {};
    for (let i = 1; i <= 270; i++) {
        data[String(i)] = Math.floor(Math.random() * 1000) + 1;
    }
    return {
        "status": "1",
        "data": data
    };
};

