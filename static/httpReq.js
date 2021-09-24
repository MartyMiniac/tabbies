const sendPostReq = (url, data) => {
    return new Promise((resolve, refuse) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
                    resolve(xhr.responseText)
                }
                else {
                    console.log('error')
                    refuse()
                }
            }
        }
        xhr.send(JSON.stringify(data));
    })
}