
export function createConnection({ serverUrl, roomId }) {
    if (typeof serverUrl !== 'string') {
        throw Error("serverUrl이 String 타입이 아닙니다.");
    }
    if (typeof roomId !== 'string') {
        throw Error("roomId이 String 타입이 아닙니다.");
    }


    let interverId;
    let messageCallback;

    return {
        connect() {
            console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');

            // 초기화
            clearInterval(interverId);
            interverId = setInterval(() => {
                if (messageCallback) {
                    if (Math.random() > 0.5) {
                        messageCallback('hey');
                    } else {
                        messageCallback('lol');
                    }
                }
            }, 3000);
        },
        disconnect() {
            // 초기화
            clearInterval(interverId);
            messageCallback = null;
            console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl + '');
        },
        on(event, callback) {
            if (messageCallback) {
                throw Error('messageCallback 중복 호출');
            }
            if (event !== 'message') {
                throw Error('Only message evnet만 가능합니다.')
            }

            messageCallback = callback;
        }
    }


}