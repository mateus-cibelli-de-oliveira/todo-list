export function createXMLHttpRequest(method, url, cb, data = null){
    const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF8");
        xhr.send(data);

        xhr.onreadystatechange = verificaAjax

        function verificaAjax(){
            // console.log(xhr.readyState);
            // console.log(xhr.status);
            // console.log(xhr.response);

            if(xhr.readyState === 4){
                if(xhr.status < 400){
                    //console.log(xhr.responseText);
                    const json = JSON.parse(xhr.responseText);
                    if(typeof cb === "function"){
                        cb(json);
                    }
                } else if(typeof cb === "function") {
                    cb({
                        error: true,
                        status: xhr.status,
                        message: "algo deu errado com o serviddor"
                    });
                }
            }
        }
}