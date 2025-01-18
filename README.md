# BKoLogOut
tóm lại là ko cho web nó log out mình ra
mình tính làm extension nhưng mà lười, mình để source code của web trường để mọi người tinh chỉnh trong first.js, hình như là moodle api thôi, chắc phải chọc ba cái quyền xong gửi request là xong
mọi người muốn tiện thì có thể vào Source > Snippets > New Snippets rồi tạo snippet với script này, sau đó muốn chạy thì `Ctrl + Shift + P` và chọn cái snippet chạy
vào console paste vào
```js
function startKeepAlive(freq) {
    async function sendKeepAlive() {
        try {
            const response = await fetch(`${window.location.origin}/lib/ajax/service.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([
                    {
                        methodname: "core_session_touch",
                        args: {}
                    }
                ])
            });
            if (!response.ok) {
                console.warn("Keep-alive failed");
            } else {
                console.log("Keep-alive successful");
            }
        } catch (error) {
            console.error("Error in keep-alive request:", error);
        }
    }

    setInterval(sendKeepAlive, freq * 1000);
}

startKeepAlive(60);
```
