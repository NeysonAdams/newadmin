const baseUrl = "https://khamraeva.pythonanywhere.com/admin/api";
const root_url= "https://khamraeva.pythonanywhere.com";

const getToken = () => localStorage.getItem('jwt');
const getRefreshToken = () => localStorage.getItem('refresh');

export const handleServerResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
};

const refresh_token = () => {
    const token = getRefreshToken();
    return fetch(`${root_url}/users/refresh_token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh_token: token }), // Assuming you send refresh_token in the body
    }).then((res) => {
        if (res.ok) {
            return res.json().then((tokens) => {
                localStorage.setItem("jwt", tokens["access_token"]);
                localStorage.setItem("refresh", tokens["refresh_token"]);
            });
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    });
};

export const handleServerAuthResponse = (res, originalRequest) => {
    if (res.ok) {
        return res.json();
    }
    if (res.status === 401) {
        return refresh_token().then(() => {
            console.log("Auth again");
            return originalRequest(); // Retry original request after refreshing token
        });
    }
    return Promise.reject(`${res.status} ${res.statusText}`);
};

export const sendRequestWithAuthHandling = (fetchFunction) => {
    return fetchFunction()
        .then((res) => {
            // Обрабатываем успешный ответ
            if (!res.ok) {
                // Если ответ с ошибкой, например, 401, то срабатывает .catch
                return Promise.reject(res);
            }
            return res.json(); // Возвращаем успешный ответ
        })
        .catch((error) => {
            if (error.status === 401) {
                // Если ошибка 401, пытаемся обновить токен
                return sendRequestWithAuthHandling(
                    refresh_token().then(() => {
                    console.log("Token refreshed, retrying request");
                    return sendRequestWithAuthHandling(fetchFunction); // Повторяем запрос после обновления токена
                }));
            }
            console.error("Error:", error);
            throw error; // Выбрасываем ошибку, если она не 401
        });
};

export const login = ({ email, password }) => {
    return fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(handleServerResponce);
};

export const getCurrentUser = () => {
    const token = getToken();
    return sendRequestWithAuthHandling(() =>
        fetch(`${baseUrl}/auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
    );
};

export const getAllLevels = () => {
    const token = getToken();
    return sendRequestWithAuthHandling(() => 
        fetch(`${baseUrl}/levels`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    );
}

export const getLevelById = (id) =>{
    const token = getToken();
    return sendRequestWithAuthHandling(() => 
        fetch(`${baseUrl}/levels/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    );
}

export const getFullURL = (prefix) =>{

    const url = `${root_url}${prefix}`

    return url;
}

export const saweAudioFile = async (file) =>
{
    if (!file)
        return;
    
    const token = getToken();

    const formData = new FormData();
    formData.append("audio", file);

    return await sendRequestWithAuthHandling(() => 
        fetch(`${baseUrl}/file/audio`, {
            method: "POST",
            mode: 'no-cors',
            headers: {
               "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        })
    );
}

export const generateExesize = ({difficulty, type, language, itype}) =>
{
    const token = getToken();

    const payload = {
        type,
        language,
        difficulty,
        itype
    };

    return sendRequestWithAuthHandling(() => 
        fetch(`${baseUrl}/generate`, {
            method: "POST",
            mode: 'no-cors',
            headers: {
               "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        })
    );

}

export const saweLevel = ({level}) =>
{
    const token = getToken();
    return sendRequestWithAuthHandling(() => 
        fetch(`${baseUrl}/levels`, {
            method: "POST",
            mode: 'no-cors',
            headers: {
               "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(level),
        })
    );
}

export const deleteFromLEvel = ({object, object_id}) => {
    const token = getToken();

    const payload = {
        object,
        object_id
    };

    return sendRequestWithAuthHandling(() => 
        fetch(`${baseUrl}/delete`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        })
    );
}

export const getPrompt = () => {
    const token = getToken();
    return sendRequestWithAuthHandling(()=>
        fetch(`${baseUrl}/prompt`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    );
}

export const savePrompt = (data) => {
    const token = getToken();
    return sendRequestWithAuthHandling(()=>
        fetch(`${baseUrl}/prompt`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
    );
}